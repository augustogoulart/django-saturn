import React from 'react';
import Cookies from 'js-cookie'

import {message, Form, Input, Button} from "antd";

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 4,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 8,
  },
};

const Add = ({modelObj}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const csrftoken = Cookies.get('csrftoken');
    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);

    fetch('/saturn/__sandbox__/dummyuser/add/', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: headers,
      credentials: 'include'
    })
      .then(()=> {message.success("New entry added");form.resetFields()})
      .catch(() => message.error("Failed to create"))


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
