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
    backgroundColor: "#fff ",
    "@media (max-width: 768px)": {
      marginLeft: "1%",
      minWidth: "100%"
    },
    "@media (max-width: 320px)": {
      width: "95%"
    },
    "&:hover": {
      background: "#fff"
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

  const [login, setLogin] = useState(false);

  const responseGoogle = response => {
    setLogin(true);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DB_URL}/api/users`,
      data: {
        userData: {
          ...response.profileObj
        }
      }
    })
      .then(response => {
        console.log(response);
        setTimeout(() => {
          if (response.status === 200) {
            console.log(response);
            response.data.user_type === "mentor"
              ? history.push("/myclasslist")
              : history.push("/classes");
          } else {
            history.push("/authentication");
          }
        }, 2000);
        localStorage.setItem("id", JSON.stringify(response.data.userd_id));
        localStorage.setItem("uid", JSON.stringify(response.data.user_id));
      })
      .then(() => {
        let token = {
          type: response.tokenObj.token_type,
          token: response.tokenObj.id_token
        };
        localStorage.setItem("tokenid", JSON.stringify(token));
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
          component="span"
          variant="outlined"
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
