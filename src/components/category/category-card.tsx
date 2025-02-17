"use client";

import { Category } from "@/models/category.model";
import { Card, CardContent } from "../ui/card";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="w-full p-0 lg:p-6 ">
        {category.image?.provider_metadata.resource_type === "video" ? (
          <video
            src={category.image?.url}
            loop
            muted
            controls
            className="w-full object-cover aspect-square"
          />
        ) : (
          <img
            src={category.image?.url}
            alt={category.title}
            className="w-full object-cover aspect-square"
            loading="lazy"
          />
        )}
      </CardContent>
    </Card>
  );
}
