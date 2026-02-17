"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { AdminSidebar } from "./sidebar";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/settings": "Site Settings",
  "/admin/experience": "Experience",
  "/admin/projects": "Projects",
  "/admin/writing": "Writing",
  "/admin/blog": "Blog",
  "/admin/skills": "Skills",
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Admin";

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border/40 bg-card px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
