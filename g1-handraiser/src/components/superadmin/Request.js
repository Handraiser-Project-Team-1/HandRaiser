import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid, Paper, Divider, ListSubheader } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
import RequestButton from "./includes/RequestButton";
import Notification from "./includes/Notif";
import { Tabs } from "antd";
import { Empty } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  header: {
    background: "#fafafa",
    color: "#000"
  }
}));
export default function Request() {
  const classes = useStyles();
  const { TabPane } = Tabs;
  const [list, setList] = useState([]);
  const [pending, setPending] = useState([]);
  const [notif, setNotif] = useState(false);
  const [notifDetails, setNotifDetails] = useState({
    type: "",
    title: "",
    message: ""
  });

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

  useEffect(() => {
    getUserFn();
    pendingList();
  }, []);

  const getUserFn = () => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/users`)
      .then(res => {
        setList(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const pendingList = () => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/keyList`)
      .then(res => {
        setPending(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const permissionFn = () => {
    Axios({
      url: `${process.env.REACT_APP_DB_URL}/permission`,
      method: "GET"
    })
      .then(response => {
        window.open(
          response.data,
          "Request Permission",
          "width=1000, height=700, left=500, top=170"
        );
        setNotifDetailsFn(
          "warning",
          "Try again",
          `Please try again sending keys!`
        );
        openNofif();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <Grid style={{ padding: 5 }}>
        <Notification
          type={notifDetails.type}
          title={notifDetails.title}
          message={notifDetails.message}
          open={notif}
          setOpen={setNotif}
        />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Request List" key="1">
            <Paper elevation={0} square={false}>
              {/* <Typography
                variant="h6"
                style={{ padding: 10, paddingLeft: 20 }}
              ></Typography> */}
              <List>
                <ListSubheader className={classes.header}>
                  Request List
                </ListSubheader>
                {list.map((val, i) => (
                  <React.Fragment key={i}>
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar alt={`user${i}`} src={val.user_image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${val.user_fname} ${val.user_lname}`}
                        secondary={val.user_email}
                      />
                      <RequestButton
                        key={val.userd_id}
                        val={val}
                        setNotifDetailsFn={setNotifDetailsFn}
                        openNofif={openNofif}
                        permissionFn={permissionFn}
                        getUserFn={getUserFn}
                        pendingList={pendingList}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                {list.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                  false
                )}
              </List>
            </Paper>
          </TabPane>

          <TabPane tab=" Pending Accounts" key="2">
            <Paper elevation={0}>
              <List>
                <ListSubheader className={classes.header}>
                  Pending Accounts
                </ListSubheader>
                {pending.map((val, i) => (
                  <React.Fragment key={i}>
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar alt={`user${i}`} src={val.user_image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${val.user_fname} ${val.user_lname}`}
                        secondary={val.user_email}
                      />
                      <ListItemText
                        primary={val.key_type}
                        secondary={val.key}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                {pending.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                  false
                )}
              </List>
            </Paper>
          </TabPane>
        </Tabs>
      </Grid>
    </>
  );
}
