const jwt = require("jsonwebtoken");

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

const getClass = (req, res) => {
  const db = req.app.get("db");
  const { tokenData } = req.body;
  const { id } = req.params;
  const decodedToken = jwt.decode(JSON.parse(tokenData).token);

  db.query(
    `
            SELECT 
                l.student_id,
                ud.user_fname,
                ud.user_lname,
                ud.user_image,
                l.class_id,
                c.class_status,
                c.class_name,
                c.class_description,
                l.student_status,
                l.list_id
            FROM 
                user_details as ud, 
                user_type as ut, 
                student as s, 
                "class" as c,
                list as l
            WHERE 
                    l.student_id = s.student_id 
                and 
                    l.class_id = c.class_id
                and
                    ud.userd_id = ut.userd_id
                and
                    ut.user_id = s.user_id
                and 
                    ud.google_id = '${decodedToken.sub}'
                and
                    c.class_id = ${id}
                and
                    c.class_status = 'on'
            `
  )
    .then(response => {
      if (!response[0]) {
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

const queueList = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;

  db
  .query(`
    SELECT 
      q.queue_id, 
      q.class_id, 
      q.student_id,
      t.tag_id as tag_id, 
      t.tag as tag, 
      CONCAT(ud.user_fname,' ', ud.user_lname) as name, 
      ud.user_image as image
    FROM 
      tag as t, 
      queue as q, 
      student as s, 
      user_type as ut, 
      user_details as ud 
    WHERE 
      ud.userd_id = ut.userd_id AND 
      ut.user_id = s.user_id AND 
      s.student_id = q.student_id AND 
      q.tag_id = t.tag_id AND 
      q.class_id = ${id} AND
      q.helping_id IS NULL
  `)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.error(error);
    res.status(500).end();
  })
};

const getAcceptClass = (req, res) => {
  const db = req.app.get('db')

  db.query(
    `SELECT DISTINCT list.student_status AS status, class.class_name AS cname, class.class_id AS cid FROM student INNER JOIN list ON student.student_id=list.student_id INNER JOIN class ON class.class_id=list.class_id WHERE list.student_status='accept' AND class.class_status='on'`
  )
    .then(post => res.status(201).json(post))
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}

const getAcceptClassDetails = (req, res) => {
  const db = req.app.get('db')
  const {id} = req.params
  db.query(
    `select DISTINCT list.student_status as status, class.class_name as cname, class.class_description as desc, class.class_id as cid FROM student inner join list on student.student_id=list.student_id inner join class on class.class_id=list.class_id where list.student_status='accept' AND class.class_status='on' and class.class_id = ${id}`
  )
  .then(u => res.status(201).json(u))
  .catch(err => {
    console.log(err)
    res.status(500).end();
  })
}

const helpList = (req,res) => {
  const db = req.app.get('db');
  const { id } = req.params;

  db.query(`
    SELECT
      CONCAT(ud.user_fname,' ', ud.user_lname) as name, 
      t.tag,
      ud.user_image as image,
      q.tag_id,
      q.helping_id,
      q.class_id,
      q.student_id,
      h.mentor_id,
      q.class_id,
      q.queue_id
    FROM 
      queue as q, 
      helping as h,
      tag as t,
      student as s,
      user_details as ud,
      user_type as ut
    where 
      ud.userd_id = ut.userd_id AND
      ut.user_id = s.user_id AND
      s.student_id = q.student_id AND
      t.tag_id = q.tag_id AND
      h.helping_id = q.helping_id AND 
      q.class_id = ${id}
  `)
  .then(response => res.status(200).send(response))
  .catch(error => {
    console.error(error);
    res.status(500).end();
  })
}

const getAllResolved = (req, res) => {
  db = req.app.get('db');
  const { id } = req.params;

  db.query(`
  SELECT
    user_details.user_fname AS fname, 
    user_details.user_lname AS lname, 
    tag.tag AS tag,
    tag.tag_id AS tid,
    class.class_id as cid
  FROM user_details
  INNER JOIN user_type ON user_details.userd_id=user_type.userd_id 
  INNER JOIN student on user_type.user_id=student.user_id 
  INNER JOIN resolved on student.student_id=resolved.student_id
  INNER JOIN class on resolved.class_id=class.class_id
  INNER JOIN tag on resolved.tag_id=tag.tag_id
  WHERE class.class_id=${id}
  ORDER BY tid DESC
  `).then(u => res.status(200).json(u))
  .catch(err=> console.log(err))
}

module.exports = {
  getAllClass,
  joinClass,
  joinedClass,
  getClass,
  queueList,
  getAcceptClass,
  getAcceptClassDetails,
  helpList,
  getAllResolved
};
