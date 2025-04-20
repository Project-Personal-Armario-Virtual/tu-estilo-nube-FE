import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shirt,
  AlignVerticalSpaceAround,
  Wind,
  Sparkles,
  Footprints,
  Gem
} from "lucide-react"

const categories = [
  {
    id: "tops",
    name: "Tops",
    count: 12,
    icon: Shirt,
    description: "T-shirts, blouses, shirts, and tank tops",
  },
  {
    id: "bottoms",
    name: "Bottoms",
    count: 8,
    icon: AlignVerticalSpaceAround,
    description: "Pants, jeans, shorts, and skirts",
  },
  {
    id: "outerwear",
    name: "Outerwear",
    count: 5,
    icon: Wind,
    description: "Jackets, coats, sweaters, and cardigans",
  },
  {
    id: "dresses",
    name: "Dresses",
    count: 6,
    icon: Sparkles,
    description: "Dresses, jumpsuits, and rompers",
  },
  {
    id: "shoes",
    name: "Shoes",
    count: 7,
    icon: Footprints,
    description: "Sneakers, boots, sandals, and heels",
  },
  {
    id: "accessories",
    name: "Accessories",
    count: 10,
    icon: Gem,
    description: "Jewelry, bags, hats, and scarves",
  },
]

export default function CategoriesPage() {
  return (
    <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-text/70">Browse your closet by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-8">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-text/70 mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{category.count} items</span>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/closet?category=${category.id}`}>View Items</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
