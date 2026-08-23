import { StatCard } from "@/components/ui/StatCard";
import {
  ClipboardIcon,
  TargetIcon,
  TrophyIcon,
  FlameIcon,
} from "@/components/ui/icons";
import { formatNumber } from "@/lib/utils";
import type { DashboardStats } from "@/types";

export function DashboardStats({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Questions Answered"
        value={formatNumber(stats.questionsAnswered)}
        accent="brand"
        icon={<ClipboardIcon className="h-5 w-5" />}
        footnote="Across all exams"
      />
      <StatCard
        label="Accuracy"
        value={`${stats.accuracy}%`}
        accent="success"
        icon={<TargetIcon className="h-5 w-5" />}
        footnote={`${formatNumber(stats.correctAnswers)} correct`}
      />
      <StatCard
        label="Exams Completed"
        value={stats.examsCompleted}
        accent="accent"
        icon={<TrophyIcon className="h-5 w-5" />}
        footnote="This month"
      />
      <StatCard
        label="Study Streak"
        value={`${stats.studyStreakDays} days`}
        accent="warning"
        icon={<FlameIcon className="h-5 w-5" />}
        footnote="Keep it going"
      />
    </div>
  );
}
