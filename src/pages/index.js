import React from "react";
import { Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import { AuthRoute } from "../components/TEX/AuthRoute";
import { roles } from "../util/Helper";

const App = ({ match, user }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <AuthRoute path={`${match.url}admin`} user={user} roles={[roles.SuperAdmin]} component={asyncComponent(() => import('./AdminPages'))} />
    </Switch>
  </div>
);

export default App;
