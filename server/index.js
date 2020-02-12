const express = require("express");
const http = require("http");
const massive = require("massive");
const cors = require("cors");
const secret = process.env.REACT_APP_SECRET_KEY;
const user = require("./controllers/user/user");
const admin = require("./controllers/admin/admin");
const mentor = require("./controllers/mentor/mentor");
const { addUser, removeUser, getUser } = require("./users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const email = require("./controllers/email/email");
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
  const io = require("socket.io").listen(server);

  io.on("connection", socket => {
    console.log("we have a new connection!");

    socket.on('join', function ({ name, sessionId }) {
      if (sessionId == null) {
        var session_id = '101';
        const { user } = addUser({ id: socket.id, name, room: session_id });
        socket.join(user.room, function (res) {
          socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcome to the room`
          });
          console.log("joined successfully ")
          socket.emit("set-session-acknowledgement", { sessionId: session_id })
        })
      } else {
        socket.room = sessionId;
        const { user } = addUser({ id: socket.id, name, room: socket.room });
        socket.join(user.room, function (res) {
          socket.emit("message", {
            user: "admin",
            text: `${name}, welcome to the room`
          });
          console.log("joined successfully ")
          socket.emit("set-session-acknowledgement", { sessionId: sessionId })
        })
      }
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: "admin",
          text: `${user.name} has left.`
        });
      }
    });

    socket.on("typing", data => {
      socket.broadcast.emit("typing", data);
    });

    socket.on("not typing", data => {
      socket.broadcast.emit("typing", data);
    });
  });

  app.set("db", db);
  app.use(express.json());
  app.use(cors());

  app.post("/api/users/", user.createUsers);
  app.get("/api/users", user.getUsers);
  app.post("/api/user", user.getUser);
  app.get("/api/protected/data", function (req, res) {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);
      res
        .status(200)
        .json({ data: "here is the protected data.", token: token });
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  });

  app.patch("/api/user", user.setUserType); //<-- this is for initial login authentication
  app.post("/api/key", user.sendUserKey); //<-- this is for sending key to the users
  app.get("/api/keyList", user.getKeyList);
  app.get("/permission", email.permission); //<-- google permission for sending email
  app.get("/getAccessToken", email.fetchToken);

  app.get("/api/admin", admin.getAdminPass);
  app.post("/api/login", admin.login);
  app.patch("/api/admin", admin.updatePass);

  //new endpoint
  app.get("/api/all/users", user.getAllUsers);
  app.patch("/api/change/type/:id", user.changeType);
  app.delete("/api/delete/user/:id", user.delete);
  app.get("/api/count/keys", user.countTableUserType);

  app.post("/api/create/class/:id", mentor.addClass);
  app.get("/api/mentor/class/:id", mentor.getClass);
  app.delete("/api/delete/class/:id", mentor.removeClass);
  app.patch("/api/update/class/status/:id", mentor.updateStatus);

  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
