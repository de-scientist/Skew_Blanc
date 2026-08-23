import type { Metadata } from "next";
import { AssessmentResultsClient } from "@/components/results/AssessmentResultsClient";

export const metadata: Metadata = {
  title: "Assessment Results",
  robots: { index: false, follow: false },
};

export default function ResultsPage() {
  return <AssessmentResultsClient />;
}
