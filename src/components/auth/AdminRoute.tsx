
import React from 'react';

interface AdminRouteProps {
  children: React.ReactNode;
}

// This component now allows anyone to access admin routes without authentication
const AdminRoute = ({ children }: AdminRouteProps) => {
  console.log('Admin route accessed - NO AUTHENTICATION REQUIRED');
  return <>{children}</>;
};

export default AdminRoute;
