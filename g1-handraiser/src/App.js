import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Select from "./components/selectclass/Select";
import Login from "./components/login/LoginInterface";
import Welcome from "./components/superadmin/welcome";
import Admin from "./components/superadmin/admin";
import Queue from "./components/mentor/Queue";
import Que from "./components/studentque/Que";
import page404 from "./components/includes/Page404";
import Authentication from "./components/login/Keyauth";
require('dotenv').config()

function App() {
  var makeid = length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  var key = makeid(5);
  return (
    <BrowserRouter>
      {console.log(process.env)}
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
          path="/welcome"
          render={props => <Welcome {...props} keys={key} active="welcome" />}
        />
        <Route
          exact
          path="/admin"
          render={props => (
            <Admin
              {...props}
              keys={localStorage.getItem("key")}
              active="admin"
            />
          )}
        />
        <Route
          exact
          path="/class/:id"
          render={props => <Que {...props} active="1" />}
        />
        <Route
          exact
          path="/authentication"
          render={props => <Authentication {...props} active="authentication" />}
        />
        <Route component={page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
