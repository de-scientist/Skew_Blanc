import type { DashboardData } from "@/types";
import { mockDashboard } from "@/data/mock/dashboard";
import { request } from "./client";

export async function getDashboard(): Promise<DashboardData> {
  return request(mockDashboard);
}
