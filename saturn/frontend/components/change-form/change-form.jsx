import React from 'react';
import {Form, Input, InputNumber, Button} from 'antd';

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 4,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ChangeForm = ({modelObj}) => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"

        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder={modelObj ? modelObj.name : null}/>
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea/>
      </Form.Item>
      <Form.Item wrapperCol={{...layout.wrapperCol, offset: 2}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangeForm;
