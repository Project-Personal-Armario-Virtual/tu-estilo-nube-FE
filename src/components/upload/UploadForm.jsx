// src/components/upload/UploadForm.jsx
import React, { useState, useEffect } from "react"
import api from "@/services/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function UploadForm() {
  const [file, setFile] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [categories, setCategories] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories")
      console.log("Backend /categories response:", res.data)

      const cats = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.categories)
        ? res.data.categories
        : []

      setCategories(cats)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories.",
        variant: "destructive",
      })
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return toast({ title: "Select a file first." })

    const formData = new FormData()
    formData.append("file", file)
    if (selectedCategory) formData.append("categoryId", selectedCategory)

    try {
      await api.post("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      toast({ title: "Upload successful!" })
      setFile(null)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.response?.data || error.message,
        variant: "destructive",
      })
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    try {
      await api.post("/categories", { name: newCategoryName })
      toast({ title: "Category added!" })
      setNewCategoryName("")
      fetchCategories()
    } catch (error) {
      toast({
        title: "Error adding category",
        description: error.response?.data || error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Image</Label>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="space-y-2">
              <Label>Select Category</Label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">None</option>
                {(categories || []).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit">Upload</Button>
        </form>

        <form onSubmit={handleAddCategory} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>New Category Name</Label>
              <Input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Rain jackets"
              />
            </div>
            <Button type="submit">Add Category</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
