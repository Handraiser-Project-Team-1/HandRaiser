/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addConstraint("user_type", "userd_id", {
    foreignKeys: {
      columns: "userd_id",
      references: "user_details",
      onDelete: "cascade"
    }
  });
};

exports.down = pgm => {};