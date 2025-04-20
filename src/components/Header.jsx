// src/components/Header.jsx
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-primary">Tu Armario Virtual</Link>
      <nav className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-primary">Dashboard</Link>
        <Link to="/closet" className="text-gray-700 hover:text-primary">Closet</Link>
        <Link to="/upload" className="text-gray-700 hover:text-primary">Subir</Link>
        <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
      </nav>
    </header>
  )
}
