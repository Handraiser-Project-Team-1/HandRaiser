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
>>>>>>> 61f3ce728ef97a42f0acd9118fd1ea65b5056000
};

exports.down = pgm => {};
