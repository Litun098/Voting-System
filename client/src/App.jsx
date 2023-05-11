import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Home from "./page/Home";
import AddPoll from "./page/AddPoll";
import Results from "./page/Results";
import Register from "./page/Register";
import Login from "./page/Login";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add-poll">
          <AddPoll />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
