/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addConstraint("queue", "list", {
        foreignKeys:{
            columns: "student_id",
            references: "list",
            onDelete: "cascade"
        }
    })
};

exports.down = (pgm) => {

};
