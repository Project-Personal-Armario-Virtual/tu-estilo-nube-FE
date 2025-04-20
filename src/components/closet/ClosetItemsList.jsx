// src/components/closet/ClosetItemsList.jsx
"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"
import { ItemCard } from "./ItemCard"

export function ClosetItemsList() {
  const [items, setItems] = useState([])
  const [imagePreviews, setImagePreviews] = useState({})

  // Obtener imágenes del backend asociadas al usuario
  const fetchImages = async () => {
    try {
      const res = await api.get("/images/list")
      const previews = {}

      // Convertir blobs en URLs para cada imagen
      for (const item of res.data) {
        const imageBlob = await api.get(`/images/${item.id}`, { responseType: "blob" })
        const imageUrl = URL.createObjectURL(imageBlob.data)
        previews[item.id] = imageUrl
      }

      setItems(res.data)
      setImagePreviews(previews)
    } catch (error) {
      console.error("Error loading user images:", error)
    }
  }

  // Eliminar prenda
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?")
    if (!confirmDelete) return
    try {
      await api.delete(`/images/${id}`)
      fetchImages() // Refrescar lista
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  useEffect(() => {
    fetchImages()
    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-xl font-semibold">My Closet Items</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            name={item.fileName}
            category={item.categoryName || "Uncategorized"}
            color={item.color || "N/A"}
            image={imagePreviews[item.id]}
            onDelete={handleDelete}
            labels={item.labels}
          />
        ))}
      </div>
    </div>
  )
}
