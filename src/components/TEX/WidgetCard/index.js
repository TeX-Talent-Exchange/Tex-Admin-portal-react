import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Empty, Form } from "antd";
import Widget from "../../Widget";
import Auxiliary from "../../../util/Auxiliary";
// import CustomScrollbars from "util/CustomScrollbars";
import { apiKeyFormat } from "../../../util/Helper";
import { addTab } from "../../../appRedux/actions/DashboardTabs";
import {GetPackageInfo} from "../WidgetCard/GetPackageInfo";
import { LoadingOutlined } from "@ant-design/icons";
import { GetOTTInfo } from "./GetOTTInfo";
import { GetTransactionHistory } from "./GetTransactionHistory";
import NextflixTransactionList from "../../../widgets/NetflixTransactionList";
import TransactionHistory from "../../../widgets/TransactionHistory"
import { WidgetTable } from "./widgetTable";

const WidgetCard = (props) => {
  const { data, title, widgetClass, component, loader, headerText, tableData, records, headData } = props;
  const dispatch = useDispatch();
  const panes = useSelector((state) => state.dashboardTabs.panes);
  const username = useSelector((state) => state.auth.authUser.username);
  const activeKey = useSelector((state) => state.dashboardTabs.activeKey);
  const add = (tabTitle, content) => {
    let titleText = tabTitle.length > 0 ? tabTitle : headerText;
    dispatch(addTab(panes, titleText, content, activeKey));
  };

  const loadWidget = () => {
    if(title === 'Billing Summary'){
      return (
        <>
          <div
            className={`${
              title === "Billing Summary" && data?.object ? "gx-form-row0 data-view" : ""
            }`}
          >
            {Object.keys(data).length > 0 && Object.keys(data.object).length > 0 ? (
              Object.keys( Array.isArray(data.object) ? data.object[0] : data.object).map((key, i) => (
                <div className="gx-form-group" key={i}>
                  <label className="ant-col-md-12" name="Key">
                    {apiKeyFormat(key)}
                  </label>
                  <label name="divider"> : </label>
                  <label name="Value">
                    {Array.isArray(data.object)
                      ? `${data.object[0][key] ? data.object[0][key] : "-"}`
                      : `${data.object[key] ? data.object[key] : "-"}`}
                  </label>
                </div>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
          <div>
            {title === "Billing Summary" && data?.object && Object.keys(data.object).length > 0 ? (
              <GetTransactionHistory
                widgetClass={widgetClass}
                component={
                  <div className="widget-tab">
                    <TransactionHistory />
                  </div>
                }
              />
            ) : (
              ""
            )}
          </div>
        </>
);
    }
    if(loader && title === 'Subscription Information'){
      return(
        <div className="spin-center">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      )
    }else{
      return (
        <>
          <div className={`${(title === 'Subscription Information' && data?.object && data.object?.length > 0 ) ? 'gx-form-row0 data-view with-pkg' : 'gx-form-row0 data-view'}`}>
            { (Object.keys(data).length > 0 && Object.keys(data.object).length > 0) ? (
              Object.keys(
                Array.isArray(data.object) ? data.object[0] : data.object
              ).map((key, i) => (
                <div className="gx-form-group" key={i}>
                  <label className="ant-col-md-12" name="Key">
                    {apiKeyFormat(key)}
                  </label>
                  <label name="divider"> : </label>
                  <label name="Value">
                    {Array.isArray(data.object)
                      ? `${data.object[0][key] ?data.object[0][key] : '-'}`
                      : `${data.object[key] ? data.object[key] : '-'}`
                    }
                  </label>                      
                </div>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            
          </div>
          <div>{(title === "Subscription Information" &&  data?.object && data.object?.length > 0 ) ? <GetPackageInfo packageInfo={ data.object[0].Packages ? data.object[0].Packages : null} /> : null } </div>
          <div>{(title === "Subscription Information" && data?.object && data.object?.length > 0 ) ? <GetOTTInfo widgetClass={widgetClass} component={<div className="widget-tab"><NextflixTransactionList /></div>} /> : "" }</div>
        </>
      )
    }
  }
  return (
    <Widget
      className="gx-card"
      styleName={`gx-card-full gx-dot-arrow-hover ${widgetClass}`}
      title={title}
    >
      <Auxiliary>
        <Form>
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              {!tableData ?loadWidget(): <WidgetTable tableData={tableData} records={records} headData={headData}/>}
              {/* <div className="gx-form-row0 data-view"> */}
              {/* <div className={`${(title === 'Subscription Information' && data?.object && data.object?.length > 0 ) ? 'gx-form-row0 data-view with-pkg' : 'gx-form-row0 data-view'}`}>
                { (Object.keys(data).length > 0 && Object.keys(data.object).length > 0) ? (
                  Object.keys(
                    Array.isArray(data.object) ? data.object[0] : data.object
                  ).map((key, i) => (
                    <div className="gx-form-group" key={i}>
                      <label className="ant-col-md-12" name="Key">
                        {apiKeyFormat(key)}
                      </label>
                      <label name="divider"> : </label>
                      <label name="Value">
                        {Array.isArray(data.object)
                          ? `${data.object[0][key] ? data.object[0][key] : '-'}`
                          : `${data.object[key] ? data.object[key] : '-'}`
                        }
                      </label>                      
                    </div>
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
                
              </div>
              <div>{(title === "Subscription Information" &&  data?.object && data.object?.length > 0 ) ? <GetPackageInfo packageInfo={ data.object[0].Packages ? data.object[0].Packages : null} /> : null } </div> */}
                
            </Col>
          </Row>
          <div className="gx-dot-arrow">
             {/* eslint-disable-next-line */}
            <div className="gx-bg-primary gx-hover-arrow" onClick={
                  data.object && Object.keys(data.object).length > 0
                    ? () => add(title, component)
                    : null
                }>             
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
export default WidgetCard;
