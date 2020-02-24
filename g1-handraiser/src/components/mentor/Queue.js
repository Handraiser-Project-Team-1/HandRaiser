import React, { useEffect, useState, useContext } from "react";
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
import StudentCount from "./includes/StudentCount";
import { Paper } from "@material-ui/core";
import EditForm from "./EditClass";
import EnrolleesCount from "./includes/EnrolleesCount";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paddingBread: {
    marginBottom: theme.spacing(2)
  }
}));

export default function Queue(props) {
  const { socket } = useContext(DataContext);
  let { id, ids } = useParams();
  const classes = useStyles();
  const [classDetails, setClassDetails] = useState({});
  const [enrollees, setEnrollees] = useState([]);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchClassDetails(ids);
    enrolledCountStudent(ids);
    fetchEnrollees(ids);
  }, [id, ids]);

  const fetchClassDetails = id => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/class/title/${id}`)
      .then(res => {
        setClassDetails(res.data);
      })
      .catch(err => console.error(err));
  };

  const fetchEnrollees = ids => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/get/enrollees/${ids}`)
      .then(res => {
        setPendingCount(
          res.data.filter(element => element.status === "pending").length
        );
        setEnrollees(res.data);
      })
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
  const [resolvedList, setResolvedList] = useState([]);

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

      Axios({
        method: "get",
        url: `${process.env.REACT_APP_DB_URL}/api/resolved/${ids}`
      })
        .then(res => setResolvedList(res.data))
        .catch(error => console.error(error));
    }
    socket.emit("joinClass", { class_id: ids });
    socket.on("updateQueue", queue => setQueueList(queue));
    socket.on("updateHelp", help => setBeingHelp(help));
    socket.on("updateResolved", resolved => setResolvedList(resolved));
    //socket.on("redirectStudent", () => reloadAllStateFn(ids));
  }, [ids, queueList, initial, socket]);

  const reloadAllStateFn = class_id => {
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_DB_URL}/api/class/${class_id}/queue`
    })
      .then(response => setQueueList(response.data))
      .catch(error => console.error(error));
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_DB_URL}/api/class/${class_id}/help`
    })
      .then(response => setBeingHelp(response.data))
      .catch(error => console.error(error));
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_DB_URL}/api/resolved/${class_id}`
    })
      .then(res => setResolvedList(res.data))
      .catch(error => console.error(error));
  };

  const helpStudentFn = (queue_id, student_id, class_id, list_id) => {
    socket.emit(
      "help",
      {
        queue_id,
        student_id,
        class_id,
        mentor_id: classDetails.mentor_id,
        list_id
      },
      helping => {
        setBeingHelp(helping);
        reloadAllStateFn(ids);
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
        reloadAllStateFn(ids);
      }
    );
  };

  const removeStudentFn = student_id => {
    socket.emit("removeStudent", { class_id: ids, student_id }, () => {
      console.log("ids");
      reloadAllStateFn(ids);
    });
  };

  return (
    <DataContext.Provider
      value={{
        enrollees,
        fetchEnrollees,
        setEnrolledCount,
        enrolledCount,
        pendingCount,
        setPendingCount
      }}
    >
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
                <EnrolleesCount count={enrolledCount} />
              </Grid>
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
                <Resolved resolvedList={resolvedList} />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <QueueViewer
                queueList={queueList}
                removeFromQueueFn={removeFromQueueFn}
                helpStudentFn={helpStudentFn}
                beingHelp={beingHelp}
                fetchEnrollees={fetchEnrollees}
                ids={ids}
                removeStudentFn={removeStudentFn}
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
        id={ids}
      />
      <Chat />
    </DataContext.Provider>
  );
}
