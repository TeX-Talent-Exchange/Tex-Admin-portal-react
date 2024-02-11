import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const TEXPages = ({ match, user }) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}/customer360`} component={asyncComponent(() => import('./Customer360'))} />
    </Switch>
  </div>
);

export default TEXPages;
