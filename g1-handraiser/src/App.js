import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Select from "./components/selectclass/Select";
import Login from "./components/login/LoginInterface";
import Admin from "./components/superadmin/admin";
import Queue from "./components/mentor/Queue";
import Key from "./components/login/Keyauth";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/classes"
          render={props => <Select {...props} active="classes" />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} active="login" />}
        />
        <Route
          exact
          path="/queue"
          render={props => <Queue {...props} active="boomcamp" />}
        />
        <Route
          exact
          path="/admin"
          render={props => <Admin {...props} actove="admin" />}
        />
        <Route
          exact
          path="/key"
          render={props => <Key {...props} actove="key" />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
