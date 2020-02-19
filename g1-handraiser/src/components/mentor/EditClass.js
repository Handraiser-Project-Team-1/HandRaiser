import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { Button, Modal } from "antd";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(2)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "90%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function EditClassForm(props) {
  const classes = useStyles();
  const { visible, setVisible, classDetails, fetchClassDetails, id } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  const dateFormat = date => {
    //  console.log(date);
    if (date) {
      date = new Date(date);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      return year + "-" + month + "-" + dt;
    }
  };

  useEffect(() => {
    setName(classDetails.class_name);
    setDescription(classDetails.class_description);
    setStartDate(dateFormat(classDetails.date_created));
    setEndDate(dateFormat(classDetails.date_end));
  }, [classDetails]);
  const handleCancel = () => {
    setVisible(false);
  };

  function slugify(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  const submit = (fetchClassDetails, id) => {
    setLoading(true);
    if (name && description && startDate && endDate) {
      console.log(name, description, startDate, endDate, classDetails.class_id);

      const slug = slugify(name);
      Axios.patch(
        `${process.env.REACT_APP_DB_URL}/api/edit/class/${classDetails.class_id}`,
        {
          name,
          description,
          startDate,
          endDate,
          slug
        }
      )
        .then(res => {
          setTimeout(() => {
            setVisible(false);
          }, 1000);
          setDescription("");
          setName("");
          setStartDate("");
          setEndDate("");

          fetchClassDetails(id);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <React.Fragment>
      {/* <Button
        icon="plus"
        type="primary"
        variant="contained"
        ghost
        onClick={showModal}
      >
        Add Class
      </Button> */}
      <Modal
        visible={visible}
        title="Edit Class"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            ghost
            icon="plus"
            type="primary"
            color="primary"
            size="default"
            className={classes.button}
            loading={loading}
            onClick={() => submit(fetchClassDetails, id)}
          >
            Create Class
          </Button>
        ]}
      >
        {" "}
        <Paper className={classes.root} elevation={0} square>
          <Grid item xs={12}>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Class Name
              </InputLabel>
              <BootstrapInput
                id="name"
                placeholder="Name"
                fullWidth={true}
                value={name}
                autoComplete="off"
                onChange={e => {
                  console.log(e.target.value);
                  setName(e.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Class Description
              </InputLabel>
              <BootstrapInput
                id="description"
                placeholder="Description"
                fullWidth={true}
                autoComplete="off"
                value={description}
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={6}>
              <FormControl className={classes.margin} fullWidth={true}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Start Date
                </InputLabel>
                <BootstrapInput
                  id="startDate"
                  placeholder="Start Date"
                  type="date"
                  value={startDate}
                  fullWidth={true}
                  onChange={e => {
                    setStartDate(e.target.value);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.margin} fullWidth={true}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  End Date
                </InputLabel>
                <BootstrapInput
                  id="endDate"
                  placeholder="End Date"
                  fullWidth={true}
                  type="date"
                  value={endDate}
                  onChange={e => {
                    setEndDate(e.target.value);
                  }}
                  style={{ width: "94%" }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}
