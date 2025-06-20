import RegisterForm from './components/RegisterForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RegisterForm />} />
          {/* additional pages */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}