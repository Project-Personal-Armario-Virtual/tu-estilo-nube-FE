// src/pages/UploadImages.jsx
import React from "react"

import { UploadForm } from "@/components/upload/UploadForm"
import { UploadedImagesList } from "@/components/upload/UploadedImagesList"
import { useUploadImages } from "@/hooks/useUploadImages"

export default function UploadImages() {
  const {
    file,
    setFile,
    selectedCategory,
    setSelectedCategory,
    newCategoryName,
    setNewCategoryName,
    message,
    setMessage,
    images,
    imagePreviews,
    categories,
    handleUpload,
    handleAddCategory,
    handleDelete,
    handleDownload,
  } = useUploadImages()

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Items</h1>
        </div>

        <UploadForm
          file={file}
          setFile={setFile}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          categories={categories}
          handleUpload={handleUpload}
          handleAddCategory={handleAddCategory}
        />

        <UploadedImagesList
          images={images}
          imagePreviews={imagePreviews}
          handleDownload={handleDownload}
          handleDelete={handleDelete}
          setMessage={setMessage}
        />

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </main>
    </div>
  )
}
