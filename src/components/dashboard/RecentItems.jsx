
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import api from "@/services/api"

export function RecentItems() {
  const [items, setItems] = useState([])
  const [imagePreviews, setImagePreviews] = useState({})

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await api.get("/images/recent")
        const previews = {}

        for (const item of res.data) {
          const blob = await api.get(`/images/${item.id}`, { responseType: "blob" })
          const imageUrl = URL.createObjectURL(blob.data)
          previews[item.id] = imageUrl
        }

        setItems(res.data)
        setImagePreviews(previews)
      } catch (error) {
        console.error("Error loading recent items", error)
      }
    }

    fetchRecent()

    return () => {
      Object.values(imagePreviews).forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Recently Added Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={imagePreviews[item.id]}
                  alt={item.fileName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{item.fileName}</h4>
                <p className="text-sm text-muted-foreground">Category: {item.categoryName || "Uncategorized"}</p>
                <p className="text-xs text-muted-foreground">Added recently</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to={`/closet/${item.id}`}>View</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/closet">View All Items</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
