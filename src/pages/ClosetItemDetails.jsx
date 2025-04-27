
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

export  function ClosetItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
      }
    };
    fetchItem();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [id]);

  if (!item) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <img src={previewUrl} alt={item.fileName} className="rounded-lg mb-6 w-full object-contain" />
        <h1 className="text-3xl font-bold mb-4">{item.fileName}</h1>
        <div className="space-y-2 text-text/80 mb-6">
          <p><strong>Category:</strong> {item.categoryName || "Uncategorized"}</p>
          <p><strong>Dominant Color:</strong> {item.dominantColor || "N/A"}</p>
          {item.labels.length > 0 && (
            <p><strong>Labels:</strong> {item.labels.join(", ")}</p>
          )}
        </div>
        <Button asChild variant="outline">
          <Link to="/closet">Back to Closet</Link>
        </Button>
      </div>
    </div>
  );
}
