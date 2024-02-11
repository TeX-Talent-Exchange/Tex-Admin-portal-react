import React, { Component } from "react";
import { Layout, Button, Modal, Input } from "antd";
import { Link, withRouter } from "react-router-dom";
import { switchLanguage, toggleCollapsedSideNav } from "../../appRedux/actions/Setting";
import { fetchActiveAlerts, showAlertPopup } from "../../appRedux/actions/Alerts"
import UserProfile from "../Sidebar/UserProfile";
import Auxiliary from "util/Auxiliary";

import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "../../constants/ThemeSetting";
import { connect } from "react-redux";
import { AlertOutlined } from "@ant-design/icons";
//import PushAlertModal from "../../pages/WinleadPages/Alerts/PushAlerts";
import { Highlight } from "../../components/commons/Highlight";

const { Header } = Layout;


const AccountStatusField = {
  "A": "Active",
  "S": "Suspended"
}


export const AlertMessages = ({ alerts }) => {
  return (
    alerts.map((data, key) => {
      return (
        <div key={key}>
          <p className={`alert p-${data.PRIORITY}`}>{data.ALERT_MSG}</p>
        </div>
      )
    })
  )
}

class Topbar extends Component {

  constructor(props) {
    super(props)
    this.searchRef = React.createRef()
  }

  state = {
    searchText: '',
    loading: false,
    visible: false
  };

  componentDidMount() {
    if (this.props.authUser) {
      const { roleType } = this.props.authUser
      if (roleType.includes("omai")) {
        this.props.fetchActiveAlerts(this.props.auth)
        this.setState({ visible: true })
      }
    }
  }

  componentDidUpdate() {
    if (this.props.auth) {
      if (this.props.showPopup) {
        if (this.props.activeAlerts.length === 0) {
          this.props.fetchActiveAlerts(this.props.auth)
        }
        this.setState({ visible: true });
        this.props.showAlertPopup(false)
      }
    }
  }

  showModal = () => {
    if (this.props.activeAlerts.length === 0) {
      this.props.fetchActiveAlerts(this.props.auth)
    }
    this.setState({
      visible: true,
    });
  };


  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.showAlertPopup(false)
  };



  render() {
    const { width, navCollapsed, navStyle, accountName, accountStatus, authUser, activeAlerts, omaiAccountName, location, vipStatus, collectionState } = this.props;

    const { visible } = this.state;
    const { Search } = Input;
    let showStatus = location.pathname.includes("customer360") || location.pathname.includes("account-overview") || location.pathname.includes("lead-overview") ? true : false;


    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
            <div className="gx-linebar gx-mr-3">
              <i className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                }}
              />
            </div> : null}
          <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
            <img alt="" src={require("assets/images/logo.png")} /></Link>
          {showStatus && accountName && accountName !== "-" && !location.pathname.includes("lead-overview") ? (
            <div style={{ "textTransform": "uppercase" }}>{accountName}
              {accountStatus && AccountStatusField[accountStatus] ?
                <Highlight
                  value={AccountStatusField[accountStatus]}
                  className={"account-status"}
                  color={accountStatus === "A" ? "Active" : "in-active"}
                /> : ""}
            </div>) : ""}
          {/* Role type condition will be removed when we get collectionstate data */}
          {showStatus && (authUser?.roleType.includes("omai") || authUser?.roleType.includes("winleadadmin")) ? (
            <><div>{omaiAccountName}</div>
              {collectionState && collectionState !== "-" && !location.pathname.includes("lead-overview") ? <div className="collection-status">
                {"Collection State #"}
                <Highlight
                  value={collectionState}
                  className={"account-status"}
                  color={collectionState === "Y" ? "Active" : "in-active"}
                />
              </div> : ""}</>
          ) : (
            ""
          )}
          {showStatus && !location.pathname.includes("lead-overview") && vipStatus ? <img className="vip-status" alt={'VIP'} src="https://ucip-assets-dev.s3.ap-southeast-1.amazonaws.com/images/vip.png" /> : ""}
          <ul className="gx-header-notifications gx-ml-auto ucip-notification">
            <Auxiliary>
              {
                (authUser?.roleType.includes("omai") ||
                  authUser?.roleType.includes("winleadadmin") ||
                  authUser?.roleType.includes("superadmin")
                ) &&
                <>
                  {location.pathname.includes("lead-overview") ?
                    <li>
                      <Search ref={el => this.searchRef = el} placeholder="Lead Search" className="win-search-btn" onSearch={val => this.onSearch(val)} enterButton />
                    </li> : ""}
                  <li>
                    <Button type="default" className="gx-mb-0 ant-btn-md ucip-alert ant-btn-magenta" icon={<AlertOutlined />} size="small"
                      onClick={this.showModal} >
                      <span style={{ marginLeft: '5px', letterSpacing: '0.6px' }}>ALERTS</span>
                    </Button>
                  </li>
                </>
              }
              <li><UserProfile /></li>
            </Auxiliary>
          </ul>
        </Header>
        <Modal
          title={`Alerts`}
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.handleCancel}
          okText="OKAY"
          className="ucip-modal"
          maskClosable={false}
          cancelButtonProps={{ style: { display: 'none' } }}
          width={1000}
        >
          <div className="ucip-alert-messages">
            <AlertMessages alerts={activeAlerts} />
          </div>
        </Modal>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ settings, account, auth, alerts, leadSearchOMAI, WinbackInfo }) => {
  const { locale, navStyle, navCollapsed, width } = settings;
  const { authUser } = auth
  const { activeAlerts, showPopup } = alerts
  return { locale, navStyle, navCollapsed, width, authUser, auth, activeAlerts, showPopup }
};

export default withRouter(connect(mapStateToProps, { toggleCollapsedSideNav, switchLanguage, fetchActiveAlerts, showAlertPopup })(Topbar))

