import React from "react";
import { Form, Select } from "antd";
export const DropdownComponent = ({
  placeholder,
  onChangeHandler,
  options,
  disabled,
  required,
  message,
  label,
  name,
  defaultVal,
}) => {
  const { Option } = Select;
  return (
    <Form.Item
      rules={[{ required: required, message: message }]}
      name={name}
      label={label}
      initialValue={defaultVal && options[0]?.value}
    >
      <Select
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChangeHandler}
        defaultValue={defaultVal && options[0]?.value}
      >
        {options.map((option, index) => (
          <Option value={option.value} key={index}>
            {option.description}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
