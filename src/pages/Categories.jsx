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

        const merged = allCategories.map((cat) => {
          const found = fetched.find((c) => c.category === cat);
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
      <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Categories</h1>
          <p className="text-muted-foreground text-lg">
            Browse your closet by category and discover all your items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(({ category, count }) => {
            const name = category;
            const Icon = iconMap[name] || Gem;

            return (
              <Card
                key={name}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold text-foreground">{name}</CardTitle>
                    <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-md">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">Total items in this category:</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">{count} items</span>
                    <Button asChild size="sm" className="hover:bg-primary/10 transition">
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
