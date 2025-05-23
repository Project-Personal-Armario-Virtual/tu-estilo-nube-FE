import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"; 
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />  
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer /> 
      <Toaster />
    </div>
  );
}
