import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Tu Armario
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link to="/upload" className="text-gray-600 hover:text-gray-900">
            Subir prenda
          </Link>
        </nav>
      </div>
    </header>
  )
}
