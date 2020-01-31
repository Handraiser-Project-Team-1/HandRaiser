import React from "react";
import Layout from "../includes/TopBar";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NeedHelp from "./NeedHelp";
import BeingHelp from "./BeingHelp";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  widget: {
    padding: theme.spacing(1)
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
        <Grid item container spacing={1}>
          <Grid xl={2} lg={2} xs={6} item>
            <Paper elevation={0} className={classes.widget}>
              <Typography variant="subtitle1" gutterBottom>
                In Que
              </Typography>
              <Typography variant="h4" gutterBottom>
                <Box textAlign="center" m={1}>
                  3
                </Box>
              </Typography>
            </Paper>
          </Grid>
          <Grid xl={2} lg={2} xs={6} item>
            <Paper elevation={0} className={classes.widget}>
              <Typography variant="subtitle1" gutterBottom>
                Your Position
              </Typography>
              <Typography variant="h4" gutterBottom>
                <Box textAlign="center" m={1}>
                  1
                </Box>
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={6} md={6}>
          <Paper elevation={0} className={classes.root}>
            <Typography
              variant="h6"
              style={{ fontWeight: "500", padding: "6px" }}
              gutterBottom
            >
              Que
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
