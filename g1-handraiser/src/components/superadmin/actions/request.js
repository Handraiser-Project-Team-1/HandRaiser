import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  //Container,
  Button,
  DialogTitle,
  Dialog,
  List,
  ListItem,
  ListItemText,
  DialogContent
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Grid } from "@material-ui/core";
import UserType from "./UserType";
import Paper from "@material-ui/core/Paper";

import Notification from "../../includes/Notif";
import { fontSize } from "@material-ui/system";
require("dotenv").config();

const useStyles = makeStyles(theme => ({
  bot: {
    color: "white",
    margin: "5px",
    border: "none",
    backgroundColor: "grey",
    cursor: "pointer"
  },
  pic: {
    borderRadius: "50%",
    width: "25%",
    marginRight: "10px"
  },
  dialogTitle: {
    background: "#6cb1fd",
    color: "#fff"
  },
  closeIcon: {
    color: "#fff",
    position: "absolute",
    right: theme.spacing(1)
  },
  list: {
    // background: "red"
  },
  root: {
    flexGrow: 1
  },
  grid: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    fontSize: "18px",
    width: 190
  },
  grids: {
    display: "flex",
    alignContent: "center",
    height: "100%"
  }
}));

export default function Request(props) {
  const classes = useStyles();
  const { open, setOpen } = props;
  const [names, setNames] = useState([]);
  const [notif, setNotif] = useState(false);
  const [notifDetails, setNotifDetails] = useState({
    type: "",
    title: "",
    message: ""
  });

  const getUserFn = () => {
    console.log(process.env.REACT_APP_DB_URL, "hi");
    // axios.get(`${process.env.REACT_APP_DB_URL}/api/users`).then(res => {
    axios.get(`http://localhost:3001/api/users`).then(res => {
      var temp = [];
      res.data.map(x => {
        temp.push({
          uid: x.userd_id,
          fname: x.user_fname,
          lname: x.user_lname,
          email: x.user_email,
          image: x.user_image
        });
        return temp;
      });
      setNames(temp);
    });
  };

  useEffect(() => {
    getUserFn();
  }, []);

  const closeAdd = () => {
    setOpen(false);
  };

  const setNotifDetailsFn = (type, title, message) => {
    setNotifDetails({
      type: type,
      title: title,
      message: message
    });
  };

  const openNofif = () => {
    setNotif(true);
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <Notification
        type={notifDetails.type}
        title={notifDetails.title}
        message={notifDetails.message}
        open={notif}
        setOpen={setNotif}
      />
      {/* <Container component="main"> */}
      <CssBaseline />
      <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">
        Login Requests
        <Button
          color="secondary"
          className={classes.closeIcon}
          onClick={closeAdd}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent dividers className={classes.root}>
        <Grid container>
          <List className={classes.list}>
            {names.map((x, id) => {
              return (
                <Grid item key={id}>
                  <ListItem key={id}>
                    <Grid container>
                      <Grid item xs={12} sm={6} className={classes.grid}>
                        <img
                          alt={x.image}
                          src={x.image}
                          className={classes.pic}
                        />
                        {x.lname}, {x.fname}
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.grids}>
                        <UserType
                          setNotifDetailsFn={setNotifDetailsFn}
                          openNofif={openNofif}
                          getUserFn={getUserFn}
                          userid={x.uid}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
              );
            })}
          </List>
        </Grid>
      </DialogContent>
      {/* </Container> */}
    </Dialog>
  );
}
