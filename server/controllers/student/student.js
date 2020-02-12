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
  module.exports = {
    getAllClass
  };