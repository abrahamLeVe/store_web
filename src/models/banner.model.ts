export interface Banners {
  data: Banner[];
  meta?: Meta;
}

export interface Banner {
  id: number;
  documentId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image[];
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
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: Provider;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export enum EXT {
  Mp4 = ".mp4",
  Webp = ".webp",
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
  ext: EXT;
  url: string;
  hash: string;
  mime: MIME;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export enum MIME {
  ImageWebp = "image/webp",
  VideoMp4 = "video/mp4",
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: ResourceType;
}

export enum ResourceType {
  Image = "image",
  Video = "video",
}

export enum Provider {
  Cloudinary = "cloudinary",
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
