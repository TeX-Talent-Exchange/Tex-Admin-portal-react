import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../../appRedux/actions/DashboardTabs";

export const GetOTTInfo = (props) => {
  //   const { packageInfo } = props;

  const { component } = props;
  const title = "Netflix Transactions";
  const dispatch = useDispatch();
  const panes = useSelector((state) => state.dashboardTabs.panes);
  const activeKey = useSelector((state) => state.dashboardTabs.activeKey);
  const username = useSelector((state) => state.auth.authUser.username);
  const add = (tabTitle, content) => {
    dispatch(addTab(panes, tabTitle, content, activeKey));
  };
  const subscriptionDetails = useSelector(
    (state) => state.subscription.subscriptionDetails
  );

  const ottpackage = {
    name: "Netflix",
  };
  return (
    <div className="gx-form-group ott-info">
      {ottpackage !== null ? (
        <Button
          type="primary"
          className="gx-mb-0 ant-btn-md"
          size="small"
          onClick={
            subscriptionDetails.object &&
            Object.keys(subscriptionDetails.object).length > 0
              ? () => add(title, component)
              : null
          }
        >
          {ottpackage.name}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
