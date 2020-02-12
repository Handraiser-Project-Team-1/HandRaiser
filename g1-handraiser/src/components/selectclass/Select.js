import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
// import CardClass from "../includes/CardClass";
import Layout from "../includes/TopBar";
import Notif from "../includes/Notif";
import { Card, Icon, Avatar } from "antd";
import axios from 'axios';

export default function Select(props) {
  const { Meta } = Card;
  var history = useHistory();
  const [notif, setNotif] = useState(true);
  const [user, setUser] = useState({
    fname: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [classlist, setClassList] = useState([]);
  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
  });

  useEffect(() => {
    if (localStorage.getItem("tokenid")) {
      history.push('/classes')
      axios({
        method: "post",
        url: `${process.env.REACT_APP_DB_URL}/api/user`,
        data: { tokenObj: localStorage.getItem("tokenid") }
      }).then(res => {
        res.data.map(x => {
          setUser({
            fname: x.user_fname,
          });
          return setUser;
        });
      });
      axios.get(`${process.env.REACT_APP_DB_URL}/api/class/list`)
        .then(res => {
          setClassList(res.data);
        }).catch(err => {
          console.log(err)
        })
      axios.get(`${process.env.REACT_APP_DB_URL}/api/all/users`)
        .then(res => {
          setAllUsers(res.data);
        }).catch(err => {
          console.log(err)
        })
    } else {
      history.push("/");
    }
  }, [history]);

  const onJoin = (data) => {
    console.log(user.fname + ' request to join class ' + data)
  }

  return (
    <Layout {...props}>
      <Notif
        type="success"
        title={`${user.fname}`}
        message="Welcome to your dashboard — check it out!"
        open={notif}
        setOpen={setNotif}
      />
      <Grid container spacing={2}>
        {/* <CardClass /> */}
        {classlist.map(res => (
          res.class_status === 'on' ?
            <Grid item key={res.class_id}>
              <Card
                style={{ width: 320 }}
                cover={
                  <img
                    alt="example"
                    src="data:image/jpeg;base64,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"
                  />
                }
                actions={[
                  <IconFont type="icon-tuichu" />, //ENTER CLASS ICON
                  <Button color="primary" size="small" onClick={() => onJoin(res.class_name)}>
                    Join
              </Button>
                ]}
              >
                {allUsers.map(ress => {
                  if (ress.userd_id === res.mentor_id) {
                    return (
                      <Meta
                        avatar={
                          <Avatar src={ress.user_image} />
                        }
                        title={res.class_name}
                        description={"Mentor: " + ress.user_fname + " " + ress.user_lname}
                      />
                    )
                  } else {
                    return null
                  }
                })}

              </Card>
            </Grid>
            :
            null
        ))}

      </Grid>
    </Layout>
  );
}