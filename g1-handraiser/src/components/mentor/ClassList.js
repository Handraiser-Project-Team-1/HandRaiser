import React, { useState, useEffect } from "react";
import Axios from "axios";
import TopBar from "./TopBar";
import { Grid } from "@material-ui/core";
import MyClass from "./Table";
import AddClass from "./ClassForm";
import page404 from "../includes/Page404";
import Que from "./Queue";
import { Tabs, Modal } from "antd";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Notification from "../includes/Notif";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

export default function ClassList(props) {
  let match = useRouteMatch();
  const { TabPane } = Tabs;
  const [setValue] = useState(0);
  const [notif, setNotif] = useState(false);
  const [classes, setClasses] = useState([]);
  const { confirm } = Modal;

  const fetchClass = () => {
    let id = localStorage.getItem("uid");
    if (id) {
      Axios.get(`${process.env.REACT_APP_DB_URL}/api/mentor/class/${id}`)
        .then(res => setClasses(res.data))
        .catch(err => console.error(err));
    }
  };
  useEffect(fetchClass, []);
  useEffect(() => {
    if (localStorage.getItem("success")) {
      localStorage.removeItem("success");
      setNotif(true);
    }
  }, []);

  const handleDelete = id => {
    confirm({
      title: "Are you sure delete this class?",
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        Axios.delete(`${process.env.REACT_APP_DB_URL}/api/delete/class/${id}`)
          .then(res => {
            fetchClass();
          })
          .catch(err => console.error(err));
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  return (
    <TopBar active={props.active}>
      <Notification
        type="success"
        title="Hi mentor!"
        message="Always do your best in teaching your student!"
        open={notif}
        setOpen={setNotif}
      />
      <Switch>
        <Route path={`${match.path}/:ids/:id`} component={Que} />
        <Route exact path={match.path}>
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
                <Typography color="textPrimary">My Class</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <AddClass
            fetchClass={fetchClass}
            setValue={setValue}
            setClasses={setClasses}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="List of Classes" key="1">
                  <MyClass
                    myClass={classes}
                    setClasses={setClasses}
                    handleDelete={handleDelete}
                  />
                </TabPane>
              </Tabs>
            </Grid>
          </Grid>
        </Route>
        <Route component={page404} />
      </Switch>
    </TopBar>
  );
}
