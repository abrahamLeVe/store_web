"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartStoreProvider } from "./cart.storage.provider";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CartStoreProvider>
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </CartStoreProvider>
  );
}
