"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Skill } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  createSkillAction,
  updateSkillAction,
  deleteSkillAction,
  reorderSkillsAction,
  listSkillsAction,
} from "@/app/admin/actions";
import {
  SortableTableProvider,
  SortableTableRow,
  type ReorderItem,
} from "@/components/admin/sortable-table";

const emptySkill: Omit<Skill, "id"> = {
  category: "",
  name: "",
  icon: "",
  order: 0,
};

export function SkillsManager({ initial }: { initial: Skill[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Skill[]>(initial);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptySkill);
  const [saving, setSaving] = useState(false);

  const categories = [...new Set(items.map((s) => s.category))].sort();

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

  async function handleSave() {
    if (!form.name || !form.category) {
      toast.error("Name and category are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const res = await updateSkillAction({ ...form, id: editingId });
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.success("Skill updated.");
      } else {
        const res = await createSkillAction(form);
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.success("Skill added.");
      }
      setOpen(false);
      const listRes = await listSkillsAction();
      if (listRes.data) setItems(listRes.data);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const res = await deleteSkillAction(id);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    const listRes = await listSkillsAction();
    if (listRes.data) setItems(listRes.data);
    toast.success("Skill deleted.");
    router.refresh();
  }

  async function handleReorder(reorderItems: ReorderItem[]) {
    const res = await reorderSkillsAction(reorderItems);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    const listRes = await listSkillsAction();
    if (listRes.data) setItems(listRes.data);
    toast.success("Order updated.");
    router.refresh();
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

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No skills yet.</p>
          <Button variant="outline" className="mt-4" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first skill
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
                  <TableHead>Category</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((skill) => (
                  <SortableTableRow key={skill.id} id={skill.id}>
                    <TableCell>
                      <Badge variant="secondary">{skill.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{skill.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {skill.icon || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEdit(skill)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(skill.id)}
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
                {categories.map((cat) => (
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
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save Changes" : "Add Skill"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
