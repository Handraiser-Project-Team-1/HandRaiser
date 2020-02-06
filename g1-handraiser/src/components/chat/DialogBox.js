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

let socket;
let user = "mark" + Math.floor(Math.random() * Math.floor(20000));

export default function DialogBox({ handleClose, open }) {
  const [state, setState] = useState(1);
  const [name] = useState(user);
  const [room] = useState("Room 101");
  const [messages, setMessages] = useState([]);
  const [message, setmessage] = useState("");
  const ENDPOINT = process.env.REACT_APP_DB_URL;

  const handleClick = () => {
    setState(state + 1);
    if (message) {
      socket.emit("sendMessage", message, () => setmessage(""));
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(name);
    console.log(socket);
    socket.emit("join", { name, room });
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  console.log(message, messages);

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
        <DialogTitle id="alert-dialog-title">{room}</DialogTitle>
        <DialogContent dividers>
          <DialogContainer
            messages={messages}
            name={name}
            open={open}
            state={state}
          />
        </DialogContent>
        <DialogActions>
          <Type message={message} setmessage={setmessage} />
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
