import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Icon, Avatar } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Tag } from "antd";
import Axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 50
  }
});
function Resolved({ cid }) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/resolved/${cid}`).then(
      res => {
        return setData(res.data);
      }
    );
  }, [cid]);

  return (
    <div>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#fafafa" }}>
            <TableRow>
              <TableCell style={{ width: "6%", color: "gray" }}>
                <Icon type="tag" /> Resolved
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((x, i) => {
              return (
                <TableRow key={i}>
                  <TableCell scope="row" style={{ color: "gray" }}>
                    <Avatar icon="user" /> {x.fname} {x.lname}
                    <Tag key="tag" color="blue">
                      {x.tag}
                    </Tag>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Resolved;
