import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const AdminPages = ({ match, user }) => (
  <div>
    <Switch>
      <Route path={`${match.url}/home`} component={asyncComponent(() => import('./HomePage'))} />
      <Route path={`${match.url}/users`} component={asyncComponent(() => import('./Users'))} />
      <Route path={`${match.url}/components`} component={asyncComponent(() => import('./Components'))} />
      <Route path={`${match.url}/groups`} component={asyncComponent(() => import('./Groups'))} />
      <Route path={`${match.url}/policies`} component={asyncComponent(() => import('./Policies'))} />
      <Route path={`${match.url}/roles`} component={asyncComponent(() => import('./Roles'))} />
      <Route path={`${match.url}/avidtag`} component={asyncComponent(() => import('./AvidTags'))} />
    </Switch>
  </div>
);

export default AdminPages;
