import React, { useEffect } from 'react'
import { Button, Form, Input, Select, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComponents, createPolicy, editPolicy } from "../../../appRedux/actions";
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

export const PolicyForm = (props) => {

    const dispatch = useDispatch()
    const components = useSelector(({ authorization }) => authorization.components.filter(val => val.status === 1))
    const currentUser = useSelector(({auth}) => auth);
    const [form] = Form.useForm()
    const { state } = props.location

    // eslint-disable-next-line
    useEffect(() => {
        dispatch(fetchComponents(currentUser))
        if(state){
            form.setFieldsValue({
                name: state.name,
                selectedComponents: state.componentId.split(',').map(Number)
            })
        }
    }, [dispatch, form, props, state,currentUser]);

    const handleComponents = (value) => {
        return value
    }

    const onFinish = ({ name, selectedComponents }) => {
        const {match: {params: {id}}} = props;
        if(id){
            const data = { id, name, components: selectedComponents }
            dispatch(editPolicy(data, currentUser ))
        }else{
            dispatch(createPolicy(name, selectedComponents, currentUser));
        }
    };

    return (
        <div className="gx-login-container">
            <div className="ucip-widget-content">
                <Card title={state ? "Edit Policy" : "Create Policy"} bordered={false}>
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
                                { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters'},
                                { whitespace: true, message: 'cannot contain only whitespaces'}
                            ]}
                            name="name"
                        >
                            <Input placeholder="Policy Name" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                { required: true, message: 'Please select atleast 1 component' }
                            ]}
                            name="selectedComponents"
                        >
                            <Select mode="multiple" placeholder="Select one or more components" onChange={handleComponents}>
                                {components.map(component => {
                                    return (
                                        <Select.Option key={component.value.toString()} value={component.value}>{component.label}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item className="gx-text-center">
                            <Link to="/admin/policies"><Button type="default" className="gx-mb-0 ant-btn-md" icon={<RollbackOutlined />} size="small" htmlType="submit">
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