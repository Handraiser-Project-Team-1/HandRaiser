const express = require("express");
socketio = require('socket.io');
const http = require('http');
const massive = require("massive");
const cors = require("cors");
const secret = process.env.REACT_APP_SECRET_KEY
const user = require("./controllers/user/user")
const admin = require("./controllers/admin/admin")
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
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
  const server = http.createServer(app);
  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    console.log('we have a new connection!');

    socket.on('join', ({ name, room }, callback) => {
      console.log(name, room);
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room` })
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });
      socket.join(user.room);
    })

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if (user) {
        io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
      }
    })

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data)
    })

    socket.on('not typing', (data) => {
      socket.broadcast.emit('typing', data)
    })

  })

  app.set("db", db);
  app.use(express.json());
  app.use(cors());

  app.post('/api/users/', user.createUsers)
  app.get('/api/users', user.getUsers)
  app.get('/api/protected/data',
    function (req, res) {
      const db = req.app.get('db')

      if (!req.headers.authorization) {
        return res.status(401).end();
      }

      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret);
        res.status(200).json({ data: 'here is the protected data.', token: token });
      } catch (err) {
        console.log(err)
        res.status(500).end()
      }
    });

  app.patch('/api/user', user.setUserType); //<-- this is for initial login authentication
  app.post('/api/key', user.sendUserKey); //<-- this is for sending key to the users
  app.get('/api/keyList', user.getKeyList);

  app.get('/api/admin', admin.getAdminPass);
  app.patch('/api/admin', admin.updatePass);
  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
