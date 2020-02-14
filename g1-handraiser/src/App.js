import React, { createContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Select from "./components/selectclass/Select";
import Login from "./components/login/LoginInterface";
import Welcome from "./components/superadmin/Welcome";
import Admin from "./components/superadmin/admin";
import ClassList from "./components/mentor/ClassList";
import Que from "./components/studentque/Que";
import Queue from "./components/mentor/Queue";
import page404 from "./components/includes/Page404";
import Authentication from "./components/login/Keyauth";
import PermissionLoading from "./components/includes/PermissionLoading";
require("dotenv").config();

export const JWTContext = createContext({});

export default function App() {
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
            path="/queue/:id"
            render={props => <Queue {...props} active="classlist" />}
          />
          <Route
            exact
            path="/class/:id"
            render={props => <Que {...props} active="1" />}
          />
          <Route
            exact
            path="/permission"
            render={props => <PermissionLoading active="loading" />}
          />
          <Route exact path="/administrator" component={Welcome} />
          <Route exact path="/admin" component={Admin} />
          <Route
            exact
            path="/myclasslist"
            render={props => <ClassList {...props} active="classlist" />}
          />
          <Route component={page404} />
        </Switch>
      </JWTContext.Provider>
    </BrowserRouter>
  );
}
