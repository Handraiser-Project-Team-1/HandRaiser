import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "50%"
  },
  gridList: {
    height: 545
  },
  Card: {
    marginTop: 5
  },
  bg: {
    backgroundColor: "#42b0fe",
    color: "#fff",
    fontSize: "5px "
  }
}));

function StudentList() {
  const classes = useStyles();

  return (
    <GridList cellHeight={80} className={classes.gridList} cols={1}>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Marcial M. Norte Jr" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <DeleteIcon style={{ color: "#42b0fe " }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemAvatar>
            <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
            {/* <Avatar>V</Avatar> */}
          </ListItemAvatar>
          <ListItemText primary="Vincent Paul Serra" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <DeleteIcon style={{ color: "#42b0fe " }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemAvatar>
            <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Mark Jowen Mendes" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <DeleteIcon style={{ color: "#42b0fe " }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemAvatar>
            <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Francisco Ifurung" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <DeleteIcon style={{ color: "#42b0fe " }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </GridList>
  );
}

export default StudentList;
