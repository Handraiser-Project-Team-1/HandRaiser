import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Type from "./Type";
import DialogContainer from "./DialogContainer";

export default function DialogBox(props) {
  const { handleClose, open } = props;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="paper"
      >
        <DialogTitle id="alert-dialog-title">
          {"Mentor: Daniel Nebreja"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContainer />
        </DialogContent>
        <DialogActions>
          <Type />
          <Button variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
