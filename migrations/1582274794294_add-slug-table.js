/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns("class", {
    slug: { type: "text", notNull: true }
  });
};

exports.down = pgm => {};