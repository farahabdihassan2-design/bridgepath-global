import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  Route as RouteIcon,
  Globe2,
  Users,
  LayoutDashboard,
  Fingerprint,
  ChevronRight,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useBridgePath } from "./state";
export const navigation = [
  { to: "/" as const, title: "Overview", icon: RouteIcon },
  { to: "/track-1" as const, title: "Skill Passport", icon: Fingerprint },
  { to: "/track-2" as const, title: "Legal & Payment Hub", icon: Globe2 },
  { to: "/track-3" as const, title: "Returnships & Mentors", icon: Users },
  { to: "/dashboard" as const, title: "Impact Dashboard", icon: LayoutDashboard },
];
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="BridgePath home">
      <span className="brand-mark">
        <RouteIcon size={22} />
      </span>
      <span>BridgePath</span>
    </Link>
  );
}
export function Header() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const { state, loadDemo, setState } = useBridgePath();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="event-bar">
        <span>
          <span className="event-dot" /> BridgePath
        </span>
        <span className="event-sub">
          Unlocking Displaced Talent <span className="mx-2">/</span> SDG-aligned innovation{" "}
          <ArrowUpRight size={12} />
        </span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                className={pathname === n.to ? "nav-link active" : "nav-link"}
              >
                {i > 0 && i < 4 && <span className="nav-number">0{i}</span>}
                {n.title}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Button onClick={loadDemo} size="sm" className="demo-button">
              <Sparkles />
              Load Judge Demo
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={pathname === n.to ? "active" : ""}
              >
                <n.icon size={18} />
                {n.title}
                <ChevronRight size={14} />
              </Link>
            ))}
          </nav>
        )}
      </header>
      {state.demo && (
        <div className="demo-strip">
          <span>
            <ShieldCheck size={15} /> Judge demo{" "}
            <span className="demo-person">· Amina Hassan · Software Engineer</span>
          </span>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={state.employer}
              onChange={(e) => setState((s) => ({ ...s, employer: e.target.checked }))}
            />{" "}
            Hiring partner preview
          </label>
        </div>
      )}
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Brand />
      <span>Talent has no borders. Opportunity shouldn’t either.</span>
      <span className="footer-credit">© 2026 BridgePath. All rights reserved.</span>
    </footer>
  );
}
export function PageHeading({
  track,
  title,
  description,
  children,
}: {
  track: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          <span className="event-dot" />
          {track}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`progress-fill progress-${Math.round(value)}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
export function EmptyPassport() {
  return (
    <div className="empty-state">
      <Fingerprint size={36} />
      <h3>Your skills are your starting point</h3>
      <p>Create a skill passport to see personalized matches and readiness.</p>
      <Button asChild>
        <Link to="/track-1">
          Create skill passport
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="section-label">{children}</div>;
}
