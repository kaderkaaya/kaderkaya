import type { Post } from "@/types";

export const mockPosts: Post[] = [
  {
    id: "post-1",
    title: "Building Scalable Microservices with Node.js",
    description:
      "A guide to designing and building scalable microservices architecture using Node.js, Docker, and message queues.",
    cover_image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
    external_url: "https://medium.com/@kaderkaaya/scalable-microservices-nodejs",
    published_at: "2025-01-15",
    tags: ["Node.js", "Microservices", "Docker"],
    featured: true,
    order: 1,
  },
  {
    id: "post-2",
    title: "JWT Authentication & RBAC Best Practices",
    description:
      "How to implement secure JWT-based authentication and role-based access control in your Node.js APIs.",
    cover_image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    external_url: "https://medium.com/@kaderkaaya/jwt-rbac-best-practices",
    published_at: "2024-11-20",
    tags: ["Security", "JWT", "Node.js"],
    featured: true,
    order: 2,
  },
  {
    id: "post-3",
    title: "Clean Architecture in Backend Development",
    description:
      "Applying clean architecture principles to build maintainable and testable backend systems with TypeScript.",
    cover_image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    external_url:
      "https://medium.com/@kaderkaaya/clean-architecture-backend",
    published_at: "2024-10-05",
    tags: ["Architecture", "TypeScript", "Backend"],
    featured: false,
    order: 3,
  },
];
