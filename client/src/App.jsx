import RegisterForm from './pages/RegisterForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';
import SpeciesCatalog from './pages/Species';
import Navbar from './components/layout/Navbar';

const App = ({ darkMode, toggleTheme }) => {
  return (
    <BrowserRouter>
      <Navbar darkMode={ darkMode } toggleTheme={ toggleTheme }/>
      <Routes>
        <Route element={ <Layout/> }>
          <Route path="/register" element={ <RegisterForm/> }/>
          <Route path="/login" element={ <LoginForm/> }/>
          <Route path="/dashboard" element={ <Dashboard/> }/>
          <Route path="/species" element={ <SpeciesCatalog/> }/>
          <Route path="*" element={ <RegisterForm/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;