import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  CardActionArea,
  CardContent,
  CardActions
} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  card: {
    padding: 10,
    marginTop: 5,
    fontSize: "15px"
  },
  userBackground: {
    background: "#f3f5f7"
  },
  typo: {
    color: "#42b0fe "
  },
  header: {
    display: "flex"
  }
}));

export default function CardClass(props) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardActionArea className={classes.userBackground}>
          <CardContent>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <CardHeader
                  className={classes.header}
                  avatar={
                    <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg"></Avatar>
                  }
                  title="Marcial M. Norte Jr"
                />
              </Grid>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant="overline" className={classes.typo}>
            {/* <FiberManualRecordRoundedIcon /> */}
            BEING HELP
          </Typography>
        </CardActions>
      </Card>
    </>
  );
}
