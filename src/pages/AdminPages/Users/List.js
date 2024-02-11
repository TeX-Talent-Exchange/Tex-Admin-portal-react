import React, { useEffect, useState } from 'react'
import { Space, Switch, Modal, Form, Input, Button, Alert, Badge } from 'antd';
import { EditOutlined, LockOutlined, DeleteOutlined, NotificationOutlined } from "@ant-design/icons";
import Auxiliary from "../../../util/Auxiliary";
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersList, toggleUser, setSearchColumn, deleteUser } from "../../../appRedux/actions"
import { adminChangeUserPassword } from "../../../appRedux/actions/Auth";
import { constRoleType } from "../../../constants/ConstRoleTypes";
import { fetchSuccess } from "../../../appRedux/actions";
// import { notificationPosition } from "../../../constants/styleConstants";
import SweetAlert from "react-bootstrap-sweetalert";
import TableList from "../../../components/TEX/TableList";
import { getColumnSearch, renderButtonTitle } from '../../../util/Helper';
import { TOGGLE_USER, DELETE_USER } from '../../../constants/ActionTypes';

export const List = (props) => {

    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");

    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const users = useSelector(({ authorization }) => authorization.users)
    const roleType = useSelector(({ auth }) => auth?.authUser?.roleType)
    const roleId = useSelector(({ auth }) => auth?.authUser?.roleId)
    const searchColumnName = useSelector(({ authorization }) => authorization.searchColumn)
    const currentUser = useSelector(({ auth }) => auth);
    const modalLoader = useSelector(({ auth }) => auth.modalConfirmLoader)
    //const agencyLimit = 5;
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [toggleValue, setToggleValue] = useState(false);
    const [action, setAction] = useState('');

    let columns;
    if (roleType?.includes(constRoleType.DCA_ASTRO_ADMIN)) {
        columns = [
            {
                title: 'UserName',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'User Type',
                dataIndex: 'roleType',
                key: 'roleType',
                width: 100,
                render: (text, record) => (
                    <Space size="middle">
                        {record.roleType}
                    </Space>
                ),
                ...getColumnSearch('roleType'),
            },
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName'
            },
            {
                title: 'Contact Number',
                dataIndex: 'contactNumber',
                key: 'contactNumber'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Agency Code',
                dataIndex: 'agencyCode',
                key: 'agencyCode',
                ...getColumnSearch('agencyCode'),
                render: (value) => value ? value : '-'
            },
            {
                title: 'Agency Name',
                dataIndex: 'agencyName',
                key: 'agencyName',
                ...getColumnSearch('agencyName'),
                render: (value) => value ? value : '-'
            },
            // {
            //     title: 'Agent Limit',
            //     dataIndex: 'agencyLimit',
            //     key: 'Agency Limit',
            //     render: (value) => value ? value : '-'
            // },
            {
                title: 'Agency PIC',
                dataIndex: 'agencyPIC',
                key: 'agencyPIC',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Login Time',
                dataIndex: 'loginTime',
                key: 'loginTime',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Logout Time',
                dataIndex: 'logoutTime',
                key: 'logoutTime',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Employee Id',
                dataIndex: 'employeeId',
                key: 'employeeId',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Created By',
                dataIndex: 'createdBy',
                key: 'createdBy'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                width: 130,
                render: (text, record) => (
                    <Space size="middle">
                        {record.roleType === 'Agent' || record.roleType === 'Admin' ? (<EditOutlined className={record.roleType === 'Agent' ? 'disabled' : ''} style={{ pointerEvents: record.enabled ? 'auto' : 'none', cursor: 'not-allowed', opacity: 0.4 }} />) : (<EditOutlined style={{ pointerEvents: record.enabled ? 'auto' : 'none' }} onClick={() => renderEdit(record)} />)}
                        {record.roleType === 'Admin' ? (<Switch
                            size={"small"}
                            checked={record.enabled}
                            className={record.roleType === 'Admin' ? 'disabled' : ''} style={{ pointerEvents: record.enabled ? 'auto' : 'none', cursor: 'not-allowed', opacity: 0.4 }}
                        />) : (<Switch
                            size={"small"}
                            checked={record.enabled}
                            onChange={(switchValue) => handleSwitchChange(record, switchValue)}
                        />)}
                        <LockOutlined onClick={() => showPasswordModal(record.username)} />
                        {record.roleType === 'Admin' ? (<DeleteOutlined className={record.roleType === 'Admin' ? 'disabled' : ''} style={{ pointerEvents: record.enabled ? 'auto' : 'none', cursor: 'not-allowed', opacity: 0.4 }} />) : (<DeleteOutlined onClick={() => handleDeleteUser(record)} />)}
                    </Space>
                )
            }
        ]
    } else if (roleType?.includes(constRoleType.DCA_AGENCY)) {
        columns = [
            {
                title: 'UserName',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'User Type',
                dataIndex: 'roleType',
                key: 'roleType',
                render: (text, record) => (
                    <Space size="middle">
                        {record.roleType}
                    </Space>
                )
            },
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName'
            },
            {
                title: 'Contact Number',
                dataIndex: 'contactNumber',
                key: 'contactNumber'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Agency Code',
                dataIndex: 'agencyCode',
                key: 'agencyCode',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Agency Name',
                dataIndex: 'agencyName',
                key: 'agencyName',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Agency PIC',
                dataIndex: 'agencyPIC',
                key: 'agencyPIC',
                render: (value) => value ? value : '-'
            },
            // {
            //     title: 'Agent Limit',
            //     dataIndex: 'agencyLimit',
            //     key: 'Agency Limit',
            //     render: (value) => value ? value : '-'
            // },
            {
                title: 'Login Time',
                dataIndex: 'loginTime',
                key: 'loginTime',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Logout Time',
                dataIndex: 'logoutTime',
                key: 'logoutTime',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Employee Id',
                dataIndex: 'employeeId',
                key: 'employeeId',
                render: (value) => value ? value : '-'
            },
            {
                title: 'Created By',
                dataIndex: 'createdBy',
                key: 'createdBy'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                width: 130,
                render: (text, record) => (
                    <Space size="middle">
                        <EditOutlined style={{ pointerEvents: record.enabled ? 'auto' : 'none' }} onClick={() => renderEdit(record)} />
                        <Switch
                            size={"small"}
                            checked={record.enabled}
                            onChange={(switchValue) => handleSwitchChange(record, switchValue)}
                        />
                        <LockOutlined onClick={() => showPasswordModal(record.username)} />
                        <DeleteOutlined onClick={() => handleDeleteUser(record)} />
                    </Space>
                )
            }
        ]
    }
    else {
        columns = [
            {
                title: 'UserName',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName'
            },
            {
                title: 'Contact Number',
                dataIndex: 'contactNumber',
                key: 'contactNumber'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                width: 130,
                render: (text, record) => (
                    <Space size="middle">
                        <EditOutlined style={{ pointerEvents: record.enabled ? 'auto' : 'none' }} onClick={() => renderEdit(record)} />
                        <Switch
                            size={"small"}
                            checked={record.enabled}
                            onChange={(switchValue) => handleSwitchChange(record, switchValue)}
                        />
                        {[constRoleType.SUPERADMIN, constRoleType.DCA_ASTRO_ADMIN, constRoleType.DCA_AGENCY].includes(roleType) &&
                            <LockOutlined onClick={() => showPasswordModal(record.username)} />
                        }
                    </Space>
                )
            }
        ]
    }

    function renderEdit(record) {
        props.history.push({
            pathname: `/admin/users/${record.username}/edit`,
            state: record
        });
    }

    function handleSwitchChange(record, enabled) {
        setAction(TOGGLE_USER);
        if ([constRoleType.DCA_ASTRO_ADMIN, constRoleType.DCA_AGENCY].includes(roleType)) {
            setSelectedUser(record);
            setToggleValue(enabled);
            handleShow();
        } else {
            dispatch(toggleUser(record.username, enabled, currentUser));
        }
    }

    const onSearch = (value) => {
        dispatch(fetchUsersList(currentUser, roleType, roleId, searchColumnName, value));
    }

    const searchColumn = (value) => {
        dispatch(setSearchColumn(value));
    }

    const showPasswordModal = (username) => {
        setUsername(username);
        setVisible(true);
    }

    const handleCancel = () => {
        form.resetFields();
        setUsername('');
        setVisible(false);
    };

    const handleOk = () => {
        form.validateFields().then(() => {
            form.submit()
        });
    }

    const handleGeneratePassword = () => {
        const pwd = Array(10)
            .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
            .map(function (x) {
                return x[Math.floor(Math.random() * x.length)];
            })
            .join('');
        form.setFieldsValue({ password: pwd });
    }

    const onFinish = (values) => {
        const { password } = values;
        dispatch(adminChangeUserPassword(username, password));
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setSelectedUser({});
        setToggleValue(false);
        setShow(false);
        setAction('');
    }

    const confirmAction = (reason) => {
        const { username } = selectedUser;

        if (action === TOGGLE_USER) {
            dispatch(toggleUser(username, toggleValue, currentUser, reason));
        } else if (action === DELETE_USER) {
            dispatch(deleteUser(username, currentUser, reason));
        }
        handleClose();
    }

    const onCancelAction = () => {
        handleClose();
    }

    const handleDeleteUser = (record) => {
        setAction(DELETE_USER);
        setSelectedUser(record);
        handleShow();
    }

    useEffect(() => {
        dispatch(fetchUsersList(currentUser, roleType, roleId));

        return () => {
            // Clear state after redirect
            dispatch(fetchSuccess());
        }
    }, [dispatch, roleType, roleId, currentUser]);

    return (
        <Auxiliary>
            <div className="gx-login-container">
                <div className="ucip-widget-content userlist">
                    <TableList
                        title="User List"
                        tableData={users}
                        createLink="users/create"
                        createTitle={`Create ${renderButtonTitle(roleType)}`}
                        columns={columns}
                        path={props.match.path}
                        searchList={onSearch}
                        searchColumn={searchColumn}
                        // disabled={roleType?.includes(constRoleType.DCA_AGENCY) && users.filter(user => user.enabled).length >= agencyLimit}
                        // agencyLimit={agencyLimit}
                        // roleType={roleType}
                        scroll={{ x: [constRoleType.DCA_ASTRO_ADMIN, constRoleType.DCA_AGENCY].includes(roleType) ? 1400 : '' }}
                    />
                    <Modal
                        title={`Reset Password for ${username}`}
                        visible={visible}
                        onCancel={handleCancel}
                        onOk={handleOk}
                        confirmLoading={modalLoader}
                        className="password-change-model"
                    >
                        <Form
                            form={form}
                            name="resetPassword"
                            onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                initialValue=""
                                rules={[
                                    { required: true, message: 'Password cannot be blank' },
                                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'should contain at least 8 characters with 1 uppercase, lowercase and number' }
                                ]}
                                name="password" style={{ marginLeft: '0', marginRight: '0' }} >
                                <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{ margin: '0 auto', display: 'flex' }} onClick={handleGeneratePassword}>Auto Generate Password</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <SweetAlert
                        show={show}
                        type="input"
                        showCancel
                        cancelBtnBsStyle="light"
                        title="Please enter detailed reason:"
                        // placeholder="Please enter a reason"
                        validationMsg="Please enter a reason"
                        inputType="textarea"
                        customClass="toggle-user-reason"
                        onConfirm={confirmAction}
                        onCancel={onCancelAction}
                        style={{ width: '600px' }}
                    >
                        {
                            selectedUser.roleType === 'Agency'
                            && action === DELETE_USER
                            && <Alert
                                type="info"
                                message={
                                    <>
                                        <Badge dot>
                                            <NotificationOutlined />
                                        </Badge>
                                        <Badge>Please note that, all the agents belonging to this agency will get deleted.</Badge>
                                    </>
                                }
                            />
                        }
                    </SweetAlert>
                </div>
            </div>
        </Auxiliary>
    );

}
