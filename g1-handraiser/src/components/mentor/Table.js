import React, { useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import { Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import update from "immutability-helper";
import { Divider } from "antd";
import { Empty } from "antd";
import IconButton from "@material-ui/core/IconButton";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { Icon, Button } from "antd";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
export default function SimpleTable({ myClass, handleDelete, setClasses }) {
  const classes = useStyles();
  let history = useHistory();
  let date = new Date();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/class`).then(res => {
      res.data.map(x => {
        let datecreated = new Date(x.date_end);
        if (datecreated.getUTCDate() + 1 === date.getUTCDate()) {
          Axios.patch(
            `${process.env.REACT_APP_DB_URL}/api/update/class/status/${x.class_id}`,
            { class_status: "off" }
          )
            .then(res => {
              return res;
            })
            .catch(err => console.error(err));
        }
        return x;
      });
    });
  }, [date, myClass]);
  const handleSwitch = (i, cId) => event => {
    const newVal = event.target.checked ? "on" : "off";
    Axios.patch(
      `${process.env.REACT_APP_DB_URL}/api/update/class/status/${cId}`,
      { class_status: newVal }
    )
      .then(res => {
        const arr = update(myClass, {
          [i]: { class_status: { $set: newVal } }
        });
        setClasses(arr);
      })
      .catch(err => console.error(err));
  };
  const dateFormat = date => {
    let d = new Date(date);
    return d.toDateString();
  };
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#fafafa" }}>
          <TableRow>
            <TableCell style={{ width: "6%", color: "gray" }}>
              <Icon type="tag" /> Status
            </TableCell>
            <TableCell style={{ color: "gray" }}>
              <Icon type="project" /> Class
            </TableCell>
            <TableCell style={{ color: "gray" }}>
              <Icon type="info-circle" /> Description
            </TableCell>
            <TableCell style={{ width: "10%", color: "gray" }} align="right">
              <Icon type="calendar" /> Start
            </TableCell>
            <TableCell style={{ width: "10%", color: "gray" }} align="right">
              <Icon type="calendar" /> End
            </TableCell>
            <TableCell style={{ width: "12%", color: "gray" }}>
              {" "}
              <Icon type="interaction" /> Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myClass.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <Switch
                  checked={row.class_status === "on" ? true : false}
                  value={row.i}
                  color="primary"
                  onChange={handleSwitch(i, row.class_id)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.class_name}
              </TableCell>
              <TableCell>{row.class_description}</TableCell>
              <TableCell align="right">
                {dateFormat(row.date_created)}
              </TableCell>
              <TableCell align="right">{dateFormat(row.date_end)}</TableCell>
              <TableCell>
                <Button
                  type="primary"
                  ghost
                  variant="outlined"
                  onClick={() => {
                    history.push(`/myclasslist/${row.class_id}/${row.slug}`)
                    sessionStorage.setItem('sessionId',row.class_id)
                  }
                  }
                >
                  <Icon type="eye" />
                  View
                </Button>
                <Divider type="vertical" />
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
          {myClass.length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />{" "}
              </TableCell>
            </TableRow>
          ) : (
            false
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
