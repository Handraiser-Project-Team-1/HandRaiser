import React, { useState } from "react";
import Navigation from "./includes/Dashboard";
import UsersTable from "./Table";
import Request from "./Request";

import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#82e2ff",
      main: "#2196f3",
      dark: "#0081cb",
      contrastText: "#f9f9f9"
    },
    secondary: {
      light: "#73e8ff",
      main: "#29b6f6",
      dark: "#0086c3",
      contrastText: "#fafafa"
    }
  }
});

export default function Dashboard(props) {
  const [active, setActive] = useState("users");

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Navigation active={active} setActive={setActive}>
          {active === "users" ? <UsersTable /> : <Request />}
        </Navigation>
      </ThemeProvider>
    </React.Fragment>
  );
}
