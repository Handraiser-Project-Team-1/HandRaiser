import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Type from "./Type";
import DialogContainer from "./DialogContainer";
import SendIcon from "@material-ui/icons/Send";
import Axios from "axios";
import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_DB_URL);

export default function DialogBox({ handleClose, open, data }) {
  const [state, setState] = useState(1);
  const [uname, setName] = useState('')
  const [image, setImage] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setmessage] = useState('')
  const [feedback, setFeedbAck] = useState('')

  const handleClick = () => {
    setState(state + 1);
    if (message) {
      const nottyping = "";
      socket.emit("sendMessage", ({ message, image }), () => setmessage(""));
      socket.emit("not typing", nottyping);
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem('id')
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
      session_id = data
      socket.emit('join', { name: named, sessionId: session_id, uid })
    });
  }, [])


  useEffect(() => {
    socket.on("set-old-messages", msgs => {
      const {  msg } = msgs;
      setMessages(msg)
    })
  }, [])

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
        <DialogTitle id="alert-dialog-title">{(data) && data.class_name}</DialogTitle>
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
