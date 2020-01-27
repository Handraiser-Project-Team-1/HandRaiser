import React from "react";
import TopBar from "../includes/TopBar";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";

export default function ClassSelect(props) {
  return (
    <TopBar active={props.active}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Skeleton variant="rect" width="100%" height="100vh" />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rect" width="100%" height="100vh" />
        </Grid>
      </Grid>
    </TopBar>
  );
}
