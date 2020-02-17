/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("helping", {
    helping_id: {
      type: "serial",
      primaryKey: true
    },
    student_id: {
      type: "integer",
      references: "student",
      notNull: true,
      onDelete: "cascade"
    },
    mentor_id: {
      type: "integer",
      references: "mentor",
      notNull: true,
      onDelete: "cascade"
    }
  });
};

exports.down = (pgm) => {

};
