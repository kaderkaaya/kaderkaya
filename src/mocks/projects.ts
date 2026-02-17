import type { Project } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "E-Commerce Backend API",
    description:
      "A scalable RESTful API with JWT-based authentication and Role-Based Access Control (RBAC) for e-commerce operations.",
    bullets: [
      "Designed and implemented a scalable RESTful API with JWT-based authentication and RBAC",
      "Implemented input validation with Joi, rate limiting, and Helmet to enhance API security",
      "Wrote unit and integration tests using Jest, ensuring reliability of authentication and core business logic",
    ],
    tags: ["Node.js", "MySQL", "Sequelize", "JWT", "Jest"],
    repo_url: "https://github.com/kaderkaaya/e-commerce-backend",
    live_url: null,
    featured: true,
    order: 1,
  },
  {
    id: "proj-2",
    name: "Task Tracker API",
    description:
      "A modular backend using NestJS and Prisma ORM with JWT authentication and RBAC for task and user management.",
    bullets: [
      "Built a modular backend using NestJS and Prisma ORM, implementing JWT authentication and RBAC",
      "Integrated automated email notifications via NodeMailer and scheduled background jobs using cron",
      "Applied DTO-based validation, Helmet, and structured error handling for secure API design",
    ],
    tags: ["NestJS", "Prisma", "PostgreSQL", "NodeMailer", "Cron"],
    repo_url: "https://github.com/kaderkaaya/task-tracker-api",
    live_url: null,
    featured: true,
    order: 2,
  },
  {
    id: "proj-3",
    name: "Blog Management API",
    description:
      "A type-safe REST API using TypeScript, enabling robust content and user management workflows.",
    bullets: [
      "Developed a type-safe REST API using TypeScript for content and user management",
      "Integrated Cloudinary for media handling, implemented Zod validation, and secured credentials with Argon2 hashing",
      "Added structured logging with Winston to improve observability and debugging in production",
    ],
    tags: ["TypeScript", "MongoDB", "Cloudinary", "Zod", "Winston"],
    repo_url: "https://github.com/kaderkaaya/blog-management-api",
    live_url: null,
    featured: true,
    order: 3,
  },
];
