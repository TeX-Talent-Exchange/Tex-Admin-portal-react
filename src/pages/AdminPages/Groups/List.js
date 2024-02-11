import React, { useEffect } from 'react'
import { Space, Switch } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import Auxiliary from "../../../util/Auxiliary";
import { useDispatch, useSelector } from "react-redux"
import { fetchGroupsAndPolicies, toggleGroup, fetchSuccess } from "../../../appRedux/actions"

import TableList from "../../../components/TEX/TableList"

export const List = (props) => {

    const dispatch = useDispatch()
    const groupsAndPolicies = useSelector(({ authorization }) => authorization.groupPoliciesList)
    const currentUser = useSelector(({ auth }) => auth);
    function editRecord({ name, id, policies, policyId }) {
        props.history.push({
            pathname: `/admin/groups/${id}/edit`,
            state: { name, policies, policyId }
        });
    }

    function handleSwitchChange(record, enabled) {
        dispatch(toggleGroup(record.id, enabled, currentUser))
    }

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Policy Name',
            dataIndex: 'policies',
            key: 'policies'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
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
        dispatch(fetchGroupsAndPolicies(currentUser));

        return () => {
            // Clear state after redirect
            dispatch(fetchSuccess());
        }
    }, [dispatch, currentUser])

    return (
        <Auxiliary>
            <div className="gx-login-container">
                <div className="gx-login-content ucip-widget-content group-list">
                    <TableList
                        title="Group List"
                        tableData={groupsAndPolicies}
                        createLink="groups/create"
                        createTitle="Create Group"
                        columns={columns}
                        path={props.match.path}
                    />
                </div>
            </div>
        </Auxiliary>
    );

}
