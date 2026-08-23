"use client";

import { useEffect, useState } from "react";
import type { QuestionReport } from "@/types/assessment";
import { REPORT_REASONS } from "@/types/assessment";
import {
  getReports,
  updateReport,
  getOpenReportCount,
} from "@/lib/assessment/reports";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

function reasonLabel(reason: string): string {
  return REPORT_REASONS.find((r) => r.value === reason)?.label ?? reason;
}

function statusTone(status: QuestionReport["status"]): "warning" | "brand" | "success" {
  if (status === "open") return "warning";
  if (status === "reviewed") return "brand";
  return "success";
}

export function ReportsAdmin() {
  const [reports, setReports] = useState<QuestionReport[] | null>(null);

  function refresh() {
    setReports(getReports());
  }

  useEffect(() => {
    refresh();
  }, []);

  if (reports === null) {
    return <div className="h-40 animate-pulse rounded-2xl bg-track" />;
  }

  const open = getOpenReportCount();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        {open} open {open === 1 ? "report" : "reports"} · {reports.length} total.
        Resolving a report marks it handled; reviewing means it is being looked
        at.
      </p>

      {reports.length === 0 ? (
        <EmptyState
          title="No reports yet"
          description="When students report a question, it will appear here for instructor review."
        />
      ) : (
        reports.map((r) => (
          <Card key={r.id}>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                  <Badge tone="neutral">{reasonLabel(r.reason)}</Badge>
                  {r.subject && <span className="text-xs text-muted">{r.subject}</span>}
                </div>
                <span className="text-xs text-muted">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-ink">{r.questionText}</p>
              {r.detail && (
                <p className="rounded-lg bg-canvas p-3 text-sm text-muted">
                  {r.detail}
                </ as>
              )}
              {r.reviewerNote && (
                <p className="text-xs text-muted">
                  Reviewer note: {r.reviewerNote}
                </p>
              )}
              {r.status !== "resolved" && (
                <div className="flex gap-2">
                  {r.status === "open" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        updateReport(r.id, { status: "reviewed" });
                        refresh();
                      }}
                    >
                      Mark reviewed
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      updateReport(r.id, { status: "resolved" });
                      refresh();
                    }}
                  >
                    Resolve
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
