import React, {useState} from 'react';
import { FormControl, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';
import axios from 'axios';

function UserType({setNotifDetailsFn, openNofif, getUserFn, userid}) {

  const [userType, setUserType] = useState('');
  const [disable, setDisable] = useState(true);

  const handleChange = (e) => {
    setDisable(false);
    setUserType(e.target.value);
  }

  const sendKeyFn = (e) => {
    e.preventDefault();
    axios({
      // url: `${process.env.REACT_APP_DB_URL}/api/key`,
      url: `http://localhost:3001/api/key`,
      method: 'POST',
      data: { id: userid, type: userType }
    })
    .then(() => {
      getUserFn();
      setNotifDetailsFn("success", "Success!", "Authentication key sent!");
      openNofif();
    })
    .catch( error => {
      setNotifDetailsFn("error", "Oops!", "Please try again later!");
      openNofif();
    })
  }
  return (
    <form onSubmit={sendKeyFn}>
      <FormControl error={disable}>
        <Select
        id="userType-select"
        value={userType}
        onChange={handleChange}
        displayEmpty
        style={{marginRight: 10}}
        >
            <MenuItem value="" disabled>
                <em>User Type</em>
            </MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="mentor">Mentor</MenuItem>
        </Select>
        {(disable) && <FormHelperText>Choose User Type</FormHelperText>}
      </FormControl>
      <Button variant="contained" color="primary" disabled={disable} type="submit">
          Send Key
      </Button>
    </form>
  )
}

export default UserType;
