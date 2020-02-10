/* eslint-disable camelcase */

exports.shorthands = undefined;

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
        }
    })
};

exports.down = (pgm) => {

};