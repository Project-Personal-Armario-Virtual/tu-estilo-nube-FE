// src/components/closet/ClosetItemsList.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import { ItemCard } from "./ItemCard";
import { Skeleton } from "@/components/ui/skeleton";

export function ClosetItemsList({ filters }) {
  const [items, setItems] = useState([]);
  const [imagePreviews, setImagePreviews] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await api.get("/images/list");
      const previews = {};

      for (const item of res.data) {
        const imageBlob = await api.get(`/images/${item.id}`, { responseType: "blob" });
        const imageUrl = URL.createObjectURL(imageBlob.data);
        previews[item.id] = imageUrl;
      }

      setItems(res.data);
      setImagePreviews(previews);
    } catch (error) {
      console.error("Error loading user images:", error);
    } finally {
      setLoading(false);
    }
  };

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
  };

  useEffect(() => {
    fetchImages();
    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const normalizeCategory = (text) => {
    if (!text) return "uncategorized";
    return text.toLowerCase().replace(/\s|\/|\-/g, '');
  };

  const filteredItems = items.filter((item) => {
    const itemCategory = normalizeCategory(item.categoryName || "uncategorized");
    const itemColor = (item.dominantColor || "").toLowerCase();
    const itemLabels = (item.labels || []).map(label => label.toLowerCase());

    const filterCategory = filters.category === "all" || normalizeCategory(filters.category) === itemCategory;
    const filterColor = filters.color === "all" || itemColor.includes(filters.color);
    const filterSeason = filters.season === "all" || itemLabels.includes(filters.season);

    return filterCategory && filterColor && filterSeason;
  });

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-xl font-semibold">My Closet Items</h3>

      {loading ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(6)].map((_, idx) => (
            <Skeleton key={idx} className="h-72 w-full rounded-xl" />
          ))}
        </motion.div>
      ) : filteredItems.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: item.id * 0.02 }}
            >
              <ItemCard
                id={item.id}
                name={item.fileName}
                category={item.categoryName || "Uncategorized"}
                dominantColor={item.dominantColor || "N/A"}
                image={imagePreviews[item.id]}
                onDelete={handleDelete}
                labels={item.labels}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">No items found matching the selected filters.</p>
      )}
    </div>
  );
}
