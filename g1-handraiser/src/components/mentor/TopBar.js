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
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import axios from "axios";

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
        url: `${process.env.REACT_APP_DB_URL}/api/type`
      }).then(res => {
        res.data.map(x => {
          if (x.user_type === "mentor") {
            // history.push('/myclasslist')
            // history.push('/queue')
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
                  alt={`${user.fname} ${user.lname}`}
                  src={`${user.image}`}
                />
                <div style={{ paddingBottom: "15px" }} />
                <Typography variant="h6" noWrap>
                  {user.fname} {user.lname}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  {user.email}
                </Typography>
              </div>
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

                  <ListItem
                    selected={active === "queue" ? true : false}
                    button
                    onClick={() => {
                      history.push("/queue");
                    }}
                  >
                    <ListItemIcon>
                      <FormatListNumberedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Queue" />
                  </ListItem>

                  <ListItem onClick={logout} button>
                    <ListItemIcon>
                      <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
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
