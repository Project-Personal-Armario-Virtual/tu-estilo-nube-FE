import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Categorías reales basadas en tu sistema
const categories = [
  { value: "all", label: "All Items" },
  { value: "shirts", label: "Shirts" },
  { value: "pants", label: "Pants" },
  { value: "outerwear", label: "Outerwear" },
  { value: "underwear", label: "Underwear / Sports Bras" },
  { value: "accessories", label: "Accessories" },
  { value: "shoes", label: "Shoes" },
  { value: "uncategorized", label: "Uncategorized" },
];

const colors = [
  { value: "all", label: "All Colors" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "gray", label: "Gray" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
  { value: "pink", label: "Pink" },
  { value: "orange", label: "Orange" },
  { value: "brown", label: "Brown" },
];

const seasons = [
  { value: "all", label: "All Seasons" },
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
];

export default function CategoryFilter({ onFilterChange }) {
  const [category, setCategory] = useState("all");
  const [color, setColor] = useState("all");
  const [season, setSeason] = useState("all");
  const [openCategory, setOpenCategory] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openSeason, setOpenSeason] = useState(false);

  const handleCategoryChange = (value) => {
    setCategory(value);
    onFilterChange({ category: value, color, season });
    setOpenCategory(false);
  };

  const handleColorChange = (value) => {
    setColor(value);
    onFilterChange({ category, color: value, season });
    setOpenColor(false);
  };

  const handleSeasonChange = (value) => {
    setSeason(value);
    onFilterChange({ category, color, season: value });
    setOpenSeason(false);
  };

  const clearFilters = () => {
    setCategory("all");
    setColor("all");
    setSeason("all");
    onFilterChange({ category: "all", color: "all", season: "all" });
  };

  const hasActiveFilters = category !== "all" || color !== "all" || season !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* Category Filter */}
        <Popover open={openCategory} onOpenChange={setOpenCategory}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={openCategory} className="justify-between">
              {categories.find((c) => c.value === category)?.label || "Select category"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((c) => (
                    <CommandItem key={c.value} value={c.value} onSelect={() => handleCategoryChange(c.value)}>
                      <Check className={cn("mr-2 h-4 w-4", category === c.value ? "opacity-100" : "opacity-0")} />
                      {c.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Color Filter */}
        <Popover open={openColor} onOpenChange={setOpenColor}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={openColor} className="justify-between">
              {colors.find((c) => c.value === color)?.label || "Select color"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search color..." />
              <CommandList>
                <CommandEmpty>No color found.</CommandEmpty>
                <CommandGroup>
                  {colors.map((c) => (
                    <CommandItem key={c.value} value={c.value} onSelect={() => handleColorChange(c.value)}>
                      <Check className={cn("mr-2 h-4 w-4", color === c.value ? "opacity-100" : "opacity-0")} />
                      {c.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Season Filter */}
        <Popover open={openSeason} onOpenChange={setOpenSeason}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={openSeason} className="justify-between">
              {seasons.find((s) => s.value === season)?.label || "Select season"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search season..." />
              <CommandList>
                <CommandEmpty>No season found.</CommandEmpty>
                <CommandGroup>
                  {seasons.map((s) => (
                    <CommandItem key={s.value} value={s.value} onSelect={() => handleSeasonChange(s.value)}>
                      <Check className={cn("mr-2 h-4 w-4", season === s.value ? "opacity-100" : "opacity-0")} />
                      {s.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} size="sm" className="h-10">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active filters badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {category !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Category: {categories.find((c) => c.value === category)?.label}
            </Badge>
          )}
          {color !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Color: {colors.find((c) => c.value === color)?.label}
            </Badge>
          )}
          {season !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Season: {seasons.find((s) => s.value === season)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
