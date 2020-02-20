import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import QueueCounter from "./includes/QueueCounter";
import QueueViewer from "./includes/QueueViewer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BeingHelp from "../includes/BeingHelp";
import Chat from "../chat/Fab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DataContext from "./DataContext";
import Resolved from "../studentque/Resolved";
import io from "socket.io-client";
import StudentCount from "./includes/StudentCount";
import { Paper } from "@material-ui/core";
import EditForm from "./EditClass";

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
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchClassDetails(id);
    enrolledCountStudent(ids);
    fetchEnrollees(ids);
  }, [id, ids]);

  const fetchClassDetails = id => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/class/title/${id}`)
      .then(res => {
        console.log(res.data);
        setClassDetails(res.data);
      })
      .catch(err => console.error(err));
  };

  const fetchEnrollees = ids => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/get/enrollees/${ids}`)
      .then(res => setEnrollees(res.data))
      .catch(err => console.error(err));
  };

  const enrolledCountStudent = ids => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/get/enrolled/${ids}`)
      .then(res => setEnrolledCount(res.data[0].count))
      .catch(err => console.error(err.response));
  };

  const [initial, setInitial] = useState(true);
  const [queueList, setQueueList] = useState([]);
  const [beingHelp, setBeingHelp] = useState([]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      Axios({
        method: "get",
        url: `${process.env.REACT_APP_DB_URL}/api/class/${ids}/queue`
      })
        .then(response => setQueueList(response.data))
        .catch(error => console.error(error));

      Axios({
        method: "get",
        url: `${process.env.REACT_APP_DB_URL}/api/class/${ids}/help`
      })
        .then(response => setBeingHelp(response.data))
        .catch(error => console.error(error));
    }
    socket.emit("joinClass", { class_id: ids });
    socket.on("updateQueue", queue => setQueueList(queue));
    socket.on("updateHelp", help => setBeingHelp(help));
  }, [ids, queueList, initial]);

  useEffect(() => {
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_DB_URL}/api/class/${ids}/queue`
    })
      .then(response => setQueueList(response.data))
      .catch(error => console.error(error));
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_DB_URL}/api/class/${ids}/help`
    })
      .then(response => setBeingHelp(response.data))
      .catch(error => console.error(error));
  }, [ids]);

  const helpStudentFn = (queue_id, student_id, class_id) => {
    socket.emit(
      "help",
      { queue_id, student_id, class_id, mentor_id: classDetails.mentor_id },
      helping => {
        setBeingHelp(helping);
      }
    );
  };

  const dateFormat = date => {
    let d = new Date(date);
    return d.toDateString();
  };

  const removeFromQueueFn = (queue_id, student_id, class_id, tag_id) => {
    socket.emit(
      "leaveQueue",
      { queue_id, student_id, class_id, tag_id },
      queue => setQueueList(queue)
    );
  };

  const resolvedFn = (
    class_id,
    student_id,
    tag_id,
    mentor_id,
    queue_id,
    helping_id
  ) => {
    socket.emit(
      "resolved",
      { class_id, student_id, tag_id, mentor_id, queue_id, helping_id },
      helping => {
        setBeingHelp(helping);
      }
    );
  };
  return (
    <DataContext.Provider
      value={{ enrollees, fetchEnrollees, setEnrolledCount, enrolledCount }}
    >
      {console.log(1)}
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
              <Link color="inherit" to="/myclasslist">
                Handraiser
              </Link>
              <Link color="inherit" to="/myclasslist">
                My Class
              </Link>
              <Typography color="textPrimary">
                {classDetails.class_name}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3">{classDetails.class_name}</Typography>
            <Typography variant="caption">
              {dateFormat(classDetails.date_created) +
                " to " +
                dateFormat(classDetails.date_end) +
                " "}
            </Typography>

            <Link
              variant="subtitle1"
              to="#"
              onClick={() => {
                setVisible(true);
              }}
            >
              [edit]
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined" style={{ padding: 10 }}>
              <Typography variant="subtitle1">
                {classDetails.class_description}
              </Typography>
            </Paper>
          </Grid>

          <Grid item container spacing={1}>
            <Grid container item xs={12} sm={12} md={3} lg={3} spacing={1}>
              <Grid item xs={12}>
                <StudentCount count={enrolledCount} />
              </Grid>
              <Grid item xs={12}>
                <QueueCounter count={queueList.length} />
              </Grid>

              <Grid item xs={12}>
                <BeingHelp beingHelp={beingHelp} resolvedFn={resolvedFn} />
              </Grid>
              <Grid item xs={12}>
                <Resolved cid={ids} />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <QueueViewer
                queueList={queueList}
                removeFromQueueFn={removeFromQueueFn}
                helpStudentFn={helpStudentFn}
                beingHelp={beingHelp}
              />
            </Grid>
          </Grid>
        </Grid>
        <Chat />
      </div>
      <EditForm
        visible={visible}
        setVisible={setVisible}
        classDetails={classDetails}
        fetchClassDetails={fetchClassDetails}
        id={id}
      />
      <Chat />
    </DataContext.Provider>
  );
}
