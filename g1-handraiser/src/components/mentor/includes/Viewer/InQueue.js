import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Avatar, Button, Badge, Icon } from "antd";

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

const data = [
  {
    avatar:
      "https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg",
    firstName: "Marcial",
    lastName: "Norte",
    tag: "Cant Merge my dev branch"
  },
  {
    avatar:
      "https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg",
    firstName: "Marcial",
    lastName: "Norte",
    tag: "Cant Merge my dev branch"
  }
];

function InQueue() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, i) => (
          <List.Item
            actions={[
              <Button type="primary" ghost>
                <Icon type="minus-circle" /> Remove
              </Button>,
              <Button type="primary" ghost>
                <Icon type="question-circle" /> Help
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Badge count={i + 1} style={{ backgroundColor: "#42b0ff" }}>
                  <Avatar src={item.avatar} />
                </Badge>
              }
              // title={<a href="https://ant.design">{item.title}</a>}
              title={`${item.firstName} ${item.lastName}`}
              description={item.tag}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default InQueue;
