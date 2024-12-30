import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_STRAPI_TOKEN: z
    .string()
    .nonempty("El token de API es obligatorio."),
  NEXT_PUBLIC_STRAPI_URL: z
    .string()
    .url("Debe ser una URL válida.")
    .default("http://127.0.0.1:1337"),
  NEXT_PUBLIC_URL: z
    .string()
    .url("Debe ser una URL válida.")
    .default("http://localhost:3000"),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error("X Error en las variables de entorno:", error.format());
  process.exit(1);
}

export const {
  NEXT_PUBLIC_STRAPI_TOKEN: api_token,
  NEXT_PUBLIC_STRAPI_URL: api_url,
  NEXT_PUBLIC_URL: client_url,
} = data;
