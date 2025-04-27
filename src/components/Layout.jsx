import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"; // Asegúrate de que Toaster esté correcto
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />  {/* Este Navbar debe mostrarse en todas las páginas */}
      <main className="flex-grow">
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </main>
      <Footer /> {/* Este Footer también debe mostrarse en todas las páginas */}
      <Toaster /> {/* Notificaciones si están configuradas */}
    </div>
  );
}
