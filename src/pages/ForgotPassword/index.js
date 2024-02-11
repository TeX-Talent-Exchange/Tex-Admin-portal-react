import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { sendUserNameForForgotPassword, resetUserPassword } from "../../appRedux/actions/Auth";
// import { load } from "recaptcha-v3";

const ForgotPassword = (props) => {

  const [form] = Form.useForm()
  const [changePasswordForm] = Form.useForm()
  const dispatch = useDispatch();
  // const captchaToken = useSelector(({auth}) => auth.googleCaptchaToken);
  // const refreshCaptchaToken = useSelector(({auth}) => auth.refreshGoogleCaptchaToken)
  const forgotPasswordUsername = useSelector(({ auth }) => auth.forgotPasswordUsername)
  const showConfirmNewPasswordForm = useSelector(({ auth }) => auth.showConfirmNewPasswordForm)

  // const getGoogleRecaptchaToken = () => {
  //   load('6Ldr_hcaAAAAAOHZiWbobrPxmu_Q0p4V8eMsfGiz', 
  //     { autoHideBadge: true, explicitRenderParameters: { badge: 'bottomright' } }
  //   ).then(recaptcha => { 
  //     recaptcha.execute('resetPassword').then(googleCaptchaToken => {
  //       dispatch(saveGoogleCaptchaToken(googleCaptchaToken))
  //       dispatch(refreshGoogleCaptchaToken(false))
  //     })
  //   })
  // }

  // useEffect(() => {
  //   if(!location.data) {
  //     history.push("/login")
  //   }

  //   if(!captchaToken){
  //     getGoogleRecaptchaToken()
  //   } else {
  //     if(refreshCaptchaToken){
  //       getGoogleRecaptchaToken()
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [refreshCaptchaToken])

  const onFinishFailed = errorInfo => {
  };

  const onFinish = values => {
    // values['token'] = captchaToken
    const { username } = values
    dispatch(sendUserNameForForgotPassword(username));
  };

  const onFinishConfirmPassword = values => {
    const { username, confirmationCode, password } = values
    dispatch(resetUserPassword(username, confirmationCode, password))
  }

  const onFinishFailedConfirmPassword = errorInfo => {
  }

  return (
    <div className="gx-login-container stand-alone">
      <div className="gx-login-content">
        <div className="gx-app-logo-wid">
          <img src={require("assets/images/logo.png")} alt="Astro Logo" />
        </div>
        {!showConfirmNewPasswordForm &&
          <>
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">Forgot Password</h1>
            </div>
            <Form
              form={form}
              layout='vertical'
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                label="Username"
                initialValue=""
                rules={[{ required: true, message: 'Username cannot be blank' }]} name="username">
                <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Please enter your username" />
              </Form.Item>
              {/* <Form.Item
                  label="Password"
                  hasFeedback
                  initialValue=""
                  rules= {[
                    { required: true, message: 'Password cannot be blank' },
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'should contain at least 8 characters with 1 uppercase, lowercase and number'}
                  ]}
                  name="password">
                  <Input.Password prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password"/>
                </Form.Item>
                <Form.Item
                  label="New Password"
                  hasFeedback
                  initialValue=""
                  rules= {[
                    { required: true, message: 'New Password cannot be blank' },
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'should contain at least 8 characters with 1 uppercase, lowercase and number'}
                  ]}
                  name="newPassword">
                  <Input.Password prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="New Password"/>
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
                        if(form.getFieldValue('newPassword') === value){
                          return Promise.resolve()
                        }
                        return Promise.reject('Passwords do not match')
                      }
                    }
                  ]}
                  name="confirmNewPassword">
                  <Input.Password prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Confirm New Password"/>
                </Form.Item>
                <div className="pwd-hint"><span>Password should be at least 8 characters long with 1 uppercase, lowercase and number</span></div> */}
              <Form.Item className="gx-text-center">
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        }
        {showConfirmNewPasswordForm &&
          <>
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">Confirm Forgot Password</h1>
            </div>
            <Form
              form={changePasswordForm}
              layout='vertical'
              name="basic"
              initialValues={{ username: forgotPasswordUsername }}
              onFinish={onFinishConfirmPassword}
              onFinishFailed={onFinishFailedConfirmPassword}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                label="Username"
                initialValue=""
                rules={[{ required: true, message: 'Username cannot be blank' }]} name="username">
                <Input disabled={true} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Please enter your username" />
              </Form.Item>
              <Form.Item
                label="Confirmation Code"
                initialValue=""
                rules={[{ required: true, message: 'Verification Code cannot be blank' }]} name="confirmationCode">
                <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Please enter your confirmation code" />
              </Form.Item>
              <Form.Item
                label="Password"
                initialValue=""
                rules={[
                  { required: true, message: 'Password cannot be blank' },
                  { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'should contain at least 8 characters with 1 uppercase, lowercase and number' }
                ]}
                name="password">
                <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Please enter your new password" />
              </Form.Item>
              <Form.Item className="gx-text-center">
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        }
      </div>
    </div>
  );
};

export default ForgotPassword
