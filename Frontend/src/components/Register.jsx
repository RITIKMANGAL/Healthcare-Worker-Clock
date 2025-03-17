import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [registerMutation, { loading }] = useMutation(REGISTER, {
    onError: (error) => {
      notification.error({ message: 'Registration failed', description: error.message });
    }
  });

  const onFinish = async (values) => {
    try {
      await registerMutation({ variables: values });
      notification.success({ message: 'Registration successful' });
      navigate('/login');
    } catch (err) {
      // error handled by onError
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item name="role" label="Role" initialValue="careworker">
          <Input placeholder="careworker or manager" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
