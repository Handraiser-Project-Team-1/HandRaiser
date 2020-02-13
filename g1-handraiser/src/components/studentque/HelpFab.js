import React from "react";
import "./App.scss";
import { Tooltip, IconButton } from "@material-ui/core";
function HelpFab() {
  return (
    <>
      <div className="request-loader">
        <Tooltip title="Ask for help">
          <IconButton>
            <span role="img" aria-label="Hand">
              👋
            </span>
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}

export default HelpFab;
