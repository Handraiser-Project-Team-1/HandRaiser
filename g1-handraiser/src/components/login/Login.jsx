import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button } from '@material-ui/core';

function Login() {


  const userLocalProfile = localStorage.getItem('profile');

  const [ details, setDetails ] = useState(JSON.parse(userLocalProfile));

  const responseGoogle = (response) => {
    localStorage.setItem('profile', JSON.stringify(response.profileObj));
    setDetails(response.profileObj);
  }

  const logout = (response) => {
    localStorage.removeItem('profile');
    setDetails({});
  }

  return (
    (userLocalProfile) ?
    <div>
      <p>Google ID: { details.googleId }</p>
      <p>Image:</p><img alt={details.name} src={details.imageUrl}/>
      <p>Google ID: { details.email}</p>
      <p>First Name: { details.givenName }</p>
      <p>Last Name: { details.familyName }</p>
      <p>{JSON.stringify(details)}</p>
      <GoogleLogout
        clientId="566271695022-d3jfkv7cmqq6c6unto7bvb7q2osl7hii.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
    :
    <GoogleLogin
      render={renderProps => (
        <Button 
          onClick={renderProps.onClick} 
          disabled={renderProps.disabled}
          variant="outlined"
          color="primary"
        >
          Login with Google
        </Button>
      )}
      clientId="566271695022-d3jfkv7cmqq6c6unto7bvb7q2osl7hii.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default Login;