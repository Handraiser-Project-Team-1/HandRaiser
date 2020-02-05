import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import Img from "./img/undraw_security_o890.svg";
import { FormHelperText } from "@material-ui/core";

import axios from "axios";
import { useHistory } from "react-router-dom";
import Notification from "../includes/Notif";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    padding: "5%"
  },
  card: {
    padding: "5%",
    width: "30%",
    height: "20%",
    backgroundColor: "#fafafa",
    "@media (max-width: 320px)": {
      width: "100%"
    }
  },
  button: {
    display: "flex",
    backgroundColor: "#42B0FF",
    color: "#fff",
    marginLeft: "40%",
    "@media (max-width: 320px)": {
      marginLeft: "34%"
    },
    "@media (max-width: 768px)": {
      marginLeft: "30%"
    }
  },
  img: {
    height: "30%",
    width: "50%",
    marginLeft: "25%",
    "@media (max-width: 320px)": {
      height: "50%",
      width: "50%"
    }
  },
  typography: {
    display: "flex",
    textAlign: "center",
    marginLeft: "8%"
  },
  textfield: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    marginLeft: "25%"
  }
});
function Keyauth() {
  const classes = useStyles();
  const history = useHistory();
  const [key, setKey] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  const [notif, setNotif] = useState(false);
  const [notifType, setNotifType] = useState(false);

  const onChangeFn = e => {
    setKey(e.target.value);
    if (e.target.value.length === 5) {
      setDisabled(false);
      setError(false);
    } else {
      setDisabled(true);
      setError(true);
    }
  };

  const onSubmitFn = e => {
    e.preventDefault();
    let tokenObj = localStorage.getItem("tokenid");
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_DB_URL}/api/user`,
      data: { key: key, token: tokenObj }
    })
    .then(response => {
      if(tokenObj !== null){
        setTimeout(() => {
          (response.data.type === 'mentor')
            ? history.push("/queue")
            : history.push("/classes");
        }, 1000);
      }else{
        history.push('/')
      }
    })
    .catch(error => {
      let errorCode = String(error)
        .match(/\w+$/g)
        .join();
      if (Number(errorCode) === 401) {
        setNotif(true);
        setNotifType(true);
      } else if (Number(errorCode) === 403) {
        //wrong token redirect to login
        localStorage.removeItem("tokenid");
        history.push("/login");
      } else {
        console.error(error);
        setNotif(true);
        setNotifType(false);
      }
    });
  };

  return (
    <>
      {notif && notifType ? (
        <Notification
          type="error"
          title="Wrong Authentication Code"
          message="Kindly check again the code in your email"
          open={notif}
          setOpen={setNotif}
        />
      ) : (
        <Notification
          type="error"
          title="Something's wrong"
          message="Please try again later."
          open={notif}
          setOpen={setNotif}
        />
      )}
      <div className={classes.root}>
        <Card className={classes.card}>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <form onSubmit={onSubmitFn}>
              <Grid item xs={12} sm={12}>
                <img src={Img} alt="" className={classes.img} />{" "}
                <Typography variant="h6" className={classes.typography}>
                  Enter the verification code we sent to your email!
                </Typography>
                <TextField
                  className={classes.textfield}
                  id="standard-basic"
                  size="small"
                  margin="normal"
                  variant="outlined"
                  name="key"
                  onChange={onChangeFn}
                  error={error}
                />
                {error && (
                  <FormHelperText
                    error={true}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "8px"
                    }}
                  >
                    Authentication key must be 5 characters.
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  disabled={disabled}
                  type="submit"
                  variant="contained"
                  className={classes.button}
                >
                  Proceed
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </div>
    </>
  );
}

export default Keyauth;
