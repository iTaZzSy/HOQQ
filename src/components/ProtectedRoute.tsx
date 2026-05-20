import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to the login page if there is no token
    return <Navigate to="/x9z" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
