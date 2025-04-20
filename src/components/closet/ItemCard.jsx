// src/components/closet/ItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ItemCard({ id, name, category, color, image, onDelete }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/80 hover:bg-white"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/closet/${id}/edit`} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => onDelete?.(id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium line-clamp-1">{name}</h3>
        <div className="mt-1 text-sm text-text/70 space-y-1">
          <p>Category: {category}</p>
          <p>Color: {color}</p>
        </div>
        <div className="mt-auto pt-4">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link to={`/closet/${id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
