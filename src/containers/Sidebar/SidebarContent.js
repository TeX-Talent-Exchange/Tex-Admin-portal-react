import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import {
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import { SidebarJson } from "./sidebarJson";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  let { navStyle, themeType } = useSelector(({ settings }) => settings);
  let { pathname } = useSelector(({ common }) => common);
  const roleType = useSelector(({ auth }) => auth?.authUser?.roleType);
  const handleMenuClick = (event, action, title) => {
  };

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  const selectedKeys = pathname.substr(1);
  // const defaultOpenKeys = selectedKeys.split("/")[1];
  // const defaultOpenKeys = window.location.href.includes('uams') ? 'serviceability' : selectedKeys.split("/")[1];
  var defaultOpenKeys = "";
  const getURLparam = window.location.pathname;
  if (getURLparam.indexOf("cip") > -1) {
    defaultOpenKeys = "cip";
  } else {
    defaultOpenKeys = selectedKeys.split("/")[1];
  }

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <MenuItemGroup
              key="main"
              className="gx-menu-group"
              title={<IntlMessages id="sidebar.main" />}
            >
              {roleType &&
                SidebarJson[roleType]?.map((section, index) => (
                  <MenuItemGroup key={index} className="user-menu">
                    <SubMenu
                      key={section.key}
                      className={getNavStyleSubMenuClass(navStyle)}
                      title={
                        <span>
                          {" "}
                          <i className={`icon ${section.icon}`} />
                          <span>{section.title}</span>
                        </span>
                      }
                    >
                      {section.menuItems.map((menuItem, key) => (
                        <Menu.Item key={menuItem.key}>
                          <Link
                            to={menuItem.linkTo}
                            onClick={() =>
                              !menuItem.navigateUrl
                                ? handleMenuClick(
                                    "navEvent",
                                    "Side Navigation",
                                    "Dashboard- Customer 360"
                                  )
                                : window.open(
                                    menuItem.navigateUrl,
                                    menuItem.tab
                                  )
                            }
                          >
                            <i className={`icon ${menuItem.icon}`} />
                            {menuItem.title}
                          </Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  </MenuItemGroup>
                ))}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
