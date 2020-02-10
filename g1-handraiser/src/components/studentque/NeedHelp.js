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
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  sub: {
    background: "#FAFAFA"
  }
}));

export default function NeedHelp() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List
        className={classes.root}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className={classes.sub}
          >
            In queue
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemIcon>
            <Avatar>M</Avatar>
          </ListItemIcon>

          <ListItemText
            primary="Marcial M. Norte Jr"
            secondary="Cant merge my dev branch"
          />

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
