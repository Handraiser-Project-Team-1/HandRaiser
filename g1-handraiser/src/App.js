import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ClassSelect from "./components/class-select/ClassSelect";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/classes"
          render={props => <ClassSelect {...props} active="classes" />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
