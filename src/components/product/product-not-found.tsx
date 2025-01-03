import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductNotFoundProps {
  title: string;
  message: string;
}

export default function ProductNotFound({
  title,
  message,
}: ProductNotFoundProps) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full w-full text-center p-5">
      <img
        src="/not_found.webp"
        alt="Producto no encontrado"
        className="aspect-square max-w-xs w-full"
      />
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600">{message}</p>
      <Button variant={"default"}>
        <Link href="/">Ver otros productos</Link>
      </Button>
    </div>
  );
}
