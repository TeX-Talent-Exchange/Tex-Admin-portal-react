import React, { useEffect } from "react";
import { Space, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Auxiliary from "../../../util/Auxiliary";
import { fetchComponents, toggleComponent, fetchSuccess } from "../../../appRedux/actions";

import TableList from "../../../components/TEX/TableList";

export const List = (props) => {
  const dispatch = useDispatch();
  const components = useSelector(
    ({ authorization }) => authorization.components
  );
  const currentUser = useSelector(({ auth }) => auth);
  function editRecord({ value, label }) {
    props.history.push({
      pathname: `/admin/components/${value}/edit`,
      state: { label },
    });
  }

  function handleSwitchChange(record, enabled) {
    dispatch(toggleComponent(record.value, enabled, currentUser));
  }

  const columns = [
    {
      title: "Component Name",
      dataIndex: "label",
      key: "label",
      width: "90%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <div className="action-icons">
          <Space size="middle">
            <EditOutlined
              style={
                record.status === 0
                  ? { pointerEvents: "none" }
                  : { pointerEvents: "auto" }
              }
              onClick={() => editRecord(record)}
            />
            <Switch
              size={"small"}
              checked={record.status === 1 ? true : false}
              onChange={(switchValue) =>
                handleSwitchChange(record, switchValue)
              }
            />
          </Space>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchComponents(currentUser));

    return () => {
      // Clear state after redirect
      dispatch(fetchSuccess());
    }
  }, [dispatch, currentUser]);

  return (
    <Auxiliary>
      <div className="gx-login-container">
        <div className="gx-login-content ucip-widget-content">
          <TableList
            title="Component List"
            tableData={components}
            createLink="components/create"
            createTitle="Create Component"
            columns={columns}
            path={props.match.path}
          />
        </div>
      </div>
    </Auxiliary>
  );
};
