import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuthContext';

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginFormValues) => {
    try {
      console.log('Login values:', values);

      const mockUser = {
        id: '1',
        email: values.email,
        name: 'User Name',
      };
      const mockToken = 'mock-jwt-token';

      login(mockUser, mockToken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Login
        </Title>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Log in
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Don't have an account? <a href="/register">Register</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}
