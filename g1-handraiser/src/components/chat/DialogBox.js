import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Type from "./Type";
import DialogContainer from "./DialogContainer";
import SendIcon from "@material-ui/icons/Send";
import io from "socket.io-client";
import Axios from "axios";

let socket;
// let user = "mark" + Math.floor(Math.random() * Math.floor(20000));

export default function DialogBox({ handleClose, open }) {
  const [state, setState] = useState(1);
  const [uname, setName] = useState('')
  const [image, setImage] = useState('')
  // const [room] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setmessage] = useState('')
  const [feedback, setFeedbAck] = useState('')
  const ENDPOINT = process.env.REACT_APP_DB_URL;

  const handleClick = () => {
    setState(state + 1);
    if (message) {
      const nottyping = "";
      socket.emit("sendMessage", ({message, image}), () => setmessage(""));
      socket.emit("not typing", nottyping);
    }
  };

  // useEffect(() => {
  //   socket = io(ENDPOINT)
  //   console.log(name);
  //   console.log(socket);
  //   socket.emit('join', { name, room });
  // }, [ENDPOINT, name, room])

  useEffect(() => {
    socket = io(ENDPOINT)
    console.log(socket);
    const uid = localStorage.getItem('uid')
    let session_id;

    let data = sessionStorage.getItem('sessionId');
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_DB_URL}/api/user`,
      data: { tokenObj: localStorage.getItem("tokenid") }
    }).then(res => {
      const dataName = [];
      const dataImage = [];
      res.data.map(x => {
        dataName.push(x.user_fname)
        dataImage.push(x.user_image)
        return x
      });
   
      const named = dataName.join()
      const imaged = dataImage.join()
      setName(named)
      setImage(imaged)
      if (data == null) {
        session_id = null
        socket.emit('join', { name: named, sessionId: session_id, uid })
      } else {
        console.log('show prev '+data)
        session_id = data
        socket.emit('join', { name: named, sessionId: session_id, uid })
      }
    });
  }, [ENDPOINT])

  useEffect(() => {
    socket.on("set-session-acknowledgement", function (data) {
      sessionStorage.setItem('sessionId', data.sessionId);
    })
  })

  useEffect(() => {
    
    socket.on("set-old-messages", msgs => {
      const {sessionId, msg} = msgs;
      sessionStorage.setItem('sessionId', sessionId);
      setMessages(msg)
    })
  },[])

  useEffect(() => {
    socket.on("typing", data => {
      setFeedbAck(`${data}`);
    });

    socket.on("not typing", data => {
      setFeedbAck(data);
    });

    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  const keypress = (data) => {
    socket.emit('typing', data + ' is typing...');
  }
  useEffect(() => {
    const msg = message;
    if (msg.length > 0) {

    } else {
      typing()
    }
  });

  const typing = () => {
    const nottyping = "";
    socket.emit("not typing", nottyping);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="paper"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{sessionStorage.getItem('sessionId')}</DialogTitle>
        <DialogContent dividers>
          <DialogContainer
            message={message}
            feedback={feedback}
            messages={messages}
            name={uname}
            open={open}
            state={state}
            image={image}
          />
        </DialogContent>
        <DialogActions>
          <Type
            message={message}
            setmessage={setmessage}
            name={uname}
            keypress={keypress}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon>send</SendIcon>}
            onClick={() => handleClick()}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
