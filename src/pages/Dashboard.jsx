import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentItems } from "@/components/dashboard/RecentItems";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shirt, Tag, Plus, Sparkles, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function Dashboard() {
  const { totalItems, totalCategories, mostCommonColor, totalOutfits } = useDashboardStats(); // 👈 incluimos totalOutfits

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Items"
          value={totalItems}
          icon={<Shirt className="h-4 w-4" />}
          description="Clothing registered in your closet"
        />
        <StatsCard
          title="Categories"
          value={totalCategories}
          icon={<Tag className="h-4 w-4" />}
          description="Different categories in use"
        />
        <StatsCard
          title="Outfits Created"
          value={totalOutfits ?? "—"} // 👈 mostramos totalOutfits real
          icon={<Sparkles className="h-4 w-4" />}
          description="Saved outfit combinations"
        />
        <StatsCard
          title="Most Common Color"
          value={mostCommonColor || "—"}
          icon={<LayoutGrid className="h-4 w-4" />}
          description="In your wardrobe"
        />
      </div>

      {/* Grilla principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección de items recientes */}
        <RecentItems />

        {/* Sección de acciones rápidas */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link to="/upload">
                <Plus className="h-4 w-4" />
                Add New Item
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link to="/outfits">
                <Sparkles className="h-4 w-4" />
                Generate Outfit
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link to="/categories">
                <Tag className="h-4 w-4" />
                Browse Categories
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
