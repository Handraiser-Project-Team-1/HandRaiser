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
  const { active } = props;
  const [openSubList, setOpenSubList] = React.useState(true);
  const [stud_class, setClass] = useState([])
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    image: "",
    email: ""
  });

  const handleCollapse = () => {
    setOpenSubList(!openSubList);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_DB_URL}/api/class/accept`
    }).then(res => {
      setClass(res.data)
    })

    if (localStorage.getItem("tokenid")) {
      //identify if mentor or student
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
    } else {
      history.push("/");
    }
  }, [history]);

  var logout = () => {
    localStorage.clear();
    history.push("/");
  };
  var acceptedclass = (e) => {
    stud_class.map(x => {
      if(x.status === 'accept'){
        history.push(`/class/${e}`);
        localStorage.setItem('cid', `${e}`)
        window.location.reload(true)
      }
      return x
    })
  }

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
                    selected={active === "classes" ? true : false}
                    button
                    onClick={() => {
                      history.push("/classes");
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
                  {stud_class.map(x=>{
                    return (<ListItem
                      selected={active === "1" ? true : false}
                      button
                      className={classes.nested}
                      onClick={() => acceptedclass(x.cid)}
                    >
                      <ListItemIcon>
                        <StarBorderOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${x.cname}`} />
                    </ListItem>)
                  })}
                  </List>
                </Collapse>
                <List>
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
