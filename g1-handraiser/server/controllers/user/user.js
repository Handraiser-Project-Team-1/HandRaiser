const argon2 = require('argon2');
const secret = process.env.REACT_APP_SECRET_KEY
const jwt = require('jsonwebtoken');

module.exports = {
    createUsers: (req, res) => {
        const db = req.app.get('db')
        const { userData } = req.body;
        db.user_details
        .findOne({
            google_id: userData.googleId
        },{
            fields: ["userd_id", "google_id", "user_fname", "user_lname", "user_email", "user_image"]
        })
        .then(user => {
            if(!user){
                db.user_details
                .insert({
                    google_id: userData.googleId,
                    user_fname: userData.givenName,
                    user_lname: userData.familyName,
                    user_email: userData.email,
                    user_image: userData.imageUrl,
                    user_type: [{
                        userd_id: undefined,
                        user_type: 'pending'
                    }]
                },{
                    deepInsert: true,
                },{
                    fields: ["google_id", "user_fname", "user_lname", "user_email", "user_image"]
                })
                .then(createdUser => {
                    res.status(201).send(createdUser);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).end();
                })
            }else{
                db.user_type
                .findOne({
                    userd_id: user.userd_id
                },{
                    fields: ["user_type"]
                })
                .then(fetchedUserType => {
                    switch (fetchedUserType.user_type) {
                        case 'mentor':
                            res.status(200).send({ ...user, ...fetchedUserType})
                            break;
                        case 'student':
                            res.status(200).send({ ...user, ...fetchedUserType})
                            break;
                        default:
                            res.status(206).send({ ...user, ...fetchedUserType})
                            break;
                    }
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).end();
                })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).end();
        })

    },
    getUsers: (req, res)=>{
        db = req.app.get('db')
        db.user_details
        .find()
        .then(u => res.status(200).json(u))
        .catch(err => {
            console.log(err);
            res.status(500).end();
        });
    },
    setUserType: (req, res) => {
        db = req.app.get('db');
        const { key } = req.body;
    }
}