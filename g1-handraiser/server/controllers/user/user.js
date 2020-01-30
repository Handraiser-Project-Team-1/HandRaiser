const argon2 = require('argon2');
const secret = process.env.REACT_APP_SECRET_KEY
const jwt = require('jsonwebtoken');

module.exports = {
    createUsers: (req, res) => {
        const db = req.app.get('db')
        const { userData } = req.body;
<<<<<<< HEAD
        
        db.user_details
        .findOne({
            google_id: userData.googleId
        })
        .then( user => {
            if(!user){
                db.user_details
                .insert({
                    google_id: userData.googleId,
                    user_fname: userData.givenName,
                    user_lname: userData.familyName,
                    user_email: userData.email,
                    user_image: userData.imageUrl,
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
                db.UserType
                .findOne({
                    googleId: userData.googleId
                },{
                    fields: ["googleId", "user_type"]
                })
                .then(fetchedUserType => {
                    if(!fetchedUserType){
                        res.status(206).send(fetchedUserType)
                    }else{
                        res.status(200).send({ ...user, ...fetchedUserType});
                    }
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).end();
                })
            }
        })
=======
        try {
            db.user_details.filter(user => user.userd_id === userData.googleId)
        } catch (error) {
            db.user_details
            .insert({
                google_id: userData.googleId,
                user_fname: userData.givenName,
                user_lname: userData.familyName,
                user_image: userData.imageUrl,
                user_email: userData.email,
            },{
                fields: ['userd_id', 'google_id', 'user_fname', 'user_lname', 'user_image', 'user_email']
            })
            .then(u => res.status(200).json(u))
            .catch(err =>{
                console.log(err)
                res.status(500).end()
            })
        }
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
    createType: (req, res) => {
        db = req.app.get('db')
        const {userd_id, user_type} = req.body
        db.user_type
        .insert({
            user_type,
            userd_id: req.params.uid,
        })
        .then(u => res.status(200).json(u))
        .catch(err => {
            console.log(err);
            res.status(500).end();
        });
>>>>>>> g1-develop
    }
}