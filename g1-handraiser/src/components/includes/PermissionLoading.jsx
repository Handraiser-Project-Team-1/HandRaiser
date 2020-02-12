import React from 'react';
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const closeWindowFn = () => setTimeout(() => window.close(), 4000);

function PermissionLoading() {
  const history = useHistory();
  history.location.pathname === '/permission' && closeWindowFn()

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{position: 'absolute', top: '50%'}} 
    >
      <CircularProgress color="primary" />
      <Typography variant="caption" display="block" gutterBottom style={{marginTop: 5}}>
        A moment please.
      </Typography>
      <Typography variant="overline" display="block" gutterBottom style={{marginTop: 5}}>
        Please click the <span style={{border: '1px solid #42b0ff', borderRadius: 4, padding: 3, color: '#fff', background: '#42b0ff'}}>SEND</span> button again
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
      after this window closes
      </Typography>
      
    </Grid>
  )
}

export default PermissionLoading;