import React from "react";
import TopBar from "../includes/TopBar";
import { Grid } from "@material-ui/core";
import QueueContainer from "./includes/QueueCounter";
import QueueViewer from "./includes/QueueViewer";

export default function Queue(props) {
  return (
    <TopBar active={props.active}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <QueueContainer />
        </Grid>
        <Grid item xs={9}>
          <QueueViewer />
        </Grid>
      </Grid>
    </TopBar>
  );
}
