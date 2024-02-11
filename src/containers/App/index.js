import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLSearchParams from "url-search-params";
import { Redirect } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from "../../appRedux/actions/Setting";

import { AuthRoute } from "../../components/TEX/AuthRoute";
import { fetchUserDetails } from "../../appRedux/actions";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK,
} from "../../constants/ThemeSetting";
import { RoleConfig } from "./RoleConfig";

const App = (props) => {
  const { match, location } = props;

  const dispatch = useDispatch();

  const locale = useSelector(({ settings }) => settings.locale);
  const navStyle = useSelector(({ settings }) => settings.navStyle);
  const themeType = useSelector(({ settings }) => settings.themeType);
  const layoutType = useSelector(({ settings }) => settings.layoutType);
  const CurrentUser = useSelector(({ auth }) => auth);
  // const  roleId = (CurrentUser && CurrentUser.authUser) ? CurrentUser.authUser.roleId : "";
  const roleType = useSelector(({ auth }) => auth?.authUser?.roleType);

  useEffect(() => {
    if (!CurrentUser.authUser) {
      if (CurrentUser.idToken) {
        dispatch(fetchUserDetails());
      }
    }
    // eslint-disable-next-line
  }, [dispatch, CurrentUser.idToken]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("theme")) {
      dispatch(setThemeType(params.get("theme")));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get("nav-style")));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get("layout-type")));
    }
  }, [dispatch, location.search]);

  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("full-layout");
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove("full-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("boxed-layout");
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("full-layout");
      document.body.classList.add("framed-layout");
    }
  };

  const setNavStyle = (navStyle) => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add("full-scroll");
      document.body.classList.add("horizontal-layout");
    } else {
      document.body.classList.remove("full-scroll");
      document.body.classList.remove("horizontal-layout");
    }
  };

  if (themeType === THEME_TYPE_DARK) {
    document.body.classList.add("dark-theme");
  }

  if (location.pathname === "/") {
    if (RoleConfig[roleType]) {
      return <Redirect to={RoleConfig[roleType]} />;
    } else {
      return <Redirect to={"/cip/customer360"} />;
    }
  }

  setLayoutType(layoutType);

  setNavStyle(navStyle);

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <AuthRoute
          path={`${match.url}`}
          user={CurrentUser}
          component={MainApp}
        />
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
