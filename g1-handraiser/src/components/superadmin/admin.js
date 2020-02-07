import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShowStudents from "./actions/showStudents";
import Badge from "@material-ui/core/Badge";
import TopBar from "./includes/TopBar";
import Notif from "../includes/Notif";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  card: {
    maxWidth: 345
  },
  media: {
    width: 300,
    height: 100
  }
}));

export default function Dashboard(props) {
  let history = useHistory();
  const { keys } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notif, setNotif] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("key") === keys) {
      if (keys === null) {
        history.push("/");
      } else {
        history.push("/admin");
      }
    } else {
      history.push("/");
    }
  }, [history, keys]);

  const show = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Notif
        type="success"
        title="Hi Marcial!"
        message="Welcome to admin dashboard — check it out!"
        open={notif}
        setOpen={setNotif}
      />
      <TopBar active={props.active} {...props}>
        <Grid container spacing={2}>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent className={classes.media}>
                  <Typography>Mentor Robby</Typography>
                  <Badge
                    badgeContent={4}
                    color="secondary"
                    style={{ float: "right", bottom: "25px", left: "-10px" }}
                  >
                    <NotificationsIcon />
                  </Badge>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={show}
                  variant="outlined"
                >
                  Show Students
                </Button>
                <ShowStudents open={open} setOpen={setOpen} />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </TopBar>
    </React.Fragment>
  );
}
