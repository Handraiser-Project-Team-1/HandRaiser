import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Modal, Button, Icon, Typography } from "antd";

// import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Grid } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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
  },
  paper: {
    padding: 10
  }
}));

export default function Settings() {
  const classes = useStyles();
  const [cpass, setCPass] = useState("");
  const [pass, setPass] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [passValid, setPassValid] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCPass = e => {
    setCPass(e.value);
    if (e.value === "") {
      setDisabled(true);
      setLoading(false);
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
      setError(false);
    } else {
      setDisabled(true);
      setError(true);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = e => {
    setLoading(true);
    if (cpass && pass !== "") {
      if (cpass === pass) {
        axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_DB_URL}/api/admin`,
          data: { admin_pass: pass }
        }).then(response => {
          setTimeout(() => {
            setVisible(false);
            setLoading(false);

            // setNotif(true);
          }, 3000);
        });
      } else {
        setPassValid(false);
        setLoading(false);
        setError(true);
      }
    } else {
      setError(true);
      setPassValid(true);

      console.log("no input");
    }
  };
  const showModal = () => {
    setVisible(true);
  };

  return (
    <React.Fragment>
      <ListItem onClick={() => showModal()} button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <Modal
        visible={visible}
        title={[
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Icon type="setting" />
            <Typography>Settings</Typography>
          </div>
        ]}
        onOk={handleClick}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Cancel
          </Button>,
          <Button
            ghost
            key="save"
            type="primary"
            color="primary"
            onClick={() => handleClick()}
            disabled={disabled}
            loading={loading}
          >
            Save
          </Button>
        ]}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <form className={classes.root} noValidate autoComplete="off">
            <>
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
                error={error}
                id="outlined-password-input"
                label="Confirm password"
                type="password"
                autoComplete="confirm-password"
                variant="outlined"
                onChange={e => handlePass(e.target)}
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
            </>
          </form>
        </Grid>
      </Modal>
    </React.Fragment>
  );
}
