import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import FaceIcon from "@material-ui/icons/Face";
import GridList from "@material-ui/core/GridList";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({
  gridList: {
    height: 545
  },
  Card: {
    marginTop: 5
  },
  bg: {
    backgroundColor: "#42b0fe",
    color: "#fff"
  }
}));

function StudentList() {
  const classes = useStyles();
  return (
    <Card className={classes.Card}>
      <CardHeader title="List of student" className={classes.bg} />
      <GridList cellHeight={80} className={classes.gridList} cols={1}>
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
        </Card>
      </GridList>
    </Card>
  );
}

export default StudentList;
