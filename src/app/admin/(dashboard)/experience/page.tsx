import { getExperiences } from "@/repositories/experiences";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
          <p className="text-muted-foreground">
            Manage your work experience entries.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No experience entries yet.</p>
          <Button variant="outline" className="mt-4">
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
              {experiences.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">{exp.title}</TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
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
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
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
    </div>
  );
}
