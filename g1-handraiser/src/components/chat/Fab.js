import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ChatIcon from "@material-ui/icons/Chat";
import DialogBox from "./DialogBox";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fa: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(12)
  }
}));

export default function Chat() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <DialogBox handleClose={handleClose} open={open} />
      <Fab
        aria-label="add"
        className={classes.fab}
        color="primary"
        onClick={handleClickOpen}
        open={open}
      >
        <ChatIcon />
      </Fab>
    </React.Fragment>
  );
}
