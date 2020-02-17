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

export default function NeedHelp({ queueList,student_id,removeFromQueueFn }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List
        className={classes.root}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            In queue
          </ListSubheader>
        }
      >
        {queueList.map((data, index) => {
          return(
            (data.student_id === student_id) ?
            <ListItem key={index} className={classes.sub}>
              <ListItemIcon>
                <Avatar style={{background: '#70ae54'}}>{data.name.split('')[0].toUpperCase()}</Avatar>
              </ListItemIcon>

              <ListItemText
                primary={data.name}
                secondary={data.tag}
              />

              <ListItemSecondaryAction>
                <Tooltip title="Remove myself from Queue">
                  <IconButton onClick={() => removeFromQueueFn(data.queue_id,data.student_id,data.class_id,data.tag_id)}>
                    <DeleteIcon/>
                  </IconButton>
                </Tooltip>{" "}
              </ListItemSecondaryAction>
            </ListItem> 
            :
            <ListItem key={index}>
              <ListItemIcon>
                <Avatar style={{background: '#6cb1fd'}}>{data.name.split('')[0].toUpperCase()}</Avatar>
              </ListItemIcon>
              <ListItemText primary={data.name} />
            </ListItem>
          );
        })}        
      </List>
    </React.Fragment>
  );
}
