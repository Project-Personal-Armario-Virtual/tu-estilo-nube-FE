import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tu Armario Virtual. Todos los derechos reservados.
      </div>
    </footer>
  )
}
