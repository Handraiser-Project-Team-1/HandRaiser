import React from "react";
import TopBar from "../includes/TopBar";
import { Grid } from "@material-ui/core";
import QueueContainer from "./includes/QueueCounter";
import QueueViewer from "./includes/QueueViewer";
import StudentList from "./includes/StudentList";

export default function Queue(props) {
  return (
    <TopBar active={props.active}>
      <Grid container spacing={2}>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <QueueContainer />
            </Grid>
            <Grid item xs={12}> 
              <StudentList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <QueueViewer />
        </Grid>
      </Grid>
    </TopBar>
  );
}
