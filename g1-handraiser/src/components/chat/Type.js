import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

export default function Type({ name, keypress, message, setmessage }) {
  return (
    <BootstrapInput
      placeholder="Type Here"
      id="bootstrap-input"
      fullWidth={true}
      autoComplete="off"
      value={message}
      maxLength="3"
      onKeyPress={() => keypress(name)}
      onChange={(event) => setmessage(event.target.value)}
    />
  );
}
