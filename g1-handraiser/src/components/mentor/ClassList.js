import React, { useState, useEffect } from "react";
import Axios from "axios";
import TopBar from "./TopBar";
import { Grid } from "@material-ui/core";
import MyClass from "./Table";
import AddClass from "./ClassForm";
import { Tabs, Modal } from "antd";
import { makeStyles } from "@material-ui/core/styles";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
const useStyles = makeStyles(theme => ({
  addbtn: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-auto-tabpanel-${index}`}
//       aria-labelledby={`scrollable-auto-tab-${index}`}
//       {...other}
//     >
//       {value === index && children}
//     </Typography>
//   );
// }
export default function ClassList(props) {
  const { TabPane } = Tabs;
  const classe = useStyles();
  const [setValue] = useState(0);
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

  const handleDelete = id => {
    confirm({
      title: "Are you sure delete this task?",
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
            <Typography color="textPrimary">My Class</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <AddClass
        fetchClass={fetchClass}
        setValue={setValue}
        setClasses={setClasses}
      />
      <Grid container spacing={1} className={classe.grid}>
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

        {/* <Grid item xs={12} md={1}>
          <VerticalTabs value={value} setValue={setValue} />
        </Grid>
        <Grid item xs={12} md={11}>
          <TabPanel value={value} index={0}>
          
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12} md={4}>
             
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item xs={12} md={4}>
              <Queue />
            </Grid>
          </TabPanel>
        </Grid> */}
      </Grid>
    </TopBar>
  );
}
