import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ClassSelect from "./components/class-select/ClassSelect";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/select" component={ClassSelect} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
