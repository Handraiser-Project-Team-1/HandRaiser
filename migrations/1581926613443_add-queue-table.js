/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  // pgm.createTable("queue", {
  //   queue_id: {
  //     type: "serial",
  //     primaryKey: true
  //   },
  //   helping_id: {
  //     type: "integer",
  //     notNull: false,
  //   },
  //   student_id: {
  //     type: "integer",
  //     references: "student",
  //     notNull: true,
  //     onDelete: "cascade"
  //   },
  //   tag_id: {
  //     type: "integer",
  //     references: "tag",
  //     notNull: true,
  //     onDelete: "cascade"
  //   },
  //   class_id: {
  //     type: "integer",
  //     references: "class",
  //     notNull: true,
  //     onDelete: "cascade"
  //   }
  // })
};

exports.down = pgm => {};
