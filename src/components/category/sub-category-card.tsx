"use client";

import { CustomTooltip } from "@/hooks/use-tooltip";
import { cn } from "@/lib/utils";
import { Subcategory } from "@/models/sub-categories.model";
import Link from "next/link";
import { forwardRef } from "react";
import { Card } from "../ui/card";

interface CategoryCardProps {
  category: Subcategory;
  href: string;
  className?: string;
  title: string;
}

const SubCategoryCard = forwardRef<HTMLAnchorElement, CategoryCardProps>(
  ({ category, href, className, title, ...props }, ref) => {
    return (
      <CustomTooltip tooltipText={`Ver ${category.products.length} productos`}>
        <Link
          href={href}
          passHref
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <p className="text-sm font-medium leading-none">{title}</p>
          <Card className="line-clamp-2">
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
          </Card>
        </Link>
      </CustomTooltip>
    );
  }
);

SubCategoryCard.displayName = "SubCategoryCard";

export default SubCategoryCard;
