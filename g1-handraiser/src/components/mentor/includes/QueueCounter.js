import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
const useStyles = makeStyles(theme => ({
  typo: {
    color: "#42B0FF"
  },
  userBackground: {
    background: "#f3f5f7"
  }
}));
export default function QueueCounter({count}) {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <CardActionArea className={classes.userBackground}>
          <CardContent>
            <Typography variant="h2" component="h2">
              {count}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Typography component="p" variant="overline" className={classes.typo}>
          STUDENT ON QUEUE{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}
