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

    db.admin
      .update({ admin_pass: admin_pass })
      .then(u => res.status(200).json(u))
      .catch(err => {
        console.log(err);
      });
  }
};
