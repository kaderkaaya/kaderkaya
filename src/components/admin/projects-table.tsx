"use client";

import { useState } from "react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

const emptyProject: Omit<Project, "id"> = {
  name: "",
  description: "",
  bullets: [],
  tags: [],
  repo_url: null,
  live_url: null,
  featured: false,
  order: 0,
};

export function ProjectsTable({ initial }: { initial: Project[] }) {
  const [items, setItems] = useState<Project[]>(initial);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyProject, order: items.length + 1 });
    setOpen(true);
  }

  function openEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      name: project.name,
      description: project.description,
      bullets: project.bullets,
      tags: project.tags,
      repo_url: project.repo_url,
      live_url: project.live_url,
      featured: project.featured,
      order: project.order,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.name) {
      toast.error("Project name is required.");
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingId ? { ...form, id: editingId } : i))
      );
      toast.success("Project updated.");
    } else {
      const newItem: Project = { ...form, id: `proj-${Date.now()}` };
      setItems((prev) => [...prev, newItem]);
      toast.success("Project added.");
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Project deleted.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your project showcase.</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No projects yet.</p>
          <Button variant="outline" className="mt-4" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first project
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Links</TableHead>
                <TableHead className="w-20">Featured</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {project.repo_url ? "Repo" : ""}
                    {project.repo_url && project.live_url ? " · " : ""}
                    {project.live_url ? "Live" : ""}
                  </TableCell>
                  <TableCell>
                    {project.featured ? (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <Star className="h-4 w-4 text-muted-foreground/30" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEdit(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the project details."
                : "Fill in the details for a new project."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="My Awesome Project"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                placeholder="A brief description of the project..."
              />
            </div>

            <div className="space-y-2">
              <Label>Bullets (one per line)</Label>
              <Textarea
                value={form.bullets.join("\n")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bullets: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={3}
                placeholder="Key feature 1&#10;Key feature 2"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={form.tags.join(", ")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Node.js, TypeScript, MongoDB"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Repository URL</Label>
                <Input
                  value={form.repo_url ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, repo_url: e.target.value || null })
                  }
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input
                  value={form.live_url ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, live_url: e.target.value || null })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm({ ...form, featured: !!checked })
                }
              />
              <Label htmlFor="featured">Featured project</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
