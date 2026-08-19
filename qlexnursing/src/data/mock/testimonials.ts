import type { Testimonial } from "@/types/domain";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Mark Kinyanjui",
    role: "RN Student",
    program: "NCLEX-RN",
    rating: 5,
    quote:
      "The rationales after every question changed how I study. I stopped memorizing and started understanding, and my practice scores climbed 14 points in a month.",
    avatarInitials: "MK",
    verified: true,
  },
  {
    id: "t2",
    name: "Amara Okafor",
    role: "Pre-Nursing Student",
    program: "ATI TEAS",
    rating: 5,
    quote:
      "The TEAS practice felt harder than the real thing in a good way. I walked into the exam calm and scored in the 90th percentile.",
    avatarInitials: "AO",
    verified: true,
  },
  {
    id: "t3",
    name: "Daniel Reyes",
    role: "LPN Student",
    program: "NCLEX-PN",
    rating: 4,
    quote:
      "I loved seeing my weak areas automatically. Pharmacology used to scare me, but the focused sets made it manageable.",
    avatarInitials: "DR",
    verified: true,
  },
  {
    id: "t4",
    name: "Priya Nair",
    role: "RN Graduate",
    program: "HESI A2",
    rating: 5,
    quote:
      "Clean, fast, and actually pleasant to use. The study streak kept me coming back even on long shifts.",
    avatarInitials: "PN",
    verified: true,
  },
  {
    id: "t5",
    name: "Jordan Bennett",
    role: "RN Student",
    program: "RN Nursing",
    rating: 5,
    quote:
      "The dashboard tells me exactly what to do next. I stopped wondering whether I was studying the right thing.",
    avatarInitials: "JB",
    verified: true,
  },
];
