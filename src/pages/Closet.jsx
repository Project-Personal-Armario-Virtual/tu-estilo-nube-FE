// src/pages/Closet.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import CategoryFilter from "@/components/closet/CategoryFilter";
import { ClosetItemsList } from "@/components/closet/ClosetItemsList";

export default function Closet() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [filters, setFilters] = useState({
    category: categoryFromUrl || "all",  // 🔥 Aquí leemos de la URL
    color: "all",
    season: "all",
  });

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    }
  }, [categoryFromUrl]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Closet</h1>
          <Button asChild>
            <Link to="/upload">
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Link>
          </Button>
        </div>

        <div className="mb-6">
          <CategoryFilter onFilterChange={setFilters} />
        </div>

        <ClosetItemsList filters={filters} />
      </main>
    </div>
  );
}
