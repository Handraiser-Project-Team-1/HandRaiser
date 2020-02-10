/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("mentor", {
        mentor_id: {
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
            notNull: true
        }
    })
};

exports.down = (pgm) => {

};
