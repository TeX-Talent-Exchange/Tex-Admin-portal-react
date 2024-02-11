import React from "react";
import { Form, Input } from "antd";
export const InputFieldText = ({
  required = true,
  message,
  whitespace = true,
  whitespaceMsg,
  name,
  label,
  placeholder,
  onChangeHandler,
}) => {
  return (
    <Form.Item
      initialValue=""
      rules={[
        { required: required, message: message },
        {
          pattern: /^[a-z\d\-_\s]+$/i,
          message: message,
        },
        {
          whitespace: whitespace,
          message: whitespaceMsg,
        },
      ]}
      name={name}
      label={label}
    >
      <Input placeholder={placeholder} onChange={onChangeHandler} />
    </Form.Item>
  );
};

export const InputFieldNumber = ({
  required = true,
  message,
  whitespace = true,
  whitespaceMsg,
  name,
  label,
  placeholder,
  onChangeHandler,
}) => {
  return (
    <Form.Item
      initialValue=""
      rules={[
        { required: required, message: message },
        {
          pattern: /^[0-9]*$/,
          message: message,
        },
        {
          whitespace: whitespace,
          message: whitespaceMsg,
        },
      ]}
      name={name}
      label={label}
    >
      <Input placeholder={placeholder} onChange={onChangeHandler} />
    </Form.Item>
  );
};
