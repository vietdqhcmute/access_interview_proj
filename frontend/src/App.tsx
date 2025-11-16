import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import useCustomNotification from './hooks/auth/useCustomNotification';
import AuthProvider from './context/Auth/AuthProvider';
import WithAuth from './components/WithAuth';
import WithoutAuth from './components/WithoutAuth';

const Home = lazy(() => import('./pages/Home'));
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<WithoutAuth><Login /></WithoutAuth>} />
          <Route path="/register" element={<WithoutAuth><Register /></WithoutAuth>} />
          <Route path="/dashboard" element={<WithAuth><Dashboard /></WithAuth>} />
          <Route path="/upload/new" element={<WithAuth><UploadNew /></WithAuth>} />
          <Route path="/upload/:id" element={<WithAuth><UploadDetail /></WithAuth>} />
          <Route path="/upload/:uploadId/keyword/:id" element={<WithAuth><KeywordDetail /></WithAuth>} />
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
