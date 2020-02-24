/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("sender",{
        s_id: {
            type: "serial",
            primaryKey: true,
        },
        userd_id: {
            type: "integer",
            references: "user_details",
            notNull: true,
            onDelete: "cascade"
        },
        message: {
            type: "string",
            notNull: true,
        }
    })
};

exports.down = (pgm) => {

};