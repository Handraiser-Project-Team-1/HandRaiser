/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("convo", {
    convo_id: {
      type: "serial",
      primaryKey: true
    },
    class_id: {
      type: "integer",
      references: "class",
      notNull: true,
      onDelete: "cascade"
    },
    s_id: {
      type: "integer",
      references: "sender",
      notNull: true,
      onDelete: "cascade"
    }
  });
};

exports.down = pgm => {};
