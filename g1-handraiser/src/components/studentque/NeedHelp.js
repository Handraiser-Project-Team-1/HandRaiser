import React from "react";
import {
  Divider,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

export default function NeedHelp() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <Avatar>M</Avatar>
          </ListItemIcon>

          <ListItemText primary="Marcial M. Norte Jr" />

          <ListItemSecondaryAction>
            <Tooltip title="Remove myself from Que">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Avatar>M</Avatar>
          </ListItemIcon>
          <ListItemText primary="Martha Dansyle Marbella" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Avatar>L</Avatar>
          </ListItemIcon>
          <ListItemText primary="Lyza Mae Mirabete" />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
