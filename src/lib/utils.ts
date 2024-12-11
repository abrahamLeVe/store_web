//className tailwind
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//format money
const CURRENCY_FORMATTER = new Intl.NumberFormat("es-PE", {
  currency: "PEN",
  style: "currency",
});

export function formatCurrency(number: number | bigint) {
  return CURRENCY_FORMATTER.format(number);
}
