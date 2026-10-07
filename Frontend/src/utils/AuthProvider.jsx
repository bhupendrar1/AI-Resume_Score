import { AuthContext } from './AuthContext';
import { useState } from 'react';

const AuthProvider = ({ children }) => {
  let initialLogin = false;
  let initialUserInfo = null;
  let initialToken = null;

  try {
    initialLogin = localStorage.getItem('isLogin') === 'true';
    const rawUser = localStorage.getItem('userInfo');
    initialUserInfo = rawUser ? JSON.parse(rawUser) : null;
    initialToken = localStorage.getItem('authToken');
  } catch {
    // ignore
  }

  const [isLogin, setLogin] = useState(initialLogin);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [authToken, setAuthToken] = useState(initialToken);

  const loginUser = (user, token = '') => {
    setUserInfo(user);
    setLogin(true);
    if (token) setAuthToken(token);
    try {
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('isLogin', 'true');
      if (token) localStorage.setItem('authToken', token);
    } catch (e) {
      console.error(e);
    }
  };

  const logoutUser = () => {
    setUserInfo(null);
    setLogin(false);
    setAuthToken(null);
    try {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLogin');
      localStorage.removeItem('authToken');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setLogin,
        userInfo,
        setUserInfo,
        authToken,
        setAuthToken,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
