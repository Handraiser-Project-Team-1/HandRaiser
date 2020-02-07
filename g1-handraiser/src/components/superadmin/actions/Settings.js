import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  //   Typography,
  Button,
  DialogTitle,
  Dialog,
  DialogContent
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 250
    }
  },
  bot: {
    color: "white",
    margin: "5px",
    border: "none",
    backgroundColor: "grey",
    cursor: "pointer"
  },
  pic: {
    borderRadius: "50%",
    width: "15%",
    marginRight: "10px"
  },
  dialogTitle: {
    background: "#6cb1fd",
    color: "#fff"
  },
  closeIcon: {
    color: "#fff",
    position: "absolute",
    right: theme.spacing(1)
  }
}));

export default function Settings({ setNotif }) {
  const classes = useStyles();
  const [keyList, setKeyList] = useState([]);
  const [openK, setOpenK] = useState(false);
  const [cpass, setCPass] = useState("");
  const [pass, setPass] = useState("");
  const [error] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [passValid, setPassValid] = useState(true);

  const handleCPass = e => {
    setCPass(e.value);
    if (e.value === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const handlePass = e => {
    setPass(e.value);
    if (e.value && pass === "") {
      setPassValid(true);
    }
    if (e.value !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleClick = e => {
    if (cpass && pass !== "") {
      if (cpass === pass) {
        axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_DB_URL}/api/admin`,
          data: { admin_pass: pass }
        }).then(response => {
          setTimeout(() => {
            setOpenK(false);
            setNotif(true);
          }, 1000);
        });
      } else {
        setPassValid(false);
      }
    } else {
      console.log("no input");
    }
  };

  const fetchKeyListfn = () => {
    axios({
      url: `${process.env.REACT_APP_DB_URL}/api/keyList`,
      method: "GET"
    })
      .then(response => {
        setKeyList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchKeyListfn();
    //eslint-disable-next-line
  }, []);

  const closeAdd = () => {
    setOpenK(false);
  };

  return (
    <React.Fragment>
      <div style={{ padding: "10px 40px 0 40px" }}>
        <Badge badgeContent={keyList.length} color="secondary">
          <SettingsIcon color="disabled" fontSize="small" />
        </Badge>
        <Button color="primary" onClick={() => setOpenK(true)}>
          Settings
        </Button>
      </div>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={openK}
        maxWidth="sm"
        fullWidth
      >
        <CssBaseline />
        <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">
          <SettingsIcon color="disabled" fontSize="small" />
          Settings
          <Button
            color="secondary"
            className={classes.closeIcon}
            onClick={closeAdd}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            {/* INSERT DESIGN HERE */}

            <form className={classes.root} noValidate autoComplete="off">
              <>
                <Typography>Update Password</Typography>

                <TextField
                  required={true}
                  id="password-input"
                  label="Update password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  onChange={e => handleCPass(e.target)}
                />
                <TextField
                  id="outlined-password-input"
                  label="Confirm password"
                  type="password"
                  autoComplete="confirm-password"
                  variant="outlined"
                  onChange={e => handlePass(e.target)}
                  error={error}
                />
                {passValid ? null : (
                  <FormHelperText
                    error={true}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "8px"
                    }}
                  >
                    Pawsword did not match
                  </FormHelperText>
                )}
                {/* {error && (
                  <FormHelperText
                    error={true}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "8px"
                    }}
                  >
                    Pawsword did not match
                  </FormHelperText>
                )} */}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  disabled={disabled}
                >
                  Save
                </Button>
              </>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
