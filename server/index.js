const express = require("express");
const http = require("http");
const massive = require("massive");
const cors = require("cors");
const secret = process.env.REACT_APP_SECRET_KEY;
const user = require("./controllers/user/user");
const admin = require("./controllers/admin/admin");
const mentor = require("./controllers/mentor/mentor");
const student = require("./controllers/student/student");
const { addUser, removeUser, getUser } = require("./users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const email = require("./controllers/email/email");
const handraise = require("./controllers/handraise/handraise");
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
    console.log("we have a new connection!", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("joinClass", ({class_id}) => {
      socket.class_id = class_id;
      socket.join(class_id);
    })

    socket.on("handraise", ({ student_id, class_id, tag }, callback) => {
      db.tag
      .insert({
        tag
      })
      .then(tagResponse => {
        db.queue
        .insert({
          student_id,
          tag_id: tagResponse.tag_id,
          class_id
        })
        .then(() => {
          handraise.updatedQueueList(class_id,db, data => {
            socket.to(class_id).broadcast.emit('updateQueue', data);
            callback(data);
          })
        }).catch( error => console.error(error));
      })
    });

    socket.on("leaveQueue", ({queue_id,student_id,class_id,tag_id}, callback) => {
      db.queue
        .destroy({
          queue_id,
          student_id
        }).then(() => {
          db.tag.destroy({tag_id})
          handraise.updatedQueueList(class_id,db, data => {
            socket.to(class_id).broadcast.emit('updateQueue', data);
            callback(data);
          })
        })
        .catch( error => console.error(error));
    });

    socket.on("help", ({queue_id, student_id, class_id, mentor_id}, callback) => {
      db.helping.insert({ student_id, mentor_id })
      .then(helping => {
        db.queue.update({ queue_id }, { helping_id: helping.helping_id })
        .then(() => {
          handraise.updatedQueueList(class_id,db, data => {
            socket.to(class_id).broadcast.emit('updateQueue', data);
          })
          handraise.updatedHelpList(class_id,db, data => {
            socket.to(class_id).broadcast.emit('updateHelp', data);
            callback(data);
          })
        }).catch( error => console.error(error));
      }).catch( error => console.error(error));
    });

    socket.on("resolved", ({class_id, student_id, tag_id, mentor_id,queue_id,helping_id}, callback) => {
      db.resolved.insert({class_id, student_id, tag_id, mentor_id})
      .then(resolved => {
        db.queue.destroy({queue_id})
        .then(() => {
          db.helping.destroy({helping_id})
          .then(() => {
            handraise.updatedHelpList(class_id,db, data => {
              socket.to(class_id).broadcast.emit('updateHelp', data);
              callback(data);
            })
          }).catch( error => console.error(error));
        }).catch( error => console.error(error));
      }).catch( error => console.error(error));
    })

    socket.on("join", function({ name, sessionId, uid }) {
      if (sessionId == null) {
        var session_id = "1";
        const { user } = addUser({ id: socket.id, name, room: session_id, uid });
        socket.join(user.room, function(res) {
          socket.emit("message", {
            fname: "admin",
            message: `${user.name}, welcome to the room`
          });
          console.log("joined successfully ");
          socket.emit("set-session-acknowledgement", { sessionId: user.room });
        });
      } else {
        socket.room = sessionId;
        const { user } = addUser({ id: socket.id, name, room: socket.room, uid });
        socket.join(user.room, function(res) {
          db.query(`SELECT user_details.user_image as image, user_details.user_fname as fname, user_details.userd_id as id, sender.message as message FROM user_details inner join sender on user_details.userd_id=sender.userd_id inner join convo on sender.s_id=convo.s_id WHERE convo.class_id=${user.room}`).then(msg => {         
              socket.emit("set-old-messages",{msg, sessionId: sessionId});
          })
          console.log("joined successfully ");
        });
      }
    });

    socket.on("sendMessage", ({message, image}, callback) => {
      const user = getUser(socket.id);
      db.sender.insert({userd_id: user.uid, message: message}).then(sender => {
        db.convo.insert({class_id: user.room, s_id: sender.s_id}).then(convo => {
          io.to(convo.class_id).emit("message", { fname: user.name, message: sender.message, image });
        })
      })
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
  app.get("/api/protected/data", function(req, res) {
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
  app.get("/api/type/:id", user.getType);

  app.post("/api/create/class/:id", mentor.addClass);
  app.get("/api/mentor/class/:id", mentor.getClass);
  app.get("/api/class", mentor.getAllClass);
  app.delete("/api/delete/class/:id", mentor.removeClass);
  app.patch("/api/update/class/status/:id", mentor.updateStatus);

  app.get("/api/class/list", student.getAllClass);
  app.post("/api/class/:id", student.getClass);
  app.post("/api/join/class", student.joinClass);
  app.get("/api/joined/class/:user_id", student.joinedClass);
  app.get("/api/class/accept", student.getAcceptClass)
  app.get("/api/class/accept/:id", student.getAcceptClassDetails)
  app.get("/api/resolved", student.getAllResolved)

  app.get("/api/class/:id/queue", student.queueList);
  app.get("/api/class/:id/help", student.helpList);
  app.get("/api/class/title/:id", mentor.findClass);
  app.get("/api/get/enrollees/:id", mentor.getEnrolles);
  app.patch(
    "/api/update/enrollees/status/:listId/:status",
    mentor.updateEnrolleesStatus
  );
  app.delete("/api/decline/enrollees/:listId", mentor.declineEnrollees);

  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
