import React from "react";
import { Col, Row, Empty, Form } from "antd";
import Widget from "../../Widget";
import Auxiliary from "../../../util/Auxiliary";
import { apiKeyFormat } from "../../../util/Helper";

const PlainWidget = (props) => {
  const { data, title, widgetClass } = props;

  const loadWidget = (key, value, color, index) => {
    return (
      <React.Fragment key = {index}>
        {value !== undefined ? (
          <div className={`ant-btn-custom ant-btn-${color}`} key ={index}>
            {apiKeyFormat(key)} :{" "}
            {value || value === 0 ? value.toString() : "-"}
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };
  const ColorCode = (key, keyValue) => {
    let color;
    let value =
      keyValue && keyValue !== "-" && keyValue.toString().includes(" RM")
        ? parseFloat(keyValue.toString().split("RM")[0])
        : keyValue;
    if (value !== "-") {
      if (key === "Debt Age") {
        color = value > 30 ? "red" : "green";
      } else if (key === "Invoice Age") {
        color = value > 60 ? "red" : "green";
      } else if (key === "Amount Due") {
        color = value > 0 ? "red" : "green";
      } else if (key === "AR Balance") {
        color = value > 10 ? "red" : "green";
      } else if (key === "Account Status") {
        color = value === "Active" ? "green" : "red";
      } else {
        color = "blue";
      }
    } else {
      color = "grey";
    }
    return color;
  };
  return (
    <Widget
      className="gx-card"
      styleName={`gx-card-full ${widgetClass}`}
      title={title}
    >
      <Auxiliary>
        <Form>
          <Row>
            <Col xs={24}>
              <div className="gx-form-row0 data-view">
                {data && Object.keys(data).length > 0 ? (
                  Object.keys(data).map((txtKey, index) => {
                    return loadWidget(
                      txtKey,
                      data[txtKey],
                      ColorCode(txtKey, data[txtKey]),
                      index
                    );
                  })
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </Auxiliary>
    </Widget>
  );
};
export default PlainWidget;
