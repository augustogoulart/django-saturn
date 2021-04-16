import React, { useEffect } from 'react';
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

function ChangeForm(props){
  const modelName = props.match.params.modelName
  const appName = props.match.params.appName
  const id = props.match.params.id

  const CHANGE_URL = `/saturn/api/${appName}/${modelName}/${id}/change/`

  useEffect(() => {fetch(CHANGE_URL)
    .then(response => response.json())
    .then(data => console.log(data))}, [])

  const [form] = Form.useForm();

  function postFormData(values){
    const csrftoken = Cookies.get('csrftoken');
    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);
    headers.append('Content-Type', 'application/json')

    fetch(CHANGE_URL, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: headers,
      credentials: 'include',
    })
      .then(()=> {message.success("New entry added");form.resetFields()})
      .catch(() => message.error("Failed to create"))
  }

  function onFinishFailed(errorInfo){
    console.log('Failed:', errorInfo);
  }

  return (
    <Form
      {...layout}
      name="basic"
      form={form}
      onFinish={postFormData}
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
}

export default ChangeForm;
