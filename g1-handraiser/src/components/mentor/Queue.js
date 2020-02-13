import TopBar from "./TopBar";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QueueCounter from "./includes/QueueCounter";
import QueueViewer from "./includes/QueueViewer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BeingHelp from "../includes/BeingHelp";
import Chat from "../chat/Fab";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function Queue(props) {
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("tokenid")) {
      Axios({
        method: "get",
        url: `${process.env.REACT_APP_DB_URL}/api/type/${localStorage.getItem(
          "uid"
        )}`
      }).then(res => {
        res.data.map(x => {
          if (x.user_type === "mentor") {
            history.push("/queue");
          } else if (x.user_type === "student") {
            history.push("/classes");
          }
          return x;
        });
      });
    }
  }, [history]);

  return (
    <TopBar active={props.active}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <Grid item>
                <QueueCounter />
              </Grid>
              <Grid item>
                <BeingHelp />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9}>
            <QueueViewer />
          </Grid>
        </Grid>
      </div>
      <Chat />
    </TopBar>
  );
}
