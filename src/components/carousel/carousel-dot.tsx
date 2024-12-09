import React from "react";

interface CarouselDotsProps {
  count: number;
  current: number;
  onDotClick: (index: number) => void;
  isCount?: boolean;
}

export function CarouselDots({
  count,
  current,
  onDotClick,
  isCount = false,
}: CarouselDotsProps) {
  return (
    <>
      <div className="py-2 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-primary" : "bg-muted"
            } transition-colors duration-200`}
            onClick={() => onDotClick(index)}
          />
        ))}
      </div>
      {isCount ? (
        <div className="py-2 text-center text-sm text-muted-foreground">
          {current + 1} de {count}
        </div>
      ) : null}
    </>
  );
}
