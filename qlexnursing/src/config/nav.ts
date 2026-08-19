import {
  DashboardIcon,
  BookIcon,
  ClipboardIcon,
  ChartIcon,
  GraduationIcon,
  StethoscopeIcon,
  HeartPulseIcon,
  LayersIcon,
  FileTextIcon,
  MessageIcon,
  FlameIcon,
  TargetIcon,
  UserIcon,
  SettingsIcon,
  CompassIcon,
} from "@/components/ui/icons";

export interface NavItem {
  label: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: DashboardIcon,
        description: "Your command center",
      },
    ],
  },
  {
    label: "Practice",
    items: [
      {
        label: "RN Nursing",
        href: "/exams/rn-nursing",
        icon: GraduationIcon,
        description: "Comprehensive RN exam",
      },
      {
        label: "LPN Nursing",
        href: "/exams/lpn-nursing",
        icon: StethoscopeIcon,
        description: "Practical nursing prep",
      },
      {
        label: "NCLEX-RN",
        href: "/exams/nclex-rn",
        icon: HeartPulseIcon,
        description: "Board exam preparation",
      },
      {
        label: "NCLEX-PN",
        href: "/exams/nclex-pn",
        icon: StethoscopeIcon,
        description: "PN licensure prep",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Study Notes",
        href: "/study-notes",
        icon: BookIcon,
        description: "Notes & flashcards",
      },
      {
        label: "Flashcards",
        href: "/study-notes",
        icon: LayersIcon,
        description: "Spaced repetition",
      },
      {
        label: "Forums",
        href: "/forums",
        icon: MessageIcon,
        description: "Learn together",
      },
    ],
  },
  {
    label: "Progress",
    items: [
      {
        label: "Performance",
        href: "/progress",
        icon: ChartIcon,
        description: "Analytics & mastery",
      },
      {
        label: "Study Streak",
        href: "/progress#streak",
        icon: FlameIcon,
        description: "Build momentum",
      },
      {
        label: "Study Plan",
        href: "/study-plan",
        icon: TargetIcon,
        description: "Your schedule",
      },
      {
        label: "Learning Recaps",
        href: "/progress#recap",
        icon: CompassIcon,
        description: "Weekly review",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        href: "/profile",
        icon: UserIcon,
        description: "Your details",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        description: "Preferences",
      },
    ],
  },
];

export const bottomNavItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: DashboardIcon },
  { label: "Practice", href: "/exams/rn-nursing", icon: ClipboardIcon },
  { label: "Progress", href: "/progress", icon: ChartIcon },
  { label: "Resources", href: "/study-notes", icon: LayersIcon },
  { label: "Profile", href: "/profile", icon: UserIcon },
];
