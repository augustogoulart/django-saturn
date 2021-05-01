import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie'

import {message, Form, Input, Button, Divider} from "antd";

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 4,
    offset: 2
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 8,
  },
};

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function AddChangeForm(props) {
  const [data, setData] = useState([])

  const modelName = props.match.params.modelName
  const appName = props.match.params.appName
  const id = props.match.params.id


  const CHANGE_URL = `/saturn/api/${appName}/${modelName}/${id}/change/`
  const ADD_URL = `/saturn/api/${appName}/${modelName}/add/`

  const URL = id ? CHANGE_URL:ADD_URL
  const METHOD = id ? 'PUT':'POST'

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

  const [form] = Form.useForm();

  function postFormData(values) {
    const csrftoken = Cookies.get('csrftoken');
    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);
    headers.append('Content-Type', 'application/json')

    fetch(URL, {
      method: METHOD,
      body: JSON.stringify(values),
      headers: headers,
      credentials: 'include',
    })
      .then(() => {
        message.success("New entry added");
        const shouldResetFields = id ? null: form.resetFields()
      })
      .catch(() => message.error("Failed to create"))
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  function onInputChange(field, event) {
    data[field] = event.target.value;
    setData(data)
  }

  function getInputValue(field){
    return data[field]
  }

  function getFormFields() {
    const {meta} = data
    const formFields = meta ? Object.keys(meta) : []
    return formFields.map(
      field =>
        <Form.Item
        {...layout}
        key={field}
        label={Capitalize(field)}
        name={field}
        rules={[{required: true}]}
        initialValue={getInputValue(field)}
      >
        <Input onChange={(e) => onInputChange(field, e)}/>
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

export default AddChangeForm;
