import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UploadImages = () => {
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState({});
  const [categories, setCategories] = useState([]);

  // Función para obtener las categorías desde el backend
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      // Imprimir en consola la respuesta para verificar el formato
      console.log("Response from /categories:", res.data);
      // Si res.data es un arreglo lo asigna directamente, si no, asume que la propiedad correcta es res.data.categories
      const cats = Array.isArray(res.data) ? res.data : res.data.categories;
      setCategories(cats);
      console.log("Categories state updated:", cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Función para obtener las imágenes del usuario
  const fetchImages = async () => {
    try {
      const response = await api.get('/images/list');
      setImages(response.data);

      const previews = {};
      for (const image of response.data) {
        const imageResponse = await api.get(`/images/${image.id}`, {
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(imageResponse.data);
        previews[image.id] = imageUrl;
      }
      setImagePreviews(previews);
    } catch (error) {
      console.error('Error loading images:', error);
      setMessage('Error loading images: ' + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchImages();
    return () => {
      Object.values(imagePreviews).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // Verificar en cada render el valor actual de "categories"
  console.log("Current categories state:", categories);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  // Función para enviar la nueva categoría al backend
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setMessage("Category name cannot be empty");
      return;
    }
    try {
      const response = await api.post('/categories', { name: newCategoryName });
      setMessage("Category added successfully");
      setNewCategoryName('');
      await fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Error adding category: " + (error.response?.data || error.message));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (selectedCategory) {
      formData.append('categoryId', selectedCategory);
    }

    try {
      const response = await api.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data);
      await fetchImages();
    } catch (error) {
      setMessage('Error uploading image: ' + (error.response?.data || error.message));
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const response = await api.get(`/images/${id}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      setMessage('Error downloading image: ' + (error.response?.data || error.message));
    }
  };

  // Función para eliminar imagen con confirmación
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;
    try {
      const response = await api.delete(`/images/${id}`);
      setMessage(response.data);
      await fetchImages();
    } catch (error) {
      setMessage('Error deleting image: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category (optional)</option>
          {Array.isArray(categories) &&
            categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          }
        </select>
        <button type="submit">Upload</button>
      </form>

      <h3>Add New Category</h3>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={handleNewCategoryChange}
        />
        <button type="submit">Add Category</button>
      </form>

      {message && <p>{message}</p>}

      <h3>Uploaded Images</h3>
      <ul>
        {images.map(image => (
          <li key={image.id}>
            <div>
              {imagePreviews[image.id] ? (
                <img
                  src={imagePreviews[image.id]}
                  alt={image.fileName}
                  style={{ maxWidth: '200px', maxHeight: '200px', margin: '10px' }}
                />
              ) : (
                <p>Loading image...</p>
              )}
              <p>{image.fileName}</p>
              {image.labels && image.labels.length > 0 && (
                <p>Etiquetas: {image.labels.join(', ')}</p>
              )}
              {image.categoryName && (
                <p>Categoría: {image.categoryName}</p>
              )}
              <button onClick={() => handleDownload(image.id, image.fileName)}>
                Download
              </button>
              <button onClick={() => handleDelete(image.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadImages;
