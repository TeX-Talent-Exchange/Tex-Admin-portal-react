import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { load } from "recaptcha-v3";
import { Link } from "react-router-dom";
import {
  userSignIn,
  saveGoogleCaptchaToken,
  refreshGoogleCaptchaToken,
} from "../../appRedux/actions/Auth";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const captchaToken = useSelector(({ auth }) => auth.googleCaptchaToken);
  const refreshCaptchaToken = useSelector(
    ({ auth }) => auth.refreshGoogleCaptchaToken
  );
  //const currentUser = useSelector(({auth}) => auth);
  const onFinish = (values) => {
    values["token"] = captchaToken;
    dispatch(userSignIn(values));
  };

  const getGoogleRecaptchaToken = () => {
    load("6Ldr_hcaAAAAAOHZiWbobrPxmu_Q0p4V8eMsfGiz", {
      autoHideBadge: true,
      explicitRenderParameters: { badge: "bottomright" },
    }).then((recaptcha) => {
      recaptcha.execute("login").then((googleCaptchaToken) => {
        dispatch(saveGoogleCaptchaToken(googleCaptchaToken));
        dispatch(refreshGoogleCaptchaToken(false));
      });
    });
  };

  useEffect(() => {
    if (!captchaToken) {
      getGoogleRecaptchaToken();
    } else {
      if (refreshCaptchaToken) {
        getGoogleRecaptchaToken();
      }
    }
    // eslint-disable-next-line
  }, [refreshCaptchaToken]);

  return (
    <div className="gx-login-container stand-alone">
      <div className="gx-login-content">
        <div className="gx-app-logo-wid">
          <img src={require("assets/images/logo.png")} alt="Tex Logo" />
        </div>
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Welcome Please Sign In</h1>
        </div>
        <Form
          initialValues={{}}
          name="basic"
          onFinish={onFinish}
          className="gx-signin-form gx-form-row0"
        >
          <Form.Item
            initialValue=""
            rules={[
              { required: true, message: "Username cannot be blank" },
              { type: "string" },
            ]}
            name="username"
          >
            <Input
              placeholder="Username"
              prefix={<UserOutlined style={{ color: "#8500ff" }} />}
            />
          </Form.Item>
          <Form.Item
            initialValue=""
            rules={[
              { required: true, message: "Password cannot be blank" },
              { type: "string" },
            ]}
            name="password"
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#8500ff" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ marginTop: "-15px" }}>
            <i className="icon icon-forgot-password"></i>
            <Link
              style={{ color: "#8500ff", cursor: "pointer" }}
              className="gx-signup-form-forgot gx-link"
              to="/forgotPassword"
            >
              Forgot password ?
            </Link>
          </Form.Item>
          <Form.Item className="gx-text-center">
            <Button type="primary" className="gx-mb-0" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
