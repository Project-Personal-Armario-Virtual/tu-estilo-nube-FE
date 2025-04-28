"use client";

import React from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


function formatFileName(fileName) {
  if (!fileName) return "";
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const cleaned = nameWithoutExtension
    .replace(/_/g, " ")
    .replace(/removebg-preview/gi, "")
    .trim();
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ItemCard({ id, name, category, dominantColor = "N/A", labels = [], image, onDelete }) {
  const displayName = formatFileName(name);

  return (
    <Card className="overflow-hidden h-full flex flex-col animate-fadeIn">
      <div className="relative w-full h-60 bg-gray-100">
        <img
          src={image || "/placeholder.svg"}
          alt={displayName}
          className="object-contain w-full h-full"
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
        <h3 className="font-medium line-clamp-1">{displayName}</h3>
        <div className="mt-1 text-sm text-text/70 space-y-1">
          <p>Category: {category || "Uncategorized"}</p>
          <p>Color: {dominantColor}</p>
          {labels.length > 0 && <p>Tags: {labels.join(", ")}</p>}
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
