import React, { useEffect } from 'react'
import { Button, Form, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createComponent, editComponent } from "../../../appRedux/actions";
import { Link } from "react-router-dom";
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

export const ComponentForm = (props) => {

    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const isEdit = props.location.state ? true : false
    const currentUser = useSelector(({ auth }) => auth);
    useEffect(() => {
        const { location: { state } } = props
        if (state) {
            form.setFieldsValue({
                name: state.label
            })
        }
    }, [form, props])  

    const onFinish = ({ name }) => {
        const newReqBody = { name: name, currentUser: currentUser };
        const { match: { params: { id } } } = props;
        if (id) {
           dispatch(editComponent({ id, name, currentUser }))
        } else {
            dispatch(createComponent(newReqBody));
        }
    };

    return (
        <div className="gx-login-container">
            <div className="ucip-widget-content">
                <Card title={isEdit ? "Edit Component" : "Create Component"} bordered={false}>
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
                            <Input placeholder="Component Name" />
                        </Form.Item>
                        <Form.Item className="gx-text-center">
                            <Link to="/admin/components">
                                <Button type="default" className="gx-mb-0 ant-btn-md" icon={<RollbackOutlined />} size="small" htmlType="submit">
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