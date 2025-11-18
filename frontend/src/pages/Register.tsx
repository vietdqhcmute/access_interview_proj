import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import useRegistrationMutate from '../hooks/auth/useRegistrationMutate';

const { Title } = Typography;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationResponse {
  data: {
    id: string;
    email: string;
    name?: string;
  },
  status: {
    code: number;
    message: string;
  }
}

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const successCallback = (data: RegistrationResponse) => {
    const { data: resData, status } = data;
    if (status.code === 200 || status.code === 201) {
      const { email } = resData;
      sessionStorage.setItem('registeredEmail', email);
      navigate('/login');
    }
  };

  const errorCallback = (error: any) => {
    const response = error.response;
    const { data } = response;
    const { code, message } = data.status;

    form.setFields([
      {
        name: 'email',
        errors: code === 422 ? [message || 'Email is already registered.'] : [],
      },
    ]);
  };

  const registrationMutate = useRegistrationMutate(successCallback, errorCallback);


  const onFinish = async (values: RegisterFormValues) => {
    try {
      registrationMutate.mutate({
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      });

    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const defaultRegister = {
    name: "Viet Do",
    email: "@example.com",
    password: "password123",
    confirmPassword: "password123"
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
          Register
        </Title>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={defaultRegister}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input your name!' },
              { min: 2, message: 'Name must be at least 2 characters!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
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

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
