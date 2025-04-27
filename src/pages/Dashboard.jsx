// src/pages/Dashboard.jsx
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentItems } from "@/components/dashboard/RecentItems";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shirt, Tag, Plus, Sparkles, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function Dashboard() {
  const { totalItems, totalCategories, mostCommonColor, totalOutfits } = useDashboardStats();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your wardrobe and activities</p>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatsCard
          title="Total Items"
          value={totalItems}
          icon={<Shirt className="h-5 w-5 text-primary" />}
          description="Clothing registered"
        />
        <StatsCard
          title="Categories"
          value={totalCategories}
          icon={<Tag className="h-5 w-5 text-primary" />}
          description="Categories in use"
        />
        <StatsCard
          title="Outfits Created"
          value={totalOutfits ?? "—"}
          icon={<Sparkles className="h-5 w-5 text-primary" />}
          description="Saved outfits"
        />
        <StatsCard
          title="Most Common Color"
          value={
            mostCommonColor && mostCommonColor !== "N/A" ? (
              <div className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full border border-muted"
                  style={{ backgroundColor: mostCommonColor.toLowerCase() }}
                ></span>
                <span className="capitalize">{mostCommonColor}</span>
              </div>
            ) : (
              "—"
            )
          }
          icon={<LayoutGrid className="h-5 w-5 text-primary" />}
          description="Dominant color"
        />
      </div>

      {/* Grilla principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RecentItems />

        {/* Acciones rápidas */}
        <Card className="col-span-1 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link to="/upload">
                <Plus className="h-5 w-5" />
                Add New Item
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link to="/outfits">
                <Sparkles className="h-5 w-5" />
                Generate Outfit
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link to="/categories">
                <Tag className="h-5 w-5" />
                Browse Categories
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
