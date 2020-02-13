const jwt = require("jsonwebtoken");

function getAllClass(req, res) {
  const db = req.app.get("db");
  db.class
    .find()
    .then(post => res.status(201).json(post))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

const getClass = (req, res) => {
  const db = req.app.get("db");
  const { tokenData } = req.body;
  const { id } = req.params;
  const decodedToken = jwt.decode(JSON.parse(tokenData).token);

  db.query(
    `
            SELECT 
                cl.student_id,
                ud.user_fname,
                ud.user_lname,
                ud.user_image,
                cl.class_id,
                c.class_status,
                c.class_name,
                c.class_description,
                cl.student_status,
                cl.list_id
            FROM 
                user_details as ud, 
                user_type as ut, 
                student as s, 
                "class" as c,
                class_list as cl
            WHERE 
                    cl.student_id = s.student_id 
                and 
                    cl.class_id = c.class_id
                and
                    ud.userd_id = ut.userd_id
                and
                    ut.user_id = s.user_id
                and 
                    ud.google_id = '${decodedToken.sub}'
                and
                    c.class_id = ${id}
            `
  )
    .then(response => {
      if(!response[0]){
        res.status(404).end();
        return;
      }
      res.status(200).send(response[0]);
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
};
module.exports = {
  getAllClass,
  getClass
};
