import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, Card } from "antd";
import NeedHelp from "./NeedHelp";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    color: theme.palette.text.secondary,
    height: "150%"
  },
  card: {
    display: "flex"
  }
}));
function Position() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography>Position</Typography>
              <Typography>12</Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              {" "}
              <Typography>Being Help</Typography>
              <Typography>Mark Medes</Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography>In Que</Typography>
              <Typography>12</Typography>
            </Paper>
          </Grid>
          <Grid container spacing={3}>
            {/* <Card className={classes.card}>
              {" "}
              <NeedHelp />
            </Card> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Position;
