import React,{ useState } from 'react';
import CustomizedSelects from "./FormSelect";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  // buttonSuccess: {
  //   backgroundColor: green[500],
  //   '&:hover': {
  //     backgroundColor: green[700],
  //   },
  // },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function RequestButton({permissionFn,getUserFn,pendingList,val,setNotifDetailsFn,openNofif}) {
  const classes = useStyles();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = id => {
    setLoading(true);
    Axios.post(`${process.env.REACT_APP_DB_URL}/api/key`, {
      id: id,
      type: type
    })
    .then(res => {
      getUserFn();
      setNotifDetailsFn("success", "Success!", `Authentication key sent to ${res.data.givenName} ${res.data.familyName}!`);
      openNofif();
      setLoading(false);
      pendingList();
    })
    .catch(error => {
      let err = String(error).match(/\w+$/g).join();
      if(err === '400'){
        permissionFn();
        setLoading(false);
        return;
      }
      setNotifDetailsFn("error", "Oops!", "Please try again later!");
      openNofif();
      setLoading(false);
      console.error(error);
    });
  };

  return (
    <ListItemSecondaryAction>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <CustomizedSelects
            stat={val.user_type}
            setType={setType}
          />
        </Grid>
        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => submit(val.userd_id)}
            disabled={
              (loading) || type === "pending" || type === "" ? true : false
            }
          >
            Send Key
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </Grid>
      </Grid>
    </ListItemSecondaryAction>
  )
}

export default RequestButton;
