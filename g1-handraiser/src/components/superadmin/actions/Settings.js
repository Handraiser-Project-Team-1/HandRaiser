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
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
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

export default function Settings() {
  const classes = useStyles();
  const [keyList, setKeyList] = useState([]);
  const [openK, setOpenK] = useState(false);

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
      <div style={{ padding: "0px 40px 0 40px" }}>
        <Badge badgeContent={keyList.length} color="secondary">
          <SettingsIcon />
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
            Update Password
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
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
