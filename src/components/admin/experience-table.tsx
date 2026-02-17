"use client";

import { useState } from "react";
import type { Experience } from "@/types";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const emptyExperience: Omit<Experience, "id"> = {
  company: "",
  title: "",
  location: "",
  start_date: "",
  end_date: null,
  is_current: false,
  bullets: [],
  technologies: [],
  order: 0,
};

export function ExperienceTable({ initial }: { initial: Experience[] }) {
  const [items, setItems] = useState<Experience[]>(initial);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyExperience);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyExperience, order: items.length + 1 });
    setOpen(true);
  }

  function openEdit(exp: Experience) {
    setEditingId(exp.id);
    setForm({
      company: exp.company,
      title: exp.title,
      location: exp.location,
      start_date: exp.start_date,
      end_date: exp.end_date,
      is_current: exp.is_current,
      bullets: exp.bullets,
      technologies: exp.technologies,
      order: exp.order,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.title || !form.company) {
      toast.error("Title and company are required.");
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingId ? { ...form, id: editingId } : i))
      );
      toast.success("Experience updated.");
    } else {
      const newItem: Experience = {
        ...form,
        id: `exp-${Date.now()}`,
      };
      setItems((prev) => [...prev, newItem]);
      toast.success("Experience added.");
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Experience deleted.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
          <p className="text-muted-foreground">
            Manage your work experience entries.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No experience entries yet.</p>
          <Button variant="outline" className="mt-4" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first experience
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">{exp.title}</TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {exp.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{exp.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEdit(exp)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(exp.id)}
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
              {editingId ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the experience entry details."
                : "Fill in the details for a new experience entry."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Backend Developer"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Antalya, Türkiye"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  placeholder="2024-01"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  value={form.end_date ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      end_date: e.target.value || null,
                    })
                  }
                  placeholder="2025-01"
                  disabled={form.is_current}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_current"
                checked={form.is_current}
                onCheckedChange={(checked) =>
                  setForm({
                    ...form,
                    is_current: !!checked,
                    end_date: checked ? null : form.end_date,
                  })
                }
              />
              <Label htmlFor="is_current">Currently working here</Label>
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
                rows={4}
                placeholder="Developed REST APIs...&#10;Implemented JWT auth..."
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies (comma-separated)</Label>
              <Input
                value={form.technologies.join(", ")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Node.js, TypeScript, MongoDB"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Experience"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
