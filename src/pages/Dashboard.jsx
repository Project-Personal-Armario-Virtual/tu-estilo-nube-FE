import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.username}!</h1>
      <div className="space-x-2">
        <button
          onClick={() => navigate('/upload')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Subir Prenda
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

export default Dashboard
