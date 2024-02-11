import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Empty } from "antd";
import Auxiliary from "../../../util/Auxiliary";
import Widget from "../../Widget";
import { apiKeyFormat } from "../../../util/Helper";
import { addTab } from "../../../appRedux/actions/DashboardTabs";


const WidgetTableAccordianData = (props) => {
    const { data, widgetClass, title, component } = props;

    const dispatch = useDispatch();
    const panes = useSelector((state) => state.dashboardTabs.panes);
    const activeKey = useSelector((state) => state.dashboardTabs.activeKey);

    const add = (tabTitle, content) => {
        dispatch(addTab(panes, tabTitle, content, activeKey));
    };

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
                            <div className="gx-form-group border-box" style={{paddingLeft:'10px', margin:'0 15px',height: '185px', overflow: 'hidden'}}>
                                <div
                                    className="sub-head"
                                    style={{ fontWeight: "500", marginBottom: "10px" }}
                                >
                                    Active Credits
                                </div>
                                <div className="gx-form-row0 data-view">
                                    {data?.data && Object.keys(data?.data.activeCredits).length > 0 ? (
                                        Object.keys(data?.data.activeCredits[0]).map((key, i) => (
                                            <div className="gx-form-group" key={i}>
                                                <label className="ant-col-md-12" name="Key">
                                                    {apiKeyFormat(key)}
                                                </label>
                                                <label name="divider"> : </label>
                                                <label name="Value">{data.data.activeCredits[0][key]}</label>
                                            </div>
                                        ))
                                    ) : (
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="gx-dot-arrow">
                        {/* eslint-disable-next-line */}
                        <div className="gx-bg-primary gx-hover-arrow" onClick={
                            data?.data && Object.keys(data?.data).length > 0
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
export default WidgetTableAccordianData;
