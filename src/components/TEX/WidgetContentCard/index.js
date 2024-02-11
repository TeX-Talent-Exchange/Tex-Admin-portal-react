import React from "react";
import { Col, Row, Empty } from "antd";
import { Form } from "antd";
import Widget from "../../Widget";
import Auxiliary from "../../../util/Auxiliary";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../../appRedux/actions/DashboardTabs";
import { InteractionOutlined, LikeOutlined } from "@ant-design/icons";
const WidgetContentCard = (props) => {
  const { data, title, widgetClass, component } = props;
  const dispatch = useDispatch();
  const panes = useSelector(state => state.dashboardTabs.panes);
  const activeKey = useSelector(state => state.dashboardTabs.activeKey);
  const username = useSelector((state) => state.auth.authUser.username);
  const add = (tabTitle, content) => {
    dispatch(addTab(panes, tabTitle, content, activeKey));
  };
  let widgetData;
  var flag = 0
  if (data && data.length > 0) {
    widgetData = data.map((item, index) => (
      <div key={index} className="gx-form-group">
        <span className="widget-icon">
          {(title === "Case Information" && Array.isArray(data) && data?.length > 0) ? <LikeOutlined /> : null}
          {(title === "Interaction Information" && Array.isArray(data) && data?.length > 0) ? <InteractionOutlined /> : null}
          {/* <i className="icon-map-directions"></i> */}
        </span>
        <div className="custom-link" >
          <span className="title-response"> {item.Title}</span>
        </div>
      </div>
    ));
  } else {
    flag = 1
    widgetData = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  return (
    <Widget
      className="gx-card"
      styleName={`gx-card-full gx-dot-arrow-hover ${widgetClass}`}
      title={title}>
      <Auxiliary>
        <Form>
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <div className="gx-form-row0 data-view">
                {widgetData}
              </div>
            </Col>
          </Row>
          <div className="gx-dot-arrow">
            {/* eslint-disable-next-line */}
            <div className="gx-bg-primary gx-hover-arrow" onClick={flag === 0
              ? () => add(title, component)
              : null}>
              <div>
                <i className="icon icon-long-arrow-right gx-text-white" />
              </div>
            </div>
            <div className="gx-dot">
              <i className="icon icon-ellipse-v gx-text-primary" />
            </div>
          </div>
        </Form>
      </Auxiliary>
    </Widget>
  );
};

export default WidgetContentCard;