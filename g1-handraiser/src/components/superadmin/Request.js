import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid, Paper, Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CustomizedSelects from "./includes/FormSelect";
import Button from "@material-ui/core/Button";

export default function Request() {
  const [list, setList] = useState([]);
  const [pending, setPending] = useState([]);
  const [type, setType] = useState("");

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
      method: 'GET'
    })
    .then(response => {
      window.open(
        response.data,
        "Request Permission",
        "width=1000, height=700, left=500, top=170"
      );
    })
    .catch(error => {
      console.error(error);
    })
  }

  const submit = val => {
    Axios.post(`${process.env.REACT_APP_DB_URL}/api/key`, {
      id: val,
      type: type
    })
    .then(res => {
      getUserFn();
      pendingList();
    })
    .catch(error => {
      //console.error(err.response.data.error)
      let err = String(error).match(/\w+$/g).join();
      if(err === '400'){
        permissionFn();
        return;
      }
      console.error(error);
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Paper elevation={0}>
          <Typography variant="h6" style={{ padding: 10, paddingLeft: 20 }}>
            Request List
          </Typography>
          <List>
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
                  <ListItemSecondaryAction>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <CustomizedSelects
                          stat={val.user_type}
                          setType={setType}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => submit(val.userd_id)}
                          disabled={
                            type === "pending" || type === "" ? true : false
                          }
                        >
                          Send Key
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            {list.length === 0 ? (
              <Typography variant="h6" style={{ padding: 10, paddingLeft: 20 }}>
                0
              </Typography>
            ) : (
              false
            )}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0}>
          <Typography variant="h6" style={{ padding: 10, paddingLeft: 20 }}>
            Pending Accounts
          </Typography>
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
                <ListItemText primary={val.key_type} secondary={val.key} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {pending.length === 0 ? (
            <Typography variant="h6" style={{ padding: 10, paddingLeft: 20 }}>
              0
            </Typography>
          ) : (
            false
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
