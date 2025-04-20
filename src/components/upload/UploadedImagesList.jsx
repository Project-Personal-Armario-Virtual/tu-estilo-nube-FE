// src/components/upload/UploadedImagesList.jsx
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import api from "@/services/api"

export function UploadedImagesList({ setMessage }) {
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState({})

  useEffect(() => {
    fetchImages()

    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const fetchImages = async () => {
    try {
      const response = await api.get("/images/list")
      const fetchedImages = Array.isArray(response.data) ? response.data : []

      setImages(fetchedImages)

      const previews = {}
      for (const image of fetchedImages) {
        const res = await api.get(`/images/${image.id}`, { responseType: "blob" })
        previews[image.id] = URL.createObjectURL(res.data)
      }
      setImagePreviews(previews)
    } catch (error) {
      console.error("Error loading images:", error)
      if (setMessage) {
        setMessage("Error loading images: " + (error.response?.data || error.message))
      }
    }
  }

  const handleDownload = async (id, fileName) => {
    try {
      const response = await api.get(`/images/${id}`, { responseType: "blob" })
      const url = URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading image:", error)
      if (setMessage) {
        setMessage("Error downloading image: " + (error.response?.data || error.message))
      }
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?")
    if (!confirmDelete) return

    try {
      const response = await api.delete(`/images/${id}`)
      if (setMessage) setMessage(response.data)
      fetchImages()
    } catch (error) {
      if (setMessage) {
        setMessage("Error deleting image: " + (error.response?.data || error.message))
      }
    }
  }

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-xl font-semibold">Uploaded Images</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(images || []).map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square bg-gray-100">
              {imagePreviews[image.id] ? (
                <img
                  src={imagePreviews[image.id]}
                  alt={image.fileName}
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-sm text-center py-6">Loading image...</p>
              )}
            </div>
            <CardContent className="pt-4">
              <p className="text-sm font-medium">{image.fileName}</p>
              {Array.isArray(image.labels) && image.labels.length > 0 && (
                <p className="text-xs text-text/70">Labels: {image.labels.join(", ")}</p>
              )}
              {image.categoryName && (
                <p className="text-xs text-text/70">Category: {image.categoryName}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(image.id, image.fileName)}
              >
                Download
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
