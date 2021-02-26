import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import SignIn from "../components/SignIn";
import Books from '../components/Books'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/books" component={Books} />
      </Switch>
    </Router>
  );
}
