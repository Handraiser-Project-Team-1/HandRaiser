import React, { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Grid
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grid: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
    margin: 5
  }
}));
function UserType({ setNotifDetailsFn, openNofif, getUserFn, userid }) {
  const classes = useStyles();

  const [userType, setUserType] = useState("");
  const [disable, setDisable] = useState(true);

  const handleChange = e => {
    setDisable(false);
    setUserType(e.target.value);
  };

  const sendKeyFn = e => {
    e.preventDefault();
    axios({
      // url: `${process.env.REACT_APP_DB_URL}/api/key`,
      url: `http://localhost:3001/api/key`,
      method: "POST",
      data: { id: userid, type: userType }
    })
      .then(() => {
        getUserFn();
        setNotifDetailsFn("success", "Success!", "Authentication key sent!  ");
        openNofif();
      })
      .catch(error => {
        setNotifDetailsFn("error", "Oops!", "Please try again later!");
        openNofif();
      });
  };
  return (
    <form onSubmit={sendKeyFn}>
      <Grid container spacing={3} className={classes.grid}>
        <FormControl error={disable}>
          <Select
            id="userType-select"
            value={userType}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>User Type</em>
            </MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="mentor">Mentor</MenuItem>
          </Select>
          {disable && <FormHelperText>Choose User Type</FormHelperText>}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={disable}
          type="submit"
        >
          Send Key
        </Button>
      </Grid>
    </form>
  );
}

export default UserType;
