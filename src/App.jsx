import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import UploadImages from './pages/UploadImages'

function App() {
  return (
    <Routes>
      {/* rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* rutas protegidas */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadImages />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
