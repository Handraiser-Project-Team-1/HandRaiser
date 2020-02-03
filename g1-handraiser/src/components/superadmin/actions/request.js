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
import { Grid } from '@material-ui/core';
import UserType from './UserType';

import Notification from '../../includes/Notif';
require('dotenv').config()

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
    width: "15%",
    marginRight: "10px"
  },
  dialogTitle: {
    background: '#6cb1fd', 
    color: '#fff',
  },
  closeIcon: {
    color: '#fff',
    position: 'absolute',
    right: theme.spacing(1),
  }
}));

export default function Request(props) {
  const classes = useStyles();
  const { open, setOpen, setLoginReqBadge } = props;
  const [names, setNames] = useState([]);
  const [notif, setNotif] = useState(false);
  const [notifDetails, setNotifDetails] = useState({
    type: '',
    title: '',
    message: '',
  })

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
      setLoginReqBadge(temp.length);
    });
  }

  useEffect(() => {
    getUserFn();
    // eslint-disable-next-line
  }, []);

  const closeAdd = () => {
    setOpen(false);
  };

  const setNotifDetailsFn = (type,title,message) => {
    setNotifDetails({
      type: type,
      title: title,
      message: message,
    })
  }

  const openNofif = () => {
    setNotif(true);
  }
  
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
        <Button color="secondary" className={classes.closeIcon} onClick={closeAdd}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
        >
          <List >
              {names.map((x, id)=>{
                  return(
                      <ListItem key={id}>
                          <img alt={x.image} src={x.image} className={classes.pic}/>
                          <ListItemText>
                              {x.lname}, {x.fname}
                          </ListItemText>
                          <UserType setNotifDetailsFn={setNotifDetailsFn} openNofif={openNofif} getUserFn={getUserFn} userid={x.uid}/>
                      </ListItem>
                  )
              })}
          </List>
        </Grid> 
      </DialogContent>
      {/* </Container> */}
    </Dialog>
  );
}
