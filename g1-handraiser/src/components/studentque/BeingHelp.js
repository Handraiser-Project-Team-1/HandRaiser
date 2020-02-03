import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItemIcon } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  avatar: {
    backgroundColor: green[500],
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  itemText: {
    paddingLeft: theme.spacing(2)
  }
}));

export default function BeingHelp() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <Avatar className={classes.avatar}>M</Avatar>
          </ListItemIcon>
          <ListItemText
            primary="Martha Dansyle Marbella"
            className={classes.itemText}
            secondary="Assisting by: Daniel Nebreja"
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
