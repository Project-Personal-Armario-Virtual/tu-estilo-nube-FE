import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const recentItems = [
  {
    id: 1,
    name: "Blue Denim Jacket",
    category: "Outerwear",
    image: "/placeholder.svg?height=80&width=80",
    addedOn: "2 days ago",
  },
  {
    id: 2,
    name: "White T-Shirt",
    category: "Tops",
    image: "/placeholder.svg?height=80&width=80",
    addedOn: "3 days ago",
  },
  {
    id: 3,
    name: "Black Jeans",
    category: "Bottoms",
    image: "/placeholder.svg?height=80&width=80",
    addedOn: "1 week ago",
  },
]

export function RecentItems() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Recently Added Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                <p className="text-xs text-muted-foreground">Added {item.addedOn}</p>
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
