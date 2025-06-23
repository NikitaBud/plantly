import RegisterForm from './pages/RegisterForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* additional pages */}
          <Route path="*" element={<RegisterForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}