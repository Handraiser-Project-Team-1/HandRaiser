import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import Divider from "@material-ui/core/Divider";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import IconButton from "@material-ui/core/IconButton";
import { List, Avatar, Button } from "antd";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "50%"
  },
  padding: {
    padding: theme.spacing(2)
  },
  gridList: {
    height: 700
  },
  Card: {
    marginTop: 5
  },
  bg: {
    backgroundColor: "#42b0fe",
    color: "#fff",
    fontSize: "5px "
  }
}));

function StudentList() {
  const classes = useStyles();
  const data = [
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ];
  return (
    <div className={classes.padding}>
      <GridList className={classes.gridList} cols={1}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg" />
                }
                // title={<a href="https://ant.design">{item.title}</a>}
                title="Marcial M. Norte Jr"
              />
              <List.Item
                actions={[<Button>Accept</Button>, <Button>Decline</Button>]}
              ></List.Item>
            </List.Item>
          )}
        />
      </GridList>
    </div>
  );
}

export default StudentList;
