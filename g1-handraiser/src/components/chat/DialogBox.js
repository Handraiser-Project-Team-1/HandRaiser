import React, { useState } from "react";
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

let room = Math.floor(Math.random() * Math.floor(20000));

export default function DialogBox({ handleClose, open }) {
  const [message, setMessage] = useState("");

  if (!socket) {
    socket = io(":3001");
  }
  socket.emit("room", room);

  socket.on("message", function(data) {
    console.log("Incoming message:", data);
  });

  const handleClick = () => {};

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
        <DialogTitle id="alert-dialog-title">
          {"Mentor: Daniel Nebreja"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContainer />
        </DialogContent>
        <DialogActions>
          <Type setMessage={setMessage} />
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
