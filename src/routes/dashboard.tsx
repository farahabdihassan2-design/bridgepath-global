import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Fingerprint,
  Globe2,
  Users,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BriefcaseBusiness,
  Building2,
  Download,
  CircleCheck,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PageHeading,
  ProgressBar,
  EmptyPassport,
  SectionLabel,
} from "@/components/bridgepath/shared";
import { useBridgePath } from "@/components/bridgepath/state";
import { readiness, completion, legalIds, paymentIds, listings } from "@/lib/bridgepath";
import { toast } from "sonner";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Readiness & Impact Dashboard | BridgePath" },
      {
        name: "description",
        content:
          "Track skill verification, legal and payment readiness, applications and fellowship milestones in one dashboard.",
      },
      { property: "og:title", content: "Readiness & Impact Dashboard | BridgePath" },
      {
        property: "og:description",
        content: "Measure candidate progress and preview skills-first cohort onboarding at scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
function Dashboard() {
  const { state, setState, loadDemo } = useBridgePath();
  const scores = readiness(state);
  function exportReport() {
    const data = {
      name: state.candidate.name,
      verificationId: state.passport?.id ?? null,
      readiness: scores,
      legal: completion(state.legal, legalIds),
      payment: completion(state.payment, paymentIds),
      applications: state.applications.map((id) => listings.find((l) => l.id === id)?.name ?? id),
      mentors: state.mentors.map((id) => listings.find((l) => l.id === id)?.name ?? id),
      completedMilestones: state.milestone,
      disclaimer:
        "Demonstration. Self-reported data; not accredited verification or legal authorization.",
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bridgepath-readiness-report.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Readiness report downloaded");
  }
  return (
    <main className="main-container">
      <PageHeading
        track="Unified readiness & scalability"
        title={state.employer ? "Potential, at a glance." : "Every step counts."}
        description={
          state.employer
            ? "A skills-first view of candidate preparation and scalable cohort onboarding."
            : "See how your skills, work readiness and professional network come together."
        }
      >
        <Button variant="outline" onClick={exportReport}>
          <Download />
          Export readiness
        </Button>
      </PageHeading>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div className="segmented">
          <Button
            variant="ghost"
            size="sm"
            className={!state.employer ? "selected" : ""}
            onClick={() => setState((s) => ({ ...s, employer: false }))}
          >
            <Users />
            Candidate view
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={!state.demo}
            className={state.employer ? "selected" : ""}
            onClick={() => setState((s) => ({ ...s, employer: true }))}
          >
            <Building2 />
            Hiring Partner / Evaluator View
          </Button>
        </div>
        {!state.demo && (
          <Button size="sm" variant="link" onClick={loadDemo}>
            Load demo to unlock partner preview
            <ArrowRight />
          </Button>
        )}
      </div>
      <section className="dashboard-metrics">
        {[
          {
            icon: TrendingUp,
            value: `${scores.overall}%`,
            label: "Overall candidate readiness",
            progress: scores.overall,
          },
          {
            icon: Fingerprint,
            value: `${scores.skills}/100`,
            label: "Track 1 · Skill verification",
            progress: scores.skills,
          },
          {
            icon: Globe2,
            value: `${scores.access}%`,
            label: "Track 2 · Legal & payment",
            progress: scores.access,
          },
          {
            icon: HeartIcon,
            value: `${scores.network}%`,
            label: "Track 3 · Network & milestones",
            progress: scores.network,
          },
        ].map((m) => (
          <article className="dashboard-stat" key={m.label}>
            <m.icon size={21} />
            <strong>{m.value}</strong>
            <h3>{m.label}</h3>
            <ProgressBar value={m.progress} />
          </article>
        ))}
      </section>
      {state.employer ? (
        <>
          <section className="workspace-section">
            <SectionLabel>Hiring partner / cohort preview</SectionLabel>
            <h2>Less paperwork. More potential.</h2>
            <p className="section-subtitle">
              One portable record brings together skills, preparation and engagement. Candidate data
              below is illustrative and stays on this device.
            </p>
            <div className="table-scroll">
              <table className="cohort-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Competency score</th>
                    <th>Legal / payment</th>
                    <th>Engagement</th>
                    <th>Readiness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{state.candidate.name}</strong>
                      <small>
                        {state.candidate.role} · {state.candidate.years} years
                      </small>
                    </td>
                    <td>
                      {scores.skills}/100<small>{state.passport?.id ?? "Not yet generated"}</small>
                    </td>
                    <td>
                      {scores.access}%<small>Preparation, not authorization</small>
                    </td>
                    <td>
                      {state.applications.length} applications
                      <small>{state.mentors.length} mentor requests</small>
                    </td>
                    <td>
                      <span className="chip">{scores.overall}%</span>
                    </td>
                  </tr>
                  {[
                    {
                      name: "Omar Khalil",
                      role: "Data Analyst",
                      skills: 84,
                      access: 75,
                      engagement: "2 applications",
                      ready: 78,
                    },
                    {
                      name: "Grace Uwimana",
                      role: "Project Coordinator",
                      skills: 81,
                      access: 100,
                      engagement: "1 returnship",
                      ready: 86,
                    },
                  ].map((c) => (
                    <tr key={c.name}>
                      <td>
                        <strong>{c.name}</strong>
                        <small>{c.role} · Illustrative candidate</small>
                      </td>
                      <td>{c.skills}/100</td>
                      <td>{c.access}%</td>
                      <td>{c.engagement}</td>
                      <td>
                        <span className="chip">{c.ready}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cohort-note">
              <Info size={13} />
              Candidate readiness does not replace identity checks, right-to-work verification or a
              fair hiring assessment.
            </div>
          </section>
          <div className="workspace-grid mt-6">
            <section>
              <h2 className="section-title">A repeatable onboarding pathway</h2>
              <div className="compliance-list">
                {[
                  [
                    "Portable skill records",
                    "Review job-relevant competencies in a consistent format.",
                  ],
                  [
                    "Guided preparation",
                    "Use shared checklists while qualified staff verify legal requirements.",
                  ],
                  [
                    "Milestone-based support",
                    "Coordinate mentors and paid trial reviews with clear conversion criteria.",
                  ],
                ].map(([title, description], i) => (
                  <div className="compliance-item" key={title}>
                    <span className="step-number">{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="section-title">Cohort scalability · illustrative</h2>
              <div className="readiness-row">
                <Users className="text-primary" size={22} />
                <div>
                  <h3>1,248 talent profiles</h3>
                  <p className="muted-note">A shared preparation journey across 8 regions</p>
                </div>
              </div>
              <div className="readiness-row">
                <BriefcaseBusiness className="text-primary" size={22} />
                <div>
                  <h3>156 inclusive hiring partners</h3>
                  <p className="muted-note">Skills-first selection with human oversight</p>
                </div>
              </div>
              <p className="muted-note">
                Cohort counts are sample impact data, not live organization records.
              </p>
            </section>
          </div>
        </>
      ) : !state.passport ? (
        <EmptyPassport />
      ) : (
        <div className="workspace-grid">
          <section className="workspace-section">
            <SectionLabel>Readiness breakdown</SectionLabel>
            <h2>{state.candidate.name}’s pathway</h2>
            <p className="section-subtitle">
              A transparent blend: skills 40%, legal & payment 35%, engagement 25%.
            </p>
            {[
              { icon: Fingerprint, title: "Skill verification", value: scores.skills },
              {
                icon: ShieldCheck,
                title: "Legal checklist completion",
                value: completion(state.legal, legalIds),
              },
              {
                icon: Globe2,
                title: "Payment readiness",
                value: completion(state.payment, paymentIds),
              },
              { icon: Users, title: "Applications & fellowship milestones", value: scores.network },
            ].map((r) => (
              <div className="readiness-row" key={r.title}>
                <div className="track-icon">
                  <r.icon size={21} />
                </div>
                <div>
                  <h3>{r.title}</h3>
                  <ProgressBar value={r.value} />
                </div>
                <strong>{r.value}%</strong>
              </div>
            ))}
          </section>
          <section className="workspace-section">
            <SectionLabel>Your next steps</SectionLabel>
            <h2>Keep your momentum.</h2>
            <p className="section-subtitle">
              Small, purposeful actions move you closer to opportunity.
            </p>
            {[
              {
                to: "/track-1" as const,
                icon: Fingerprint,
                title: "Complete your micro-assessment",
                description: "Practice digital foundations and explore bridging support.",
              },
              {
                to: "/track-2" as const,
                icon: Globe2,
                title: "Prepare for work and payment",
                description: `${state.legal.length + state.payment.length} of 8 preparation steps complete.`,
              },
              {
                to: "/track-3" as const,
                icon: Users,
                title: "Build your professional network",
                description: `${state.applications.length} applications · ${state.mentors.length} mentor requests saved.`,
              },
            ].map((s) => (
              <div className="next-step" key={s.to}>
                <s.icon size={21} />
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
                <Link to={s.to} aria-label={s.title}>
                  <ArrowRight size={17} />
                </Link>
              </div>
            ))}
            <div className="recommendation">
              <strong>
                <CircleCheck size={17} />
                Your progress travels with you
              </strong>
              <p>
                All profile details, assessment answers and checklist updates stay saved in this
                browser.
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
function HeartIcon({ size = 21 }: { size?: number }) {
  return <CheckCircle2 size={size} />;
}
