import React from "react";
import ReactDOM from "react-dom";

import NextApp from "./NextApp";
import registerServiceWorker from "./registerServiceWorker";
import { AppContainer } from "react-hot-loader";
// Add this to get the device information
import { isMobile } from "react-device-detect";
// Mobile page not available Template
import InvalidInMobile from "./util/InvalidInMobile";

// Wrap the rendering in a function:
const render = (Component) => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

// Do this once
registerServiceWorker();

// Content Loading function;
const renderContent = () => {
  /** Site Security - Right Click functionality  */
  /** Comment below line in local dev environment -Start */
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  document.addEventListener('keydown', (e) => {
    // disable F12 key
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });
  /** -End */
  if (isMobile) {
    return InvalidInMobile;
  }
  return NextApp;
};

// Check for the Mobile Device
render(renderContent());

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./NextApp", () => {
    render(NextApp);
  });
}
