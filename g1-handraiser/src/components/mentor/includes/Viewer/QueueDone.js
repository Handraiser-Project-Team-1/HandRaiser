import React, { useState, useContext } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import Divider from "@material-ui/core/Divider";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import IconButton from "@material-ui/core/IconButton";
import { List, Avatar, Button, Icon } from "antd";
import CustomizedSnackbars from "../../../includes/Notif";
import DataContext from "../../DataContext";
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

function StudentList({ removeStudentFn }) {
  const classes = useStyles();
  let { ids } = useParams();
  const {
    enrollees,
    fetchEnrollees,
    setEnrolledCount,
    setPendingCount
  } = useContext(DataContext);
  const [message, setMessage] = useState({});
  const [notif, setNotif] = useState(false);

  // useEffect(() => {
  //   console.log(enrollees)
  //   fetchEnrollees(ids);
  // }, [fetchEnrollees, ids]);

  const handleConfirm = (status, listId, s_id) => {
    if (status === "accept") {
      Axios.patch(
        `${process.env.REACT_APP_DB_URL}/api/update/enrollees/status/${listId}/${status}`
      )
        .then(res => {
          setEnrolledCount(prev => parseInt(prev) + 1);
          setNotif(true);
          setMessage({
            title: "Success!",
            type: "success",
            msg: "You successfully enrolled the student!"
          });
          fetchEnrollees(ids);
        })
        .catch(err => console.error(err));
    } else {
      Axios.delete(
        `${process.env.REACT_APP_DB_URL}/api/decline/enrollees/${listId}`
      )
        .then(res => {
          if (status === "remove") setEnrolledCount(prev => parseInt(prev) - 1);
          if (status === "decline")
            setPendingCount(prev => parseFloat(prev) - 1);

          setNotif(true);
          setMessage({
            title: "Information!",
            type: "info",
            msg: `You decline/remove a student`
          });
          removeStudentFn(s_id);
          fetchEnrollees(ids);
        })
        .catch(err => console.error(err));
    }
  };

  const checkStatus = (data, listId, s_id) => {
    if (data === "pending") {
      return [
        <Button
          onClick={() => handleConfirm("accept", listId, s_id)}
          type="primary"
          ghost
        >
          <Icon type="check-circle" /> Accept
        </Button>,
        <Button
          onClick={() => handleConfirm("decline", listId, s_id)}
          type="primary"
          ghost
        >
          <Icon type="close-circle" /> Decline
        </Button>
      ];
    } else
      return [
        <Button
          icon="delete"
          onClick={() => handleConfirm("remove", listId, s_id)}
          type="primary"
          ghost
        >
          Delete
        </Button>
      ];
  };

  return (
    <div className={classes.padding}>
      <CustomizedSnackbars
        type={message.type}
        title={message.title}
        message={message.msg}
        open={notif}
        setOpen={setNotif}
      />
      <List
        itemLayout="horizontal"
        dataSource={enrollees}
        renderItem={item => (
          <List.Item actions={checkStatus(item.status, item.l_id, item.s_id)}>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              // title={<a href="https://ant.design">{item.title}</a>}
              title={`${item.fname} ${item.lname}`}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default StudentList;
