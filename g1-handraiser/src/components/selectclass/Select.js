import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
// import CardClass from "../includes/CardClass";
import Notif from "../includes/Notif";
import { Card, Avatar, Icon } from "antd";
import axios from "axios";

export default function Select(props) {
  const { Meta } = Card;
  var history = useHistory();
  const [notif, setNotif] = useState(true);
  const [user, setUser] = useState({
    fname: ""
  });
  const [classlist, setClassList] = useState([]);
  const [joinedClass, setJoinedClass] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("tokenid")) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_DB_URL}/api/type/${localStorage.getItem(
          "uid"
        )}`
      }).then(res => {
        res.data.map(x => {
          if (x.user_type === "student") {
            //  history.push("/classes");
            axios({
              method: "post",
              url: `${process.env.REACT_APP_DB_URL}/api/user`,
              data: { tokenObj: localStorage.getItem("tokenid") }
            }).then(res => {
              res.data.map(x => {
                setUser({
                  fname: x.user_fname
                });
                return setUser;
              });
            });
            axios
              .get(`${process.env.REACT_APP_DB_URL}/api/class/list`)
              .then(res => {
                setClassList(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (x.user_type === "mentor") {
            history.push("/myclasslist");
          }
          return x;
        });
      });
    } else {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
   fetch()
    getClasslist()
  }, []);

  const getClasslist = () => {
    axios
      .get(`${process.env.REACT_APP_DB_URL}/api/class/list`)
      .then(res => {
        setClassList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  } 

  const fetch = () => {
    let user_id = localStorage.getItem("uid");
    axios
      .get(`${process.env.REACT_APP_DB_URL}/api/joined/class/${user_id}`)
      .then(res => {
        setJoinedClass(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      
  };

  const onJoin = cid => {
    const user_id = localStorage.getItem("uid");
    axios
      .post(`${process.env.REACT_APP_DB_URL}/api/join/class`, {
        user_id,
        cid
      })
      .then(() => {
        fetch();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onEnter = e => {
    history.push(`/classes/${e}`);
    props.setSelected(e);
    localStorage.setItem("cid", `${e}`);
    sessionStorage.setItem('sessionId', e)
    //window.location.reload(true);
    // console.log(e)
  };

  const verify = data => {
    const find = joinedClass.find(element => element.class_id === data);
    // console.log(find);

    if (find) {
      switch (find.student_status) {
        case "pending":
          return (
            <Button color="primary" size="small"   startIcon={<Icon type="hourglass" spin/>}>
              Pending
            </Button>
          );
        case "accept":
          return (
            <Button color="primary" size="small" onClick={() => onEnter(data)}   startIcon={<Icon type="enter" />}>
              Enter
            </Button>
          );
        default:
          return null;
      }
    } else {
      return (
        <Button color="primary" size="small" onClick={() => onJoin(data)}   startIcon={<Icon type="form" />}>
          Enroll
        </Button>
      );
    }
  };

  return (
    <>
      <Notif
        type="success"
        title={`${user.fname}`}
        message="Welcome to your dashboard — check it out!"
        open={notif}
        setOpen={setNotif}
      />
      <Grid container spacing={2}>
        {classlist.map((res, i) => (
          <Grid item key={i}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://image.freepik.com/free-vector/computer-desk-workplace-concept_61090-39.jpg"   
                />
              }
              actions={[<React.Fragment>{verify(res.c_id)}</React.Fragment>]}
            >
              <Meta
                avatar={<Avatar src={res.image} />}
                title={res.cname}
                description={"Mentor: " + res.fname + " " + res.lname}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
