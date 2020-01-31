import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import Img from "../login/img/undraw_pair_programming_njlp.svg";
import Avatar from "../login/img/users.png";
import Notif from "../includes/Notif";

const useStyles = makeStyles(theme => ({
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
    color: "#494949",
    "@media (max-width: 425px)": {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    "@media(max-width: 768px)": {
      display: "flex",
      alignItems: "center"
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
    width: "50  %",
    backgroundColor: "#42B0FF",
    color: "#fff"
  },
  groupbtn: {
    padding: "5%"
  },
  welcome: {
    "@media (max-width: 320px)": {
      fontSize: "25px"
    },
    "@media (max-width: 768px)": {
      fontSize: "30px"
    }
  }
}));

export default function Welcome(props) {
  const [notif, setNotif] = useState(false);
  const classes = useStyles();
  let history = useHistory();
  const { keys } = props;
  localStorage.setItem("key", keys);
  const [key, setKey] = useState();

  const submit = () => {
    if (localStorage.getItem("key") === key.key) {
      history.push("/admin");
    } else {
      setNotif(true);
    }
  };

  const handlechange = e => {
    let prevdata = Object.assign({}, key);
    prevdata[e.target.name] = e.target.value;
    setKey(prevdata);
  };
  return (
    <React.Fragment>
      <Notif
        type="error"
        message="Wrong key, Admin!"
        open={notif}
        setOpen={setNotif}
      />
      <div className={classes.root}>
        <Card className={classes.card}>
          <Grid container spacing={2}>
            <div className={classes.rectangle}>
              <img src={Img} alt="/" className={classes.image} />
            </div>
            <Grid item className={classes.container}>
              <img src={Avatar} alt="" className={classes.avatar} />
              <Typography variant="h4" className={classes.welcome}>
                WELCOME ADMIN!
              </Typography>
              <Typography variant="subtitle1">
                Insert the admin key here
              </Typography>
              <TextField
                name="key"
                onChange={handlechange}
                required
              ></TextField>
              <div className={classes.groupbtn}>
                <Button
                  onClick={submit}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  Proceed to Admin
                </Button>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </React.Fragment>
  );
}
