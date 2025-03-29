export interface Categories {
  data: Category[];
  meta?: Meta;
}

export interface Category {
  id: number;
  documentId: string;
  title: string;
  description: null | string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image?: Image;
  sub_categories?: Category[];
  slug: string;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number | null;
  height: number | null;
  formats: Formats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Formats {
  small: Small;
  thumbnail: Small;
}

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
