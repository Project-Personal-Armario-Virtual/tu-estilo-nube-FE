import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute    from './components/ProtectedRoute'
import Home from './pages/Home'
import Login         from './pages/Login'
import UploadImages  from './pages/UploadImages'
// (luego podrás añadir más páginas: Dashboard, Profile, etc.)

function App() {
  return (
    <Routes>
      {/* ruta pública */}
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Login />} />

      {/* ruta protegida */}
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
