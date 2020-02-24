import React, { useEffect, useState, useContext } from "react";
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
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import SchoolIcon from "@material-ui/icons/School";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Card, Icon } from "antd";

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
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ClassList from "../selectclass/Select";
import Que from "../studentque/Que";

import { GoogleLogout } from "react-google-login";
import DataContext from "../mentor/DataContext";

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
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: "auto",
    transition: "all 0.3s ease 0s",
    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6)
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

const Layout = props => {
  const classes = useStyles();
  let history = useHistory();
  let match = useRouteMatch();
  const [openSubList, setOpenSubList] = React.useState(true);
  const [stud_class, setClass] = useState([]);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    image: "",
    email: "",
    uid: ""
  });
  const [selected, setSelected] = useState(null);
  const { socket } = useContext(DataContext);

  const handleCollapse = () => {
    setOpenSubList(!openSubList);
  };

  useEffect(() => {
    getClass();

    if (localStorage.getItem("tokenid")) {
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
            email: x.user_email,
            uid: x.userd_id
          });
          return setUser;
        });
      });
    } else {
      history.push("/");
    }
  }, [history]);

  const getClass = () => {
    axios
      .get(
        `${process.env.REACT_APP_DB_URL}/api/student/${localStorage.getItem(
          "uid"
        )}`
      )
      .then(res => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_DB_URL}/api/class/accept/${res.data[0].student_id}`
        }).then(res => {
          setClass(res.data);
        });
      });
  };

  var logout = () => {
    socket.emit("logout", { user_id: localStorage.getItem("uid") });
    localStorage.clear();
    history.push("/");
  };

  const responseGoogleFail = response => {
    console.error(response.error);
  };

  useEffect(() => {
    if (match.isExact) setSelected(null);
  }, [match]);

  return (
    <ThemeProvider theme={theme}>
      {/* {console.log(JWT.decode(localStorage.getItem('tokenid')))} */}
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
            <Sidebar color="primary">
              <Card
                className={classes.icon}
                actions={[
                  <FiberManualRecordIcon
                    style={{ color: green[500] }} //ACTIVE ICON
                    fontSize="small"
                  />,
                  <Icon type="setting" key="setting" />,
                  <Icon type="edit" key="edit" />
                ]}
              >
                <Avatar
                  className={classes.large}
                  alt={`${user.fname} ${user.lname}`}
                  src={`${user.image}`}
                />
                <div
                  style={{
                    paddingBottom: "15px"
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    marginLeft: "15%"
                  }}
                  noWrap
                >
                  {user.fname} {user.lname}
                </Typography>
                <Typography variant="body2" noWrap>
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
                    selected={match.isExact}
                    button
                    onClick={() => {
                      history.push("/classes");
                      setSelected(null);
                    }}
                  >
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                  </ListItem>
                </List>
                <ListItem button onClick={handleCollapse}>
                  <ListItemIcon>
                    <LocalLibraryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Enrolled" />
                  {openSubList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSubList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {stud_class.map((x, i) => {
                      return (
                        <ListItem
                          key={i}
                          button
                          selected={parseInt(selected) === x.cid ? true : false}
                          className={classes.nested}
                          onClick={() => {
                            history.push(`${match.path}/${x.cid}`);
                            setSelected(x.cid);
                            sessionStorage.setItem("sessionId", x.cid);
                          }}
                        >
                          <ListItemIcon>
                            <StarBorderOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary={`${x.cname}`} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
                <List>
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
                    )}
                  />
                </List>
              </div>
              <CollapseBtn className={sidebarStyles.collapseBtn}>
                {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </CollapseBtn>
            </Sidebar>
            <Content className={classes.content}>
              <Switch>
                <Route
                  exact
                  path={`${match.path}`}
                  render={props => (
                    <ClassList {...props} setSelected={setSelected} />
                  )}
                />
                <Route
                  path={`${match.path}/:id`}
                  render={props => <Que {...props} setSelected={setSelected} />}
                />
              </Switch>
            </Content>
          </>
        )}
      </Root>
    </ThemeProvider>
  );
};

export default Layout;
