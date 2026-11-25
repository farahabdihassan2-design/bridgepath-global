export type Candidate = {
  name: string;
  role: string;
  years: number;
  qualification: string;
  country: string;
  documents: string;
  portfolio: string;
  summary: string;
  skills: string;
};
export type Passport = { id: string; score: number; generatedAt: string };
export type AppState = {
  candidate: Candidate;
  passport: Passport | null;
  answers: string[];
  legal: string[];
  payment: string[];
  language: string;
  pathway: string;
  region: string;
  applications: string[];
  mentors: string[];
  milestone: number;
  demo: boolean;
  employer: boolean;
  invoice: { client: string; description: string; hours: number; rate: number; currency: string };
};
export const STORAGE_KEY = "bridgepath-ai-v1";
export const blankCandidate: Candidate = {
  name: "",
  role: "",
  years: 0,
  qualification: "",
  country: "",
  documents: "Foreign Degree - Unrecognized",
  portfolio: "",
  summary: "",
  skills: "",
};
export const initialState: AppState = {
  candidate: blankCandidate,
  passport: null,
  answers: ["", "", ""],
  legal: [],
  payment: [],
  language: "English",
  pathway: "Local Formal Employment",
  region: "Kenya",
  applications: [],
  mentors: [],
  milestone: 0,
  demo: false,
  employer: false,
  invoice: {
    client: "",
    description: "Software development services",
    hours: 20,
    rate: 25,
    currency: "USD",
  },
};
export const demoState: AppState = {
  ...initialState,
  candidate: {
    name: "Amina Hassan",
    role: "Software Engineer",
    years: 5,
    qualification: "BSc in Computer Science",
    country: "Somalia",
    documents: "Foreign Degree - Unrecognized",
    portfolio: "https://github.com/amina-hassan",
    summary:
      "Built accessible education platforms and REST APIs for community organizations. Led a team of three engineers.",
    skills: "React, JavaScript, Python, SQL, Git, REST APIs",
  },
  passport: { id: "BP-2026-AH-0842", score: 88, generatedAt: "2026-11-25" },
  answers: ["Version control", "Parameterized queries", "Accessible labels"],
  legal: ["identity", "status"],
  payment: ["bank"],
  applications: ["return-1"],
  mentors: ["mentor-1"],
  milestone: 1,
  demo: true,
  invoice: {
    client: "Moringa Digital Ltd.",
    description: "Web application development — November 2026",
    hours: 40,
    rate: 25,
    currency: "USD",
  },
};
export const legalIds = ["identity", "status", "permit", "agreement"];
export const paymentIds = ["bank", "payout", "tax", "invoice"];
export const quiz = [
  {
    question: "What enables a team to track and safely merge changes to a shared project?",
    options: ["Version control", "A shared password", "Deleting old files"],
    correct: "Version control",
  },
  {
    question: "Which practice protects a database from SQL injection?",
    options: ["Longer table names", "Parameterized queries", "Public database access"],
    correct: "Parameterized queries",
  },
  {
    question: "What makes a web form usable with assistive technology?",
    options: ["Color-only instructions", "Placeholder-only fields", "Accessible labels"],
    correct: "Accessible labels",
  },
];
export function quizScore(answers: string[]) {
  return quiz.reduce(
    (score, question, index) => score + (answers[index] === question.correct ? 1 : 0),
    0,
  );
}
export function stipendEligible(answers: string[]) {
  return answers.length === 3 && answers.every(Boolean) && quizScore(answers) >= 2;
}
export function skillList(skills: string) {
  return skills
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
export function competencyScore(candidate: Candidate) {
  return Math.min(
    100,
    35 +
      Math.min(candidate.years, 10) * 3 +
      Math.min(skillList(candidate.skills).length, 6) * 4 +
      (candidate.summary.trim().length >= 40 ? 8 : 0) +
      (candidate.portfolio.trim() ? 6 : 0),
  );
}
export function matchScore(skills: string, required: string[]) {
  const normalized = skillList(skills).map((s) => s.toLowerCase());
  return required.length
    ? Math.round(
        (required.filter((s) => normalized.includes(s.toLowerCase())).length / required.length) *
          100,
      )
    : 0;
}
export function completion(values: string[], ids: string[]) {
  return Math.round((ids.filter((id) => values.includes(id)).length / ids.length) * 100);
}
export function readiness(state: AppState) {
  const skills = state.passport?.score ?? 0;
  const access = (completion(state.legal, legalIds) + completion(state.payment, paymentIds)) / 2;
  const network = Math.min(
    100,
    state.applications.length * 20 + state.mentors.length * 20 + state.milestone * 15,
  );
  return {
    skills,
    access,
    network,
    overall: Math.round(skills * 0.4 + access * 0.35 + network * 0.25),
  };
}
export const listings = [
  {
    id: "hire-1",
    type: "Hiring Partners",
    name: "Frontend Engineer",
    organization: "Moringa Digital",
    location: "Nairobi · Hybrid",
    category: "Technology",
    skills: ["React", "JavaScript", "Git"],
    detail: "$900–1,400 / month",
    tag: "Skills-first employer",
    monogram: "md",
  },
  {
    id: "hire-2",
    type: "Hiring Partners",
    name: "Data & Insights Analyst",
    organization: "Impact Africa",
    location: "Global · Remote",
    category: "Data & Analytics",
    skills: ["Python", "SQL", "Excel"],
    detail: "$20–30 / hour",
    tag: "Remote friendly",
    monogram: "ia",
  },
  {
    id: "hire-3",
    type: "Hiring Partners",
    name: "Community Project Lead",
    organization: "Open Futures",
    location: "Nairobi · On-site",
    category: "Operations",
    skills: ["Project Management", "Communication", "Excel"],
    detail: "$800–1,100 / month",
    tag: "Inclusive hiring",
    monogram: "of",
  },
  {
    id: "return-1",
    type: "Returnships",
    name: "Software Engineering Returnship",
    organization: "Moringa Digital",
    location: "Nairobi · Hybrid",
    category: "Technology",
    skills: ["React", "JavaScript", "Git", "REST APIs"],
    detail: "8 weeks · Paid $600/month",
    tag: "Trial → full-time pathway",
    monogram: "md",
  },
  {
    id: "return-2",
    type: "Returnships",
    name: "Data Analytics Fellowship",
    organization: "DataKind Africa",
    location: "Global · Remote",
    category: "Data & Analytics",
    skills: ["Python", "SQL", "Git"],
    detail: "12 weeks · Paid $700/month",
    tag: "Trial → analyst pathway",
    monogram: "dk",
  },
  {
    id: "return-3",
    type: "Returnships",
    name: "Operations Restart",
    organization: "Open Futures",
    location: "Nairobi · On-site",
    category: "Operations",
    skills: ["Communication", "Excel"],
    detail: "4 weeks · Paid $450/month",
    tag: "Trial → coordinator pathway",
    monogram: "of",
  },
  {
    id: "mentor-1",
    type: "Mentors",
    name: "David Ochieng",
    organization: "Senior Engineer · Microsoft",
    location: "Nairobi · Online",
    category: "Technology",
    skills: ["React", "JavaScript", "Python"],
    detail: "2 sessions / month · Volunteer",
    tag: "Engineering & career growth",
    monogram: "DO",
  },
  {
    id: "mentor-2",
    type: "Mentors",
    name: "Leila Benali",
    organization: "Data Lead · UN Innovation",
    location: "Global · Online",
    category: "Data & Analytics",
    skills: ["Python", "SQL"],
    detail: "2 sessions / month · Volunteer",
    tag: "Data careers & interviews",
    monogram: "LB",
  },
];
export function invoiceTotal(hours: number, rate: number) {
  return Math.max(0, hours) * Math.max(0, rate);
}
export function equivalence(candidate: Candidate) {
  const field = candidate.role.toLowerCase();
  if (/engineer|developer|software/.test(field))
    return "Computer science / software engineering competency pathway";
  if (/data|analyst/.test(field)) return "Data analytics competency pathway";
  return `${candidate.role || "Professional"} competency pathway`;
}
