import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import "assets/vendors/style";
import "styles/wieldy.less";

import configureStore, { history } from './appRedux/store';
import App from "./containers/App/index";
import SignIn from "./pages/SignIn"
import { ResetPassword } from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import InfoView from "./components/InfoView"

const { store, persistor } = configureStore();

const NextApp = () =>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" exact component={SignIn} />
          <Route path="/resetPassword" exact component={ResetPassword} />
          <Route path="/forgotPassword" exact component={ForgotPassword} />
          <Route path="/" component={App} />
        </Switch>
        <InfoView />
      </ConnectedRouter>
    </PersistGate>
  </Provider>


export default NextApp;
