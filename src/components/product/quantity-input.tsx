"use client";
import { Input } from "../ui/input";

interface QuantityInputProps {
  id?: string;
  name?: string;
  value: number;
  onChange: (value: number) => void;
}

export function QuantityInput({ id, value, onChange }: QuantityInputProps) {
  return (
    <Input
      id={id}
      type="number"
      min="1"
      max={99}
      value={value}
      onChange={(e) =>
        onChange(Math.min(Math.max(Number(e.target.value), 1), 99))
      }
      onKeyDown={(e) => {
        if (
          value >= 99 &&
          !["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)
        ) {
          e.preventDefault();
        }
      }}
      className="w-16"
    />
  );
}
