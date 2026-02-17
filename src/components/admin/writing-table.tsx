"use client";

import { useState } from "react";
import type { Post } from "@/types";
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
import { Plus, Pencil, Trash2, ExternalLink, Star } from "lucide-react";
import { toast } from "sonner";

const emptyPost: Omit<Post, "id"> = {
  title: "",
  description: "",
  cover_image: null,
  external_url: "",
  published_at: new Date().toISOString().split("T")[0],
  tags: [],
  featured: false,
  order: 0,
};

export function WritingTable({ initial }: { initial: Post[] }) {
  const [items, setItems] = useState<Post[]>(initial);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPost);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyPost, order: items.length + 1 });
    setOpen(true);
  }

  function openEdit(post: Post) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      description: post.description,
      cover_image: post.cover_image,
      external_url: post.external_url,
      published_at: post.published_at,
      tags: post.tags,
      featured: post.featured,
      order: post.order,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.title || !form.external_url) {
      toast.error("Title and URL are required.");
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingId ? { ...form, id: editingId } : i))
      );
      toast.success("Article updated.");
    } else {
      const newItem: Post = { ...form, id: `post-${Date.now()}` };
      setItems((prev) => [...prev, newItem]);
      toast.success("Article added.");
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Article deleted.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Writing</h2>
          <p className="text-muted-foreground">
            Manage your external article links (Medium, etc.).
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Article
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No articles yet.</p>
          <Button variant="outline" className="mt-4" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first article
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-20">Featured</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{post.title}</span>
                      <a
                        href={post.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(post.published_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.featured ? (
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
                        onClick={() => openEdit(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(post.id)}
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
              {editingId ? "Edit Article" : "Add Article"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the article details."
                : "Add a new external article link."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="My Medium Article"
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
                placeholder="A short description..."
              />
            </div>

            <div className="space-y-2">
              <Label>External URL</Label>
              <Input
                value={form.external_url}
                onChange={(e) =>
                  setForm({ ...form, external_url: e.target.value })
                }
                placeholder="https://medium.com/@kaderkaava/..."
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input
                value={form.cover_image ?? ""}
                onChange={(e) =>
                  setForm({ ...form, cover_image: e.target.value || null })
                }
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Published Date</Label>
                <Input
                  type="date"
                  value={form.published_at}
                  onChange={(e) =>
                    setForm({ ...form, published_at: e.target.value })
                  }
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
                  placeholder="Node.js, Backend"
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
              <Label htmlFor="featured">Featured article</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Article"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
