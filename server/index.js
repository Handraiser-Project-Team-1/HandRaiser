const express = require("express");
const massive = require("massive");
const cors = require("cors");
const secret = process.env.REACT_APP_SECRET_KEY
const user = require("./controllers/user/user")
require('dotenv').config()
// console.log(process.env)
massive({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.USERS,
  password: process.env.PASSWORD
}).then(db => {
  const app = express();
  app.set("db", db);
  app.use(express.json());
  app.use(cors());

  app.post('/api/users/', user.createUsers)
  app.get('/api/users', user.getUsers)
  app.get('/api/protected/data',
        function(req, res){
            const db = req.app.get('db')

            if(!req.headers.authorization){
                return res.status(401).end();
            }

            try{
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, secret);
                res.status(200).json({ data: 'here is the protected data.', token: token});
            }catch(err){
                console.log(err)
                res.status(500).end()
            }
  });

  app.patch('/api/user', user.setUserType); //<-- this is for initial login authentication
  app.post('/api/key', user.sendUserKey); //<-- this is for sending key to the users
  app.get('/api/keyList', user.getKeyList);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
