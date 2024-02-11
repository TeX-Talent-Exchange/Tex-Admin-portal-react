import React, { useEffect, useState, useCallback } from 'react'
import { Button, Form, Input, Select, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createRole, showModules, fetchAdminRolesList, editRole } from "../../../appRedux/actions";
import { Link } from "react-router-dom";
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

export const RoleForm = (props) => {
    const [form] = Form.useForm()
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    const adminRolesList = useSelector(({ authorization }) => authorization.adminRolesList)
    const showModulesList = useSelector(({ authorization }) => authorization.showModulesList)
    const currentUser = useSelector(({ auth }) => auth);
    const handleRoleTypeChange = useCallback(
        (value) => {
            if (value === "user") {
                dispatch(fetchAdminRolesList(currentUser))
                dispatch(showModules(true))
            } else if (value === "admin") {
                dispatch(showModules(false))
            }
        },
        [dispatch, currentUser]
    )

    useEffect(() => {
        const { location: { state } } = props
        if (state) {
            form.setFieldsValue({
                type: state.type,
                name: state.name
            })
            handleRoleTypeChange(state.type)
        }
    }, [form, props, handleRoleTypeChange])

    useEffect(() => {
        const { match: { params: { id } } } = props;
        if (id) {
            setIsEdit(true)
        }
    }, [props])

    const onFinish = ({ name, type, module }) => {
        const { match: { params: { id } } } = props;
        if (id) {
            dispatch(editRole({ name, type, module, id }, currentUser))
        } else {
            dispatch(createRole(name, type, module, currentUser));
        }
    };

    const handleModuleTypeChange = (value) => {
        return value
    }

    return (
        <div className="gx-login-container">
            <div className="gx-login-content ucip-widget-content">
                <Card title={isEdit ? "Edit Role" : "Create Role"} bordered={false}>
                    <Form
                        form={form}
                        initialValues={{ remember: true }}
                        name="basic"
                        onFinish={onFinish}
                        className="gx-signin-form gx-form-row0">
                        <Form.Item
                            initialValue=""
                            rules={[
                                { required: true, message: 'cannot be blank' },
                                { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                { whitespace: true, message: 'cannot contain only whitespaces' }
                            ]}
                            name="name"
                        >
                            <Input placeholder="Role Name" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                { required: true, message: 'Please select atleast 1 type' }
                            ]}
                            name="type"
                        >
                            <Select placeholder="Select Role Type" disabled={isEdit ? true : false} onChange={handleRoleTypeChange}>
                                <Select.Option value="artistadmin">Artist Admin</Select.Option>
                                <Select.Option value="artistuser">Artist User</Select.Option>
                                <Select.Option value="recruiteradmin">Recruiter Admin</Select.Option>
                                <Select.Option value="recruiteruser">Recruiter User</Select.Option>
                            </Select>
                        </Form.Item>
                        {showModulesList &&
                            <Form.Item
                                rules={[
                                    { required: true, message: 'Please select atleast 1 module' }
                                ]}
                                name="module"
                            >
                                <Select placeholder="Select Module Type" onChange={handleModuleTypeChange}>
                                    {adminRolesList.map(role => {
                                        return (
                                            <Select.Option key={role.id.toString()} value={role.id}>{role.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        }
                        <Form.Item className="gx-text-center">
                            <Link to="/admin/roles"><Button type="default" className="gx-mb-0 ant-btn-md" icon={<RollbackOutlined />} size="small" htmlType="submit">
                                <span>Back</span>
                            </Button></Link>
                            <Button type="primary" className="gx-mb-0 ant-btn-md" icon={<CheckOutlined />} size="small" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}