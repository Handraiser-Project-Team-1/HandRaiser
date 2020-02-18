/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("admin",{
        admin_id: {
            type: "serial",
            primaryKey: true,
        },
        admin_user: {
            type: "text",
            notNull: true,
        },
        admin_pass: {
            type: "text",
            notNull: true
        }
    });
    pgm.sql(`INSERT INTO admin(admin_user,admin_pass) VALUES ('admin','${process.env.ADMIN_PASS}')`)
};

exports.down = (pgm) => {

};
