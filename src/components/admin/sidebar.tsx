"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  FolderKanban,
  PenLine,
  BookOpen,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/writing", label: "Writing", icon: PenLine },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border/40 bg-card">
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        <Link href="/admin" className="text-lg font-semibold tracking-tight">
          KADER KAYA
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/40 p-3">
        <Link
          href="/"
          target="_blank"
          className="mb-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground"
        >
          View Site →
        </Link>
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    </aside>
  );
}
