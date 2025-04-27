import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "@/services/authService";  // Asegúrate de que la ruta sea correcta

const PrivateRoute = () => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;  // Si está autenticado, renderiza el componente hijo
};

export default PrivateRoute;
