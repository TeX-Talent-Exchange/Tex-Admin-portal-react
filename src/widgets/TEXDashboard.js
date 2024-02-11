import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Button } from "antd";
import { addTab } from "../appRedux/actions/DashboardTabs";
import { TEXDashboardJson } from "./TEXDashboardJson";

const TEXDashboard = (props) => {
  const authorizedComponents = useSelector(
    ({ auth }) => auth?.authUser?.components
  );
  const roleType = useSelector(({ auth }) => auth?.authUser?.roleType);
  const dispatch = useDispatch();
  const panes = useSelector((state) => state.dashboardTabs.panes);
  const activeKey = useSelector((state) => state.dashboardTabs.activeKey);
  const username = useSelector((state) => state.auth.authUser.username);
  const add = (title, content) => {
    dispatch(addTab(panes, title, content, activeKey));
  };

  const [result, updateResult] = useState([]);
  useEffect(() => {
    let arr = [];
    Object.keys(TEXDashboardJson).forEach((widget) => {
      let Component;
      let Icon;
      let path = TEXDashboardJson[widget].path;
      try {
        Component = require(`./${path}`).default;
        Icon = require("@ant-design/icons")[TEXDashboardJson[widget].icon];
        if (
          Component &&
          (authorizedComponents.includes(widget) || roleType === "superadmin")
        ) {
          let obj = {};
          obj.ele = Component;
          obj.info = TEXDashboardJson[widget];
          obj.icon = Icon;
          arr.push(obj);
        }
      } catch {
        return null;
      }
      updateResult(arr);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Row className="ant-col-data">
        {result.map((Component, index) =>
          !Component.info.button ? (
            <Col
              xl={Component.info.xl}
              lg={Component.info.lg}
              md={Component.info.md}
              sm={Component.info.sm}
              xs={Component.info.xs}
              order={Component.info.order}
            >
              <div className="cust360-widget" key={index}>
                <Component.ele isWinlead={Component.info.isWinlead} />
              </div>
            </Col>
          ) : null
        )}
        <Col xl={24} lg={24} md={24} sm={24} xs={24} order={18}>
          <div
            className="cust360-widget full-width"
            style={{ padding: "0px 0px 15px 0", textAlign: "center" }}
          >
            {result.map((Component, index) =>
              Component.info.button ? (
                <Button
                  onClick={(event) =>
                    add(
                      Component.info.component,
                      <div className="widget-tab">
                        <Component.ele isWinlead={Component.info.isWinlead} />
                      </div>
                    )
                  }
                  style={{ width: "193px" }}
                  icon={<Component.icon />}
                  type="primary"
                  className="ant-btn-custom"
                >
                  {Component.info.title}
                </Button>
              ) : null
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TEXDashboard;
