import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import Img from "./img/undraw_security_o890.svg";
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
  }
});
function Keyauth() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Card className={classes.card}>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={12}>
              <img src={Img} alt="" className={classes.img} />{" "}
              <Typography variant="h6" className={classes.typography}>
                Enter the verification code we sent to your email!
              </Typography>
              <TextField
                className={classes.textfield}
                id="standard-basic"
                placeholder="Input your key"
                fullWidth
                style={{ margin: 10 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />{" "}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" className={classes.button}>
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
}

export default Keyauth;
