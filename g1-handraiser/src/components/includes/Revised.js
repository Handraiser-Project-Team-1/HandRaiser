import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Root, Header, Nav, Content, Footer } from "./Layout";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import SchoolIcon from "@material-ui/icons/School";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const config = {
  navAnchor: "left",
  navVariant: {
    xs: "temporary",
    sm: "permanent",
    md: "permanent"
  },
  navWidth: {
    xs: 240,
    sm: 256,
    md: 256
  },
  collapsible: {
    xs: false,
    sm: true,
    md: false
  },
  collapsedWidth: {
    xs: 64,
    sm: 64,
    md: 64
  },
  clipped: {
    xs: true,
    sm: true,
    md: true
  },
  headerPosition: {
    xs: "sticky",
    sm: "sticky",
    md: "sticky"
  },
  squeezed: {
    xs: true,
    sm: true,
    md: true
  },
  footerShrink: {
    xs: true,
    sm: true,
    md: true
  }
};

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.04)",
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
    width: theme.spacing(8),
    height: theme.spacing(8),
    transition: "all 0.3s ease 0s",
    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6)
    }
  }
}));

const Revised = props => {
  const classes = useStyles();
  let history = useHistory();
  const { active } = props;
  const [openSubList, setOpenSubList] = React.useState(true);

  const handleCollapse = () => {
    setOpenSubList(!openSubList);
  };
  return (
    <Root config={config} style={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Header
        menuIcon={{
          inactive: <MenuIcon />,
          active: <ChevronLeftIcon />
        }}
      >
        {/* header goes here */}
      </Header>
      <Nav
        collapsedIcon={{
          inactive: <ChevronLeftIcon />,
          active: <ChevronRightIcon />
        }}
        header={
          // you can provide fixed header inside nav
          // change null to some react element
          ctx => null
        }
      >
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
            <ListItem
              selected={active === "1" ? true : false}
              button
              className={classes.nested}
              onClick={() => {
                history.push("/class/1");
              }}
            >
              <ListItemIcon>
                <StarBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="BoomCamp 2019" />
            </ListItem>
          </List>
        </Collapse>
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Nav>
      <Content>{/* content goes here */}</Content>
      <Footer>{/* footer goes here */}</Footer>
    </Root>
  );
};

export default Revised;
