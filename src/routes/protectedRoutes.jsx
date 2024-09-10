import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
