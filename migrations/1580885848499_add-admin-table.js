/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("admin", {
        admin_id: {
            type: 'serial',
            primaryKey: true
        },
        admin_pass: {
            type: 'text',
            notNull: true
        }
    })

};

exports.down = (pgm) => {

};
