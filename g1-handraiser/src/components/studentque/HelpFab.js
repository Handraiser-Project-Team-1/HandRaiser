import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import PanToolIcon from "@material-ui/icons/PanTool";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles(theme => ({
  fab: {
    background: "#ffd600",
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(12)
  }
}));
function HelpFab() {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Ask for Help" placement="top-start">
        <Fab className={classes.fab}>
          <PanToolIcon style={{ color: "#fff" }} />
        </Fab>
      </Tooltip>
    </>
  );
}

export default HelpFab;
