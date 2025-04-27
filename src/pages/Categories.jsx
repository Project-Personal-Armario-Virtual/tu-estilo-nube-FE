// src/pages/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, AlignVerticalSpaceAround, Wind, Footprints, Sparkles, Gem } from "lucide-react";
import { Link } from "react-router-dom";

const allCategories = [
  "Shirts",
  "Pants",
  "Outerwear",
  "Underwear / Sports Bras",
  "Accessories",
  "Shoes",
  "Uncategorized",
];

const iconMap = {
  Shirts: Shirt,
  Pants: AlignVerticalSpaceAround,
  Outerwear: Wind,
  "Underwear / Sports Bras": Footprints,
  Accessories: Gem,
  Shoes: Footprints,
  Uncategorized: Sparkles,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/dashboard/categories");
        const fetched = res.data;

        const merged = allCategories.map(cat => {
          const found = fetched.find(c => c.category === cat);
          return {
            category: cat,
            count: found ? found.count : 0,
          };
        });

        setCategories(merged);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-text/70">Browse your closet by category</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ category, count }) => {
            const name = category;
            const Icon = iconMap[name] || Gem;

            return (
              <Card key={name} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-8">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{name}</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-text/70 mb-4">Items in this category</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{count} items</span>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/closet?category=${name.toLowerCase()}`}>
                        View Items
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
