import React, { useState, useEffect } from "react";
import Layout from "../includes/TopBar";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent
} from "@material-ui/core";
import NeedHelp from "./NeedHelp";
import BeingHelp from "../includes/BeingHelp";
import Chat from "../chat/Fab";
import QueueCounter from "../mentor/includes/QueueCounter";
import Img from "../login/img/undraw_software_engineer_lvl5.svg";
import Help from "./HelpFab";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_DB_URL);
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    flexGrow: 1
  },
  widget: {
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "16vh"
  },

  img: {
    width: 700,
    height: 250,
    opacity: 0.9
  },
  card: {
    display: "flex",
    width: "100%",
    height: 250,
    backgroundColor:
      "-webkit-linear-gradient(to right,#e3f2fd , #C9D6FF)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #E1F5FE, #42A5F5 )" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
  content: {
    flex: "1 0 auto"
  },
  que: {
    height: "100%"
  },
  help: {
    display: "flex",
    marginTop: "6%",
    marginLeft: "2%",
    color: "gray"
  }
}));

export default function Que(props) {
  const history = useHistory();

  const [data, setData] = useState([]);
  const { id } = useParams();
  const match = useRouteMatch();

  useEffect(() => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DB_URL}/api/class/${id}`,
      data: { tokenData: localStorage.getItem("tokenid") }
    })
      .then(response => setData(response.data))
      .catch(error => {
        let err = String(error)
          .match(/\w+$/g)
          .join();
        if (err === "404") {
          history.push("/notFound");
          return;
        }
        console.error(error);
      });
  }, [history, id]);

  const [queueList, setQueueList] = useState([]);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_DB_URL}/api/class/${id}/queue`
      })
        .then(response => setQueueList(response.data))
        .catch(error => console.error(error));
    }
    socket.emit("joinClass", { class_id: data.class_id });
    socket.on("updateQueue", queue => {
      setQueueList(queue);
    });
  }, [data, queueList, initial, id, history]);

  const [tagVal, setTagVal] = useState("");

  const setTagValFn = val => {
    setTagVal(val);
  };

  const handraiseFn = () => {
    socket.emit(
      "handraise",
      { student_id: data.student_id, class_id: data.class_id, tag: tagVal },
      queue => setQueueList(queue)
    );
  };

  const removeFromQueueFn = (queue_id, student_id, class_id, tag_id) => {
    socket.emit(
      "leaveQueue",
      { queue_id, student_id, class_id, tag_id },
      queue => setQueueList(queue)
    );
  };

  const filterSelfFn = id => {
    let filter = false;
    for (let queue of queueList) {
      if (queue.student_id === id) filter = true;
    }
    return filter;
  };

  const classes = useStyles();
  const [classDesc, setClassDesc] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_DB_URL}/api/class/accept/${id}`
    }).then(res => {
      setClassDesc(res.data);
    });
  }, [id]);

  useEffect(() => {
    props.setSelected(match.params.id);
  }, [props, match.params.id]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card className={classes.card} elevation={0} square={true}>
            <CardContent className={classes.content}>
              <Typography component="h2" variant="h4">
                {classDesc[0] ? classDesc[0].cname : false}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {classDesc[0] ? classDesc[0].desc : false}
              </Typography>
              <div className={classes.help}>
                {filterSelfFn(data.student_id) ? null : (
                  <Help
                    handraiseFn={handraiseFn}
                    tagVal={tagVal}
                    setTagValFn={setTagValFn}
                  />
                )}
              </div>{" "}
            </CardContent>
            <CardMedia
              className={classes.img}
              component="img"
              alt="Contemplative Reptile"
              height="220"
              src={Img}
            />
          </Card>
        </Grid>

        <Grid item container spacing={1}>
          <Grid item xs={3}>
            <QueueCounter count={queueList.length} />

            <BeingHelp />
          </Grid>
          <Grid xs={9} item>
            <Card className={classes.que} variant="outlined">
              <NeedHelp
                queueList={queueList}
                student_id={data.student_id}
                removeFromQueueFn={removeFromQueueFn}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Chat />
    </React.Fragment>
  );
}
