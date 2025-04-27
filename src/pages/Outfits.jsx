import { useState } from "react";
import OutfitGenerator from "@/components/outfits/OutfitGenerator";
import { OutfitCard } from "@/components/outfits/OutfitCard";
import { useToast } from "@/hooks/use-toast";
import outfitService from "@/services/outfitService";
import OutfitScoreInfo from "@/components/outfits/OutfitScoreInfo";

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (settings) => {
    setIsGenerating(true);
    try {
      const result = await outfitService.generate(settings);
      setOutfits(result);
      toast({
        title: "Outfits generated!",
        description: `${result.length} outfit${result.length === 1 ? "" : "s"} created.`,
      });
    } catch (err) {
      toast({
        title: "Error generating outfits",
        description: err.message || "Unexpected error.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveOutfit = (id) => {
    setOutfits((prev) =>
      prev.map((outfit) =>
        outfit.id === id ? { ...outfit, isSaved: !outfit.isSaved } : outfit
      )
    );
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold">Outfit Recommendations</h1>
        <OutfitScoreInfo />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OutfitGenerator onGenerate={handleGenerate} isGenerating={isGenerating} />
        <div className="lg:col-span-2">
          {outfits.length === 0 ? (
            <p className="text-muted-foreground">No outfits yet. Generate your first!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  isSaved={outfit.isSaved}
                  showSaveButton={true}    // <--- ¡ahora explícito!
                  showDeleteButton={false} // <--- ¡no mostrar delete aquí!
                  onSave={handleSaveOutfit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
