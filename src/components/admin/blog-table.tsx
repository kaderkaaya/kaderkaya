"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
  reorderBlogsAction,
  listBlogsAction,
} from "@/app/admin/actions";
import {
  SortableTableProvider,
  SortableTableRow,
  type ReorderItem,
} from "@/components/admin/sortable-table";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyBlog: Omit<BlogPost, "id"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: null,
  published_at: new Date().toISOString().split("T")[0],
  tags: [],
  order: 0,
};

export function BlogTable({ initial }: { initial: BlogPost[] }) {
  const router = useRouter();
  const [items, setItems] = useState<BlogPost[]>(initial);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyBlog, order: items.length + 1 });
    setOpen(true);
  }

  function openEdit(blog: BlogPost) {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      cover_image: blog.cover_image,
      published_at: blog.published_at,
      tags: blog.tags,
      order: blog.order,
    });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.title || !form.content) {
      toast.error("Title and content are required.");
      return;
    }
    const finalSlug = form.slug || slugify(form.title);
    const payload = { ...form, slug: finalSlug };
    setSaving(true);
    try {
      if (editingId) {
        const res = await updateBlogAction({ ...payload, id: editingId });
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.success("Blog post updated.");
      } else {
        const res = await createBlogAction(payload);
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.success("Blog post added.");
      }
      setOpen(false);
      const listRes = await listBlogsAction();
      if (listRes.data) setItems(listRes.data);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const res = await deleteBlogAction(id);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    const listRes = await listBlogsAction();
    if (listRes.data) setItems(listRes.data);
    toast.success("Blog post deleted.");
    router.refresh();
  }

  async function handleReorder(reorderItems: ReorderItem[]) {
    const res = await reorderBlogsAction(reorderItems);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    const listRes = await listBlogsAction();
    if (listRes.data) setItems(listRes.data);
    toast.success("Order updated.");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog</h2>
          <p className="text-muted-foreground">Manage your blog posts.</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No blog posts yet.</p>
          <Button variant="outline" className="mt-4" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Write your first post
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border">
          <SortableTableProvider
            itemIds={items.map((i) => i.id)}
            onReorder={handleReorder}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead>Title</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((blog) => (
                  <SortableTableRow key={blog.id} id={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(blog.published_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={`/blog/${blog.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEdit(blog)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </SortableTableRow>
                ))}
              </TableBody>
            </Table>
          </SortableTableProvider>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Blog Post" : "New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the blog post."
                : "Write a new blog post."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm({
                      ...form,
                      title,
                      slug: editingId ? form.slug : slugify(title),
                    });
                  }}
                  placeholder="My Blog Post"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="my-blog-post"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                placeholder="A short summary of the post..."
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={10}
                placeholder="Write your blog post content here..."
                className="font-mono text-sm"
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
                  placeholder="Backend, Node.js"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save Changes" : "Publish Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
