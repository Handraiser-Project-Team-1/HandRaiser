import React, { useState } from "react";
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

export default function ClassList(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
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

  const submit = () => {
    setLoading(true);
    if (name && description && startDate && endDate) {
      let id = localStorage.getItem("id");
      const slug = slugify(name);
      Axios.post(`${process.env.REACT_APP_DB_URL}/api/create/class/${id}`, {
        name,
        description,
        startDate,
        endDate,
        slug
      })
        .then(res => {
          setTimeout(() => {
            setVisible(false);
          }, 1000);
          setDescription("");
          setName("");
          setStartDate("");
          setEndDate("");
          props.fetchClass();
          props.setValue(0);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <React.Fragment>
      <Button
        icon="plus"
        type="primary"
        variant="contained"
        ghost
        onClick={showModal}
      >
        Add Class
      </Button>
      <Modal
        visible={visible}
        title="Create Class"
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
            onClick={() => submit()}
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
