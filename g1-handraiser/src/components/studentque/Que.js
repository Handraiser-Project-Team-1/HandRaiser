import React from "react";
import Layout from "../includes/TopBar";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NeedHelp from "./NeedHelp";
import BeingHelp from "../includes/BeingHelp";
import Chat from "../chat/Fab";
// import QueueViewer from "../mentor/includes/QueueViewer";
import QueueCounter from "../mentor/includes/QueueCounter";
import Img from "../login/img/undraw_software_engineer_lvl5.svg";
import Help from "./HelpFab";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    flexGrow: 1
  },
  widget: {
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "16vh"
  },

  img: {
    width: 700,
    height: 250,
    opacity: 0.9
  },
  card: {
    display: "flex",
    width: "100%",
    height: 250,
    backgroundColor:
      "-webkit-linear-gradient(to right,#e3f2fd , #C9D6FF)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #E1F5FE, #42A5F5 )" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
  content: {
    flex: "1 0 auto"
  },
  que: {
    padding: "2%"
  },
  help: {
    marginTop: "5%"
  }
}));

export default function Que(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Layout {...props}>
<<<<<<< HEAD
        <Grid container spacing={3}>
          {" "}
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography component="h2" variant="h3">
                Class name here!
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Handraiser
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.img}
              component="img"
              alt="Contemplative Reptile"
              height="220"
              src={Img}
            />
          </Card>
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
            {" "}
            <Card className={classes.que}>
=======
        <Grid container spacing={1}>
          <Grid container>
            <div style={{ paddingBottom: "15px" }} />
          </Grid>
          <Grid item container spacing={1}>
            <Grid xl={2} lg={2} xs={6} item>
              <Paper elevation={0} className={classes.widget}>
                <Typography variant="subtitle1" gutterBottom>
                  In Queue
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
                Queue
              </Typography>
>>>>>>> fdfd80c5bcb89ea9fbc1018a5fb7dc6d4ba0688e
              <NeedHelp />
            </Card>
          </Grid>
        </Grid>
<<<<<<< HEAD
        <Help />
=======
>>>>>>> fdfd80c5bcb89ea9fbc1018a5fb7dc6d4ba0688e
        <Chat />
      </Layout>
    </React.Fragment>
  );
}
