import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute";  // Corrige la importación

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Closet from "@/pages/Closet";
import Upload from "@/pages/UploadImages";
import Categories from "@/pages/Categories";
import Outfits from "@/pages/Outfits";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MyOutfitsPage from "@/pages/MyOutfitsPage";
import { ClosetItemDetails } from "@/pages/ClosetItemDetails";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/closet" element={<Closet />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/outfits" element={<Outfits />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-outfits" element={<MyOutfitsPage />} />
            <Route path="/closet/:id" element={<ClosetItemDetails />} />
          </Route>
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
