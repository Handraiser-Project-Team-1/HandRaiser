import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Button,
  DialogTitle,
  Dialog,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
// require('dotenv').config()

const useStyles = makeStyles(theme => ({
  bot: {
    color: "white",
    margin: "5px",
    border: "none",
    backgroundColor: "grey",
    cursor: "pointer"
  },
  pic: {
    borderRadius: "50%",
    width: "15%",
    marginRight: "10px"
  }
}));

export default function Request(props) {
  const classes = useStyles();
  const { open, setOpen } = props;
  const [names, setNames] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    // console.log(process.env.REACT_APP_DB_URL, 'hi')
    axios.get(`${process.env.REACT_APP_DB_URL}/api/users`).then(res => {
      var temp = [];
      res.data.map(x => {
        temp.push({
          uid: x.userd_id,
          fname: x.user_fname,
          lname: x.user_lname,
          email: x.user_email,
          image: x.user_image
        });
        return temp;
      });
      setNames(temp);
    });
  }, []);
  const closeAdd = () => {
    setOpen(false);
  };
  const choose = e => {
    axios
      .post(`${process.env.REACT_APP_DB_URL}/api/user/${e.target.id}`, {
        userd_id: e.target.id,
        user_type: e.target.value
      })
      .then(res => {
        alert("Successfully assigned");
        setDisable(true);
      });
  };
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <Container component="main">
        <CssBaseline />
        <DialogTitle id="simple-dialog-title">
          Login Requests
          <Button color="primary" onClick={closeAdd}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        {names.map((x, id) => {
          return (
            <List key={id}>
              <ListItem>
                <img alt={x.image} src={x.image} className={classes.pic} />
                <ListItemText>
                  {x.lname}, {x.fname}
                </ListItemText>
                <button
                  onClick={choose}
                  value={"student"}
                  id={x.uid}
                  className={classes.bot}
                  disabled={disable}
                >
                  Student
                </button>
                <button
                  onClick={choose}
                  value={"mentor"}
                  id={x.uid}
                  className={classes.bot}
                  disabled={disable}
                >
                  Mentor
                </button>
                <Button>Send Key</Button>
              </ListItem>
            </List>
          );
        })}
        <Button type="submit" fullWidth variant="contained" color="primary">
          {" "}
          Add
        </Button>
      </Container>
    </Dialog>
  );
}
