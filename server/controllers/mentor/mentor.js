const addClass = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  const { name, description, startDate, endDate, slug } = req.body;

  db.user_type.findOne({ userd_id: id }).then(results => {
    db.mentor
      .findOne({
        user_id: results.user_id
      })
      .then(results => {
        db.class
          .insert({
            mentor_id: results.mentor_id,
            class_name: name,
            class_description: description,
            date_created: startDate,
            date_end: endDate,
            slug
          })
          .then(results => {
            res.status(200).send(results);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const getClass = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;

  db.mentor
    .findOne({ user_id: id })
    .then(results => {
      db.class
        .find(
          { mentor_id: results.mentor_id },
          {
            order: [{ field: "class_name", direction: "asc" }]
          }
        )
        .then(results => res.status(200).send(results))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
};

const getAllClass = (req, res) => {
  const db = req.app.get('db');

  db.query("SELECT * FROM class")
  .then(u => res.status(200).send(u))
  .catch(err=> res.status(500).send(err))
}
const removeClass = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;

  db.class
    .destroy(id)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err));
};

const updateStatus = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  const { class_status } = req.body;

  db.class
    .update(id, {
      class_status
    })
    .then(results => res.status(201).send(results))
    .catch(err => res.status(500).send(err));
};

const findClass = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;

  db.class
    .findOne({ slug: id })
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err));
};

const getEnrolles = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db.query(
    `SELECT list.list_id as l_id,student.student_id as s_id,user_details.user_email as email,user_details.user_image as image, user_details.user_fname as fname, user_details.user_lname as lname, list.student_status as status FROM user_details inner join user_type on user_type.userd_id=user_details.userd_id inner join student on user_type.user_id=student.user_id inner join list on student.student_id=list.student_id inner join class on list.class_id=class.class_id where class.class_id=${id}`
  )
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err));
};

const updateEnrolleesStatus = (req, res) => {
  const db = req.app.get("db");
  const { listId, status } = req.params;
  console.log(listId, status);

  db.list
    .update(listId, {
      student_status: status
    })
    .then(results => res.status(201).send(results))
    .catch(err => res.status(500).send(err));
};

const declineEnrollees = (req, res) => {
  const db = req.app.get("db");
  const { listId } = req.params;

  db.list
    .destroy({ list_id: listId })
    .then(results => res.status(201).send(results))
    .catch(err => res.status(500).send(err));
};

module.exports = {
  addClass,
  getClass,
  getAllClass,
  removeClass,
  updateStatus,
  findClass,
  getEnrolles,
  updateEnrolleesStatus,
  declineEnrollees
};
