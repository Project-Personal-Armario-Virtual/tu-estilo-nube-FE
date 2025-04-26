import { useEffect, useState } from "react"
import outfitService from "@/services/outfitService"
import { OutfitCard } from "@/components/outfits/OutfitCard"
import { useToast } from "@/hooks/use-toast"

export default function MyOutfitsPage() {
  const [outfits, setOutfits] = useState([])
  const { toast } = useToast()

  const loadOutfits = async () => {
    try {
      const data = await outfitService.getAll()
      setOutfits(data)
    } catch (error) {
      console.error("Failed to load outfits", error)
      toast({
        title: "Error",
        description: "Failed to load outfits.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadOutfits()
  }, [])

  const handleDelete = async (outfitId) => {
    try {
      await outfitService.deleteOutfit(outfitId)
      toast({
        title: "Deleted",
        description: "Outfit has been deleted.",
      })
      setOutfits((prev) => prev.filter((o) => o.id !== outfitId))
    } catch (error) {
      console.error("Failed to delete outfit", error)
      toast({
        title: "Error",
        description: "Failed to delete outfit.",
        variant: "destructive",
      })
    }
  }

  if (outfits.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        You have no saved outfits yet.
      </div>
    )
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          isSaved
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
