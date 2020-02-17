import React from "react";
import {
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
import { Tag } from "antd";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  sub: {
    background: "#fafafa"
  },
  hand: {
    marginLeft: "90%"
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
          <ListSubheader component="div" id="nested-list-subheader">
            In Queue
          </ListSubheader>
        }
      >
        <ListItem className={classes.sub}>
          <ListItemIcon>
            <Avatar>M</Avatar>
          </ListItemIcon>

          <ListItemText
            primary="Marcial M. Norte Jr"
            secondary={[
              <Tag key="tag" color="blue">
                Cant merge my dev branch
              </Tag>
            ]}
          />

          <ListItemSecondaryAction>
            <Tooltip title="Remove myself from Queue">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>{" "}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Avatar>M</Avatar>
          </ListItemIcon>
          <ListItemText
            primary="Martha Dansyle Marbella"
            secondary={[
              <Tag key="tag" color="blue">
                Cant merge my dev branch
              </Tag>
            ]}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Avatar>L</Avatar>
          </ListItemIcon>
          <ListItemText
            primary="Lyza Mae Mirabete"
            secondary={[
              <Tag key="tag" color="blue">
                Cant merge my dev branch
              </Tag>
            ]}
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
