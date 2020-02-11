import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import Notif from "../includes/Notif";
import Chip from "@material-ui/core/Chip";

export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: "Firstname", field: "user_fname", editable: "never" },
      { title: "Surname", field: "user_lname", editable: "never" },
      { title: "Email", field: "user_email", editable: "never" },
      {
        title: "Type",
        field: "user_type",
        render: rowData => (
          <Chip
            label={rowData.user_type.toUpperCase()}
            color="primary"
            variant="outlined"
          />
        ),
        lookup: { student: "Student", mentor: "Mentor" }
      }
    ],
    data: []
  });

  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/all/users`)
      .then(res => {
        setState(state => ({ ...state, data: res.data }));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const editType = (newVal, id) => {
    Axios.patch(`${process.env.REACT_APP_DB_URL}/api/change/type/${id}`, {
      user_type: newVal
    })
      .then(res => {
        console.log(res);
        if (res.data) {
          setNotif(true);
          setMessage(`User type was changed to ${res.data[0].user_type}`);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteUser = id => {
    Axios.delete(`${process.env.REACT_APP_DB_URL}/api/delete/user/${id}`).catch(
      err => {
        console.error(err);
      }
    );
  };

  return (
    <React.Fragment>
      <Notif
        type="success"
        title="Successfully Updated"
        message={message}
        open={notif}
        setOpen={setNotif}
      />
      <MaterialTable
        title="Users List"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    editType(newData.user_type, newData.userd_id);
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  deleteUser(oldData.userd_id);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </React.Fragment>
  );
}
