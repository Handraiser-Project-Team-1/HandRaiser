/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("list", {
    list_id: {
      type: "serial",
      primaryKey: true
    },
    student_id: {
      type: "integer",
      references: "student",
      notNull: true,
      onDelete: "cascade"
    },
    class_id: {
      type: "integer",
      references: "class",
      notNull: true,
      onDelete: "cascade"
    },
    student_status: {
      type: "text",
      default: "pending",
      notNull: true
    }
  });
};

exports.down = pgm => {};