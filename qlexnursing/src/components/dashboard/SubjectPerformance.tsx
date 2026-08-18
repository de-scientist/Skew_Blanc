import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { SubjectPerformance } from "@/types";

export function SubjectPerformance({
  data,
}: {
  data: SubjectPerformance[];
}) {
  const maxQuestions = Math.max(...data.map((d) => d.questions), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance by Subject</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((subject) => {
          const tone =
            subject.accuracy >= 80
              ? "success"
              : subject.accuracy >= 70
                ? "brand"
                : "warning";
          return (
            <div key={subject.subject}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{subject.subject}</span>
                <span className="tabular-nums text-muted">
                  {subject.accuracy}% · {subject.questions} Qs
                </span>
              </div>
              <ProgressBar value={subject.accuracy} tone={tone} />
            </div>
          );
        })}
        <p className="pt-1 text-xs text-muted">
          Subjects below 70% are flagged for extra practice. Total questions
          per subject shown for context.
        </p>
      </CardContent>
    </Card>
  );
}
