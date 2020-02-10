/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("class", {
    class_id: {
      type: "serial",
      primaryKey: true
    },
    mentor_id: {
      type: "integer",
      notNull: true
    },

    class_name: {
      type: "text",
      notNull: true
    },
    class_description: {
      type: "text",
      notNull: true
    },
    date_created: {
      type: "date",
      notNull: true
    },
    date_end: {
      type: "date",
      notNull: true
    },
    class_status: {
      type: "text",
      notNull: "true",
      default: "off"
    }
  });
};

exports.down = pgm => {};
