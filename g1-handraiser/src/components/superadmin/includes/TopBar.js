import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {
  Root,
  Header,
  Sidebar,
  Content,
  CollapseBtn,
  SidebarTrigger
} from "@mui-treasury/layout";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Request from "../actions/request";
import KeyList from "../actions/KeyList";
import Settings from "../actions/Settings";

const config = {
  autoCollapseDisabled: false,
  collapsedBreakpoint: "sm",
  heightAdjustmentDisabled: false,
  xs: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "temporary",
      width: 240,
      collapsedWidth: 64
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 56,
      persistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit"
    }
  },
  lg: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "permanent",
      width: 256,
      collapsible: false
    },
    content: {
      persistentBehavior: "fit"
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 64,
      persistentBehavior: "fit"
    }
  },
  xl: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "permanent",
      width: 256,
      collapsible: false
    },
    content: {
      persistentBehavior: "fit"
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 64,
      persistentBehavior: "fit"
    }
  },
  sm: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "permanent",
      width: 256,
      collapsible: true,
      collapsedWidth: 64
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 64,
      persistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit"
    }
  },
  md: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "permanent",
      width: 256,
      collapsible: true,
      collapsedWidth: 64
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 64,
      persistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit"
    }
  }
};

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "rgba(183, 182, 182, 0.04)",
    minHeight: "100%",
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1)
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  icon: {
    padding: theme.spacing(2),
    transition: "all 0.3s ease 0s",
    [theme.breakpoints.between("sm", "md")]: {
      padding: theme.spacing(1)
    }
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: "auto",
    transition: "all 0.3s ease 0s",
    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6)
    }
  },
  logout: {
    display: "flex",
    justifyContent: "flex-end",
    width: "25%",
    "@media (max-width: 320px)": {
      display: "flex",
      width: "50%",
      justifyContent: "flex-end"
    }
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#82e2ff",
      main: "#42b0ff",
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

const Layout = props => {
  const classes = useStyles();
  let history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Root omitThemeProvider={true} config={config}>
        {({ headerStyles, sidebarStyles, collapsed, opened }) => (
          <>
            <CssBaseline />
            <Header color="primary">
              <Toolbar>
                <SidebarTrigger className={headerStyles.leftTrigger}>
                  {opened ? <ChevronLeftIcon /> : <MenuIcon />}
                </SidebarTrigger>
                <Typography variant="h6" style={{ width: "95%" }}>
                  HandRaiser
                </Typography>
                <Button
                  style={{ color: "white" }}
                  onClick={logout}
                  className={classes.logout}
                >
                  Log out
                </Button>
              </Toolbar>
            </Header>
            <Sidebar>
              <div className={classes.icon}>
                <Avatar
                  className={classes.large}
                  alt="Marcial Norte"
                  src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg"
                />
                <div style={{ paddingBottom: "15px" }} />
                <Typography variant="h6" noWrap>
                  Marcial M. Norte Jr
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  marcial.norte@boom.camp
                </Typography>
              </div>
              <Divider />
              <div
                className={sidebarStyles.container}
                style={{ height: "100vh" }}
              >
                <Request />
                <KeyList />
                <Settings />
              </div>

              <CollapseBtn className={sidebarStyles.collapseBtn}>
                {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </CollapseBtn>
            </Sidebar>
            <Content className={classes.content}>{props.children}</Content>
          </>
        )}
      </Root>
    </ThemeProvider>
  );
};

export default Layout;
