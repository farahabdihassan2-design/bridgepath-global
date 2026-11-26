import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BriefcaseBusiness,
  Users,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Search,
  Fingerprint,
  Circle,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeading, EmptyPassport } from "@/components/bridgepath/shared";
import { useBridgePath } from "@/components/bridgepath/state";
import { listings, matchScore } from "@/lib/bridgepath";
export const Route = createFileRoute("/track-3")({
  head: () => ({
    meta: [
      { title: "Returnships & Mentors | BridgePath" },
      {
        name: "description",
        content:
          "Find skills-first employers, paid 4–12 week returnships and industry mentors matched to your skill passport.",
      },
      { property: "og:title", content: "Returnships & Mentors | BridgePath" },
      {
        property: "og:description",
        content:
          "Connect your competencies with inclusive opportunities and a supportive professional network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Marketplace,
});
function Marketplace() {
  const { state, setState } = useBridgePath();
  const [tab, setTab] = useState("Hiring Partners");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All fields");
  const [location, setLocation] = useState("All locations");
  const filtered = listings
    .filter(
      (l) =>
        l.type === tab &&
        (category === "All fields" || l.category === category) &&
        (location === "All locations" ||
          (location === "Remote / Online"
            ? /Remote|Online/.test(l.location)
            : l.location.includes("Nairobi"))) &&
        `${l.name} ${l.organization} ${l.skills.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    )
    .sort(
      (a, b) =>
        matchScore(state.candidate.skills, b.skills) - matchScore(state.candidate.skills, a.skills),
    );
  function apply(id: string, mentor: boolean) {
    if (!state.passport) {
      toast.info("Create your skill passport before applying.");
      return;
    }
    setState((s) => ({
      ...s,
      [mentor ? "mentors" : "applications"]: [...s[mentor ? "mentors" : "applications"], id],
    }));
    toast.success(
      mentor ? "Mentorship request saved" : "Application saved with your skill passport",
      {
        description:
          "Demonstration: this request is tracked on your device, not sent to an external partner.",
      },
    );
  }
  const milestoneNames = ["Onboarding", "Week 2 Check-in", "Mid-Trial Review", "Full-Time Offer"];
  const hasReturnship = state.applications.some((id) => id.startsWith("return-"));
  return (
    <main className="main-container">
      <PageHeading
        track="Track 03 / Local experience & networks"
        title="Find your next chapter."
        description="Your skills open doors. Explore inclusive teams, paid returnships and mentors who can help you move forward."
      >
        {state.passport && (
          <span className="chip">
            <Fingerprint size={13} />
            Matching with {state.candidate.name.split(" ")[0]}’s skill passport
          </span>
        )}
      </PageHeading>
      <div className="tab-bar" role="tablist" aria-label="Opportunity types">
        {[
          { id: "Hiring Partners", label: "Skills-First Hiring Partners", icon: BriefcaseBusiness },
          { id: "Returnships", label: "Returnship Marketplace", icon: HeartHandshake },
          { id: "Mentors", label: "1-on-1 Industry Mentors", icon: Users },
        ].map((t) => (
          <Button
            key={t.id}
            variant="ghost"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "selected" : ""}
            onClick={() => setTab(t.id)}
          >
            <t.icon />
            {t.label}
          </Button>
        ))}
      </div>
      <div className="toolbar">
        <label className="field">
          Search opportunities
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={15} />
            <input
              className="pl-9!"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Role, organization or skill"
            />
          </div>
        </label>
        <label className="field">
          Professional field
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["All fields", "Technology", "Data & Analytics", "Operations"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Location
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {["All locations", "Nairobi", "Remote / Online"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="muted-note">
          {filtered.length} {tab.toLowerCase()} · ranked by skill match
        </span>
        <span className="muted-note">Illustrative opportunities</span>
      </div>
      {!state.passport && (
        <div className="notice mb-6 mt-0">
          <Fingerprint size={17} />
          <span>
            Create a passport for personalized match percentages and applications.{" "}
            <Link to="/track-1" className="text-primary font-semibold">
              Build your passport <ArrowRight className="inline" size={12} />
            </Link>
          </span>
        </div>
      )}
      <section className="market-grid" aria-label="Opportunity listings">
        {filtered.map((l) => {
          const applied = (l.type === "Mentors" ? state.mentors : state.applications).includes(
            l.id,
          );
          return (
            <article key={l.id} className="listing">
              <div className="listing-top">
                <span className="org-logo">{l.monogram}</span>
                <span className="match-label">
                  <CheckCircle2 size={12} />
                  {state.passport
                    ? `${matchScore(state.candidate.skills, l.skills)}% skill match`
                    : "Passport needed"}
                </span>
              </div>
              <h3>{l.name}</h3>
              <p>{l.organization}</p>
              <p>
                <MapPin className="inline mr-1" size={12} />
                {l.location}
              </p>
              <div className="chips">
                {l.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
              <span className="listing-tag">{l.tag}</span>
              <div className="listing-detail">{l.detail}</div>
              <Button
                variant={applied ? "secondary" : "default"}
                disabled={applied || !state.passport}
                onClick={() => apply(l.id, l.type === "Mentors")}
              >
                {applied ? (
                  <>
                    <Check /> {l.type === "Mentors" ? "Request saved" : "Application saved"}
                  </>
                ) : (
                  <>
                    {l.type === "Mentors" ? "Request mentorship" : "Apply with Skill Passport"}
                    <ArrowRight />
                  </>
                )}
              </Button>
            </article>
          );
        })}
      </section>
      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={30} />
          <h3>No opportunities match these filters</h3>
          <p>Try another field or location.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory("All fields");
              setLocation("All locations");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
      <section className="tracker">
        <div className="tracker-header">
          <div>
            <div className="eyebrow mb-2">Mentor-fellowship tracker</div>
            <h2>A pathway, not just a placement.</h2>
            <p>
              {hasReturnship
                ? `${state.candidate.name} · ${state.mentors.length ? "Mentorship connected" : "Mentorship pending"} · Returnship application saved`
                : "Apply to a returnship to begin your fellowship milestones."}
            </p>
          </div>
          <Button
            variant="outline"
            disabled={!hasReturnship || state.milestone >= 4}
            onClick={() => {
              setState((s) => ({ ...s, milestone: Math.min(4, s.milestone + 1) }));
              toast.success("Demo milestone marked complete");
            }}
          >
            <CheckCircle2 />
            {state.milestone >= 4 ? "All milestones complete" : "Complete next demo milestone"}
          </Button>
        </div>
        <div className="milestones">
          {milestoneNames.map((name, i) => (
            <div key={name} className={`milestone ${state.milestone > i ? "complete" : ""}`}>
              <strong>
                {state.milestone > i ? <CheckCircle2 size={15} /> : <Circle size={15} />} {name}
              </strong>
              <p>
                {state.milestone > i
                  ? "Completed in demo"
                  : state.milestone === i && hasReturnship
                    ? "Up next"
                    : "Not started"}
              </p>
            </div>
          ))}
        </div>
        <p className="muted-note mt-5">
          Milestones model a partner-supported journey. Advancing this demonstration does not
          confirm a real placement, completed review or job offer.
        </p>
      </section>
      {!state.passport && <EmptyPassport />}
    </main>
  );
}
