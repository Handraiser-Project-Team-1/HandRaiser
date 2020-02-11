import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CardClass from "../includes/CardClass";
import Layout from "../includes/TopBar";
import Notif from "../includes/Notif";
import axios from 'axios';

export default function Select(props) {
  var history = useHistory()
  const [notif, setNotif] = useState(true);
  const [user, setUser] = useState({
    fname: "",
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
    } else {
      history.push("/");
    }
  },[history])
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
        <Grid item>
          <CardClass
            title="BoomCamp 2019"
            date="Joined: September 14, 2016"
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like"
            mentor="Daniel Nebreja"
          />
        </Grid>
        <Grid item>
          <CardClass
            title="Python Programming"
            date={false}
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like"
            mentor="Roby Eslava"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
