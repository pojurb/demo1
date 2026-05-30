"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PRESETS,
  VERTICAL_LABELS,
  type Vertical,
  type AssetParameters,
} from "@/data/presets";
import {
  calcPE,
  calcDCF,
  calcLTV,
  calcCAC,
  calcRunway,
  calcBEP,
  calcIRR,
  formatIDR,
  formatNum,
} from "@/lib/finance";
import { StocksChart, StartupsChart, ConventionalChart } from "./charts";
import { storage, type LedgerEntry, type DecisionAction } from "@/lib/storage";

type Lens = "operator" | "risk" | "predator";
type Tone = "bull" | "bear" | "warning" | undefined;

interface Field {
  key: keyof AssetParameters;
  label: string;
  min: number;
  max: number;
  step: number;
  type: "currency" | "percent" | "percent_raw" | "number";
}

const FIELDS: Record<Vertical, Field[]> = {
  stocks: [
    { key: "price", label: "Share Price (IDR)", min: 100, max: 20000, step: 100, type: "currency" },
    { key: "eps", label: "Earnings Per Share (EPS)", min: 10, max: 2000, step: 10, type: "currency" },
    { key: "roe", label: "Return on Equity (ROE %)", min: 1, max: 50, step: 0.5, type: "percent" },
    { key: "discountRate", label: "Discount Rate %", min: 0.05, max: 0.25, step: 0.01, type: "percent_raw" },
    { key: "terminalMult", label: "Terminal DCF Multiple", min: 5, max: 25, step: 1, type: "number" },
    { key: "invested", label: "Invested / Buy Price", min: 100, max: 20000, step: 100, type: "currency" },
  ],
  startups: [
    { key: "cash", label: "Cash Balance", min: 1e9, max: 5e10, step: 5e8, type: "currency" },
    { key: "burn", label: "Monthly Cash Burn", min: 1e8, max: 5e9, step: 5e7, type: "currency" },
    { key: "cac", label: "CAC (Acquisition Cost)", min: 50000, max: 5e6, step: 50000, type: "currency" },
    { key: "arpu", label: "Monthly ARPU", min: 10000, max: 2e6, step: 10000, type: "currency" },
    { key: "margin", label: "Gross Profit Margin %", min: 0.1, max: 0.95, step: 0.05, type: "percent_raw" },
    { key: "churn", label: "Monthly Churn Rate %", min: 0.01, max: 0.15, step: 0.005, type: "percent_raw" },
  ],
  conventional: [
    { key: "invested", label: "Initial CapEx Investment", min: 5e7, max: 2e9, step: 2.5e7, type: "currency" },
    { key: "fixed", label: "Annual Fixed Cost", min: 2e7, max: 1e9, step: 1e7, type: "currency" },
    { key: "price", label: "Avg Customer Billing / Unit", min: 5000, max: 500000, step: 2000, type: "currency" },
    { key: "variable", label: "Variable Cost / Unit (COGS)", min: 1000, max: 200000, step: 1000, type: "currency" },
  ],
};

function fmtVal(v: number, type: Field["type"]): string {
  if (type === "currency") return formatIDR(v);
  if (type === "percent") return `${v}%`;
  if (type === "percent_raw") return `${(v * 100).toFixed(1)}%`;
  return formatNum(v, 0);
}

interface Stat {
  label: string;
  value: string;
  tone?: Tone;
}

export default function Cockpit() {
  const [vertical, setVertical] = useState<Vertical>("stocks");
  const [assetId, setAssetId] = useState<string>(PRESETS.stocks[0].id);
  const [params, setParams] = useState<AssetParameters>({ ...PRESETS.stocks[0].parameters });
  const [lens, setLens] = useState<Lens>("operator");
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [action, setAction] = useState<DecisionAction>("APPROVE");
  const [notes, setNotes] = useState("");

  const preset = useMemo(
    () => PRESETS[vertical].find((a) => a.id === assetId) ?? PRESETS[vertical][0],
    [vertical, assetId],
  );

  // Load ledger on the client to avoid SSR hydration mismatch.
  useEffect(() => {
    setLedger(storage.getLedger());
  }, []);

  function selectVertical(v: Vertical) {
    const first = PRESETS[v][0];
    setVertical(v);
    setAssetId(first.id);
    setParams({ ...first.parameters });
    setLens("operator");
  }

  function selectAsset(id: string) {
    const asset = PRESETS[vertical].find((a) => a.id === id);
    if (!asset) return;
    setAssetId(id);
    setParams({ ...asset.parameters });
  }

  function setParam(key: keyof AssetParameters, value: number) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  const { stats, chart } = useMemo(() => computeView(vertical, params, preset.parameters), [vertical, params, preset]);

  function commit(e: React.FormEvent) {
    e.preventDefault();
    if (!notes.trim()) return;
    const entry: LedgerEntry = {
      id: Date.now(),
      assetName: preset.name,
      vertical,
      action,
      notes: notes.trim(),
      timestamp: new Date().toLocaleString("id-ID"),
    };
    storage.saveDecision(entry);
    setLedger((l) => [entry, ...l]);
    setNotes("");
  }

  const seed = preset.seed;
  const advisory = seed.advisory[lens];

  return (
    <div className="cockpit-container">
      <main className="main-cockpit">
        <header className="cockpit-header">
          <div className="branding">
            <span className="system-tag">JP-INVEST SYSTEM V2.0</span>
            <span className="status-light-container">
              <span className="status-light blinking-green" />
              <span className="status-text">COCKPIT ACTIVE</span>
            </span>
          </div>
          <div className="vertical-selector-group">
            {(Object.keys(PRESETS) as Vertical[]).map((v, i) => (
              <button
                key={v}
                className={`selector-btn${v === vertical ? " active" : ""}`}
                onClick={() => selectVertical(v)}
              >
                <span className="btn-num">{`[0${i + 1}]`}</span>{" "}
                {v === "stocks" ? "STOCKS (EQUITIES)" : v === "startups" ? "STARTUP / VC METRICS" : "CONVENTIONAL BIZ"}
              </button>
            ))}
          </div>
        </header>

        <div className="middle-row-grid">
          <section className="panel input-controls-panel">
            <div className="panel-header">
              <span className="panel-title">PARAMETER INPUT SANDBOX</span>
              <span className="panel-subtitle">{VERTICAL_LABELS[vertical]}</span>
            </div>
            <div className="panel-body">
              <div className="preset-section">
                <span className="label-text">Load Preset:</span>
                <div className="preset-buttons">
                  {PRESETS[vertical].map((p) => (
                    <button
                      key={p.id}
                      className={`preset-btn${p.id === assetId ? " active" : ""}`}
                      onClick={() => selectAsset(p.id)}
                    >
                      {p.name.split(" (")[0]}
                    </button>
                  ))}
                </div>
              </div>
              <form className="parameter-form" onSubmit={(e) => e.preventDefault()}>
                {FIELDS[vertical].map((f) => {
                  const val = Number(params[f.key] ?? f.min);
                  return (
                    <div className="form-group" key={f.key}>
                      <div className="form-label-row">
                        <span className="field-label">{f.label}</span>
                        <span className="field-value">{fmtVal(val, f.type)}</span>
                      </div>
                      <input
                        type="range"
                        className="slider-input"
                        min={f.min}
                        max={f.max}
                        step={f.step}
                        value={val}
                        onChange={(e) => setParam(f.key, parseFloat(e.target.value))}
                      />
                    </div>
                  );
                })}
              </form>
            </div>
          </section>

          <section className="panel chart-visualizer-panel">
            <div className="panel-header">
              <span className="panel-title">QUANTITATIVE VISUALIZER (RETRO CHART)</span>
              <span className="panel-subtitle">Interactive Calculation Engine Output</span>
            </div>
            <div className="panel-body centered-content">
              <div className="chart-wrapper">{chart}</div>
              <div className="chart-stats-grid">
                {stats.map((s) => (
                  <div className="stat-box" key={s.label}>
                    <div className="stat-lbl">{s.label}</div>
                    <div className={`stat-val${s.tone ? ` ${s.tone}-text` : ""}`}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="bottom-row-grid">
          <section className="panel debate-panel">
            <div className="panel-header">
              <span className="panel-title">
                MULTI-AGENT RED TEAM DEBATE <span className="sim-badge" title="Seed content. Live LLM debate ships in the AI phase.">SEED</span>
              </span>
              <div className="debate-control-header">
                <span className="confidence-indicator">
                  Confidence Score: <strong>{seed.confidence}%</strong>
                </span>
              </div>
            </div>
            <div className="panel-body split-debate-logs">
              <div className="debate-col bull-col">
                <div className="col-title bull-text">▲ BULL ADVOCATE</div>
                <div className="log-stream scrollable">
                  {seed.bull.map((line, i) => (
                    <DebateEntry key={i} type="bull" agent={line.agent} text={line.text} />
                  ))}
                </div>
              </div>
              <div className="debate-col bear-col">
                <div className="col-title bear-text">▼ BEAR ADVERSARY</div>
                <div className="log-stream scrollable">
                  {seed.bear.map((line, i) => (
                    <DebateEntry key={i} type="bear" agent={line.agent} text={line.text} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="panel advisory-panel">
            <div className="panel-header warning-stripes">
              <span className="panel-title">THE ADVISORY BOARD LENSES</span>
              <span className="panel-subtitle">Three Scenario Lenses for Human Decision</span>
            </div>
            <div className="panel-body scrollable">
              <div className="lenses-tab-control">
                {(["operator", "risk", "predator"] as Lens[]).map((l) => (
                  <button
                    key={l}
                    className={`lens-tab${l === lens ? " active" : ""}`}
                    onClick={() => setLens(l)}
                  >
                    {l === "operator" ? "OPERATOR LENS" : l === "risk" ? "RISK MANAGER LENS" : "PREDATOR LENS"}
                  </button>
                ))}
              </div>
              <div className="lens-content-viewer">
                <div className="lens-scenario-title">{advisory.title}</div>
                <div className="lens-scenario-text">{advisory.text}</div>
              </div>

              <div className="decision-logger">
                <div className="logger-title">⚡ COMMIT HUMAN DECISION LOG</div>
                <form className="decision-form" onSubmit={commit}>
                  <div className="form-row">
                    <label htmlFor="decision-select">EXECUTIVE ACTION:</label>
                    <select id="decision-select" value={action} onChange={(e) => setAction(e.target.value as DecisionAction)}>
                      <option value="APPROVE">APPROVE / SWING CAPITAL</option>
                      <option value="HOLD">HOLD / MONITOR STATE</option>
                      <option value="REJECT">REJECT OPPORTUNITY</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label htmlFor="decision-notes">RATIONALE / METRIC TARGETS:</label>
                    <textarea
                      id="decision-notes"
                      rows={2}
                      placeholder="Write the investor's rationale..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="commit-btn">COMMIT TO LOCAL LEDGER</button>
                </form>
                <div className="decision-history">
                  <div className="history-title">RECENT COMMITTED LEDGER ENTRIES:</div>
                  <div className="history-list">
                    {ledger.length === 0 ? (
                      <div style={{ color: "#475569", fontSize: 10, padding: 4 }}>
                        Ledger is empty. No committed actions recorded.
                      </div>
                    ) : (
                      ledger.map((item) => (
                        <div className={`ledger-item ${item.action}`} key={item.id}>
                          <div className="ledger-header">
                            <span className="ledger-asset">{item.assetName}</span>
                            <span className={`ledger-action ${item.action}-text`}>{item.action}</span>
                          </div>
                          <div className="ledger-notes">&quot;{item.notes}&quot;</div>
                          <div className="ledger-timestamp">{item.timestamp}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function DebateEntry({ type, agent, text }: { type: "bull" | "bear"; agent: string; text: string }) {
  const marker = type === "bull" ? "▲" : "▼";
  return (
    <div className={`log-entry ${type}-entry`}>
      <div className="log-agent">
        {marker} <span className={`${type}-text`}>{agent}</span>
      </div>
      <div className="log-text">{text}</div>
    </div>
  );
}

function computeView(
  vertical: Vertical,
  params: AssetParameters,
  base: AssetParameters,
): { stats: Stat[]; chart: React.ReactNode } {
  if (vertical === "stocks") {
    const price = Number(params.price ?? 0);
    const eps = Number(params.eps ?? 0);
    const pe = calcPE(price, eps, params.roe);
    const baseCFs = base.cashflows ?? [];
    const baseEps = Number(base.eps ?? 1) || 1;
    const scaled = baseCFs.map((cf) => cf * (eps / baseEps));
    const dcf = calcDCF(scaled, Number(params.discountRate ?? 0.1), Number(params.terminalMult ?? 10), params.invested);
    const stats: Stat[] = [
      { label: "Implied P/E Ratio", value: `${formatNum(pe.pe, 1)}x` },
      { label: "Intrinsic Value (NPV)", value: formatNum(dcf.totalNPV, 0) },
      {
        label: "Margin of Safety",
        value: dcf.marginOfSafety != null ? `${dcf.marginOfSafety.toFixed(1)}%` : "N/A",
        tone: dcf.totalNPV > Number(params.invested ?? 0) ? "bull" : "bear",
      },
    ];
    return { stats, chart: <StocksChart cfs={scaled} discounted={dcf.discounted} /> };
  }

  if (vertical === "startups") {
    const arpu = Number(params.arpu ?? 0);
    const margin = Number(params.margin ?? 0);
    const churn = Number(params.churn ?? 0);
    const cac = Number(params.cac ?? 0);
    const cash = Number(params.cash ?? 0);
    const burn = Number(params.burn ?? 0);
    const ltv = calcLTV(arpu, margin, churn, cac);
    const cacRes = calcCAC(cac, arpu, margin);
    const rwy = calcRunway(cash, burn);
    const stats: Stat[] = [
      { label: "LTV:CAC Ratio", value: ltv.ltvCacRatio != null ? `${ltv.ltvCacRatio.toFixed(1)}x` : "N/A" },
      { label: "Payback Period", value: `${formatNum(cacRes.paybackMonths, 1)} Months` },
      {
        label: "Cash Runway",
        value: `${rwy.runwayMonths.toFixed(1)} Months`,
        tone: rwy.runwayMonths < 12 ? "bear" : rwy.runwayMonths >= 18 ? "bull" : "warning",
      },
    ];
    return { stats, chart: <StartupsChart cash={cash} burn={burn} /> };
  }

  const fixed = Number(params.fixed ?? 0);
  const price = Number(params.price ?? 0);
  const variable = Number(params.variable ?? 0);
  const invested = Number(params.invested ?? 0);
  const bep = calcBEP(fixed, price, variable);
  const y1 = bep.bepUnits * 1.5;
  const cfs = [-invested];
  for (let t = 1; t <= 5; t++) {
    const u = y1 * Math.pow(1.1, t - 1);
    cfs.push(u * price - u * variable - fixed);
  }
  const irr = calcIRR(cfs);
  const stats: Stat[] = [
    { label: "BEP Target (Volume)", value: `${formatNum(bep.bepUnits, 0)} Units` },
    { label: "BEP Revenue (Annual)", value: formatIDR(bep.bepRevenue) },
    { label: "Projected IRR (5Y)", value: `${formatNum(irr.irr, 1)}%`, tone: irr.irr > 20 ? "bull" : "bear" },
  ];
  return { stats, chart: <ConventionalChart bep={bep} /> };
}
