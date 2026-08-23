"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Exam } from "@/types";
import type { AssessmentResult } from "@/types/assessment";
import { fetchResult } from "@/lib/api/assessment";
import { getExam } from "@/lib/api/exams";
import { AssessmentResults } from "@/components/results/AssessmentResults";
import { buttonVariants } from "@/components/ui/Button";

type State =
  | { status: "loading" }
  | { status: "ready"; result: AssessmentResult; exam: Exam }
  | { status: "missing" };

export default function AssessmentResultsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const id = params.id;
    const result = fetchResult(id);
    if (!result) {
      setState({ status: "missing" });
      return;
    }
    let active = true;
    getExam(result.assessmentId).then((exam) => {
      if (!active) return;
      if (!exam) {
        setState({ status: "missing" });
        return;
      }
      setState({ status: "ready", result, exam });
    });
    return () => {
      active = false;
    };
  }, [params.id]);

  if (state.status === "loading") {
    return (
      <div className="container-page py-10">
        <div className="h-64 animate-pulse rounded-2xl bg-track" />
      </div>
    );
  }

  if (state.status === "missing") {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-lg font-semibold text-ink">Results not found</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          This assessment result is no longer available on this device. Start a
          new session from your dashboard to see a full breakdown.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className={buttonVariants({ variant: "primary", size: "lg", className: "mt-6" })}
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return <AssessmentResults result={state.result} exam={state.exam} />;
}
