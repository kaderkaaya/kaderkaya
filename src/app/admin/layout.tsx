import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Kader Kaya CMS",
  description: "Content management system for Kader Kaya portfolio.",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
