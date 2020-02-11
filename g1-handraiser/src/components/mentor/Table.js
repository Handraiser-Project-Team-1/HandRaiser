import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

import IconButton from "@material-ui/core/IconButton";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable({ myClass, handleDelete, setClasses }) {
  const classes = useStyles();
  console.log(myClass);

  const handleSwitch = data => {
    console.log(data);
  };
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Class</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Student</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End</TableCell>
            <TableCell style={{ width: "10%" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myClass.map((row, i) => (
            <TableRow key={row.class_id}>
              <TableCell component="th" scope="row">
                <Switch
                  checked={row.class_status === "on" ? true : false}
                  color="primary"
                  onChange={handleSwitch(i)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.class_name}
              </TableCell>
              <TableCell align="right">{row.class_description}</TableCell>

              <TableCell align="right">0</TableCell>
              <TableCell align="right">{row.date_created}</TableCell>
              <TableCell align="right">{row.date_end}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" size="small">
                  View
                </Button>
                <IconButton
                  aria-label="delete"
                  style={{ color: "red" }}
                  onClick={() => handleDelete(row.class_id)}
                >
                  <ClearOutlinedIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
