"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

// Función para formatear el nombre del archivo
function formatFileName(fileName) {
  if (!fileName) return "";
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const cleaned = nameWithoutExtension
    .replace(/_/g, " ")
    .replace(/removebg-preview/gi, "")
    .trim();
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ClosetItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/images/list`);
        const found = res.data.find((img) => img.id === Number(id));
        if (found) {
          const imageBlob = await api.get(`/images/${found.id}`, { responseType: "blob" });
          const url = URL.createObjectURL(imageBlob.data);
          setPreviewUrl(url);
          setItem(found);
        }
      } catch (error) {
        console.error("Error loading item details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-500 animate-pulse">Loading item...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-red-500">Item not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
        <img
          src={previewUrl}
          alt={item.fileName}
          className="rounded-lg max-h-[400px] w-full object-contain mx-auto"
        />
        <h1 className="text-3xl font-bold text-center">{formatFileName(item.fileName)}</h1>
        <div className="space-y-2 text-text/80 text-center">
          <p><strong>Category:</strong> {item.categoryName || "Uncategorized"}</p>
          <p><strong>Dominant Color:</strong> {item.dominantColor || "N/A"}</p>
          {item.labels.length > 0 && (
            <p><strong>Labels:</strong> {item.labels.join(", ")}</p>
          )}
        </div>
        <div className="flex justify-center pt-4">
          <Button asChild variant="outline">
            <Link to="/closet">Back to Closet</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
