import React from "react";
import "./App.scss";
import { Tooltip } from "@material-ui/core";
function HelpFab() {
  return (
    <>
      <div className="request-loader">
        <Tooltip title="Ask for help">
          <span role="img" aria-label="Hand">
            👋
          </span>
        </Tooltip>
      </div>
    </>
  );
}

export default HelpFab;
