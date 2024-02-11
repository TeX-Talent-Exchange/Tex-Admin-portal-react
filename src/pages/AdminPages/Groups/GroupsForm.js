import React, { useEffect } from 'react'
import { Button, Form, Input, Select, Card} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolicies, createGroup, editGroup } from "../../../appRedux/actions";
import { Link } from "react-router-dom";
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

export const GroupForm = (props) => {

    const dispatch = useDispatch()
    const policies = useSelector(({ authorization }) => authorization.policies)
    const currentUser = useSelector(({auth}) => auth);

    const [form] = Form.useForm()

    // eslint-disable-next-line
    useEffect(() => {
        dispatch(fetchPolicies(currentUser))
    }, [dispatch,currentUser])

    const handlePolicies = (value) => {
        return value
    }

    useEffect(()=>{
        const {location:{state}} = props
        if(state){
            form.setFieldsValue({
                name:state.name,
                selectedPolicies:state.policyId.split(',').map(Number)
            })
        }
    },[form, props])

    const onFinish = ({ name, selectedPolicies }) => {
        const {match:{params:{id}}} = props;
        if(id){
            const data = {
                        id:id,
                        name:name,
                        policies:selectedPolicies
            }
            dispatch(editGroup(data, currentUser))
        }else{
            dispatch(createGroup(name, selectedPolicies, currentUser));
        }
    };

    return (
        <div className="gx-login-container">
            <div className="ucip-widget-content">
                <Card title="Create Group" bordered={false}>
                    <Form
                        form = {form}
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
                            <Input placeholder="Group Name" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                { required: true, message: 'Please select atleast 1 policy' }
                            ]}
                            name="selectedPolicies">
                            <Select mode="multiple" size="medium" placeholder="Select One or More Policies" onChange={handlePolicies}>
                                {policies.map(policy => {
                                    return (
                                        <Select.Option key={policy.value.toString()} value={policy.value}>{policy.label}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item className="gx-text-center">
                            <Link to="/admin/groups"><Button type="default" className="gx-mb-0 ant-btn-md" icon={<RollbackOutlined />} size="small" htmlType="submit">
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