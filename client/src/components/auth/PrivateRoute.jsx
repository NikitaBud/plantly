import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, authChecked } = useAuth();

  if (!authChecked) {
    return null;
  }

  return user ? children : <Navigate to={ `/login` }/>;
}

export default PrivateRoute;