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
        console.log(results.mentor_id);
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

module.exports = { addClass };
