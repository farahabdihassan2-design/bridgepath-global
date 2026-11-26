import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Globe2,
  ShieldCheck,
  Wallet,
  FileText,
  Printer,
  ArrowUpRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeading, ProgressBar, SectionLabel } from "@/components/bridgepath/shared";
import { useBridgePath } from "@/components/bridgepath/state";
import { legalIds, paymentIds, completion, invoiceTotal } from "@/lib/bridgepath";
import { guidance, regionalResources } from "@/lib/guidance";
export const Route = createFileRoute("/track-2")({
  head: () => ({
    meta: [
      { title: "Legal & Payment Hub | BridgePath" },
      {
        name: "description",
        content:
          "Multilingual work-readiness checklists, payment setup, contractor invoice previews and employer compliance guidance.",
      },
      { property: "og:title", content: "Legal & Payment Hub | BridgePath" },
      {
        property: "og:description",
        content: "Navigate a new work system with practical guidance in five languages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegalHub,
});
function LegalHub() {
  const { state, setState } = useBridgePath();
  const [tab, setTab] = useState("legal");
  const [preview, setPreview] = useState(false);
  const t = guidance[state.language] ?? guidance["English"];
  if (!t) return null;
  const legalProgress = completion(state.legal, legalIds);
  const paymentProgress = completion(state.payment, paymentIds);
  const resource = regionalResources[state.region] ?? regionalResources["Kenya"];
  const rtl = state.language === "Arabic";
  function toggle(id: string, kind: "legal" | "payment") {
    setState((s) => ({
      ...s,
      [kind]: s[kind].includes(id) ? s[kind].filter((v) => v !== id) : [...s[kind], id],
    }));
  }
  function scope(key: "pathway" | "region", value: string) {
    setState((s) => ({ ...s, [key]: value, legal: [], payment: [] }));
    toast.info("Checklist reset for your new work pathway or region.");
  }
  const pathwayNote =
    state.pathway === "Remote Global Contracting"
      ? "Cross-border contracts may involve both your residence-country rules and your client’s country rules. Confirm the contract classification and payout access."
      : state.pathway === "Paid Returnship Trial"
        ? "Paid trials still require valid work authorization. Agree on pay, supervision, duration and transparent conversion criteria before the start date."
        : "Formal employment requires a status-specific right-to-work check. Confirm any local permit or professional licensing needs before onboarding.";
  return (
    <main className="main-container">
      <PageHeading
        track="Track 02 / Legal & financial access"
        title={t.heading}
        description={t.intro}
      >
        <div className="language-toggle" aria-label="Guidance language">
          {["English", "Arabic", "French", "Swahili", "Chinese"].map((language) => (
            <Button
              key={language}
              variant="ghost"
              size="sm"
              aria-pressed={state.language === language}
              className={state.language === language ? "selected" : ""}
              onClick={() => setState((s) => ({ ...s, language }))}
            >
              {language === "Arabic"
                ? "العربية"
                : language === "French"
                  ? "Français"
                  : language === "Chinese"
                    ? "中文"
                    : language}
            </Button>
          ))}
        </div>
      </PageHeading>
      <div className="toolbar no-print">
        <label className="field">
          Work pathway
          <select value={state.pathway} onChange={(e) => scope("pathway", e.target.value)}>
            {["Local Formal Employment", "Remote Global Contracting", "Paid Returnship Trial"].map(
              (v) => (
                <option key={v}>{v}</option>
              ),
            )}
          </select>
        </label>
        <label className="field">
          Region
          <select value={state.region} onChange={(e) => scope("region", e.target.value)}>
            {Object.keys(regionalResources).map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <div className="chip self-end mb-2">
          <Globe2 size={13} />
          Your language preference is saved
        </div>
      </div>
      <div className="tab-bar no-print" role="tablist" aria-label="Readiness tools">
        {[
          { id: "legal", label: t.legal, icon: ShieldCheck },
          { id: "payment", label: t.payment, icon: Wallet },
          { id: "compliance", label: t.compliance, icon: FileText },
        ].map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? "selected" : ""}
            onClick={() => setTab(item.id)}
          >
            <item.icon />
            {item.label}
          </Button>
        ))}
      </div>
      <div className="workspace-grid">
        <section
          className={`workspace-section ${tab === "payment" ? "" : "no-print"}`}
          dir={rtl ? "rtl" : "ltr"}
          lang={
            rtl
              ? "ar"
              : state.language === "French"
                ? "fr"
                : state.language === "Swahili"
                  ? "sw"
                  : state.language === "Chinese"
                    ? "zh"
                    : "en"
          }
        >
          <SectionLabel>
            {state.region} / {state.pathway}
          </SectionLabel>
          <h2>{tab === "legal" ? t.legal : tab === "payment" ? t.payment : t.compliance}</h2>
          {tab !== "compliance" ? (
            <>
              <div className="progress-heading">
                <span>
                  {tab === "legal" ? state.legal.length : state.payment.length}/4 {t.progress}
                </span>
                <strong>{tab === "legal" ? legalProgress : paymentProgress}%</strong>
              </div>
              <ProgressBar value={tab === "legal" ? legalProgress : paymentProgress} />
              <div className="checklist">
                {(tab === "legal" ? t.legalSteps : t.paymentSteps).map(
                  ([title, description], i) => {
                    const id = (tab === "legal" ? legalIds : paymentIds)[i];
                    if (!id) return null;
                    return (
                      <label key={id}>
                        <input
                          type="checkbox"
                          checked={(tab === "legal" ? state.legal : state.payment).includes(id)}
                          onChange={() => toggle(id, tab === "legal" ? "legal" : "payment")}
                        />
                        <span>
                          <strong>{title}</strong>
                          <p>{description}</p>
                        </span>
                      </label>
                    );
                  },
                )}
              </div>
            </>
          ) : (
            <div className="compliance-list">
              {t.complianceSteps.map(([title, description], i) => (
                <div key={title} className="compliance-item">
                  <span className="step-number">{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="notice">
            <Info size={17} />
            <span>{t.caution}</span>
          </div>
        </section>
        <div className="stack">
          {tab === "payment" ? (
            <section className="workspace-section">
              <SectionLabel>Contractor invoice generator</SectionLabel>
              <h2>Clear work. Clear payment.</h2>
              <p className="section-subtitle">
                Draft an invoice for your services. Confirm required tax fields with a qualified
                local adviser.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPreview(true);
                  toast.success("Contractor invoice preview ready");
                }}
                className="no-print"
              >
                <div className="form-grid">
                  <label className="field full">
                    Client / organization
                    <input
                      required
                      value={state.invoice.client}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          invoice: { ...s.invoice, client: e.target.value },
                        }))
                      }
                      placeholder="Client name"
                    />
                  </label>
                  <label className="field full">
                    Service description
                    <input
                      required
                      value={state.invoice.description}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          invoice: { ...s.invoice, description: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label className="field">
                    Hours / units
                    <input
                      required
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={state.invoice.hours}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          invoice: { ...s.invoice, hours: Number(e.target.value) },
                        }))
                      }
                    />
                  </label>
                  <label className="field">
                    Rate per unit
                    <input
                      required
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={state.invoice.rate}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          invoice: { ...s.invoice, rate: Number(e.target.value) },
                        }))
                      }
                    />
                  </label>
                  <label className="field full">
                    Currency
                    <select
                      value={state.invoice.currency}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          invoice: { ...s.invoice, currency: e.target.value },
                        }))
                      }
                    >
                      {["USD", "EUR", "KES", "UGX", "RWF"].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <Button type="submit" className="mt-5">
                  <FileText />
                  Generate invoice preview
                </Button>
              </form>
              {preview && (
                <div className="invoice-preview print-target">
                  <div className="invoice-top">
                    <div>
                      <h3>INVOICE</h3>
                      <span>Contractor draft · BP-INV-001</span>
                    </div>
                    <div className="invoice-meta">
                      Issued {new Date().toLocaleDateString("en-GB")}
                      <br />
                      Due within 30 days
                    </div>
                  </div>
                  <div className="invoice-meta">
                    From: <strong>{state.candidate.name || "Independent contractor"}</strong>
                    <br />
                    To: <strong>{state.invoice.client}</strong>
                    <br />
                    Region: {state.region}
                  </div>
                  <div className="invoice-line">
                    <span>
                      {state.invoice.description}
                      <small className="block text-muted-foreground mt-2">
                        {state.invoice.hours} × {state.invoice.currency}{" "}
                        {state.invoice.rate.toFixed(2)}
                      </small>
                    </span>
                  </div>
                  <div className="invoice-line">
                    <strong>Total due</strong>
                    <span className="invoice-total">
                      {state.invoice.currency}{" "}
                      {invoiceTotal(state.invoice.hours, state.invoice.rate).toLocaleString(
                        "en-US",
                        { minimumFractionDigits: 2 },
                      )}
                    </span>
                  </div>
                  <p className="invoice-meta">
                    Tax treatment, registration numbers, addresses and payment instructions must be
                    confirmed and added before sending. This draft is not a certification of
                    compliance.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="no-print"
                    onClick={() => window.print()}
                  >
                    <Printer />
                    Print / save PDF
                  </Button>
                </div>
              )}
            </section>
          ) : (
            <section className="workspace-section no-print">
              <SectionLabel>Your selected pathway</SectionLabel>
              <div className="track-icon blue mb-5">
                <Globe2 size={23} />
              </div>
              <h2>{state.pathway}</h2>
              <p className="section-subtitle">
                {state.region} · {pathwayNote}
              </p>
              {resource && (
                <Button variant="outline" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.name}
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
              <div className="compliance-list">
                <div className="compliance-item">
                  <CheckCircle2 className="text-primary" size={19} />
                  <div>
                    <h3>No one-size-fits-all authorization</h3>
                    <p>
                      Requirements depend on your status and individual circumstances. The checklist
                      tracks your preparation, not permission to work.
                    </p>
                  </div>
                </div>
                <div className="compliance-item">
                  <ShieldCheck className="text-primary" size={19} />
                  <div>
                    <h3>Consent comes first</h3>
                    <p>
                      Share sensitive identity or protection records only with trusted, authorized
                      organizations.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="no-print">
            <div className="progress-heading">
              <span>Legal preparation</span>
              <strong>{legalProgress}%</strong>
            </div>
            <ProgressBar value={legalProgress} />
            <div className="progress-heading">
              <span>Payment preparation</span>
              <strong>{paymentProgress}%</strong>
            </div>
            <ProgressBar value={paymentProgress} />
          </section>
        </div>
      </div>
    </main>
  );
}
