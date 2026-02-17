export interface SiteSettings {
  name: string;
  role: string;
  location: string;
  summary: string;
  avatar_url: string | null;
  email: string;
  github_url: string;
  linkedin_url: string;
  medium_url: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  bullets: string[];
  technologies: string[];
  order: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  bullets: string[];
  tags: string[];
  repo_url: string | null;
  live_url: string | null;
  featured: boolean;
  order: number;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  cover_image: string | null;
  external_url: string;
  published_at: string;
  tags: string[];
  featured: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  tags: string[];
  order: number;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  icon: string;
  order: number;
}
