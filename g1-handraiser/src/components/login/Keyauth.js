import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import Img from "./img/undraw_security_o890.svg";
import { FormHelperText } from "@material-ui/core";

import axios from 'axios';

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
    backgroundColor: "#42B0FF",
    color: "#fff",
    marginLeft: "40%"
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
    marginLeft: "5%"
  },
  textfield: {
    marginLeft: "27%"
  }
});
function Keyauth() {
  const classes = useStyles();

  const [key,setKey] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  const onChangeFn = (e) => {
    setKey(e.target.value);
    if(e.target.value.length === 5){ 
      setDisabled(false);
      setError(false);
    }else{
      setDisabled(true);
      setError(true);
    }
  }

  const onSubmitFn = (e) => {
    e.preventDefault();
    let tokenObj = JSON.parse(localStorage.getItem('token'));
    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_DB_URL}/api/users`,
      data: { key: key, token: tokenObj }
    })
    .then( response => {
      console.log(response);
    })
    .catch( error => {
      //show notif
    })
  }

  return (
    <>
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
                {(error) && <FormHelperText error={true} style={{display: 'flex', justifyContent: 'center', marginBottom: '8px'}}>Authentication key must 5 characters.</FormHelperText>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button disabled={disabled} type="submit" variant="contained" className={classes.button}>
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
