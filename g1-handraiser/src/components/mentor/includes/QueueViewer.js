import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

const columns = [
  {
    id: 'name',
    label: 'Student on Queue',
    minWidth: 120,
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    minWidth: 120,
  },
  {
    id: 'remove',
    label: 'Remove',
    minWidth: 300,
    align: 'right',
  },
  {
    id: 'checked',
    label: 'Help',
    minWidth: 50,
    align: 'right',
  },
];

function createData(name, status, remove, checked) {
  return { name, status, remove, checked };
}

const rows = [
  createData(
    'India',
    'Being Helped',
    <IconButton>
      <DeleteIcon color="secondary" />
    </IconButton>,
    <IconButton>
      <CheckIcon color="secondary" />
    </IconButton>
  ),
  createData(
    'China',
    'Waiting',
    <IconButton>
      <DeleteIcon color="secondary" />
    </IconButton>,
    <IconButton >
      <CheckIcon color="secondary" />
    </IconButton>
  ),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '85vh',
    maxHeight: '85vh',
  },
});

export default function QueueViewer() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}