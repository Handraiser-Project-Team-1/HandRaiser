import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Select from "./components/selectclass/Select";
import Queue from "./components/mentor/Queue";

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
          path="/queue"
          render={props => <Queue {...props} active="classes" />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
