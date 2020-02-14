import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Card, CardContent } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 5,
    fontSize: "15px"
  },
  userBackground: {
    background: "#f3f5f7"
  },
  typo: {
    color: "#42b0fe ",
    paddingTop: theme.spacing(2)
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
        <CardContent>
          <Typography variant="h6">Being Help</Typography>
        </CardContent>
        <CardHeader
          action={
            <Tooltip title="Click if Resolved!">
              <IconButton aria-label="settings" style={{ color: "green" }}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
          }
          avatar={
            <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg"></Avatar>
          }
          title="Marcial M. Norte Jr"
          subheader="Cant merge"
        />
      </Card>
    </>
  );
}
