function getAllClass(req, res) {
  const db = req.app.get("db");
  db.query(
    `SELECT user_details.user_image as image, user_details.user_fname as fname, user_details.user_lname as lname, class.class_name as cname, class.class_id as c_id  FROM user_details inner join user_type on user_details.userd_id=user_type.userd_id inner join mentor on mentor.user_id=user_type.user_id inner join class on mentor.mentor_id=class.mentor_id WHERE class.class_status = 'on';`
  )
    .then(post => res.status(201).json(post))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

const joinClass = (req, res) => {
  const db = req.app.get("db");
  const { user_id, cid } = req.body;

  db.student
    .findOne({ user_id }, { fields: ["student_id"] })
    .then(results => {
      db.list
        .insert({
          student_id: results.student_id,
          class_id: cid
        })
        .then(results => res.status(201).send(results))
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).send(err));
};

const joinedClass = (req, res) => {
  const db = req.app.get("db");

  const { user_id } = req.params;

  db.student
    .findOne({ user_id }, { fields: ["student_id"] })
    .then(results => {
      db.list
        .find({
          student_id: results.student_id
        })
        .then(results => res.status(201).send(results))
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).send(err));
};

const getClass = (req, res) => {
  const db = req.app.get('db')

  db.query(
    `SELECT list.student_status AS status, class.class_name AS cname FROM student INNER JOIN list ON student.student_id=list.student_id INNER JOIN class ON class.class_id=list.class_id WHERE list.student_status='accept'`
  )
    .then(post => res.status(201).json(post))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  getAllClass,
  joinClass,
  joinedClass,
  getClass
};
