import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardHeader
  // CardHeader
} from "@material-ui/core";
import NeedHelp from "./NeedHelp";
import BeingHelp from "../includes/BeingHelp";
import Chat from "../chat/Fab";
import QueueCounter from "../mentor/includes/QueueCounter";
// import Img from "../login/img/undraw_software_engineer_lvl5.svg";
import Help from "./HelpFab";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Resolved from "./Resolved";
import { Icon } from "antd";
import DataContext from '../mentor/DataContext';
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

  cover: {
    position: "relative",
    display: "flex",
    marginLeft: "25%",
    width: 1200,
    height: 250,
    opacity: 0.7,
 "@media(max-width: 1024px)":{
  position: "relative",
  display: "flex",
  opacity: 0.7,
  width: 500,
  height: 350,
 },
 "@media (max-width: 425px)" :{
  opacity: 0.7,
   marginTop: "10%"


 }
  },
  card: {
    display: "flex",
    marginTop: "-1.5%",
    width: "100%",
    height: 250,
    backgroundColor:
      "-webkit-linear-gradient(to right,#e3f2fd , #C9D6FF)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #E1F5FE, #42A5F5 )",
       /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

       "@media (max-width: 425px)" :{
        height: 300,

       }
  },
  content: {
    marginLeft: "1%",
    flex: '1 0 auto',
    position: "absolute",

  },
  que: {
    height: "100%"
  },
controls: {
    display: 'flex',
    position: "absolute",
    alignItems: 'center',
    marginLeft: 20,
    marginTop: theme.spacing(15),
    "@media (max-width: 425px)" :{
      position: "absolute",
      marginTop: "45%"
    }

  }
}));

export default function Que(props) {
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const match = useRouteMatch();
  const { socket } = useContext(DataContext);


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
  const [beingHelp, setBeingHelp] = useState([]);
  const [resolvedList, setResolvedList] = useState([]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_DB_URL}/api/class/${id}/queue`
      })
        .then(response => setQueueList(response.data))
        .catch(error => console.error(error));
      axios({
        method: "get",
        url: `${process.env.REACT_APP_DB_URL}/api/class/${id}/help`
      })
        .then(response => setBeingHelp(response.data))
        .catch(error => console.error(error));
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_DB_URL}/api/resolved/${id}`
      }).then(res => setResolvedList(res.data))
        .catch(error => console.error(error));
    }
    socket.emit("joinClass", { class_id: data.class_id });
    socket.on("updateQueue", queue => setQueueList(queue));
    socket.on("updateHelp", help => setBeingHelp(help));
    socket.on("updateResolved", resolved => setResolvedList(resolved));
    socket.on("redirectStudent", student => (student === data.student_id) && history.push('/classes'))
  }, [data, queueList, initial, id, history, socket]);

  const [tagVal, setTagVal] = useState("");

  const setTagValFn = val => {
    setTagVal(val);
  };

  const handraiseFn = () => {
    setTagVal("");
    // console.log(data.list_id)
    socket.emit(
      "handraise",
      { student_id: data.student_id, class_id: data.class_id, tag: tagVal, list_id: data.list_id },
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
    let queueBool = false;
    let helpBool = false;
    for (let queue of queueList) {
      if (queue.student_id === id) queueBool = true;
    }
    for (let help of beingHelp) {
      if (help.student_id === id) helpBool = true;
    }
    return queueBool === true || helpBool === true ? true : false;
  };

  const classes = useStyles();
  const [classDesc, setClassDesc] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DB_URL}/api/student/${localStorage.getItem('uid')}`)
      .then(res => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_DB_URL}/api/class/accept/${id}/${res.data[0].student_id}`
        }).then(res => {
          setClassDesc(res.data);
        });
      })

  }, [id]);

  useEffect(() => {
    props.setSelected(match.params.id);
  }, [props, match.params.id]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <Card className={classes.card} elevation={0} square={true}>
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
              src="https://graphiccave.com/wp-content/uploads/2015/06/Business-Workspace-PC-and-Laptop-Work-Vector-Pack-PNG-Graphic-Cave.png"
            />
          </Card> */}
             <Card className={classes.card} elevation={0} square={true}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
        <Typography component="h2" variant="h4">
                {classDesc[0] ? classDesc[0].cname : false}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {classDesc[0] ? classDesc[0].desc : false}
              </Typography>
        </CardContent>
        <div className={classes.controls}>
                {filterSelfFn(data.student_id) ? null : (
                  <Help
                    handraiseFn={handraiseFn}
                    tagVal={tagVal}
                    setTagValFn={setTagValFn}
                  />
                )}
              </div>
        
      </div>
      <CardMedia
              className={classes.cover}
              component="img"
              alt="Contemplative Reptile"
              height="220"
              src="https://graphiccave.com/wp-content/uploads/2015/06/Business-Workspace-PC-and-Laptop-Work-Vector-Pack-PNG-Graphic-Cave.png"
            />
    </Card>
        </Grid>

        <Grid item xs={12} sm={12} lg={3}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item>
              <QueueCounter count={queueList.length} />
            </Grid>
            <Grid item>
              <BeingHelp beingHelp={beingHelp} student={true} />
            </Grid>
            <Grid item>
              <Resolved resolvedList={resolvedList} />
            </Grid>
            <Grid xs={9} item></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={9}>
          <Card className={classes.que} variant="outlined">
            <CardHeader
              style={{ backgroundColor: "#fafafa" }}
              avatar={<Icon type="unordered-list" />}
              subheader="In Queue"
            />

            <NeedHelp
              queueList={queueList}
              student_id={data.student_id}
              removeFromQueueFn={removeFromQueueFn}
            />
          </Card>
        </Grid>
      </Grid>
      <Chat />
    </React.Fragment>
  );
}
