import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import GoogleIcon from "./img/googles.png";

const useStyles = makeStyles({
  button: {
    display: "flex",
    marginLeft: "13%",
    width: "70%",
    backgroundColor: "#42B0FF",
    color: "#fff",
    "@media (max-width: 768px)": {
      marginLeft: "1%",
      width: "95%"
    },
    "@media (max-width: 320px)": {
      width: "95%"
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
  const classes = useStyles();

  const userLocalProfile = localStorage.getItem("profile");

  const [details, setDetails] = useState(JSON.parse(userLocalProfile));

  const responseGoogle = response => {
    localStorage.setItem("profile", JSON.stringify(response.profileObj));
    setDetails(response.profileObj);
  };

  const logout = response => {
    localStorage.removeItem("profile");
    setDetails({});
  };

  return userLocalProfile ? (
    <div>
      <p>Google ID: {details.googleId}</p>
      <p>Image:</p>
      <img alt={details.name} src={details.imageUrl} />
      <p>Google ID: {details.email}</p>
      <p>First Name: {details.givenName}</p>
      <p>Last Name: {details.familyName}</p>
      <p>{JSON.stringify(details)}</p>
      <GoogleLogout
        clientId="566271695022-d3jfkv7cmqq6c6unto7bvb7q2osl7hii.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  ) : (
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
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default Login;
