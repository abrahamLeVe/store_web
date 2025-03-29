export interface Products {
  data: Product[];
  meta?: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  models: Model[] | [];
  category: Category[] | [];
  brand: Brand | null;
}

interface Brand {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: null;
}

interface Category {
  id: number;
  documentId: string;
  title: string;
  description: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
}

interface Price {
  id: number;
  documentId: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  colors: Color[];
  sizes: Size[] | [];
  model: Model;
}

interface Size {
  id: number;
  documentId: string;
  width: number | null;
  height: number;
  depth: number | null;
  shoeSize: number | null;
  unit: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
}

interface Model {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  prices: Price[] | [];
  image: Image[];
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Providermetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Formats {
  small: Small;
  thumbnail: Small;
}

interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: Providermetadata;
}

interface Providermetadata {
  public_id: string;
  resource_type: string;
}

interface Model {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Color {
  id: number;
  documentId: string;
  title: string;
  hexadecimal: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
