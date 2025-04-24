
import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function OutfitScoreInfo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2">
          <Info className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 text-sm">
        <p className="font-semibold mb-1">🧠 How does scoring work?</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Color coordination (matching or contrast)</li>
          <li>Suitability for the selected <strong>season</strong></li>
          <li>Fit with the chosen <strong>occasion</strong></li>
          <li>Inclusion of accessories (if selected)</li>
        </ul>
        <p className="mt-2 text-muted-foreground text-xs">Score ranges from 0.00 (low) to 1.00 (ideal).</p>
      </PopoverContent>
    </Popover>
  )
}
