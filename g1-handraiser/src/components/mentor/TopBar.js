import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Avatar, Divider, Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Card } from "antd";

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
import axios from "axios";
import { GoogleLogout } from 'react-google-login';
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
    background: "#fafafa",
    transition: "all 0.3s ease 0s",
    [theme.breakpoints.between("sm", "md")]: {
      padding: theme.spacing(1)
    }
  },
  large: {
    display: "flex",
    marginLeft: 35,
    width: theme.spacing(14),
    height: theme.spacing(14), 
    margin: "auto",
    transition: "all 0.3s ease 0s",
    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6)
    },
    "@media(max-width: 1024px)":{
      [theme.breakpoints.between("sm", "md")]: {
        width: theme.spacing(15),
        height: theme.spacing(15)
      }
    }
  },
  title: {
    fontSize: "1.5em",
    fontWeight: "500"
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
const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left:0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Layout = props => {
  const classes = useStyles();
  let history = useHistory();
  const { active } = props;
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    image: "",
    email: ""
  });

  useEffect(() => {
    if (localStorage.getItem("tokenid")) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_DB_URL}/api/type/${localStorage.getItem(
          "uid"
        )}`
      }).then(res => {
        res.data.map(x => {
          if (x.user_type === "mentor") {
            // history.push("/myclasslist");
            axios({
              method: "post",
              url: `${process.env.REACT_APP_DB_URL}/api/user`,
              data: { tokenObj: localStorage.getItem("tokenid") }
            }).then(res => {
              res.data.map(x => {
                setUser({
                  fname: x.user_fname,
                  lname: x.user_lname,
                  image: x.user_image,
                  email: x.user_email
                });
                return setUser;
              });
            });
          } else if (x.user_type === "student") {
            history.push("/classes");
          }
          return x;
        });
      });
    } else {
      history.push("/");
    }
  }, [history]);

  var logout = () => {
    localStorage.clear();
    history.push("/");
  };

  const responseGoogleFail = response => {
    console.error(response.error);
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
                <Typography className={classes.title}>HandRaiser</Typography>
              </Toolbar>
            </Header>
            <Sidebar>
            <Card
                className={classes.icon}
            
              > <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <Avatar
                  className={classes.large}
                  alt={`${user.fname} ${user.lname}`}
                  src={`${user.image}`}
                />
      </StyledBadge>
      <div
                  style={{
                    paddingBottom: "35px",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    marginLeft: "17%"
                  }}
                  noWrap
                >
                  {user.fname} {user.lname}
                </Typography>
                <Typography variant="body2" noWrap  style={{
                    marginLeft: "2%"
                  }}>
                  {user.email}
                </Typography>
      </Card>

              <Divider />
              <div
                className={sidebarStyles.container}
                style={{ height: "100vh" }}
              >
                <List>
                  <ListItem
                    selected={active === "classlist" ? true : false}
                    button
                    onClick={() => {
                      history.push("/myclasslist");
                    }}
                  >
                    <ListItemIcon>
                      <ImportContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Class" />
                  </ListItem>
                  <GoogleLogout
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    onLogoutSuccess={logout}
                    onFailure={responseGoogleFail}
                    render={renderProps => (
                      <ListItem onClick={renderProps.onClick} button>
                        <ListItemIcon>
                          <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    )}d
                  />
                </List>
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
