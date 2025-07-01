import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
      getCurrentUser()
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  const logout = async () => {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      logout,
      authChecked
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);