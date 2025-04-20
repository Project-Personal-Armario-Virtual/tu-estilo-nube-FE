// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "../components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-text">Welcome to your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Items</h2>
            <p className="text-3xl font-bold text-primary">12</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Categories</h2>
            <p className="text-3xl font-bold text-primary">5</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Uploads</h2>
            <p className="text-3xl font-bold text-primary">3</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Button size="lg" onClick={() => navigate("/upload")}>
            Upload New Item
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/closet")}>
            View My Closet
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
