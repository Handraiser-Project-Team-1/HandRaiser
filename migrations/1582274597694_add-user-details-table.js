exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('user_details', {
        userd_id: {
            type: 'serial',
            primaryKey: true,
        },
        google_id: {
            unique: true,
            type: 'string',
            notNull: true,
        },
        user_fname: {
            type: 'text',
            notNull: true,
        },
        user_lname: {
            type: 'text',
            notNull: true,
        },
        user_image: {
            type: 'text',
            notNull: true,
        },
        user_email: {
            type: 'text',
            notNull: true,
        }
    })
};

exports.down = (pgm) => {

};