import type { NextConfig } from "next";

/** Common image hosts so avatar and content URLs from most sites work. */
const imageHosts = [
  "*.unsplash.com",
  "avatars.githubusercontent.com",
  "raw.githubusercontent.com",
  "user-images.githubusercontent.com",
  "i.imgur.com",
  "imgur.com",
  "pbs.twimg.com",
  "media.licdn.com",
  "platform-lookaside.fbsbx.com",
  "res.cloudinary.com",
  "cloudinary.com",
  "gravatar.com",
  "www.gravatar.com",
  "cdn.jsdelivr.net",
  "lh3.googleusercontent.com",
  "avatars.googleusercontent.com",
  "scontent.xx.fbcdn.net",
  "scontent.cdninstagram.com",
  "*.medium.com",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHosts.flatMap((host) => [
      { protocol: "https" as const, hostname: host, pathname: "/**" },
      { protocol: "http" as const, hostname: host, pathname: "/**" },
    ]),
  },
};

export default nextConfig;
