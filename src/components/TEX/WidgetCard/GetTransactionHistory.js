import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../../appRedux/actions/DashboardTabs";

export const GetTransactionHistory = (props) => {
  const { component } = props;
  const title = "Payment Check";
  const dispatch = useDispatch();
  const panes = useSelector((state) => state.dashboardTabs.panes);
  const activeKey = useSelector((state) => state.dashboardTabs.activeKey);
  const username = useSelector((state) => state.auth.authUser.username);
  const add = (tabTitle, content) => {
    dispatch(addTab(panes, tabTitle, content, activeKey));
  };


  const transactionHistory = {
    name: "Payment Check",
  };
  return (
    <div className="gx-form-group transaction-info">
      {transactionHistory !== null ? (
        <Button
          type="primary"
          className="gx-mb-0 ant-btn-md"
          size="small"
          onClick={transactionHistory ? () => add(title, component)  : null}
        >
          {transactionHistory.name}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
