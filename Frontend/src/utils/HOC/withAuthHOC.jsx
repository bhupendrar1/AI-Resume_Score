import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const WithAuthHOC = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const { isLogin } = useContext(AuthContext);

    useEffect(() => {
      const storedLogin = localStorage.getItem('isLogin') === 'true';
      if (!isLogin && !storedLogin) {
        navigate('/');
      }
    }, [isLogin, navigate]);

    const storedLogin = localStorage.getItem('isLogin') === 'true';
    if (!isLogin && !storedLogin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuthHOC;
