import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Card, CardContent } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { Tag } from "antd";

import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 5,
    fontSize: "15px",
    color: "gray"
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

export default function CardClass({beingHelp}) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography style={{ color: "gray" }}>Being Help</Typography>
        </CardContent>
        <CardHeader
          action={
            <Tooltip title="Click if Resolved!">
              <IconButton onClick={() => resolvedFn(beingHelp.class_id,beingHelp.queue_id,beingHelp.helping_id,beingHelp.mentor_id)} aria-label="settings" style={{ color: "green" }}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
          }
          avatar={
            <Avatar src={beingHelp.image}></Avatar>
          }
          title={beingHelp.name}
          subheader={[
            <Tag key="tag" color="blue">
              {beingHelp.tag}
            </Tag>
          ]}
        />
      </Card>
    </>
  );
}
