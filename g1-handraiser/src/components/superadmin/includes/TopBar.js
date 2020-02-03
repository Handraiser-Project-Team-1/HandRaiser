import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

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
  const [openR, setOpenR] = useState(false);
  const [openK, setOpenK] = useState(false);

  const request = () => {
    setOpenR(true);
  };

  const keyDialog = () => {
    setOpenK(true);
  };

  const [loginReqCount, setLoginReqCount] = useState(0);
  const [keyAprvCount, setKeyAprvCount] = useState(0);

  const setLoginReqBadge = (num) => {
    setLoginReqCount(num);
  }
  
  const setKeyBadge = (num) => {
    setKeyAprvCount(num);
  }

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
                <Typography variant="h6">HandRaiser</Typography>
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
                <div style={{ padding: '40px 40px 0 40px'}}>
                  <Button color="inherit" onClick={request}>
                    Login Requests
                    <Badge badgeContent={loginReqCount} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </Button>
                </div>
                <Request setLoginReqBadge={setLoginReqBadge} open={openR} setOpen={setOpenR} />
                <div style={{ padding: '40px 40px 0 40px'}}>
                  <Button color="inherit" onClick={keyDialog}>
                    Key approval
                    <Badge badgeContent={keyAprvCount} style={{marginLeft: 5}} color="secondary">
                      <VpnKeyIcon />
                    </Badge>
                  </Button>
                </div>
              </div>
              <KeyList setKeyBadge={setKeyBadge} open={openK} setOpen={setOpenK} />
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
