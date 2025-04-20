// src/pages/Closet.jsx
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import CategoryFilter from "@/components/closet/CategoryFilter"  
import { ClosetItemsList } from "@/components/closet/ClosetItemsList"  


export default function Closet() {
  const [filters, setFilters] = useState({
    category: "all",
    color: "all",
    season: "all",
  })

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
  )
}
