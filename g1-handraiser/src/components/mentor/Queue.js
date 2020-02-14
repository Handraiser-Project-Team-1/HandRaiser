import TopBar from "./TopBar";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QueueCounter from "./includes/QueueCounter";
import QueueViewer from "./includes/QueueViewer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BeingHelp from "../includes/BeingHelp";
import Chat from "../chat/Fab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paddingBread: {
    marginBottom: theme.spacing(2)
  }
}));

export default function Queue(props) {
  let history = useHistory();
  const classes = useStyles();

  // useEffect(() => {
  //   if (localStorage.getItem("tokenid")) {
  //     Axios({
  //       method: "get",
  //       url: `${process.env.REACT_APP_DB_URL}/api/type/${localStorage.getItem(
  //         "uid"
  //       )}`
  //     }).then(res => {
  //       res.data.map(x => {
  //         if (x.user_type === "mentor") {
  //           history.push("/queue");
  //         } else if (x.user_type === "student") {
  //           history.push("/classes");
  //         }
  //         return x;
  //       });
  //     });
  //   }
  // }, [history]);

  return (
    <TopBar active={props.active}>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
          <Grid item>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              className={classes.paddingBread}
            >
              <Link color="inherit" href="#">
                Material-UI
              </Link>
              <Link color="inherit" href="#">
                Core
              </Link>
              <Typography color="textPrimary">Breadcrumb</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
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
