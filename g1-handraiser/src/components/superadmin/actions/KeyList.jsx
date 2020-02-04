import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  //Container,
  Button,
  DialogTitle,
  Dialog,
  DialogContent
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Grid } from '@material-ui/core';
import { Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
// import FileCopyIcon from '@material-ui/icons/FileCopy';
// import { Tooltip, InputBase, InputAdornment, IconButton,} from "@material-ui/core";
// import Notification from '../../includes/Notif';
import {Badge} from "@material-ui/core";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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
    background: '#6cb1fd', 
    color: '#fff',
  },
  closeIcon: {
    color: '#fff',
    position: 'absolute',
    right: theme.spacing(1),
  }
}));

export default function Request({open, setOpen, setKeyBadge}) {
  const classes = useStyles();
  const [keyList, setKeyList] = useState([]);
  const [openK, setOpenK] = useState(false);

  const fetchKeyListfn = () => {
    axios({
      url: `${process.env.REACT_APP_DB_URL}/api/keyList`,
      method: 'GET'
    })
    .then( response => {
      setKeyList(response.data);
      setKeyBadge(response.data.length);
    })
    .catch( error => {
      console.error(error);
    })
  }

  useEffect(() => {
    fetchKeyListfn();
    //eslint-disable-next-line
  }, [])

  const closeAdd = () => {
    setOpenK(false);
  };

  // const [notif, setNotif] = useState(false);

  // const handleCopy = () => {
  //   setNotif(true);
  // }

  return (
    <React.Fragment>
      <div style={{ padding: "0px 40px 0 40px" }}>
        <Button color="inherit" onClick={() => setOpenK(true)}>
          Keys
          <Badge badgeContent={keyList.length} color="secondary">
            <VpnKeyIcon />
          </Badge>
        </Button>
      </div>
      <Dialog aria-labelledby="simple-dialog-title" open={openK} maxWidth='sm' fullWidth>
        {/* <Notification
          type="success"
          title=""
          message="Copied to Clipboard!"
          open={notif}
          setOpen={setNotif}
        /> */}
        <CssBaseline />
        <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">
          Sent Keys
          <Button color="secondary" className={classes.closeIcon} onClick={closeAdd}>
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
            <Table>
              <TableHead>
                <TableRow key="table-head">
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell align="left">key</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keyList.map((user, id)=>{
                  return(
                    <TableRow key={id}>
                      <TableCell>{++id}</TableCell>
                      <TableCell>{user.user_lname+", "+user.user_fname}</TableCell>
                      <TableCell>{user.key_type}</TableCell>
                      <TableCell>{user.key}</TableCell>
                      {/* <TableCell style={{width: '30%'}}>
                        <InputBase 
                          type="text"
                          defaultValue={user.key}
                          inputProps={{
                            readOnly: true
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <Tooltip title="Copy Key" placement="top">
                                <IconButton onClick={handleCopy}>
                                  <FileCopyIcon />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          }
                        />
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid> 
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}