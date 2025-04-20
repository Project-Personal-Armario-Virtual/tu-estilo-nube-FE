// src/pages/Closet.jsx
import React, { useState } from "react"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ItemCard } from "@/components/closet/ItemCard"
import  CategoryFilter  from "@/components/closet/CategoryFilter"
import { useToast } from "@/hooks/use-toast"


const mockItems = [
  {
    id: 1,
    name: "Blue Denim Jacket",
    category: "Outerwear",
    color: "Blue",
    season: "fall",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "White T-Shirt",
    category: "Tops",
    color: "White",
    season: "summer",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Black Jeans",
    category: "Bottoms",
    color: "Black",
    season: "all",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Red Sweater",
    category: "Tops",
    color: "Red",
    season: "winter",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Brown Leather Boots",
    category: "Shoes",
    color: "Brown",
    season: "fall",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Gray Scarf",
    category: "Accessories",
    color: "Gray",
    season: "winter",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Green Dress",
    category: "Dresses",
    color: "Green",
    season: "spring",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Yellow Raincoat",
    category: "Outerwear",
    color: "Yellow",
    season: "spring",
    image: "/placeholder.svg",
  },
]

export default function Closet() {
  const [items, setItems] = useState(mockItems)
  const [filters, setFilters] = useState({
    category: "all",
    color: "all",
    season: "all",
  })
  const { toast } = useToast()

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Item deleted",
      description: "The item has been removed from your closet.",
    })
  }

  const filteredItems = items.filter((item) => {
    return (
      (filters.category === "all" || item.category.toLowerCase() === filters.category) &&
      (filters.color === "all" || item.color.toLowerCase() === filters.color) &&
      (filters.season === "all" || item.season === filters.season)
    )
  })

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">My Closet</h1>
          <Button asChild>
            <Link to="/upload">
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <CategoryFilter onFilterChange={handleFilterChange} />
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No items found</h2>
            <p className="text-text/70 mb-6">
              {items.length === 0
                ? "Your closet is empty. Add some items to get started!"
                : "No items match your current filters. Try adjusting your filters or add new items."}
            </p>
            <Button asChild>
              <Link to="/upload">
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                color={item.color}
                image={item.image}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
