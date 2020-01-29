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

  const [ login, setLogin ] = useState(false);

  const responseGoogle = response => {
    setLogin(true);
    axios({
      method: 'POST',
      url:`${process.env.REACT_APP_DB_URL}/api/users`,
      data: {
        userData:{
          ...response.profileObj,
          token_type: response.tokenObj.token_type,
          id_token: response.tokenObj.id_token,
        }
      }
    })
    .then(response => {
      setTimeout(() => {
        if(response.data.status === '200' || response.data.status === 200){
          //(response.data.userType === 'mentor') ? history.push('/mentor') : history.push('/student');
        }else{
          history.push('/verification');
        }
      }, 3000);
    })
    .then(() => {
      localStorage.setItem('tokenid', response.tokenObj.id_token);
    })
    .catch(error => {
      console.error(error);
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
