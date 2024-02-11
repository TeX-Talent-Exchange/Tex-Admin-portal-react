import React from "react";
import { Card, Table, Collapse } from "antd";
import Auxiliary from "../util/Auxiliary";

export const AccordionTable = ({
  title,
  headData,
  tableData,
  pageSize = 10,
  pagination = true,
  bordered = false,
}) => {
  const Panel = Collapse.Panel;
  return (
    <Auxiliary>
      <div className="smc-table">
        <Collapse accordion defaultActiveKey={["1"]}>
          <Panel header={title} key="1">
            <Card bordered={bordered} style={{ width: "100%" }}>
              <Table
                columns={headData}
                dataSource={tableData}
                bordered
                pagination={
                  !pagination ? false : tableData.length > pageSize && pageSize
                }
              />
            </Card>
          </Panel>
        </Collapse>
      </div>
    </Auxiliary>
  );
};
