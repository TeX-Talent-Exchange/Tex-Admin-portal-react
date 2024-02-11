import React, { useEffect } from 'react'
import { Space, Switch } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import Auxiliary from "../../../util/Auxiliary";
import { useDispatch, useSelector } from "react-redux"
import { fetchRoles, toggleRole, fetchSuccess } from "../../../appRedux/actions"

import TableList from "../../../components/TEX/TableList"

export const List = (props) => {

    const dispatch = useDispatch()
    const roles = useSelector(({ authorization }) => authorization.roles)
    const currentUser = useSelector(({ auth }) => auth);
    function editRecord({ id, name, type }) {
        props.history.push({
            pathname: `/admin/roles/${id}/edit`,
            state: { name, type }
        });
    }

    function handleSwitchChange(record, enabled) {
        dispatch(toggleRole(record.id, enabled, currentUser))
    }

    const columns = [
        {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Role Type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={record.status === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }} onClick={() => editRecord(record)} />
                    <Switch
                        size={"small"}
                        checked={record.status === 1 ? true : false}
                        onChange={(switchValue) => handleSwitchChange(record, switchValue)}
                    />
                </Space>
            )
        }
    ]

    useEffect(() => {
        dispatch(fetchRoles(currentUser));

        return () => {
            // Clear state after redirect
            dispatch(fetchSuccess());
        }
    }, [dispatch, currentUser])

    return (
        <Auxiliary>
            <div className="gx-login-container">
                <div className="gx-login-content ucip-widget-content role-list">
                    <TableList
                        title="Role List"
                        tableData={roles}
                        createLink="roles/create"
                        createTitle="Create Role"
                        columns={columns}
                        path={props.match.path}
                    />
                </div>
            </div>
        </Auxiliary>
    );

}
