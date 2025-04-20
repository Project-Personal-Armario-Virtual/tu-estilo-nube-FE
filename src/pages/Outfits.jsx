// src/pages/Outfits.jsx
import { useState } from "react"
import  OutfitGenerator  from "@/components/outfits/OutfitGenerator"
import  { OutfitCard }  from "@/components/outfits/OutfitCard"
import { useToast } from "@/hooks/use-toast"

const mockItems = [
  { id: 1, name: "Blue Denim Jacket", category: "Outerwear", image: "/placeholder.svg" },
  { id: 2, name: "White T-Shirt", category: "Tops", image: "/placeholder.svg" },
  { id: 3, name: "Black Jeans", category: "Bottoms", image: "/placeholder.svg" },
  { id: 4, name: "Brown Leather Boots", category: "Shoes", image: "/placeholder.svg" },
  { id: 5, name: "Red Sweater", category: "Tops", image: "/placeholder.svg" },
  { id: 6, name: "Gray Scarf", category: "Accessories", image: "/placeholder.svg" },
]

const mockOutfits = [
  { id: 1, name: "Casual Weekend", items: [mockItems[0], mockItems[1], mockItems[2], mockItems[3]], occasion: "Casual", isSaved: false },
  { id: 2, name: "Office Ready", items: [mockItems[4], mockItems[2], mockItems[3], mockItems[5]], occasion: "Work", isSaved: true },
]

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState(mockOutfits)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = (settings) => {
    setIsGenerating(true)
    setTimeout(() => {
      const newOutfit = {
        id: outfits.length + 1,
        name: `${settings.occasion} ${settings.season}`,
        items: [mockItems[0], mockItems[1], mockItems[2], settings.includeAccessories ? mockItems[5] : mockItems[3]],
        occasion: settings.occasion,
        isSaved: false,
      }
      setOutfits([newOutfit, ...outfits])
      setIsGenerating(false)
      toast({ title: "Outfit generated!", description: "New outfit created." })
    }, 1500)
  }

  const handleSaveOutfit = (id) => {
    setOutfits(outfits.map((outfit) => (outfit.id === id ? { ...outfit, isSaved: !outfit.isSaved } : outfit)))
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Outfit Recommendations</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OutfitGenerator onGenerate={handleGenerate} isGenerating={isGenerating} />
        <div className="lg:col-span-2">
          {outfits.length === 0 ? (
            <p>No outfits yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {outfits.map((outfit) => (
                <OutfitCard key={outfit.id} {...outfit} onSave={handleSaveOutfit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
