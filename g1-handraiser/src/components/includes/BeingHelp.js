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

export default function CardClass({ beingHelp, resolvedFn, student }) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography style={{ color: "gray" }}>Being Help</Typography>
        </CardContent>
        {beingHelp.map((data, index) => {
          return(
            <CardHeader
              key={index}
              action={
                (!student) ?
                <Tooltip title="Click if Resolved!">
                  <IconButton
                    onClick={() =>
                      resolvedFn(
                        data.class_id,
                        data.student_id,
                        data.tag_id,
                        data.mentor_id,
                        data.queue_id,
                        data.helping_id
                      )
                    }
                    aria-label="settings"
                    style={{ color: "green" }}
                  >
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
                :null
              }
              avatar={<Avatar src={data.image}></Avatar>}
              title={data.name}
              subheader={[
                <Tag key="tag" color="blue">
                  {data.tag}
                </Tag>
              ]}
            />
          )
        })}
      </Card>
    </>
  );
}
