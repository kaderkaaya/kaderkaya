"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVisitStatsAction, type VisitStats } from "@/app/admin/actions";
import { Users, Eye, TrendingUp } from "lucide-react";

export function VisitStatsCard() {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVisitStatsAction(7)
      .then((res) => {
        if (res.error) setError(res.error);
        else if (res.data) setStats(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Site visits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">Loading…</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Site visits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-destructive text-sm">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Site visits
        </CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{stats.totalVisits}</p>
              <p className="text-muted-foreground text-xs">Total page views</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{stats.uniqueVisitors}</p>
              <p className="text-muted-foreground text-xs">Unique visitors</p>
            </div>
          </div>
        </div>
        {stats.visitsByDay.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <p className="text-muted-foreground mb-2 text-xs font-medium">
              Last 7 days
            </p>
            <div className="space-y-1.5">
              {stats.visitsByDay.map((day) => (
                <div
                  key={day.date}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {new Date(day.date).toLocaleDateString("tr-TR", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span>
                    <span className="font-medium">{day.visits}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      views · {day.unique} unique
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
