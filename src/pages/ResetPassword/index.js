import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { changePassword, saveGoogleCaptchaToken, refreshGoogleCaptchaToken } from "../../appRedux/actions/Auth";
import { load } from "recaptcha-v3";

export const ResetPassword = ({ location, history }) => {

  const [form] = Form.useForm()
  const dispatch = useDispatch();
  const username = location.data
  const captchaToken = useSelector(({ auth }) => auth.googleCaptchaToken);
  const refreshCaptchaToken = useSelector(({ auth }) => auth.refreshGoogleCaptchaToken)

  const getGoogleRecaptchaToken = () => {
    load('6Ldr_hcaAAAAAOHZiWbobrPxmu_Q0p4V8eMsfGiz',
      { autoHideBadge: true, explicitRenderParameters: { badge: 'bottomright' } }
    ).then(recaptcha => {
      recaptcha.execute('resetPassword').then(googleCaptchaToken => {
        dispatch(saveGoogleCaptchaToken(googleCaptchaToken))
        dispatch(refreshGoogleCaptchaToken(false))
      })
    })
  }

  useEffect(() => {
    if (!location.data) {
      history.push("/login")
    }

    if (!captchaToken) {
      getGoogleRecaptchaToken()
    } else {
      if (refreshCaptchaToken) {
        getGoogleRecaptchaToken()
      }
    }
    // eslint-disable-next-line
  }, [refreshCaptchaToken])

  const onFinish = values => {
    values['token'] = captchaToken
    dispatch(changePassword(values));
  };

  return (
    <div className="gx-login-container stand-alone">
      <div className="gx-login-content">
        <div className="gx-app-logo-wid">
          <img src={require("assets/images/logo.png")} alt="Astro Logo" />
        </div>
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Reset Password</h1>
        </div>
        <Form
          form={form}
          layout='vertical'
          initialValues={{ username }}
          name="basic"
          onFinish={onFinish}
          className="gx-signin-form gx-form-row0">

          <Form.Item
            label="Username"
            initialValue=""
            rules={[{ required: true, message: 'Username cannot be blank' }]} name="username">
            <Input disabled={true} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            hasFeedback
            initialValue=""
            rules={[
              { required: true, message: 'Password cannot be blank' },
              { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'should contain at least 8 characters with 1 uppercase, lowercase and number' }
            ]}
            name="password">
            <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="New Password"
            hasFeedback
            initialValue=""
            rules={[
              { required: true, message: 'New Password cannot be blank' },
              { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'should contain at least 8 characters with 1 uppercase, lowercase and number' }
            ]}
            name="newPassword">
            <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            initialValue=""
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true, message: 'Confirm New Password cannot be blank'
              },
              {
                validator: (_, value) => {
                  if (form.getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Passwords do not match')
                }
              }
            ]}
            name="confirmNewPassword">
            <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm New Password" />
          </Form.Item>
          <div className="pwd-hint"><span>Password should be at least 8 characters long with 1 uppercase, lowercase and number</span></div>
          <Form.Item className="gx-text-center">
            <Button type="primary" className="gx-mb-0" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
