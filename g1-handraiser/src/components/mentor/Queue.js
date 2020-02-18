import TopBar from "./TopBar";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import QueueCounter from "./includes/QueueCounter";
import QueueViewer from "./includes/QueueViewer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BeingHelp from "../includes/BeingHelp";
import Chat from "../chat/Fab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DataContext from "./DataContext";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_DB_URL);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paddingBread: {
    marginBottom: theme.spacing(2)
  }
}));

export default function Queue(props) {
  let { id, ids } = useParams();
  const classes = useStyles();
  const [classDetails, setClassDetails] = useState({});
  const [enrollees, setEnrollees] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/class/title/${id}`)
      .then(res => {
        setClassDetails(res.data);
      })
      .catch(err => console.error(err));

    fetchEnrollees(ids);
  }, [id, ids]);

  const fetchEnrollees = ids => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/get/enrollees/${ids}`)
      .then(res => setEnrollees(res.data))
      .catch(err => console.error(err));
  };

  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    Axios({
      method: 'get',
      url: `${process.env.REACT_APP_DB_URL}/api/class/${ids}/queue`
    })
    .then(response => setQueueList(response.data))
    .catch(error => console.error(error));
    socket.emit("joinClass", {class_id: ids});
    socket.on("updateQueue", queue => {
      setQueueList(queue);
    });
  },[ids])

  const removeFromQueueFn = (queue_id,student_id,class_id,tag_id) => {
    socket.emit("leaveQueue", { queue_id,student_id,class_id,tag_id }, queue => setQueueList(queue));
  }

  // useEffect(() => {
  //   if (localStorage.getItem("tokenid")) {
  //     Axios({
  //       method: "get",
  //       url: `${process.env.REACT_APP_DB_URL}/api/type/${localStorage.getItem(
  //         "uid"
  //       )}`
  //     }).then(res => {
  //       res.data.map(x => {
  //         if (x.user_type === "mentor") {
  //           history.push("/queue");
  //         } else if (x.user_type === "student") {
  //           history.push("/classes");
  //         }
  //         return x;
  //       });
  //     });
  //   }
  // }, [history]);

  return (
    <TopBar active={props.active}>
      <DataContext.Provider value={{ enrollees, fetchEnrollees }}>
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
          >
            <Grid item>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                className={classes.paddingBread}
              >
                <Link color="inherit" href="#">
                  Handraiser
                </Link>
                <Link color="inherit" href="/myclasslist">
                  My Class
                </Link>
                <Typography color="textPrimary">
                  {classDetails.class_name}
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                spacing={1}
              >
                <Grid item>
                  <QueueCounter count={queueList.length}/>
                </Grid>

                <Grid item>
                  <BeingHelp />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9}>
              <QueueViewer queueList={queueList} removeFromQueueFn={removeFromQueueFn}/>
            </Grid>
          </Grid>
        </div>
        <Chat />
      </DataContext.Provider>
    </TopBar>
  );
}
