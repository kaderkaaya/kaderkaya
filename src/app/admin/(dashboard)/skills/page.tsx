import { getSkillsByCategory } from "@/repositories/skills";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function AdminSkillsPage() {
  const skillsByCategory = await getSkillsByCategory();
  const categories = Object.entries(skillsByCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
          <p className="text-muted-foreground">
            Manage your skills and categories.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No skills yet.</p>
          <Button variant="outline" className="mt-4">
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
                        <button className="rounded p-0.5 hover:bg-accent">
                          <Pencil className="h-3 w-3 text-muted-foreground" />
                        </button>
                        <button className="rounded p-0.5 hover:bg-accent">
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
    </div>
  );
}
