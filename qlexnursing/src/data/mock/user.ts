import type { User, StudyStreak } from "@/types/domain";

export const mockUser: User = {
  id: "u-1001",
  firstName: "Mark",
  lastName: "Example",
  email: "example@qlexnursing.com",
  phone: "+1 (555) 014-2278",
  nursingLevel: "RN",
  institution: "Lakeside College of Nursing",
  primaryGoal: "NCLEX-RN",
  studyGoal: "Answer 40 practice questions every weekday",
  preferredLanguage: "English",
  timezone: "America/New_York",
  createdAt: "2026-05-02T00:00:00.000Z",
};

export const mockStreak: StudyStreak = {
  current: 12,
  longest: 21,
  weeklyGoalMinutes: 210,
  thisWeek: {
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: true,
    Sun: false,
  },
};
