"use client";

import { useEffect, useState } from "react";
import { OutfitCard } from "@/components/outfits/OutfitCard";
import outfitService from "@/services/outfitService";
import { useToast } from "@/hooks/use-toast";

export default function MyOutfitsPage() {
  const [outfits, setOutfits] = useState([]);
  const { toast } = useToast();

  const loadOutfits = async () => {
    try {
      const data = await outfitService.getAll();
      setOutfits(data);
    } catch (error) {
      console.error("Failed to load outfits", error);
      toast({
        title: "Error",
        description: "Could not load saved outfits.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadOutfits();
  }, []);

  const handleDelete = async (outfitId) => {
    try {
      await outfitService.deleteOutfit(outfitId);
      setOutfits((prev) => prev.filter((outfit) => outfit.id !== outfitId));
      toast({
        title: "Deleted",
        description: "Outfit has been deleted.",
      });
    } catch (error) {
      console.error("Failed to delete outfit", error);
      toast({
        title: "Error",
        description: "Failed to delete outfit.",
        variant: "destructive",
      });
    }
  };

  if (outfits.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
          You have no saved outfits yet.
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        My Saved Outfits
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            id={outfit.id}
            top={outfit.top}
            bottom={outfit.bottom}
            shoes={outfit.shoes}
            accessory={outfit.accessory}
            occasion={outfit.occasion}
            season={outfit.season}
            score={outfit.score}
            isSaved={true}
            showSaveButton={false}
            showDeleteButton={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
