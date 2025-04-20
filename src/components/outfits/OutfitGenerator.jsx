import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Wand2 } from "lucide-react"

const occasions = [
  { value: "casual", label: "Casual" },
  { value: "work", label: "Work/Office" },
  { value: "formal", label: "Formal" },
  { value: "sport", label: "Sport/Workout" },
  { value: "party", label: "Party" },
]

const seasons = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
]

export default function OutfitGenerator({ onGenerate, isGenerating = false }) {
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      occasion: "",
      season: "",
      colorCoordination: 3,
      includeAccessories: true,
    },
  })

  const onSubmit = (values) => {
    if (!values.occasion || !values.season) {
      toast({
        title: "Missing information",
        description: "Please select both occasion and season.",
        variant: "destructive",
      })
      return
    }

    onGenerate(values)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generate Outfit</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occasion</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an occasion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {occasions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a season" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {seasons.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="colorCoordination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Coordination</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <FormDescription>Monochromatic to Contrasting</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="includeAccessories"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Include Accessories</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isGenerating} className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Outfit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
