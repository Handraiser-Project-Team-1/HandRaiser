import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Select from "./components/selectclass/Select";
import Queue from "./components/mentor/Queue";
// import Login from "./components/login/Login";
import Admin from "./components/superadmin/admin"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/classes"
          render={props => <Select {...props} active="classes" />}
        />
        {/* <Route
          exact
          path="/login"
          render={props => <Login {...props} active="login" />}
        /> */}
        <Route
          exact
          path="/queue"
          render={props => <Queue {...props} active="boomcamp" />}
        />
        <Route
          exact
          path="/admin"
          render={props => <Admin {...props} actove="admin"/>}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
