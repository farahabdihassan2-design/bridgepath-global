import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Fingerprint,
  Sparkles,
  ShieldCheck,
  Copy,
  Printer,
  CheckCircle2,
  ArrowRight,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useBridgePath } from "@/components/bridgepath/state";
import { PageHeading, SectionLabel } from "@/components/bridgepath/shared";
import {
  competencyScore,
  equivalence,
  skillList,
  quiz,
  quizScore,
  stipendEligible,
  documentStatuses,
  normalizeDocumentStatus,
  type Candidate,
} from "@/lib/bridgepath";
export const Route = createFileRoute("/track-1")({
  head: () => ({
    meta: [
      { title: "Skill Passport | BridgePath" },
      {
        name: "description",
        content:
          "Map your professional experience to a competency pathway, complete a micro-assessment and create a portable skill passport.",
      },
      { property: "og:title", content: "Skill Passport | BridgePath" },
      {
        property: "og:description",
        content: "Your experience matters, even when your records are missing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillPassport,
});
function SkillPassport() {
  const { state, setState } = useBridgePath();
  const [submitted, setSubmitted] = useState(false);
  const candidate = state.candidate;
  const eligible = stipendEligible(state.answers);
  const answered = state.answers.filter(Boolean).length;
  function update<K extends keyof Candidate>(key: K, value: Candidate[K]) {
    setState((s) => ({
      ...s,
      candidate: { ...s.candidate, [key]: value },
      passport: null,
      answers: ["", "", ""],
    }));
    setSubmitted(false);
  }
  function generate(e: React.FormEvent) {
    e.preventDefault();
    const id = `BP-2026-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    setState((s) => ({
      ...s,
      passport: {
        id,
        score: competencyScore(s.candidate),
        generatedAt: new Date().toISOString().slice(0, 10),
      },
    }));
    toast.success("Skill passport generated", {
      description: "Your experience has been mapped to an indicative competency pathway.",
    });
  }
  async function copy() {
    if (!state.passport) return;
    const text = `BridgePath — Skill Passport\n${candidate.name} | ${candidate.role}\nVerification ID: ${state.passport.id}\nIndicative competency score: ${state.passport.score}/100\nSkills: ${candidate.skills}\nCredential pathway: ${equivalence(candidate)}\nMicro-assessment: ${quizScore(state.answers)}/3\nSelf-reported skills record — not accredited credential verification.`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Skill passport copied");
    } catch {
      toast.error("Clipboard unavailable. Use Print to save your passport as a PDF.");
    }
  }
  return (
    <main className="main-container">
      <PageHeading
        track="Track 01 / Credential & skills validation"
        title="Your experience. Recognized."
        description="Build a portable skill passport that puts what you can do ahead of where you’ve been."
      />
      <div className="workspace-grid">
        <section className="workspace-section no-print">
          <SectionLabel>01 / Your professional profile</SectionLabel>
          <h2>Tell us about your skills</h2>
          <p className="section-subtitle">
            Missing documents don’t mean missing ability. Start with your experience.
          </p>
          <form onSubmit={generate}>
            <div className="form-grid">
              <label className="field">
                Candidate name
                <input
                  required
                  value={candidate.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                />
              </label>
              <label className="field">
                Prior field / role
                <input
                  required
                  value={candidate.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="e.g. Software Engineer"
                />
              </label>
              <label className="field">
                Years of experience
                <input
                  required
                  type="number"
                  min="0"
                  max="60"
                  value={candidate.years}
                  onChange={(e) => update("years", Number(e.target.value))}
                />
              </label>
              <label className="field">
                Home country
                <input
                  required
                  value={candidate.country}
                  onChange={(e) => update("country", e.target.value)}
                  placeholder="e.g. Somalia"
                />
              </label>
              <label className="field full">
                Home country qualification
                <input
                  required
                  value={candidate.qualification}
                  onChange={(e) => update("qualification", e.target.value)}
                  placeholder="e.g. BSc in Computer Science or self-taught"
                />
              </label>
              <label className="field full">
                Document status
                <select
                  value={
                    candidate.documents === "Recognized Degree / Full Records"
                      ? normalizeDocumentStatus(candidate.documents)
                      : candidate.documents
                  }
                  onChange={(e) => update("documents", e.target.value)}
                >
                  {documentStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field full">
                GitHub repository / portfolio URL
                <input
                  type="url"
                  value={candidate.portfolio}
                  onChange={(e) => update("portfolio", e.target.value)}
                  placeholder="https://github.com/your-profile"
                />
                <small>Optional. Your work summary can stand in for a portfolio.</small>
              </label>
              <label className="field full">
                Work summary
                <textarea
                  required={!candidate.portfolio}
                  value={candidate.summary}
                  onChange={(e) => update("summary", e.target.value)}
                  placeholder="Describe the projects you’ve built, teams you’ve supported or problems you’ve solved."
                />
              </label>
              <label className="field full">
                Core skills
                <input
                  required
                  value={candidate.skills}
                  onChange={(e) => update("skills", e.target.value)}
                  placeholder="React, Python, SQL, Project Management…"
                />
                <small>Separate your skills with commas.</small>
              </label>
            </div>
            <div className="form-action">
              <Button type="submit">
                <Sparkles />
                Generate skill passport
                <ArrowRight />
              </Button>
              <span>
                <ShieldCheck className="inline mr-1" size={12} />
                Saved privately on this device
              </span>
            </div>
          </form>
          <div className="notice">
            <ShieldCheck size={16} />
            <span>
              This platform maps self-reported experience using transparent scoring. It does not
              fetch repositories or certify credentials.
            </span>
          </div>
        </section>
        <div className="stack">
          {state.passport ? (
            <section className="passport print-target">
              <div className="passport-header">
                <div>
                  <h2>Skill Passport</h2>
                  <small>
                    {state.passport.id} · Generated {state.passport.generatedAt}
                  </small>
                </div>
                <Fingerprint size={34} />
              </div>
              <div className="passport-body">
                <div className="passport-person">
                  <div className="avatar">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h3>{candidate.name}</h3>
                    <p>
                      {candidate.role} · {candidate.years} years of experience
                    </p>
                  </div>
                </div>
                <div className="passport-score">
                  <span className="score-number">
                    {state.passport.score}
                    <small> /100</small>
                  </span>
                  <div>
                    <h4>
                      Verified competency score{" "}
                      <ShieldCheck className="inline text-primary" size={13} />
                    </h4>
                    <p>Indicative profile-based estimate · not independently verified</p>
                  </div>
                </div>
                <div className="passport-mapping">
                  <h4>FOREIGN-TO-LOCAL CREDENTIAL MAPPING</h4>
                  <p>
                    {candidate.qualification}
                    <ArrowRight className="inline mx-2 text-primary" size={13} />
                    {equivalence(candidate)}
                  </p>
                  <small>
                    {normalizeDocumentStatus(candidate.documents) === "Records Lost in Displacement"
                      ? "Alternative evidence pathway: work samples + skills assessment."
                      : "Prior learning pathway: submit records for local authority review."}{" "}
                    Formal equivalence requires the receiving authority’s approval.
                  </small>
                </div>
                <SectionLabel>Portfolio / self-reported competency breakdown</SectionLabel>
                <div className="chips">
                  {skillList(candidate.skills).map((skill, index) => (
                    <span className="chip" key={`${skill}-${index}`}>
                      <CheckCircle2 size={11} />
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="passport-actions">
                  <Button variant="outline" size="sm" onClick={copy}>
                    <Copy />
                    Copy passport
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.print()}>
                    <Printer />
                    Print / save PDF
                  </Button>
                </div>
                <div className="passport-note">
                  Portable skills record for evaluation only. Identity, professional licensing,
                  credential equivalence and employer suitability require independent checks.
                </div>
              </div>
            </section>
          ) : (
            <div className="empty-state no-print">
              <Fingerprint size={42} />
              <h3>A passport for your potential</h3>
              <p>Your skill passport will appear here when you complete your profile.</p>
              <span className="chip">
                <ShieldCheck size={12} />
                Competencies over paperwork
              </span>
            </div>
          )}
          <section className="workspace-section no-print">
            <SectionLabel>02 / Micro-assessment</SectionLabel>
            <h2>Put your skills into practice</h2>
            <p className="section-subtitle">
              A 3-question digital-work fundamentals check. Score at least 2/3 to unlock a bridging
              recommendation.
            </p>
            {!state.passport ? (
              <div className="muted-note">Generate your passport to begin the assessment.</div>
            ) : (
              <>
                <div className="progress-heading">
                  <span>{answered} of 3 answered</span>
                  <strong>
                    {submitted ? `${quizScore(state.answers)}/3 correct` : "Digital foundations"}
                  </strong>
                </div>
                {quiz.map((q, i) => (
                  <div className="quiz-question" key={q.question}>
                    <h3>
                      {i + 1}. {q.question}
                    </h3>
                    <div className="quiz-options">
                      {q.options.map((option) => (
                        <label key={option}>
                          <input
                            type="radio"
                            name={`question-${i}`}
                            checked={state.answers[i] === option}
                            onChange={() => {
                              setState((s) => ({
                                ...s,
                                answers: s.answers.map((answer, index) =>
                                  index === i ? option : answer,
                                ),
                              }));
                              setSubmitted(false);
                            }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-5"
                  disabled={answered !== 3}
                  onClick={() => {
                    setSubmitted(true);
                    toast[eligible ? "success" : "info"](
                      eligible
                        ? "Assessment passed — bridging recommendation unlocked"
                        : "Keep practicing. Review your answers and try again.",
                    );
                  }}
                >
                  <Award />
                  Check assessment
                </Button>
                {eligible && (
                  <div className="recommendation">
                    <strong>
                      <Award size={18} />
                      Bridging Stipend & Exam Waiver recommendation
                    </strong>
                    <p>
                      Recommended: accessible web development and SQL security micro-certifications.
                      Your assessment supports referral to a bridging support program; funding and
                      fee waivers depend on partner eligibility and availability.
                    </p>
                  </div>
                )}
                {submitted && !eligible && (
                  <p className="muted-note mt-4">
                    You scored {quizScore(state.answers)}/3. Review version control, secure database
                    queries and accessible forms, then try again.
                  </p>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
