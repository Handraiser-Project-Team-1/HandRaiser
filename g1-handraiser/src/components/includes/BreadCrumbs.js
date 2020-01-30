import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

export default function BreadCrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/classes">
        Classes
      </Link>
      <Typography color="textPrimary">BoomCamp 2019</Typography>
    </Breadcrumbs>
  );
}
