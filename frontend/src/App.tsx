import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UploadNew = lazy(() => import('./pages/UploadNew'));
const UploadDetail = lazy(() => import('./pages/UploadDetail'));
const KeywordDetail = lazy(() => import('./pages/KeywordDetail'));

function StaticPages() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload/new" element={<UploadNew />} />
        <Route path="/upload/:id" element={<UploadDetail />} />
        <Route path="/keyword/:id" element={<KeywordDetail />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ConfigProvider>
          <StaticPages />
        </ConfigProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
