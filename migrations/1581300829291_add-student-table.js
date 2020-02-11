/* eslint-disable camelcase */

exports.shorthands = undefined;

<<<<<<< HEAD
exports.up = pgm => {
  pgm.createTable("student", {
    student_id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      references: "user_type",
      notNull: true,
      onDelete: "cascade"
    },
    status: {
      type: "boolean",
      notNull: true
    }
  });
=======
exports.up = (pgm) => {
    pgm.createTable("student",{
        student_id: {
            type: "serial",
            primaryKey: true,
        },
        user_id: {
            type: "integer",
            references: "user_type",
            notNull: true,
            onDelete: "cascade"
        },
        status: {
            type: "boolean",
            notNull: true,
        }
    })
>>>>>>> 4c5afd22a7de152488306c9367a569c63a200749
};

exports.down = pgm => {};
