// src/components/ItemCard.jsx
import React from "react"

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.fileName}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <div className="p-3">
        <h3 className="text-sm font-semibold">{item.fileName}</h3>
        {item.categoryName && (
          <p className="text-xs text-gray-500">{item.categoryName}</p>
        )}
        {item.dominantColor && (
          <div className="mt-1 text-xs">
            Color: <span className="font-medium">{item.dominantColor}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemCard
