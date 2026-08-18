import {
  DashboardIcon,
  BookIcon,
  ClipboardIcon,
  ChartIcon,
  GraduationIcon,
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
        icon: BookIcon,
        description: "Comprehensive RN exam",
      },
      {
        label: "NCLEX-RN",
        href: "/exams/nclex-rn",
        icon: ClipboardIcon,
        description: "Board exam preparation",
      },
    ],
  },
  {
    label: "Performance",
    items: [
      {
        label: "Results",
        href: "/results/nclex-rn",
        icon: ChartIcon,
        description: "Review past attempts",
      },
    ],
  },
];

export const bottomNavItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: DashboardIcon },
  { label: "RN", href: "/exams/rn-nursing", icon: BookIcon },
  { label: "NCLEX", href: "/exams/nclex-rn", icon: ClipboardIcon },
  { label: "Results", href: "/results/nclex-rn", icon: GraduationIcon },
];
