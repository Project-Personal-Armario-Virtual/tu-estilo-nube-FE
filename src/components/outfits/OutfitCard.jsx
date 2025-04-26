import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import favoriteService from "@/services/favoriteService";

export function OutfitCard({
  id,
  top,
  bottom,
  shoes,
  accessory,
  occasion,
  season,
  score,
  onSave,
  isSaved = false,
}) {
  const [saved, setSaved] = useState(isSaved);
  const [images, setImages] = useState({});
  const [outfitId, setOutfitId] = useState(id);
  const { toast } = useToast();

  const fetchImageBlob = async (path) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Image fetch failed");
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Failed to fetch image:", path, e);
      return "/placeholder.svg";
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      const result = {};
      if (top) result.top = await fetchImageBlob(top.imageUrl);
      if (bottom) result.bottom = await fetchImageBlob(bottom.imageUrl);
      if (shoes) result.shoes = await fetchImageBlob(shoes.imageUrl);
      if (accessory) result.accessory = await fetchImageBlob(accessory.imageUrl);
      setImages(result);
    };
    loadImages();
  }, [top, bottom, shoes, accessory]);

  const handleSave = async () => {
    try {
      let currentOutfitId = outfitId;
      if (!currentOutfitId) {
        const createdOutfit = await favoriteService.createOutfit({
          topId: top?.id,
          bottomId: bottom?.id,
          shoesId: shoes?.id,
          accessoryId: accessory?.id,
          occasion,
          season,
          score,
        });

        if (!createdOutfit) {
          throw new Error("No se pudo crear el outfit");
        }
        currentOutfitId = createdOutfit; // aquí ya no .id
        setOutfitId(currentOutfitId);
      }

      if (saved) {
        await favoriteService.removeFavorite(currentOutfitId);
        toast({
          title: "Outfit removed",
          description: "The outfit has been removed from your favorites.",
        });
      } else {
        await favoriteService.addFavorite(currentOutfitId);
        toast({
          title: "Outfit saved",
          description: "The outfit has been added to your favorites!",
        });
      }
      setSaved(!saved);
      if (onSave) {
        onSave(currentOutfitId);
      }
    } catch (error) {
      console.error("Error saving favorite:", error);
      toast({
        title: "Error",
        description: "Could not update favorite status.",
        variant: "destructive",
      });
    }
  };

  const renderItem = (item, imgSrc) =>
    item ? (
      <div key={item.id} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
        <img
          src={imgSrc}
          alt={item.category}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
          {item.category}
        </div>
      </div>
    ) : null;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="p-4 grid grid-cols-2 gap-2">
        {renderItem(top, images.top)}
        {renderItem(bottom, images.bottom)}
        {renderItem(shoes, images.shoes)}
        {accessory && renderItem(accessory, images.accessory)}
      </div>
      <CardContent className="pt-0 flex-grow">
        <h3 className="font-medium text-lg">Outfit</h3>
        <p className="text-sm text-muted-foreground">Occasion: {occasion}</p>
        <p className="text-sm text-muted-foreground">Season: {season}</p>
        <p className="text-sm text-muted-foreground">Score: {score?.toFixed(2)} / 1.00</p>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-between">
        <Button
          variant={saved ? "default" : "outline"}
          size="sm"
          onClick={handleSave}
          className={saved ? "bg-primary text-white" : ""}
        >
          <Heart className={`mr-1 h-4 w-4 ${saved ? "fill-current" : ""}`} />
          {saved ? "Saved" : "Save Outfit"}
        </Button>
        <Button variant="outline" size="sm" disabled>
          Customize
        </Button>
      </CardFooter>
    </Card>
  );
}
