const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

module.exports = {
  getAdminPass: (req, res) => {
    const db = req.app.get("db");

    db.admin
      .find()
      .then(u => res.status(200).json(u))
      .catch(error => {
        console.log(error);
      });
  },
  updatePass: (req, res) => {
    const db = req.app.get("db");
    const { admin_pass } = req.body;

    // db.admin
    //   .update({ admin_id: req.params.id, admin_pass: admin_pass })
    argon2.
      hash(admin_pass)
      .then(hash=>{
        return db.query(`UPDATE admin SET admin_pass = '${hash}'`)
                .then(u => res.status(200).json(u))
                .catch(err => {
                  console.log(err);
              });
      })
  },
  login: (req, res) => {
    const db = req.app.get("db");

    const { username, password } = req.body;

    db.admin
      .findOne({
        admin_user: username
      })
      .then(user => {
        if (!user) {
          throw new Error("Invalid username");
        }

        return argon2.verify(user.admin_pass, password).then(valid => {
          if (!valid) {
            throw new Error("Incorrect password");
          }
          const token = jwt.sign(
            { admin_id: user.admin_id },
            process.env.SECRET_KEY
          );
          delete user.password;
          jwt.verify(token, process.env.SECRET_KEY);
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (["Invalid username", "Incorrect password"].includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  }
};
