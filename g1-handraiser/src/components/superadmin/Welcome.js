import React, { useState } from "react";
import Axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Notif from "../includes/Notif";
import { withStyles, fade } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    width: 280,
    margin: "10%"
  },
  root: {
    height: "100vh",
    background: "#f3f2f2"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#82e2ff",
      main: "#42b0ff",
      dark: "#0081cb",
      contrastText: "#f9f9f9"
    },
    secondary: {
      light: "#73e8ff",
      main: "#29b6f6",
      dark: "#0086c3",
      contrastText: "#fafafa"
    }
  }
});

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

export default function Welcome() {
  let history = useHistory();
  const [notif, setNotif] = useState(false);
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const classes = useStyles();

  const submit = e => {
    e.preventDefault();
    if (username && password) {
      Axios.post(`${process.env.REACT_APP_DB_URL}/api/login`, {
        username,
        password
      })
        .then(res => {
          localStorage.setItem("pass", res.data.admin_pass);
          history.push("/admin");
        })
        .catch(err => {
          setNotif(true);
          setMsg(err.response.data.error);
        });
    } else {
      setNotif(true);
      setMsg("Please fill up all the fields!");
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Notif
          type="error"
          title="Error!"
          message={msg}
          open={notif}
          setOpen={setNotif}
        />
        <div className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Sign in as Administrator
                </Typography>

                <form>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <BootstrapInput
                        placeholder="Username"
                        id="bootstrap-input-username"
                        fullWidth={true}
                        autoComplete="off"
                        type="text"
                        onChange={e => {
                          setUsername(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <BootstrapInput
                        placeholder="Password"
                        id="bootstrap-input-password"
                        fullWidth={true}
                        autoComplete="off"
                        type="password"
                        onChange={e => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disableElevation
                        onClick={e => {
                          submit(e);
                        }}
                      >
                        Log In
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
