import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import UploadImages from '../pages/UploadImages'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<UploadImages />} />
        {/* aquí irían el resto de páginas cuando las tengas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
