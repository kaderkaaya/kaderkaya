"use client";

import { useState } from "react";
import type { Skill } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const emptySkill: Omit<Skill, "id"> = {
  category: "",
  name: "",
  icon: "",
  order: 0,
};

export function SkillsManager({ initial }: { initial: Skill[] }) {
  const [items, setItems] = useState<Skill[]>(initial);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptySkill);

  const grouped = items.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
  const categories = Object.entries(grouped);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptySkill, order: items.length + 1 });
    setOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditingId(skill.id);
    setForm({
      category: skill.category,
      name: skill.name,
      icon: skill.icon,
      order: skill.order,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.name || !form.category) {
      toast.error("Name and category are required.");
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingId ? { ...form, id: editingId } : i))
      );
      toast.success("Skill updated.");
    } else {
      const newItem: Skill = { ...form, id: `skill-${Date.now()}` };
      setItems((prev) => [...prev, newItem]);
      toast.success("Skill added.");
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Skill deleted.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
          <p className="text-muted-foreground">
            Manage your skills and categories.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No skills yet.</p>
          <Button variant="outline" className="mt-4" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first skill
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {categories.map(([category, skills]) => (
            <Card key={category}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{category}</CardTitle>
                <Badge variant="outline">{skills.length} skills</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group flex items-center gap-2 rounded-md border border-border/40 px-3 py-1.5 text-sm transition-colors hover:border-border"
                    >
                      <span>{skill.name}</span>
                      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          className="rounded p-0.5 hover:bg-accent"
                          onClick={() => openEdit(skill)}
                        >
                          <Pencil className="h-3 w-3 text-muted-foreground" />
                        </button>
                        <button
                          className="rounded p-0.5 hover:bg-accent"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the skill details."
                : "Add a new skill to your profile."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="TypeScript"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Languages"
                list="categories-list"
              />
              <datalist id="categories-list">
                {categories.map(([cat]) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label>Icon (Lucide icon name)</Label>
              <Input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="file-code-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Skill"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
