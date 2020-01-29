import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import GoogleIcon from "./img/googles.png";
import { CircularProgress } from "@material-ui/core";

import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    display: "flex",
    marginLeft: "13%",
    width: "70%",
    backgroundColor: "#42B0FF",
    color: "#fff",
    "@media (max-width: 768px)": {
      marginLeft: "1%",
      minWidth: "100%"
    },
    "@media (max-width: 320px)": {
      width: "95%"
    },
    "&:hover": {
      background: "#5090d4"
    }
  },
  google: {
    width: "15%",
    "@media (max-width: 768px)": {
      width: "15%"
    },
    "@media (max-width: 320px)": {
      width: "15%"
    }
  }
});
function Login() {
  const history = useHistory();
  const classes = useStyles();

  const [userDetails, setUserDetails] = useState({});
  const [login, setLogin] = useState(false);

  const responseGoogle = response => {
    axios({
      method: "POST",
      url: "http://localhost:port/",
      data: {
        userData: {
          ...userDetails,
          token_type: response.tokenObj.token_type,
          access_token: response.tokenObj.access_token
        }
      }
    })
      .then(() => {
        setLogin(true);
      })
      .then(() => {
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch(error => {
        //show notif
      });
  };

  const responseGoogleFail = response => {
    console.error(response.error);
  };

  return !login ? (
    <GoogleLogin
      render={renderProps => (
        <Button
          className={classes.button}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          variant="contained"
        >
          <img className={classes.google} src={GoogleIcon} alt="/" />
          Login with Google
        </Button>
      )}
      clientId="566271695022-d3jfkv7cmqq6c6unto7bvb7q2osl7hii.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogleFail}
      isSignedIn={true}
      cookiePolicy={"single_host_origin"}
    />
  ) : (
    <CircularProgress variant="indeterminate" />
  );
}

export default Login;
