import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InQueue from "./Viewer/InQueue";
import QueueDone from "./Viewer/QueueDone";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function QueueViewer({
  queueList,
  removeFromQueueFn,
  helpStudentFn,
  beingHelp,
  ids,
  fetchEnrollees,
  removeStudentFn
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (fetchEnrollees, ids) => (event, newValue) => {
    setValue(newValue);
    fetchEnrollees(ids);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange(fetchEnrollees, ids)}
        aria-label="simple tabs example"
      >
        <Tab label="On Queue" {...a11yProps(0)} />
        <Tab label="Student list" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <InQueue
          queueList={queueList}
          removeFromQueueFn={removeFromQueueFn}
          helpStudentFn={helpStudentFn}
          beingHelp={beingHelp}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <QueueDone removeStudentFn={removeStudentFn} />
      </TabPanel>
    </div>
  );
}
