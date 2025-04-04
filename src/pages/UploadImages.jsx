import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UploadImages = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState({}); 


  useEffect(() => {
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
        console.error('Error al cargar imágenes:', error);
        setMessage('Error loading images: ' + (error.response?.data || error.message));
      }
    };
    fetchImages();

    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data);
    
      const updatedImages = await api.get('/images/list');
      setImages(updatedImages.data);

     
      const newImage = updatedImages.data[updatedImages.data.length - 1];
      const imageResponse = await api.get(`/images/${newImage.id}`, {
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(imageResponse.data);
      setImagePreviews((prev) => ({ ...prev, [newImage.id]: imageUrl }));
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
      console.error('Error al descargar la imagen:', error);
      setMessage('Error downloading image: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Uploaded Images</h3>
      <ul>
        {images.map((image) => (
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
              <button onClick={() => handleDownload(image.id, image.fileName)}>
                Download
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadImages;