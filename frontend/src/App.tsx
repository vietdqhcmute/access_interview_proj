import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import useCustomNotification from './hooks/auth/useCustomNotification';
import AuthProvider from './context/Auth/AuthProvider';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UploadNew = lazy(() => import('./pages/UploadNew'));
const UploadDetail = lazy(() => import('./pages/UploadDetail'));
const KeywordDetail = lazy(() => import('./pages/KeywordDetail'));

function StaticPages() {
  return (
    <Layout className='xl-h-screen'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload/new" element={<UploadNew />} />
          <Route path="/upload/:id" element={<UploadDetail />} />
          <Route path="/upload/:uploadId/keyword/:id" element={<KeywordDetail />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

function App() {
  const { contextHolder } = useCustomNotification();

  return (
    <div className="App">
      <AuthProvider>
        <ConfigProvider>
          {contextHolder}
          <StaticPages />
        </ConfigProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
