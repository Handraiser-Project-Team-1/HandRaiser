import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import Img from "./img/undraw_pair_programming_njlp.svg";
import Avatar from "./img/users.png";
import LoginButton from "./Login";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "5%",
    backgroundColor: "#fafafa",
    "@media (max-width: 768px)": {
      padding: "50%"
    },
    "@media (max-width: 1024px)": {
      display: "flex",
      padding: "5%"
    }
  },
  card: {
    width: "80%",
    height: "80vh",

    "@media (max-width: 768px)": {
      minWidth: "90%",
      minHeight: "50vh"
    },
    "@media (max-width: 1024px)": {
      width: "100%"
    },
    "@media (max-width: 320px)": {
      width: "100vh"
    }
  },
  rectangle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "60%;",
    height: "82vh",
    backgroundColor: "#42B0FF",
    opacity: ".8",
    "@media (max-width: 768px)": {
      width: "50%",
      minHeight: "76vh"
    },
    "@media (max-width: 425px)": {
      width: "0%"
    }
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "70vh",
    width: "40%",
    marginTop: "15%",

    "@media (max-width: 425px)": {
      display: "flex",
      width: "90%",
      justifyContent: "center",
      alignItems: "center"
    },
    "@media(max-width: 768px)": {
      display: "flex",
      alignText: "center",
      justifyContent: "center",

      marginTop: "10%"
    }
  },

  avatar: {
    height: "29%",
    width: "35%",
    "@media (max-width: 768px)": {
      width: "50%"
    },
    "@media (max-width: 320px)": {
      width: "55%"
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
            <div className={classes.rectangle}>
              <img src={Img} alt="/" className={classes.image} />
            </div>
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
