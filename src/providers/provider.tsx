"use client";
import { CartStoreProvider } from "./cart.storage.provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    // <SessionProvider>
    //   <Toaster />
    <CartStoreProvider>
      {/* <MessagesProvider>{children}</MessagesProvider> */}
      {children}
    </CartStoreProvider>
    // </SessionProvider>
  );
}
