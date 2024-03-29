import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, roles, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = user?.idToken;
      const currentUser = user?.authUser;
      if (!token) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      // check if route is restricted by role
      if (roles && roles.indexOf(currentUser?.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      return <Component {...props} />;
    }}
  />
);
