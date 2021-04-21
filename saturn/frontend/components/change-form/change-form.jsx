import React, {useEffect, useState} from 'react';
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

function ChangeForm(props) {
  const modelName = props.match.params.modelName
  const appName = props.match.params.appName
  const id = props.match.params.id

  const [data, setDate] = useState([])

  const CHANGE_URL = `/saturn/api/${appName}/${modelName}/${id}/change/`

  useEffect(() => {
    fetch(CHANGE_URL)
      .then(response => response.json())
      .then(data => setDate(data))
  }, [])

  const [form] = Form.useForm();

  function postFormData(values) {
    const csrftoken = Cookies.get('csrftoken');
    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);
    headers.append('Content-Type', 'application/json')

    fetch(CHANGE_URL, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: headers,
      credentials: 'include',
    })
      .then(() => {
        message.success("New entry added");
        form.resetFields()
      })
      .catch(() => message.error("Failed to create"))
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  function getFormFields() {
    const {meta} = data
    const fields = meta ? Object.keys(meta) : []

    return fields.map(
      field => <
        Form.Item
        {...layout}
        key={field}
        label={field}
        name={field}
        rules={[{required: true}]}
      >
        <Input/>
      </Form.Item>
    )
  }

  return (
    <Form
      {...layout}
      name="basic"
      form={form}
      onFinish={postFormData}
      onFinishFailed={onFinishFailed}
    >
      {getFormFields()}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ChangeForm;
