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
        },
        status: {
            type: "boolean",
<<<<<<< HEAD:migrations/1581298979055_add-student-table.js
            notNull: true
=======
            notNull: true,
>>>>>>> g1-develop:migrations/1581300829291_add-student-table.js
        }
    })
};

exports.down = (pgm) => {

};