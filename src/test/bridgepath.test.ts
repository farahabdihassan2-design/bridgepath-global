import { describe, it, expect } from "vitest";
import {
  initialState,
  demoState,
  matchScore,
  quizScore,
  stipendEligible,
  competencyScore,
  completion,
  legalIds,
  readiness,
  invoiceTotal,
  listings,
} from "@/lib/bridgepath";
describe("BridgePath rules", () => {
  it("returns a competency score within the required 0–100 range", () => {
    expect(competencyScore({ ...demoState.candidate, years: 60, skills: "a,b,c,d,e,f,g,h" })).toBe(
      100,
    );
    expect(competencyScore(initialState.candidate)).toBe(35);
  });
  it("offers exactly three micro-assessment questions and persists their score in state", () => {
    expect(quizScore(demoState.answers)).toBe(3);
    expect(quizScore(["Version control", "incorrect", "incorrect"])).toBe(1);
  });
  it("unlocks the bridging recommendation only after all three answers and two correct", () => {
    expect(stipendEligible(["Version control", "Parameterized queries", ""])).toBe(false);
    expect(stipendEligible(["Version control", "Parameterized queries", "wrong"])).toBe(true);
    expect(stipendEligible(["wrong", "wrong", "Accessible labels"])).toBe(false);
  });
  it("calculates match percentage from candidate competencies", () => {
    expect(matchScore("React, SQL", ["React", "JavaScript", "Git", "SQL"])).toBe(50);
    expect(matchScore("", ["React"])).toBe(0);
    expect(matchScore("react, JAVASCRIPT, Git", ["React", "JavaScript", "Git"])).toBe(100);
  });
  it("calculates legal completion from exactly the four checklist steps", () => {
    expect(completion(["identity", "status"], legalIds)).toBe(50);
    expect(completion(["identity", "unknown"], legalIds)).toBe(25);
  });
  it("combines skill verification, legal/payment completion and engagement into readiness", () => {
    expect(readiness(initialState).overall).toBe(0);
    expect(readiness(demoState)).toEqual({ skills: 88, access: 37.5, network: 55, overall: 62 });
  });
  it("keeps paid returnships in the specified 4–12 week range", () => {
    expect(
      listings.filter((l) => l.type === "Returnships").map((l) => Number(l.detail.split(" ")[0])),
    ).toEqual([8, 12, 4]);
  });
  it("calculates an invoice from actual hours and rate", () => {
    expect(invoiceTotal(40, 25)).toBe(1000);
    expect(invoiceTotal(12.5, 20)).toBe(250);
  });
});
