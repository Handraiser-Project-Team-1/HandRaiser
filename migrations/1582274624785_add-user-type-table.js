exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('user_type', {
        user_id: {
            type: 'serial',
            primaryKey: true,
        },
        userd_id: {
            type: 'integer',
            references: 'user_details',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            notNull: true,
            onDelete: "cascade"
        },
        user_type: {
            type: 'text',
            notNull: true
        }
    })   
};
exports.down = (pgm) => {

};