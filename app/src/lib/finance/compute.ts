/**
 * Bridges the deterministic engine to the domain `ComputedMetrics` shape — the
 * single, serializable "locked facts" object used by both the UI (stat boxes) and
 * the AI grounding prompt. Pure (no JSX) so it can be stored and reused.
 */
import { calcPE, calcDCF, calcLTV, calcCAC, calcRunway, calcBEP, calcIRR, formatIDR, formatNum } from "./index";
import type { Vertical, AssetParameters } from "@/data/presets";
import type { ComputedMetrics, Metric } from "@/lib/domain/types";

export function computeMetrics(vertical: Vertical, params: AssetParameters): ComputedMetrics {
  let metrics: Metric[];

  if (vertical === "stocks") {
    const pe = calcPE(Number(params.price ?? 0), Number(params.eps ?? 0), params.roe);
    const dcf = calcDCF(
      params.cashflows ?? [],
      Number(params.discountRate ?? 0.1),
      Number(params.terminalMult ?? 10),
      params.invested,
    );
    metrics = [
      { key: "pe", label: "Implied P/E Ratio", value: pe.pe, display: `${formatNum(pe.pe, 1)}x`, verdict: pe.verdict },
      { key: "npv", label: "Intrinsic Value (NPV)", value: dcf.totalNPV, display: formatNum(dcf.totalNPV, 0) },
      {
        key: "mos",
        label: "Margin of Safety",
        value: dcf.marginOfSafety ?? 0,
        display: dcf.marginOfSafety != null ? `${dcf.marginOfSafety.toFixed(1)}%` : "N/A",
        verdict: dcf.verdict ?? undefined,
      },
    ];
  } else if (vertical === "startups") {
    const arpu = Number(params.arpu ?? 0);
    const margin = Number(params.margin ?? 0);
    const cac = Number(params.cac ?? 0);
    const ltv = calcLTV(arpu, margin, Number(params.churn ?? 0), cac);
    const cacRes = calcCAC(cac, arpu, margin);
    const rwy = calcRunway(Number(params.cash ?? 0), Number(params.burn ?? 0));
    metrics = [
      {
        key: "ltvcac",
        label: "LTV:CAC Ratio",
        value: ltv.ltvCacRatio ?? 0,
        display: ltv.ltvCacRatio != null ? `${ltv.ltvCacRatio.toFixed(1)}x` : "N/A",
        verdict: ltv.verdict ?? undefined,
      },
      { key: "payback", label: "CAC Payback", value: cacRes.paybackMonths, display: `${formatNum(cacRes.paybackMonths, 1)} mo`, verdict: cacRes.verdict },
      { key: "runway", label: "Cash Runway", value: rwy.runwayMonths, display: `${rwy.runwayMonths.toFixed(1)} mo`, verdict: rwy.verdict },
    ];
  } else {
    const bep = calcBEP(Number(params.fixed ?? 0), Number(params.price ?? 0), Number(params.variable ?? 0));
    const irr = calcIRR(conventionalCashflows(params, bep.bepUnits));
    metrics = [
      { key: "bepUnits", label: "BEP Target (Volume)", value: bep.bepUnits, display: `${formatNum(bep.bepUnits, 0)} Units` },
      { key: "bepRevenue", label: "BEP Revenue (Annual)", value: bep.bepRevenue, display: formatIDR(bep.bepRevenue) },
      { key: "irr", label: "Projected IRR (5Y)", value: irr.irr, display: `${formatNum(irr.irr, 1)}%`, verdict: irr.verdict },
    ];
  }

  return { vertical, metrics };
}

/** Simple 5-year projection used for the conventional IRR (year-1 = 1.5x BEP, +10% YoY). */
export function conventionalCashflows(params: AssetParameters, bepUnits: number): number[] {
  const price = Number(params.price ?? 0);
  const variable = Number(params.variable ?? 0);
  const fixed = Number(params.fixed ?? 0);
  const y1 = bepUnits * 1.5;
  const cfs = [-Number(params.invested ?? 0)];
  for (let t = 1; t <= 5; t++) {
    const u = y1 * Math.pow(1.1, t - 1);
    cfs.push(u * price - u * variable - fixed);
  }
  return cfs;
}

/** Compact one-line grounding summary used when composing multiple analyses. */
export function summarizeMetrics(m: ComputedMetrics): string {
  return m.metrics.map((x) => `${x.label} ${x.display}${x.verdict ? ` (${x.verdict})` : ""}`).join(", ");
}
