import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";

import Avatar from "./img/users.png";
import LoginButton from "./Login";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "5%",
    "@media (max-width: 768px)": {
      padding: "50%"
    },
    "@media (max-width: 1024px)": {
      display: "flex",
      padding: "5%"
    }
  },
  card: {
    width: "40%;",
    height: "80vh",
    "@media (max-width: 768px)": {
      width: "50%",
      height: "76vh"
    },
    "@media (max-width: 1024px)": {
      width: "70%"
    },
    "@media (max-width: 320px)": {
      width: "100vh"
    }
  },
  rectangle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "45%;",
    height: "78vh",
    backgroundColor: "#42B0FF",
    webkitTransform: "rotate(45deg)",
    moztransform: " rotate(45deg)",
    oTransform: "rotate(45deg)",
    msTransform: "rotate(45deg)",
    transform: "rotate(28deg)",
    "@media (max-width: 768px)": {
      display: "flex",
      width: "45%",
      height: "76vh"
    },
    "@media (max-width: 320px)": {
      width: "0%"
    }
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "50vh",
    width: "55%",
    marginTop: "30%",
    "@media (max-width: 320px)": {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    "@media (max-width: 768px)": {
      display: "flex",
      justifyContent: "center"
    }
  },

  avatar: {
    height: "29%",
    width: "35%",
    "@media (max-width: 768px)": {
      width: "50%"
    },
    "@media (max-width: 320px)": {
      width: "35%"
    }
  },
  button: {
    padding: "10%"
  },
  buttonGroup: {
    padding: "5%"
  }
});

export default function LoginInterface() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Card className={classes.card}>
          <Grid container spacing={3}>
            <div className={classes.rectangle}></div>
            <div className={classes.container}>
              <img src={Avatar} alt="" className={classes.avatar} />
              <Typography variant="h3">Sign In</Typography>
              <Typography variant="subtitle1">
                with your boom.camp account
              </Typography>

              <div className={classes.button}>
                <LoginButton />
              </div>
            </div>
          </Grid>
        </Card>
      </div>
    </>
  );
}
