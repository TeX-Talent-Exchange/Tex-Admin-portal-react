import React from "react";
import { Col, Row, Empty } from "antd";
import { Form } from "antd";
import Auxiliary from "../../../util/Auxiliary";
// import CustomScrollbars from "util/CustomScrollbars";
import { apiKeyFormat } from "../../../util/Helper";

const WidgetCardVertical = (props) => {
  const { data, widgetClass } = props;

  const renderData = () => {
    if (data && Object.keys(data).length !== 0) {
      return(
        Object.keys(data).map((key, i) => (
          <div className="gx-form-group" key={i}>
            <label className="ant-col-md-12" name="Key">
              {apiKeyFormat(key)}
            </label>
            <label name="divider" style={{width: "8px"}}> : </label>
            <label name="Value">{ data[key] ? data[key] : '-' }</label>
          </div>
        ))
      )
    } else{
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
  }

  return (
      <Auxiliary>
        <Form className={`${widgetClass}`}>
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <div className="gx-form-row0 data-view">
                {renderData()}
                {/* {data.object || data.object === [] ? (
                  Object.keys(data.object).map((key, i) => (
                    <div className="gx-form-group" key={i}>
                      <label className="ant-col-md-12" name="Key" style={{width: "10%"}}>
                        {apiKeyFormat(key)}
                      </label>
                      <label name="divider" style={{width: "8px"}}> : </label>
                      <label name="Value" style={{width: "89%"}}>{data.object[key]}</label>
                    </div>
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )} */}
              </div>
            </Col>
          </Row>          
        </Form>
      </Auxiliary>
  
  );
};
export default WidgetCardVertical;
