// src/hooks/useUploadImages.js
import { useEffect, useState } from "react";
import api from "@/services/api";

export function useUploadImages() {
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchImages();
    return () => {
      Object.values(imagePreviews).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      const cats = Array.isArray(res.data) ? res.data : res.data.categories;
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await api.get("/images/list");
      setImages(response.data);

      const previews = {};
      for (const image of response.data) {
        const imageResponse = await api.get(`/images/${image.id}`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(imageResponse.data);
        previews[image.id] = imageUrl;
      }
      setImagePreviews(previews);
    } catch (error) {
      console.error("Error loading images:", error);
      setMessage("Error loading images: " + (error.response?.data || error.message));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    if (selectedCategory) {
      formData.append("categoryId", selectedCategory);
    }

    try {
      const response = await api.post("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data);
      await fetchImages();
    } catch (error) {
      setMessage("Error uploading image: " + (error.response?.data || error.message));
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      return setMessage("Category name cannot be empty");
    }
    try {
      await api.post("/categories", { name: newCategoryName });
      setMessage("Category added successfully");
      setNewCategoryName("");
      await fetchCategories();
    } catch (error) {
      setMessage("Error adding category: " + (error.response?.data || error.message));
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;
    try {
      const response = await api.delete(`/images/${id}`);
      setMessage(response.data);
      await fetchImages();
    } catch (error) {
      setMessage("Error deleting image: " + (error.response?.data || error.message));
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const response = await api.get(`/images/${id}`, { responseType: "blob" });
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      setMessage("Error downloading image: " + (error.response?.data || error.message));
    }
  };

  return {
    file,
    selectedCategory,
    newCategoryName,
    message,
    images,
    imagePreviews,
    categories,
    setFile,
    setSelectedCategory,
    setNewCategoryName,
    handleUpload,
    handleAddCategory,
    handleDelete,
    handleDownload,
  };
}
