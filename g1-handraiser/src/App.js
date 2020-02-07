import React, { createContext, useEffect, useState } from "react";
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
import Axios from "axios";
require("dotenv").config();

export const JWTContext = createContext({});

export default function App() {
  const [key, setKey] = useState();

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_DB_URL}/api/admin`).then(res => {
      setKey(res.data[0].admin_pass);
    });
  }, []);

  return (
    <BrowserRouter>
      <JWTContext.Provider>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Login {...props} active="login" />}
          />
          <Route
            exact
            path="/authentication"
            render={props => (
              <Authentication {...props} active="authentication" />
            )}
          />
          <Route
            exact
            path="/classes"
            render={props => <Select {...props} active="classes" />}
          />
          <Route
            exact
            path="/queue"
            render={props => <Queue {...props} active="boomcamp" />}
          />
          <Route
            exact
            path="/class/:id"
            render={props => <Que {...props} active="1" />}
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
                keys={localStorage.getItem("pass")}
                active="admin"
              />
            )}
          />
          <Route component={page404} />
        </Switch>
      </JWTContext.Provider>
    </BrowserRouter>
  );
}
