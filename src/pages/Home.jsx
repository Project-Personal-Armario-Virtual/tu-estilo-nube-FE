import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F0F5] text-[#333]">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FF7F50]">
          Tu Armario Virtual 👚👖
        </h1>
        <p className="text-lg md:text-xl text-[#555]">
          Organiza tus prendas, visualiza combinaciones y recibe recomendaciones.
        </p>

        <div className="flex space-x-4 justify-center">
          <Link
            to="/login"
            className="bg-[#FF7F50] hover:bg-[#ff6333] text-white font-medium px-6 py-3 rounded"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-[#00CED1] hover:bg-[#00b4b7] text-white font-medium px-6 py-3 rounded"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
