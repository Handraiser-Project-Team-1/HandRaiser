import React from "react";
import { CircularProgress } from "@material-ui/core";

function PermissionLoading() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50vh" }}
    >
      <CircularProgress color="primary" />
    </div>
  );
}

export default PermissionLoading;
