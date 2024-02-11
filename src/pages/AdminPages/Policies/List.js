import React, { useEffect } from 'react'
import { Space, Switch } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import Auxiliary from "../../../util/Auxiliary";
import { useDispatch, useSelector } from "react-redux"
import { fetchPoliciesAndComponents, togglePolicy, fetchSuccess } from "../../../appRedux/actions"

import TableList from "../../../components/TEX/TableList"

export const List = (props) => {

    const dispatch = useDispatch()
    const policiesAndComponents = useSelector(({ authorization }) => authorization.policyComponentsList)
    const currentUser = useSelector(({ auth }) => auth);
    function renderEdit({ name, id, components, componentId }) {
        props.history.push({
            pathname: `/admin/policies/${id}/edit`,
            state: { name, components, componentId }
        });
    }

    function handleSwitchChange(record, enabled) {
        dispatch(togglePolicy(record.id, enabled, currentUser))
    }


    const columns = [
        {
            title: 'Policy Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Component Name',
            dataIndex: 'components',
            key: 'components'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={record.status === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }} onClick={() => renderEdit(record)} />
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
        dispatch(fetchPoliciesAndComponents(currentUser));

        return () => {
            // Clear state after redirect
            dispatch(fetchSuccess());
        }
    }, [dispatch, currentUser])

    return (
        <Auxiliary>
            <div className="gx-login-container">
                <div className="gx-login-content ucip-widget-content policy-list">
                    <TableList
                        title="Policy List"
                        tableData={policiesAndComponents}
                        createLink="policies/create"
                        createTitle="Create Policy"
                        columns={columns}
                        path={props.match.path}
                    />
                </div>
            </div>
        </Auxiliary>
    );

}
