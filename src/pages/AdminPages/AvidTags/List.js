import React, { useEffect } from 'react'
import { Space, Switch } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import Auxiliary from "../../../util/Auxiliary";
import { useDispatch, useSelector } from "react-redux"
import { toggleRole, fetchSuccess } from "../../../appRedux/actions"

import TableList from "../../../components/TEX/TableList"
import { fetchAlltags } from '../../../appRedux/actions/AvidTag';

export const List = (props) => {

    const dispatch = useDispatch()
    const avialltags = useSelector(({ avidallTags }) => avidallTags?.alltags)
    const currentUser = useSelector(({ auth }) => auth);
    function editRecord(record) {
        props.history.push({
            pathname: `/admin/avidtag/${record.value}/edit`,
            state: { record }
        });
    }

    function handleSwitchChange(record, enabled) {
        dispatch(toggleRole(record.id, enabled, currentUser))
    }

    const columns = [
        {
            title: 'Tag Name',
            dataIndex: 'label',
            key: 'label'
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
                        checked={record.isActive === 1 ? true : false}
                        onChange={(switchValue) => handleSwitchChange(record, switchValue)}
                    />
                </Space>
            )
        }
    ]

    useEffect(() => {
        dispatch(fetchAlltags(currentUser));

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
                        title="AvidTag List"
                        tableData={avialltags}
                        createLink="avidtag/create"
                        createTitle="Create TAG"
                        columns={columns}
                        path={props.match.path}
                    />
                </div>
            </div>
        </Auxiliary>
    );

}
