
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

export default function PrivateRoute() {

  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  

  return <Outlet />;
}