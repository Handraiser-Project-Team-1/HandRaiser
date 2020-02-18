module.exports = {
  updatedQueueList: (class_id, db, callback) => {
    db.query(`
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
        q.class_id = ${class_id} AND
        q.helping_id IS NULL`)
    .then(queryResponse => {
      callback(queryResponse);
    }).catch( error => console.error(error));
  },
  updatedHelpList: (class_id, db, callback) => {
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
        q.class_id = ${class_id}
    `).then(response => {
      callback(response);
      console.log(response);
    }).catch(error => console.error(error));
  }
}