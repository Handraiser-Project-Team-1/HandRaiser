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
  // ListItemText,
  DialogContent,
  Badge,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Grid } from "@material-ui/core";
import UserType from "./UserType";
// import Paper from "@material-ui/core/Paper";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Notification from "../../includes/Notif";
// import { fontSize } from "@material-ui/system";
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
  const [openR, setOpenR] = useState(false);
  const [names, setNames] = useState([]);
  const [notif, setNotif] = useState(false);
  const [notifDetails, setNotifDetails] = useState({
    type: "",
    title: "",
    message: ""
  });

  const getUserFn = () => {
    axios.get(`${process.env.REACT_APP_DB_URL}/api/users`).then(res => {
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
    // eslint-disable-next-line
  }, []);

  const closeAdd = () => {
    setOpenR(false);
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
  const request = () => {
    setOpenR(true);
  };
  return (
    <React.Fragment>
      <div style={{ padding: "40px" }}>
        <Badge badgeContent={names.length} color="secondary">
          <NotificationsIcon />
        </Badge>
        <Button color="primary" onClick={request}>
          Login Requests
        </Button>{" "}
      </div>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={openR}
        className={classes.root}
      >
        <Notification
          type={notifDetails.type}
          title={notifDetails.title}
          message={notifDetails.message}
          open={notif}
          setOpen={setNotif}
        />
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
        <DialogContent dividers>
          <Grid container>
            <List className={classes.list}>

              {(names.length !== 0) ? names.map((x, id) => {
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
              }): <Typography>No Login Requests this time</Typography>}
            </List>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
