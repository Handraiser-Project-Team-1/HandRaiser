import React from 'react';
import { CircularProgress } from "@material-ui/core";

setTimeout(() => {
  window.close();
}, 1500);

function PermissionLoading() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50vh'}}>
      <CircularProgress color="primary" />
    </div>
  )
}

export default PermissionLoading;
