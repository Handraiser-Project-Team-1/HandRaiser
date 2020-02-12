import React, { useState } from "react";
import Axios from "axios";
import TopBar from "./TopBar";
import { Grid, Paper } from "@material-ui/core";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CustomizedSnackbars from "../includes/Notif";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const submit = () => {
    if (name && description && startDate && endDate) {
      let id = localStorage.getItem("id");
      // console.log(id);
      Axios.post(`${process.env.REACT_APP_DB_URL}/api/create/class/${id}`, {
        name,
        description,
        startDate,
        endDate
      })
        .then(res => {
          setOpen(true);
          setDescription("");
          setName("");
          setStartDate("");
          setEndDate("");
          // console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <TopBar active={props.active}>
      <CustomizedSnackbars
        open={open}
        setOpen={setOpen}
        type="success"
        title="Success"
        message="Class successfully created!"
      />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          ClassList
        </Grid>
        <Grid item container xs={4} spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.root} variant="outlined" square>
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
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                  onClick={() => submit()}
                >
                  Create Class
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </TopBar>
  );
}
