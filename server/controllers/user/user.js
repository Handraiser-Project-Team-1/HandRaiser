const jwt = require("jsonwebtoken"); 
const email = require("../email/email");

const newVerificationKey = () => {
  let random = Math.random()
    .toString(36)
    .substring(9);
  return random.length === 5 ? random : newVerificationKey();
};

module.exports = {
  createUsers: (req, res) => {
    const db = req.app.get("db");
    const { userData } = req.body;
    db.user_details
      .findOne(
        {
          google_id: userData.googleId
        },
        {
          fields: [
            "userd_id",
            "google_id",
            "user_fname",
            "user_lname",
            "user_email",
            "user_image"
          ]
        }
      )
      .then(user => {
        if (!user) {
          db.user_details
            .insert(
              {
                google_id: userData.googleId,
                user_fname: userData.givenName,
                user_lname: userData.familyName,
                user_email: userData.email,
                user_image: userData.imageUrl,
                user_type: [
                  {
                    userd_id: undefined,
                    user_type: "pending"
                  }
                ]
              },
              {
                deepInsert: true
              },
              {
                fields: [
                  "google_id",
                  "user_fname",
                  "user_lname",
                  "user_email",
                  "user_image"
                ]
              }
            )
            .then(createdUser => {
              res.status(201).send(createdUser);
            })
            .catch(error => {
              console.error(error);
              res.status(500).end();
            });
        } else {
          db.user_type
            .findOne(
              {
                userd_id: user.userd_id
              },
              {
                fields: ["user_type", "user_id"]
              }
            )
            .then(fetchedUserType => {
              console.log(fetchedUserType);
              switch (fetchedUserType.user_type) {
                case "mentor":
                  res.status(200).send({ ...user, ...fetchedUserType });
                  break;
                case "student":
                  res.status(200).send({ ...user, ...fetchedUserType });
                  break;
                default:
                  res.status(206).send({ ...user, ...fetchedUserType });
                  break;
              }
            })
            .catch(error => {
              console.error(error);
              res.status(500).end();
            });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).end();
      });
  },
  getUser: (req, res) => {
    const db = req.app.get("db");
    const { tokenObj } = req.body;
    const token = JSON.parse(tokenObj);
    var decoded = jwt.decode(token.token);
    // console.log(tokenObj, token, decoded)
    db.query(`SELECT * FROM user_details WHERE google_id='${decoded.sub}'`)
      .then(u => res.status(200).json(u))
      .catch(err => {
        console.log(err);
      });
  },
  getUsers: (req, res) => {
    const db = req.app.get("db");
    db.query(
      `SELECT * FROM user_details AS ud, user_type as ut WHERE NOT EXISTS (SELECT * FROM keys AS k WHERE k.userd_id = ud.userd_id) AND ud.userd_id = ut.userd_id AND ut.user_type = 'pending'`
    )
      .then(u => res.status(200).json(u))
      .catch(err => {
        console.log(err);
        res.status(500).end();
      });
  },
  setUserType: (req, res) => {
    const db = req.app.get("db");
    const { key, token } = req.body;
    const tokenObj = JSON.parse(token);
    var decoded = jwt.decode(tokenObj.token);
    if (!decoded) {
      res.status(403).end();
    } else {
      db.keys
        .findOne(
          {
            key: key
          },
          {
            fields: ["userd_id", "key_type", "key"]
          }
        )
        .then(key => {
          if (!key) {
            res.status(401).end();
            return;
          }
          db.user_details
            .findOne({
              user_email: decoded.email
            })
            .then(findUser => {
              if (findUser.userd_id !== key.userd_id) {
                res.status(401).end();
                return;
              }
              db.user_type
                .update(
                  {
                    userd_id: key.userd_id
                  },
                  {
                    user_type: key.key_type
                  },
                  {
                    fields: ["user_id", "userd_id", "user_type"]
                  }
                )
                .then(user => {
                  if (user[0].user_type === "mentor") {
                    db.mentor
                      .insert({
                        user_id: user[0].user_id,
                        status: true
                      })
                      .then(() => {
                        db.keys
                          .destroy({
                            userd_id: user[0].userd_id
                          })
                          .then(() => {
                            res.status(200).send({
                              name: decoded.name,
                              type: user[0].user_type,
                              id: user[0].userd_id
                            });
                          })
                          .catch(error => {
                            console.error(error);
                            res.status(500).end();
                          });
                      });
                  } else {
                    db.student
                      .insert({
                        user_id: user[0].user_id,
                        status: true
                      })
                      .then(() => {
                        db.keys
                          .destroy({
                            userd_id: user[0].userd_id
                          })
                          .then(() => {
                            res.status(200).send({
                              name: decoded.name,
                              type: user[0].user_type,
                              id: user[0].userd_id
                            });
                          })
                          .catch(error => {
                            console.error(error);
                            res.status(500).end();
                          });
                      });
                  }
                })
                .catch(error => {
                  console.error(error);
                  res.status(500).end();
                });
            })
            .catch(error => {
              console.error(error);
              res.status(500).end();
            });
        })
        .catch(error => {
          console.error(error);
          res.status(500).end();
        });
    }
  },
  sendUserKey: (req, res) => {
    const db = req.app.get("db");
    const { id, type } = req.body;
    const newKey = newVerificationKey();
    db.user_details.findOne({ userd_id: id }).then(user => {
      if (!user) {
        res.status(404).end();
      } else {
        const name = user.user_fname + " " + user.user_lname;
        email
          .main(name, user.user_email, newKey)
          .then(response => {
            if (response === "permission") {
              res.status(400).end();
              return;
            }else if(!response){
              res.status(500).end();
              return;
            }
            
            db.keys
              .insert({
                userd_id: id,
                key_type: type,
                key: newKey
              })
              .then(() => {
                res.status(200).send({
                  givenName: user.user_fname,
                  familyName: user.user_lname
                });
              })
              .catch(error => {
                console.error(error);
                res.status(500).end();
              });
          })
          .catch(error => {
            console.log(error);
            res.status(500).end();
          });
      }
    });
  },
  getKeyList: (req, res) => {
    const db = req.app.get("db");

    db.query(
      `SELECT * FROM user_details AS ud, user_type AS ut, keys as K WHERE ud.userd_id = ut.userd_id AND k.userd_id = ut.userd_id AND k.userd_id = ud.userd_id AND ut.user_type = 'pending'`
    )
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        console.error(error);
        res.status(500).end();
      });
  },
  countTableUserType: (req, res) => {
    const db = req.app.get("db");
    db.user_type.count().then(result => {
      res.status(200).send(result);
    });
  },
  getAllUsers: (req, res) => {
    const db = req.app.get("db");
    db.query(
      "SELECT user_details.user_image,user_details.user_fname,user_details.user_lname,user_details.user_email,user_details.userd_id,user_type.user_type FROM user_details INNER JOIN user_type ON user_type.userd_id = user_details.userd_id WHERE user_type.user_type != 'pending'"
    )
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).end();
      });
  },
  changeType: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { user_type } = req.body;

    db.user_type
      .update(
        { userd_id: id },
        {
          user_type
        }
      )
      .then(results => {
        db.user_type.findOne({ userd_id: id }).then(results => {
          let id = results.user_id;
          if (user_type === "student") {
            db.student.findOne({ user_id: results.user_id }).then(results => {
              if (!results) {
                db.mentor
                  .destroy({
                    user_id: id
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                  });

                db.student
                  .insert({
                    user_id: id,
                    status: false
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                  });
              }
            });
          } else if (user_type === "mentor") {
            let id = results.user_id;
            db.mentor.findOne({ user_id: results.user_id }).then(results => {
              if (!results) {
                db.student
                  .destroy({
                    user_id: id
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                  });

                db.mentor
                  .insert({
                    user_id: id,
                    status: false
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                  });
              }
            });
          }
        });

        res.status(201).send(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.user_details
      .destroy({ userd_id: id })
      .then(results => {
        res.status(201).send(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getType: (req, res) => {
    const db = req.app.get("db")
    const { id } = req.params
    
    db.user_type
    .find({ user_id: id })
    .then(results => {
      res.status(201).send(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  }
};
