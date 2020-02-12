import React, { useState, useEffect } from "react";
import Axios from "axios";
import TopBar from "./TopBar";
import { Grid } from "@material-ui/core";
import VerticalTabs from "./Tabs";
import MyClass from "./Table";
import AddClass from "./ClassForm";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Typography>
  );
}
export default function ClassList(props) {
  const [value, setValue] = useState(0);
  const [classes, setClasses] = useState([]);

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
    Axios.delete(`${process.env.REACT_APP_DB_URL}/api/delete/class/${id}`)
      .then(res => {
        fetchClass();
      })
      .catch(err => console.error(err));
  };

  return (
    <TopBar active={props.active}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={1}>
          <VerticalTabs value={value} setValue={setValue} />
        </Grid>
        <Grid item xs={12} md={11}>
          <TabPanel value={value} index={0}>
            <MyClass
              myClass={classes}
              setClasses={setClasses}
              handleDelete={handleDelete}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12} md={4}>
              <AddClass
                fetchClass={fetchClass}
                setValue={setValue}
                setClasses={setClasses}
              />
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </TopBar>
  );
}
