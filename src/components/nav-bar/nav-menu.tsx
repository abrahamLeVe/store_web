"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CustomTooltip } from "@/hooks/use-tooltip";
import { cn } from "@/lib/utils";
import { Categories } from "@/models/category.model";
import CategoryCard from "../category/category-card";
import { ScrollArea } from "../ui/scroll-area";

export function NavMenu({ data: categories }: Categories) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Marcas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
          <NavigationMenuContent className="">
            <ScrollArea>
              <ul className="grid grid-cols-4 gap-3 p-4 w-[900px] h-full max-h-[calc(100vh-100px)]">
                {categories.map((category) => (
                  <li key={category.documentId}>
                    <NavigationMenuLink asChild>
                      <CategoryCard
                        title={category.title}
                        href={`/category/${category.slug}`}
                        category={category}
                      />
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <CustomTooltip tooltipText="Ver productos">
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <p className="text-sm font-medium leading-none">{title}</p>
            <>{children}</>
          </a>
        </NavigationMenuLink>
      </li>
    </CustomTooltip>
  );
});

ListItem.displayName = "ListItem";
