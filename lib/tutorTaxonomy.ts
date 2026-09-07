// Shared taxonomy + helpers for the tutor directory.

export const BOARDS = [
  "CBSE",
  "ICSE",
  "SSC",
  "IGCSE",
  "IB",
  "State Board",
] as const;

export const GRADE_LEVELS = [
  "Grade 1-5",
  "Grade 6-8",
  "Grade 9-10",
  "Grade 11-12",
  "Competitive",
] as const;

export const LANGUAGES = [
  "English",
  "Hindi",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Urdu",
  "Malayalam",
] as const;

export const AVAILABILITY = [
  "Weekday Mornings",
  "Weekday Afternoons",
  "Weekday Evenings",
  "Weekend Mornings",
  "Weekend Afternoons",
  "Weekend Evenings",
] as const;

export const EXPERIENCE_BUCKETS = [
  { value: "0-1", label: "0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5-10", label: "5–10 years" },
  { value: "10+", label: "10+ years" },
] as const;

export const POPULAR_SUBJECTS = [
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Marathi",
  "Sanskrit",
  "History",
  "Geography",
  "Civics",
  "Economics",
  "Accountancy",
  "Business Studies",
  "Computer Science",
  "Programming",
  "Python",
  "Java",
  "Social Studies",
  "EVS",
  "Reasoning",
  "Quantitative Aptitude",
  "General Knowledge",
  "Spoken English",
];

export const slugify = (s?: string | null): string =>
  (s ?? "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const unslug = (s?: string | null): string =>
  (s ?? "")
    .toString()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const modeLabel = (m?: string | null) =>
  m === "online" ? "Online" : m === "offline" ? "Home Tutor" : "Online & Home Tutor";

export const formatFees = (min?: number | null, max?: number | null) => {
  if (min && max) return min === max ? `₹${min}/hr` : `₹${min}–₹${max}/hr`;
  if (min) return `From ₹${min}/hr`;
  if (max) return `Up to ₹${max}/hr`;
  return null;
};
