/**
 * Retro oscilloscope-style SVG charts, ported from the original cockpit.
 * Each renders into a 500x240 viewBox and reads computed figures only —
 * no chart library, no external deps.
 */
import type { BEPResult } from "@/lib/finance";
import { formatNum } from "@/lib/finance";

const W = 500;
const H = 240;

const CYAN = { fill: "var(--cyan-active)" } as const;
const CYAN_STROKE = { stroke: "var(--cyan-active)" } as const;

/** Equities: nominal vs discounted cash flows as paired bars. */
export function StocksChart({ cfs, discounted }: { cfs: number[]; discounted: number[] }) {
  const pad = { t: 30, r: 30, b: 40, l: 60 };
  const max = Math.max(...cfs) * 1.1 || 1;
  const sx = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / 5;
  const sy = (v: number) => H - pad.b - (v * (H - pad.t - pad.b)) / max;
  const bw = 20;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
      <Axes pad={pad} />
      {cfs.map((cf, i) => {
        const x = sx(i) + 15;
        const yNom = sy(cf);
        const yDisc = sy(discounted[i]);
        return (
          <g key={i}>
            <rect x={x} y={yNom} width={bw} height={H - pad.b - yNom} fill="#475569" opacity={0.4} />
            <rect x={x + 4} y={yDisc} width={bw - 8} height={H - pad.b - yDisc} style={CYAN} />
            <text x={x + bw / 2} y={H - pad.b + 15} className="chart-text" textAnchor="middle">
              {`Y${i + 1}`}
            </text>
          </g>
        );
      })}
      <text x={pad.l + 10} y={pad.t - 10} fontSize="8" style={CYAN}>
        NEON = DISCOUNTED CASH FLOWS | GREY = NOMINAL CASH FLOWS
      </text>
    </svg>
  );
}

/** Ventures: monthly cash depletion roadmap with a cash-out marker. */
export function StartupsChart({ cash, burn }: { cash: number; burn: number }) {
  const pad = { t: 30, r: 30, b: 40, l: 65 };
  const runway = burn > 0 ? cash / burn : 0;
  const months = Math.max(18, Math.ceil(runway * 1.2));
  const sx = (m: number) => pad.l + (m * (W - pad.l - pad.r)) / months;
  const sy = (c: number) => H - pad.b - (c * (H - pad.t - pad.b)) / (cash || 1);
  const points = Array.from({ length: months + 1 }, (_, m) => `${sx(m)},${sy(Math.max(0, cash - burn * m))}`);
  const critical = runway < 12;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
      <Axes pad={pad} />
      <path d={`M ${points.join(" L ")}`} fill="none" strokeWidth={2.5} style={{ stroke: critical ? "var(--bear-red)" : "var(--cyan-active)" }} />
      {runway <= months && (
        <g>
          <line x1={sx(runway)} y1={pad.t} x2={sx(runway)} y2={H - pad.b} strokeDasharray="4 4" style={{ stroke: "var(--bear-red)" }} />
          <text x={sx(runway) + 4} y={pad.t + 20} fontSize="8" fontWeight={700} style={{ fill: "var(--bear-red)" }}>
            {`CASH-OUT: M${runway.toFixed(1)}`}
          </text>
        </g>
      )}
      <text x={pad.l + 10} y={pad.t - 10} fontSize="8" style={CYAN}>
        MONTHLY CASH DEPLETION ROADMAP (RUNWAY STRESS-TEST)
      </text>
    </svg>
  );
}

/** Conventional: break-even crossing of revenue vs total cost. */
export function ConventionalChart({ bep }: { bep: BEPResult }) {
  const pad = { t: 30, r: 30, b: 40, l: 60 };
  const maxU = (bep.bepUnits || 1) * 2;
  const maxR = maxU * bep.price || 1;
  const sx = (u: number) => pad.l + (u * (W - pad.l - pad.r)) / maxU;
  const sy = (v: number) => H - pad.b - (v * (H - pad.t - pad.b)) / maxR;
  const xb = sx(bep.bepUnits);
  const yb = sy(bep.bepRevenue);

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
      <Axes pad={pad} />
      <line x1={sx(0)} y1={sy(bep.fixed)} x2={sx(maxU)} y2={sy(bep.fixed + bep.variable * maxU)} strokeWidth={2} style={{ stroke: "var(--bear-red)" }} />
      <line x1={sx(0)} y1={sy(0)} x2={sx(maxU)} y2={sy(maxR)} strokeWidth={2} style={{ stroke: "var(--bull-green)" }} />
      <line x1={xb} y1={yb} x2={xb} y2={H - pad.b} strokeDasharray="2 2" stroke="#555" />
      <line x1={pad.l} y1={yb} x2={xb} y2={yb} strokeDasharray="2 2" stroke="#555" />
      <circle cx={xb} cy={yb} r={5} style={{ fill: "var(--yellow-caution)" }} />
      <text x={xb} y={H - pad.b + 15} className="chart-text" textAnchor="middle">
        {`${formatNum(bep.bepUnits, 0)} Units (BEP)`}
      </text>
      <text x={pad.l + 10} y={pad.t - 10} fontSize="8" style={{ fill: "var(--yellow-caution)" }}>
        BREAK-EVEN CROSSING (GREEN = REVENUE | RED = TOTAL COST)
      </text>
    </svg>
  );
}

function Axes({ pad }: { pad: { t: number; r: number; b: number; l: number } }) {
  return (
    <>
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} className="chart-axis-line" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} className="chart-axis-line" />
    </>
  );
}
