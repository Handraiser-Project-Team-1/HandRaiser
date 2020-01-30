import React from "react";
import Layout from "../includes/TopBar";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NeedHelp from "./NeedHelp";
import BeingHelp from "./BeingHelp";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  paddingBread: {
    paddingTop: theme.spacing(2)
  }
}));

export default function Que(props) {
  const classes = useStyles();
  return (
    <Layout {...props}>
      <Grid container spacing={1}>
        <Grid container>
          <div style={{ paddingBottom: "15px" }} />
        </Grid>

        <Grid item xs={12} lg={6} md={6}>
          <Paper elevation={0} className={classes.root}>
            <Typography
              variant="h6"
              style={{ fontWeight: "500", padding: "6px" }}
              gutterBottom
            >
              In Que
            </Typography>
            <NeedHelp />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <Paper elevation={0} className={classes.root}>
            <Typography
              variant="h6"
              style={{ fontWeight: "500", padding: "6px" }}
              gutterBottom
            >
              Current
            </Typography>
            <BeingHelp />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
