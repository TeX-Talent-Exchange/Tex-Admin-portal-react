import React, { useEffect } from 'react'
import { Button, Row, Col, Form, Input, Select, Card, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auditPostMiddleware } from "../../../util/auditLogger";
import { renderButtonTitle } from '../../../util/Helper';
import {
    fetchRoles,
    showGroupList,
    fetchGroups,
    fetchGroupPolicies,
    showPolicyList,
    createUser,
    updateUser,
    fetchSubRolesList,
    fetchAdminGroups,
    fetchUserGroupsAndPolicies,
    clearRoles,
    clearGroups,
    clearPolicies,
    fetchSuccess
} from "../../../appRedux/actions";
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { constRoleType } from "../../../constants/ConstRoleTypes";
import moment from 'moment';

const useRoleList = (roleType, dispatch, roleId, currentUser) => {
    useEffect(() => {
        if (roleType === constRoleType.SUPERADMIN || roleType === constRoleType.DCA_ASTRO_ADMIN || roleType === constRoleType.DCA_AGENCY) {
            dispatch(fetchRoles(currentUser))
        } else if (roleType === constRoleType.ADMIN) {
            dispatch(fetchSubRolesList(roleId, currentUser))
        }
        return () => {
            dispatch(clearRoles())
        }
    }, [roleType, dispatch, roleId, currentUser])
}

const useGroupsList = (dispatch, currentUser) => {
    useEffect(() => {
        dispatch(fetchGroups(currentUser))
        dispatch(showGroupList(true))
        return () => {
            dispatch(clearGroups())
            dispatch(clearPolicies())
        }
    }, [dispatch, currentUser])
}

export const UserForm = (props) => {

    const dispatch = useDispatch()
    const roles = useSelector(({ authorization }) => authorization.roles.filter(val => val.status === 1))
    const groups = useSelector(({ authorization }) => authorization.groups)
    const groupPolicies = useSelector(({ authorization }) => authorization.groupPolicies)
    const showGroupsList = useSelector(({ authorization }) => authorization.showGroupsList)
    const showPoliciesList = useSelector(({ authorization }) => authorization.showPoliciesList)
    const roleId = useSelector(({ auth }) => auth?.authUser?.roleId)
    const userId = useSelector(({ auth }) => auth?.authUser?.id)
    const roleType = useSelector(({ auth }) => auth?.authUser?.roleType)
    const selectedGroups = useSelector(({ authorization }) => authorization.selectedGroups)
    const selectedPolicies = useSelector(({ authorization }) => authorization.selectedPolicies)
    const currentUser = useSelector(({ auth }) => auth);
    const dcaUsers = useSelector(({ authorization }) => authorization.dcaUsers);
    const [form] = Form.useForm()
    const { state } = props.location
    // const agencyLimit = 5;

    useRoleList(roleType, dispatch, roleId, currentUser)

    useGroupsList(dispatch, currentUser)

    useEffect(() => {
        if (state) {
            if (!selectedGroups && !selectedPolicies) {
                dispatch(fetchUserGroupsAndPolicies(state.username, currentUser))
            }
            if (selectedGroups) {
                if (!selectedPolicies) {
                    dispatch(fetchGroupPolicies(selectedGroups, currentUser))
                    dispatch(showPolicyList(true))
                }
            }
            form.setFieldsValue({
                username: state.username,
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                contactNumber: state.contactNumber,
                agencyCode: state.agencyCode,
                agencyName: state.agencyName,
                agencyPIC: state.agencyPIC,
                timePicker: [moment(state.loginTime ? state.loginTime : '09:00', 'HH:mm'), moment(state.logoutTime ? state.logoutTime : '20:00', 'HH:mm')],
                //agencyLimit: agencyLimit,
                employeeId: state.employeeId,
                roleId: parseInt(state.roleId),
                selectedGroups,
                selectedPolicies,
                notes: state.notes
            })
        }
    }, [form, selectedGroups, selectedPolicies, state, dispatch, currentUser])

    useEffect(() => {


        return () => {
            // Clear state after redirect
            dispatch(fetchSuccess());
        }
    }, [dispatch, currentUser, roleType]);

    useEffect(() => {
        if (roleType === constRoleType.DCA_AGENCY && dcaUsers.length && !state) {
            form.setFieldsValue({
                email: dcaUsers[0].email,
                agencyCode: dcaUsers[0].agencyCode,
                agencyName: dcaUsers[0].agencyName,
                agencyPIC: dcaUsers[0].agencyPIC,
                timePicker: [
                    moment(dcaUsers[0].loginTime, 'HH:mm'),
                    moment(dcaUsers[0].logoutTime, 'HH:mm')
                ]
            });
        }
    }, [form, roleType, dcaUsers, state]);

    const handleGroups = (value) => {
        if (value.length > 0) {
            dispatch(fetchGroupPolicies(value, currentUser))
            if (!showPoliciesList) {
                dispatch(showPolicyList(true))
            }
        }
        return value
    }

    const handlePolicies = (value) => {
        return value
    }

    const handleRoleChange = () => {
        if (!showGroupsList) {
            if (roleType === constRoleType.SUPERADMIN) {
                dispatch(fetchGroups(currentUser))
            } else if (roleType === constRoleType.ADMIN) {
                dispatch(fetchAdminGroups(userId, currentUser))
            }
            dispatch(showGroupList(true))
        }
    }

    const onFinishFailed = ({ errorFields }) => {
        form.scrollToField(errorFields[0].name)
    };

    // const onFinish = (values) => {
    //     if (state) {
    //         dispatch(updateUser(values, currentUser))
    //     } else {
    //         dispatch(createUser(values, currentUser));
    //     }
    // };
    const onFinish = (values) => {
        if (values['timePicker']) {
            const rangeTimeValue = values['timePicker'];
            values.loginTime = rangeTimeValue[0].format('HH:mm');
            values.logoutTime = rangeTimeValue[1].format('HH:mm');
        }
        // values.agencyLimit = agencyLimit;

        if (state) {
            dispatch(updateUser(values, currentUser))
        } else {
            dispatch(createUser(values, currentUser));
        }
    }

    const handleDeselect = () => {
        form.setFieldsValue({ selectedPolicies: undefined })
    }

    const validateUsernameCallback = async (rule, value) => {
        if (!state) {
            const isAvailable = await auditPostMiddleware('users/checkUsernameAvailability', currentUser, { username: value ? value : null }, "Username Availability", "Checking Username:", "Customer Information Page")
            // const isAvailable = await axios.post('/users/checkUsernameAvailability', {username: value ? value : null})
            if (!isAvailable.data.body.isAvailable.body.isAvailable) {
                throw new Error("has been taken")
            }
        }
    }

    // const validateEmailCallback = async (rule, value) => {
    //     if(!state){
    //         const isAvailable = await auditPostMiddleware('users/checkEmailAvailability', currentUser, {email: value ? value : null}, "Email Availability","Check Email Availability","Customer Information Page")
    //         //const isAvailable = await axios.post('/users/checkEmailAvailability', {email: value ? value : null})
    //         if(!isAvailable.data.body.isAvailable.body.isAvailable) {
    //             throw new Error("has been taken")
    //         }
    //     }
    // }

    return (
        <div className="gx-login-container">
            <div className="ucip-widget-content ucip-user-form">
                <Card title={`${state ? 'Edit' : 'Create'} ${renderButtonTitle(roleType)}`} bordered={false}>
                    <Form
                        form={form}
                        initialValues={{ remember: true }}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="gx-signin-form gx-form-row0">
                        <Row>
                            <Col span={24}><Form.Item
                                rules={[
                                    { required: true, message: 'cannot be blank' },
                                    { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                    { whitespace: true, message: 'cannot contain only whitespaces' },
                                    { validator: validateUsernameCallback }
                                ]}
                                validateTrigger={'onBlur'}
                                name="username"
                                hasFeedback
                            >
                                <Input disabled={state} placeholder="Username" />
                            </Form.Item></Col>
                        </Row>
                        <Row>
                            <Col span={12}><Form.Item
                                rules={[
                                    { required: true, message: 'cannot be blank' },
                                    { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                    { whitespace: true, message: 'cannot contain only whitespaces' }
                                ]}
                                name="firstName"
                                id="firstName"
                            >
                                <Input placeholder="First Name" />
                            </Form.Item></Col>
                            <Col span={12}><Form.Item
                                rules={[
                                    { required: true, message: 'cannot be blank' },
                                    { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                    { whitespace: true, message: 'cannot contain only whitespaces' }
                                ]}
                                name="lastName"
                            >
                                <Input placeholder="Last Name" />
                            </Form.Item></Col>
                        </Row>
                        {(roleType === constRoleType.SUPERADMIN || roleType === constRoleType.DCA_ASTRO_ADMIN || roleType === constRoleType.DCA_AGENCY) && <Form.Item
                            rules={[
                                { required: true, message: 'cannot be blank' },
                                { whitespace: true, message: 'cannot contain only whitespaces' },
                                { type: 'email', message: 'not a valid email' },
                                // { validator: validateEmailCallback }
                            ]}
                            // validateTrigger={'onBlur'}
                            name="email"
                        // hasFeedback
                        >
                            <Input placeholder={roleType === constRoleType.DCA_AGENCY ? "Manager Email Address" : "Email Address"} />
                        </Form.Item>
                        }
                        <Form.Item
                            rules={[
                                { required: true, message: 'cannot be blank' },
                                { pattern: /^\d+$/, message: 'only numbers allowed' },
                                { whitespace: true, message: 'cannot contain only whitespaces' },
                            ]}
                            name="contactNumber"
                        >
                            <Input prefix="+60" placeholder="Contact Number" />
                        </Form.Item>
                        <Row>
                            <Col span={24}>
                                {roleType === constRoleType.DCA_ASTRO_ADMIN && <Form.Item
                                    rules={[
                                        { required: true, message: 'cannot be blank' }, // required to be true later
                                        { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                        { whitespace: true, message: 'cannot contain only whitespaces' }
                                    ]}
                                    name="agencyCode"
                                >
                                    <Input placeholder="Agency Code" />
                                </Form.Item>}
                            </Col>
                            <Col span={12}>
                                {roleType === constRoleType.DCA_AGENCY && <Form.Item
                                    rules={[
                                        { required: true, message: 'cannot be blank' }, // required to be true later
                                        { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                        { whitespace: true, message: 'cannot contain only whitespaces' }
                                    ]}
                                    name="agencyCode"
                                >
                                    <Input
                                        placeholder="Agency Code"
                                        disabled={dcaUsers.length ? true : false}
                                    />
                                </Form.Item>}
                            </Col>
                            <Col span={12}>
                                {(roleType === constRoleType.DCA_AGENCY) && <Form.Item
                                    rules={[
                                        { required: true, message: 'cannot be blank' }, // required to be true later
                                        { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                        { whitespace: true, message: 'cannot contain only whitespaces' }
                                    ]}
                                    name="employeeId"
                                >
                                    <Input placeholder="Employee ID" />
                                </Form.Item>}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                {(roleType === constRoleType.DCA_ASTRO_ADMIN || roleType === constRoleType.DCA_AGENCY) && <Form.Item
                                    rules={[
                                        { required: true, message: 'cannot be blank' }, // required to be true later
                                        { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                        { whitespace: true, message: 'cannot contain only whitespaces' }
                                    ]}
                                    name="agencyName"
                                >
                                    <Input placeholder="Agency Name" />
                                </Form.Item>}
                            </Col>
                            <Col span={12}>
                                {(roleType === constRoleType.DCA_ASTRO_ADMIN || roleType === constRoleType.DCA_AGENCY) && <Form.Item
                                    rules={[
                                        { required: true, message: 'cannot be blank' }, // required to be true later
                                        { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' },
                                        { whitespace: true, message: 'cannot contain only whitespaces' }
                                    ]}
                                    name="agencyPIC"
                                >
                                    <Input placeholder="Agency PIC" />
                                </Form.Item>}
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col span={12}>
                                {(roleType === constRoleType.DCA_ASTRO_ADMIN) && <Form.Item
                                    rules={[
                                        // { required: true, message: 'cannot be blank' }, // required to be true later
                                        { pattern: /^[a-z\d\-_\s]+$/i, message: 'cannot contain special characters' }
                                    ]}
                                    name="agencyLimit"
                                >
                                    <Input placeholder="Agency Limit" defaultValue={agencyLimit} value={agencyLimit} disabled />
                                </Form.Item>}
                            </Col> */}
                            <Col span={24}>
                                {(roleType === constRoleType.DCA_ASTRO_ADMIN || roleType === constRoleType.DCA_AGENCY) && <Form.Item name="timePicker"
                                    rules={[
                                        { required: true, message: 'cannot be blank' }, // required to be true later
                                    ]}>
                                    <TimePicker.RangePicker
                                        format='HH:mm'
                                        disabled={(roleType === constRoleType.DCA_AGENCY && dcaUsers.length) ? true : false}
                                    />
                                </Form.Item>}
                            </Col>
                        </Row>
                        <Form.Item
                            name="roleId"
                            rules={[
                                { required: true, message: 'Please select a role' }
                            ]}
                        >
                            <Select placeholder="Select Role" size="small" onChange={handleRoleChange}>
                                {roles.map(role => {
                                    return (
                                        <Select.Option key={role.name} value={role.id}>{role.name}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        {showGroupsList && roleType === constRoleType.SUPERADMIN &&
                            <Form.Item
                                rules={[
                                    { required: true, message: 'Please select atleast 1 group' }
                                ]}
                                name="selectedGroups"
                            >
                                <Select mode="multiple" placeholder="Select Groups" onChange={handleGroups} onDeselect={handleDeselect}>
                                    {groups.map(group => {
                                        return (
                                            <Select.Option key={group.label} value={group.value}>{group.label}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        }
                        {showGroupsList && (roleType === constRoleType.DCA_ASTRO_ADMIN || roleType === constRoleType.DCA_AGENCY) &&
                            <Form.Item
                                rules={[
                                    { required: true, message: 'Please select atleast 1 group' }
                                ]}
                                name="selectedGroups"
                            >
                                <Select mode="multiple" placeholder="Select Groups" onChange={handleGroups} onDeselect={handleDeselect}>
                                    {groups.filter(group => ((group.label === 'DCA Group' && roleType === constRoleType.DCA_ASTRO_ADMIN) || (group.label === 'DCAAgentGroup' && roleType === constRoleType.DCA_AGENCY))).map(group => {
                                        return (
                                            <Select.Option key={group.label} value={group.value}>{group.label}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        }
                        {showPoliciesList &&
                            <Form.Item
                                rules={[
                                    { required: true, message: 'Please select atleast 1 policy' }
                                ]}
                                name="selectedPolicies"
                            >
                                <Select mode="multiple" placeholder="Select Policies" onChange={handlePolicies}>
                                    {groupPolicies.map(policy => {
                                        return (
                                            <Select.Option key={policy.name} value={policy.id}>{policy.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        }
                        <Form.Item name="notes">
                            <Input.TextArea placeholder="BITS Ticket" />
                        </Form.Item>
                        <Form.Item className="gx-text-center">
                            <Link to="/admin/users"><Button type="default" className="gx-mb-0 ant-btn-md" icon={<RollbackOutlined />} size="small" htmlType="submit">
                                <span>Back</span>
                            </Button></Link>
                            <Button type="primary" className="gx-mb-0 ant-btn-md" size="small" icon={<CheckOutlined />} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}