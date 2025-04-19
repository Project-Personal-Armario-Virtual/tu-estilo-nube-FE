import React from 'react'
import { Navigate } from 'react-router-dom'
import authService from '../services/authService'

export default function ProtectedRoute({ children }) {
  // Verifica directamente si está autenticado basado en la presencia del token
  // en lugar de depender del contexto
  if (!authService.isAuthenticated()) {
    return <Navigate to="/" replace />
  }
  
  return children
}