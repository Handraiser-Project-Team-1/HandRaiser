exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('keys', {
    key_id: {
      type: 'serial',
      primaryKey: true
    },
    userd_id: {
      type: 'integer',
      references: 'user_details',
      notNull: true,
    },
    key_type: {
      type: 'text',
      notNull: true
    },
    key: {
      type: 'text',
      notNull: true
    }
  })
};

exports.down = (pgm) => {

};
