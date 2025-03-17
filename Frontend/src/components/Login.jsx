import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onError: (error) => {
      notification.error({ message: 'Login failed', description: error.message });
    }
  });

  const onFinish = async (values) => {
    try {
      const result = await loginMutation({ variables: values });
      login(result.data.login);
      notification.success({ message: 'Login successful' });
      navigate('/');
    } catch (err) {
      // error handled by onError
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
