const addClass = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  const { name, description, startDate, endDate } = req.body;

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
            date_end: endDate
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
module.exports = { addClass, getClass, removeClass, updateStatus };
