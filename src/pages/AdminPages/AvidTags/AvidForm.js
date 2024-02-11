import React, { useEffect, useState, useCallback } from 'react'
import { Button, Form, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createTag, editTag } from "../../../appRedux/actions/AvidTag";
import { Link } from "react-router-dom";
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

export const AvidForm = (props) => {
    const [form] = Form.useForm()
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector(({ auth }) => auth);
    const handleRoleTypeChange = useCallback(
        (value) => {
            if (value === "user") {
                //    dispatch(fetchAdminRolesList(currentUser))
                // dispatch(showModules(true))
            } else if (value === "admin") {
                //   dispatch(showModules(false))
            }
        },
        [dispatch, currentUser]
    )

    useEffect(() => {
        const { location: { state } } = props
        if (state) {
            form.setFieldsValue({
                tagname: state.record.label
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

    const onFinish = ({ tagname }) => {
        const id = props.location.state.record.value;

        if (id) {
            dispatch(editTag({ id, tagname }, currentUser))
        } else {
            dispatch(createTag(tagname));
        }
    };

    // const handleModuleTypeChange = (value) => {
    //     return value
    // }

    return (
        <div className="gx-login-container">
            <div className="gx-login-content ucip-widget-content">
                <Card title={isEdit ? "Edit Tag" : "Create Tag"} bordered={false}>
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
                            name="tagname"
                        >
                            <Input placeholder="Tag Name" />
                        </Form.Item>


                        <Form.Item className="gx-text-center">
                            <Link to="/admin/avidtag"><Button type="default" className="gx-mb-0 ant-btn-md" icon={<RollbackOutlined />} size="small" htmlType="submit">
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