// src/components/outfits/OutfitCard.jsx
import React, { useState } from "react"
import { Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function OutfitCard({ id, name, items, occasion, onSave, isSaved = false }) {
  const [saved, setSaved] = useState(isSaved)

  const handleSave = () => {
    setSaved(!saved)
    if (onSave) {
      onSave(id)
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="p-4 grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item.id} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
              {item.category}
            </div>
          </div>
        ))}
      </div>
      <CardContent className="pt-0 flex-grow">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-text/70">Occasion: {occasion}</p>
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
        <Button variant="outline" size="sm">
          Customize
        </Button>
      </CardFooter>
    </Card>
  )
}
