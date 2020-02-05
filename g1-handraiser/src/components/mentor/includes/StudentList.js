import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

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
    <Card className={classes.Card}>
      <CardHeader className={classes.bg} title="LIST" />
      <CardHeader />
      <GridList cellHeight={80} className={classes.gridList} cols={1}>
        {/* <Card>
          <CardContent>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
                  </Grid>
                  <Grid item xs={8}>
                    Vincent Serra
                  </Grid>
                  <Grid item xs={2}>
                    <MessageIcon fontSize="small" />
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <FaceIcon fontSize="small" />
                  </Grid>
                  <Grid item xs={8}>
                    Vincent Serra
                  </Grid>
                  <Grid item xs={2}>
                    <MessageIcon fontSize="small" />
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <FaceIcon fontSize="small" />
                  </Grid>
                  <Grid item xs={8}>
                    Vincent Serra
                  </Grid>
                  <Grid item xs={2}>
                    <MessageIcon fontSize="small" />
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <FaceIcon fontSize="small" />
                  </Grid>
                  <Grid item xs={8}>
                    Vincent Serra
                  </Grid>
                  <Grid item xs={2}>
                    <MessageIcon fontSize="small" />
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </CardContent>
        </Card> */}
        {/* 
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Marcial M. Norte Jr" />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Marcial M. Norte Jr" />
          </ListItem>
        </List> */}
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Marcial M. Norte Jr" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              {/* <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" /> */}
              <Avatar>V</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vincent Paul Serra" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
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
                <CommentIcon />
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
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </GridList>
    </Card>
  );
}

export default StudentList;
