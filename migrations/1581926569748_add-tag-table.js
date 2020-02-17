/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("tag", {
    tag_id: {
      type: "serial",
      primaryKey: true
    },
    tag: {
      type: "tag",
      notNull: true,
    }
  });
};

exports.down = (pgm) => {

};
