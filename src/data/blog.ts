import rawPosts from "./blog.json";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  publishedAt?: string;
};

export const blogPosts = rawPosts as BlogPost[];

export const blogRepository = {
  owner: "estudioideamos",
  repository: "berenice-cura",
  branch: "main",
  contentPath: "src/data/blog.json",
  imageDirectory: "public/assets/blog",
} as const;
