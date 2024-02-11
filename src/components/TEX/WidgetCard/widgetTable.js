import React from "react";
import Auxiliary from "../../../util/Auxiliary";
import Table from "../Table";
export const WidgetTable = ({ tableData, headData }) => {
  return (
    <Auxiliary>
      <div className="gx-login-container">
        <div className="ucip-widget-content table-list">
          <Table
            columns={headData}
            dataSource={tableData}
            bordered
            pagination={false}
          />
        </div>
      </div>
    </Auxiliary>
  );
};
