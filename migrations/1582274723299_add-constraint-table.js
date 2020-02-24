exports.shorthands = undefined;
exports.up = pgm => {	
    pgm.addConstraint("student", "mentor", {		
        foreignKeys: {			
            columns: "user_id",			
            references: "user_type",			
            onDelete: "cascade"		
        }	
    });
};
exports.down = pgm => {};