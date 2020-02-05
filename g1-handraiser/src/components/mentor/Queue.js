import React from "react";
import TopBar from "../includes/TopBar";
import QueueCounter from "./includes/QueueCounter";
import QueueViewer from "./includes/QueueViewer";
import StudentList from "./includes/StudentList";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BeingHelp from "./includes/BeingHelp";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function Queue(props) {
  const classes = useStyles();
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
    </TopBar>
  );
}
