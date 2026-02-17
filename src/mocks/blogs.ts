import type { BlogPost } from "@/types";

export const mockBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why I Love Building Backend Systems",
    slug: "why-i-love-building-backend-systems",
    excerpt:
      "A personal reflection on what draws me to backend development and the joy of designing clean, scalable APIs.",
    content: `Backend development is where the real magic happens. While users interact with beautiful interfaces, it's the backend that powers everything — from authentication to data processing.

What I find most satisfying about backend work is the problem-solving aspect. Designing a database schema that scales, writing an API that handles thousands of requests per second, or implementing a caching strategy that reduces response times — these are puzzles I genuinely enjoy solving.

## Clean Architecture Matters

One principle I always follow is clean architecture. Separating your concerns isn't just a best practice — it's what makes your codebase maintainable in the long run. When I join a new project, the first thing I look at is the folder structure and dependency flow.

## Testing Is Not Optional

Every endpoint I build comes with unit and integration tests. Jest has been my go-to testing framework, and I believe that well-tested code gives you the confidence to ship fast and iterate quickly.

## What's Next

I'm currently exploring microservices architecture and event-driven patterns. The more I learn, the more I realize there's always another layer of complexity to master — and that's what keeps me going.`,
    cover_image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    published_at: "2025-02-10",
    tags: ["Backend", "Career", "Node.js"],
    order: 1,
  },
  {
    id: "blog-2",
    title: "Setting Up a Node.js Project with TypeScript in 2025",
    slug: "nodejs-typescript-setup-2025",
    excerpt:
      "A step-by-step guide to setting up a modern Node.js project with TypeScript, ESLint, and Prettier.",
    content: `Starting a new Node.js project with TypeScript doesn't have to be complicated. In this guide, I'll walk you through my preferred setup.

## Initialize the Project

First, create your project directory and initialize it:

\`\`\`bash
mkdir my-api && cd my-api
npm init -y
\`\`\`

## Install Dependencies

\`\`\`bash
npm install express
npm install -D typescript @types/node @types/express ts-node nodemon
\`\`\`

## TypeScript Configuration

Create a \`tsconfig.json\` with strict mode enabled. I always recommend using strict mode — it catches so many bugs at compile time.

## Project Structure

I follow a clean architecture approach:

- \`src/routes/\` — Route definitions
- \`src/controllers/\` — Request handling
- \`src/services/\` — Business logic
- \`src/repositories/\` — Data access
- \`src/middlewares/\` — Custom middleware

This separation makes testing easy and keeps your codebase organized as it grows.

## Final Thoughts

A good project setup saves hours of debugging later. Take the time to configure your tools properly from the start.`,
    cover_image:
      "https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=400&fit=crop",
    published_at: "2025-01-25",
    tags: ["TypeScript", "Node.js", "Tutorial"],
    order: 2,
  },
  {
    id: "blog-3",
    title: "My Experience as a GDG Co-Organizer",
    slug: "gdg-co-organizer-experience",
    excerpt:
      "What I learned from organizing tech events and building a developer community in Antalya.",
    content: `For over a year, I served as a Co-Organizer at GDG Antalya. It was one of the most rewarding experiences of my career — not because of the technical skills, but because of the soft skills I developed.

## Bridging the Gap

One of our main goals was connecting university students with industry professionals. We organized meetups, workshops, and hackathons that brought together people from different backgrounds.

## Event Logistics

Organizing events is harder than it looks. From finding venues and sponsors to managing speakers and attendees — every event was a mini project management exercise.

## Community Impact

The best part was seeing people land their first developer jobs after attending our events. Building a community that helps people grow is incredibly fulfilling.

## Lessons Learned

- Communication is everything
- Leadership is about serving others
- Adaptability matters more than planning
- The tech community is generous and welcoming

I'd encourage every developer to get involved in their local tech community. The connections you make and the skills you develop are invaluable.`,
    cover_image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    published_at: "2025-01-10",
    tags: ["Community", "GDG", "Career"],
    order: 3,
  },
];
