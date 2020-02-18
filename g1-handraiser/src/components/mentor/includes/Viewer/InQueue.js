import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Avatar, Button, Badge } from "antd";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  typography: {
    padding: theme.spacing(2)
  },
  userBackground: {
    background: "#f3f5f7"
  },
  Card: {
    "@media (max-width:768px)": {
      hidden: true
    }
  },
  padding: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

function InQueue({queueList,removeFromQueueFn}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List
        itemLayout="horizontal"
        dataSource={queueList}
        renderItem={(item, i) => (
          <List.Item actions={[<Button onClick={() => removeFromQueueFn(item.queue_id,item.student_id,item.class_id,item.tag_id)}>Remove</Button>, <Button id={console.log(item)}>Help</Button>]}>
            <List.Item.Meta
              avatar={
                <Badge count={i + 1}>
                  <Avatar src={item.image} />
                </Badge>
              }
              // title={<a href="https://ant.design">{item.title}</a>}
              title={item.name}
              description={item.tag}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default InQueue;
