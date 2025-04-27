"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"
import { ItemCard } from "./ItemCard"

export function ClosetItemsList({ filters }) {
  const [items, setItems] = useState([])
  const [imagePreviews, setImagePreviews] = useState({})

  const fetchImages = async () => {
    try {
      const res = await api.get("/images/list")
      const previews = {}

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/images/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      if (imagePreviews[id]) {
        URL.revokeObjectURL(imagePreviews[id]);
        const updatedPreviews = { ...imagePreviews };
        delete updatedPreviews[id];
        setImagePreviews(updatedPreviews);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Cannot delete image because it is used in an outfit. Please delete the associated outfit first.");
    }
  }

  useEffect(() => {
    fetchImages()
    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const filteredItems = items.filter((item) => {
    const itemCategory = (item.categoryName || "Uncategorized").toLowerCase();
    const itemColor = (item.dominantColor || "").toLowerCase();
    const itemLabels = (item.labels || []).map(label => label.toLowerCase());
  
    const matchCategory = filters.category === "all" || itemCategory === filters.category;
    const matchColor = filters.color === "all" ||
      (itemColor && itemColor !== "n/a" && itemColor.includes(filters.color));
    const matchSeason = filters.season === "all" || itemLabels.includes(filters.season);
  
    return matchCategory && matchColor && matchSeason;
  });

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-xl font-semibold">My Closet Items</h3>
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
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
      ) : (
        <p className="text-center text-gray-500">No items found matching the selected filters.</p>
      )}
    </div>
  )
}
