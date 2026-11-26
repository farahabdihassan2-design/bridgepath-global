import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Fingerprint,
  Globe2,
  Users,
  Check,
  ShieldCheck,
  TrendingUp,
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  CircleCheck,
  LockKeyhole,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBridgePath } from "@/components/bridgepath/state";
import { readiness } from "@/lib/bridgepath";
import heroAsset from "@/assets/bridgepath-team.asset.json";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BridgePath | Unlocking displaced talent" },
      {
        name: "description",
        content:
          "Turn skills into opportunity with a skill passport, legal and financial readiness, paid returnships and industry mentors.",
      },
      { property: "og:title", content: "BridgePath | Unlocking displaced talent" },
      {
        property: "og:description",
        content: "Three connected pathways. One future without borders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});
const tracks = [
  {
    to: "/track-1" as const,
    number: "01",
    icon: Fingerprint,
    color: "",
    title: "Let your skills speak.",
    subtitle: "Skill Passport",
    description:
      "Turn experience into recognized potential — even when your credentials can’t make the journey.",
    features: [
      "Competency-based skill verification",
      "Foreign-to-local credential mapping",
      "Bridging stipends & micro-certifications",
    ],
    action: "Build your skill passport",
    note: "No local credentials required",
  },
  {
    to: "/track-2" as const,
    number: "02",
    icon: Globe2,
    color: "blue",
    title: "Work with confidence.",
    subtitle: "Legal & Payment Hub",
    description:
      "Navigate work authorization, onboarding and getting paid, with guidance in your language.",
    features: [
      "Multilingual legal action checklists",
      "Banking, payouts & invoice readiness",
      "Hiring compliance for employers",
    ],
    action: "Explore legal & payment hub",
    note: "Available in 4 languages",
  },
  {
    to: "/track-3" as const,
    number: "03",
    icon: Users,
    color: "amber",
    title: "Find your next chapter.",
    subtitle: "Returnships & Mentors",
    description:
      "Connect with inclusive employers, rebuild local experience and grow with people who believe in you.",
    features: [
      "Skills-first employer matching",
      "Paid 4–12 week returnships",
      "1-on-1 mentorship & milestone tracking",
    ],
    action: "Discover your opportunities",
    note: "Real skills. Meaningful connections.",
  },
];
function Overview() {
  const { state } = useBridgePath();
  const score = readiness(state);
  return (
    <main className="main-container">
      <div className="welcome-row">
        <div>
          <h2>
            {state.demo
              ? `Welcome, ${state.candidate.name.split(" ")[0]}.`
              : "Opportunity starts here."}
          </h2>
          <p>Three connected pathways. One future without borders.</p>
        </div>
        <span className="live-label">
          <span className="event-dot" />A connected ecosystem for displaced talent
        </span>
      </div>
      <section className="hero">
        <img
          src={heroAsset.url}
          alt="Two skilled professionals collaborating on a laptop in a bright coworking space"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={12} />
            Unlocking displaced talent
          </div>
          <h1>
            BridgePath
            <br />
            Talent has no borders.
            <br />
            <span>Neither should opportunity.</span>
          </h1>
          <p>
            Displacement shouldn’t mean starting from zero. Validate your skills, navigate new
            systems, and connect to meaningful work — all in one place.
          </p>
          <div className="hero-actions">
            <Button asChild>
              <Link to="/track-1">
                Start your journey
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/dashboard">
                Explore our impact
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <span className="hero-caption">
          <ShieldCheck size={14} />
          Built around potential. Not paperwork.
        </span>
      </section>
      <div className="sdg-band">
        <span>Opening pathways. Advancing the global goals.</span>
        <div className="sdg-badges">
          {[
            ["4", "Quality Education"],
            ["8", "Decent Work"],
            ["10", "Reduced Inequalities"],
            ["16", "Peace & Justice"],
            ["17", "Partnerships"],
          ].map(([n, t]) => (
            <span className="sdg-item" key={n} title={`SDG ${n}: ${t}`}>
              <span className="sdg-number">{n}</span>
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="section-heading">
        <div>
          <h2>Your pathway to possibility</h2>
          <p>Move forward at your own pace. Every step opens a new door.</p>
        </div>
        <Link to="/dashboard">
          View your readiness
          <ArrowRight size={13} />
        </Link>
      </div>
      <section className="pathway-grid" aria-label="Three pathways">
        {tracks.map((track) => (
          <article className="pathway-card" key={track.number}>
            <div className="pathway-top">
              <span className={`track-icon ${track.color}`}>
                <track.icon size={22} />
              </span>
              <span className="track-number">TRACK {track.number} / 03</span>
            </div>
            <div className="eyebrow mb-2">{track.subtitle}</div>
            <h3>{track.title}</h3>
            <p>{track.description}</p>
            <ul className="feature-list">
              {track.features.map((feature) => (
                <li key={feature}>
                  <Check />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="outline" asChild className="pathway-button">
              <Link to={track.to}>
                {track.action}
                <ArrowRight />
              </Link>
            </Button>
            <div className="pathway-foot">
              <ShieldCheck size={11} />
              {track.note}
            </div>
          </article>
        ))}
      </section>
      <section className="impact-panel">
        <div className="impact-intro">
          <div className="eyebrow">
            <span className="event-dot" />
            Cohort scalability & impact
          </div>
          <h3>Small steps. Collective impact.</h3>
          <p>Replacing “brain waste” with pathways to education, decent work and belonging.</p>
        </div>
        <div className="metric-grid">
          {[
            {
              icon: Users,
              value: state.demo ? "1,248" : "1,247",
              label: "Talent profiles activated",
              trend: "12% this month",
            },
            {
              icon: Fingerprint,
              value: state.passport ? "843" : "842",
              label: "Skill passports generated",
              trend: "Skills, not just credentials",
            },
            {
              icon: BriefcaseBusiness,
              value: "156",
              label: "Inclusive hiring partners",
              trend: "Across 8 regions",
            },
            {
              icon: HeartHandshake,
              value: `${state.demo ? score.overall : 78}%`,
              label: state.demo ? "Your candidate readiness" : "Returnship conversion rate",
              trend: state.demo ? "Your live saved progress" : "From trial to opportunity",
            },
          ].map((m) => (
            <div className="metric" key={m.label}>
              <m.icon className="metric-icon" size={17} />
              <strong>{m.value}</strong>
              <div className="metric-label">{m.label}</div>
              <div className="metric-trend">
                <TrendingUp size={11} />
                {m.trend}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="overview-bottom">
        <span>
          <LockKeyhole size={13} />
          Your progress stays on your device. Your story stays yours.
        </span>
        <span>
          <GraduationCap size={13} />
          Illustrative cohort data <CircleCheck size={12} />
        </span>
      </div>
    </main>
  );
}
