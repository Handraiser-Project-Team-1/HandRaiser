import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Button, Box } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
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
    <React.Fragment>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography style={{ color: "gray" }}>Being Help</Typography>
        </CardContent>
        {beingHelp.map((data, index) => {
          return(
            <React.Fragment key={index}>
              <CardHeader
                avatar={
                  <Avatar src={data.image}></Avatar>
                }
                title={data.name}
                subheader={[<Tag key="tag">{data.tag}</Tag>]}
              />
              {(!student) &&
                <CardContent style={{ paddingBottom: 16 }}>
                  <Typography component="div">
                    <Box textAlign="right">
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        endIcon={<CheckCircleOutlineIcon />}
                        disableElevation
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
                      >
                        Resolved
                      </Button>
                    </Box>
                  </Typography>
                </CardContent>
              }
            </React.Fragment>
          )
        })}
      </Card>
    </React.Fragment>
  );
}
