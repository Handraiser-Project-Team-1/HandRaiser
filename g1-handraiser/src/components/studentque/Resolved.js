import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Icon, Avatar, Divider } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Tag } from "antd";

const useStyles = makeStyles({
  table: {
    minWidth: 50
  }
});
function Resolved({ resolvedList }) {
  const classes = useStyles();
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
            {resolvedList.map((x, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell scope="row" style={{ color: "gray" }}>
                      <Avatar icon="user" /> {x.fname} {x.lname} 
                      <Divider type="vertical"/>
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
