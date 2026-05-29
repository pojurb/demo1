#!/usr/bin/env node
/**
 * financial_calc.js — FR-02: Python Sandbox (JS Implementation)
 * Project Living Thesis | Quantitative Finance Engine
 *
 * Usage:
 *   node financial_calc.js --mode=bep --fixed=500000000 --price=150000 --variable=80000
 *   node financial_calc.js --mode=irr --cashflows="-550000000,100000000,150000000,180000000,200000000"
 *   node financial_calc.js --mode=ltv --arpu=150000 --margin=0.65 --churn=0.03
 *   node financial_calc.js --mode=cac --cac=450000 --arpu=150000 --margin=0.65
 *   node financial_calc.js --mode=runway --cash=3000000000 --burn=200000000
 *   node financial_calc.js --mode=moic --exit=5000000000 --invested=1000000000
 *   node financial_calc.js --mode=pe --price=9200 --eps=680
 *   node financial_calc.js --mode=dcf --cashflows="100000000,120000000,144000000,173000000,207000000" --rate=0.15 --terminal=10
 */

'use strict';

// ─── Parse CLI Arguments ──────────────────────────────────────────────────────
const args = {};
process.argv.slice(2).forEach(arg => {
  const match = arg.match(/^--([^=]+)=(.+)$/);
  if (match) args[match[1]] = match[2];
});

const mode = args.mode;

// ─── Utility Functions ────────────────────────────────────────────────────────

function formatIDR(value) {
  if (Math.abs(value) >= 1e12) return `IDR ${(value / 1e12).toFixed(2)}T`;
  if (Math.abs(value) >= 1e9)  return `IDR ${(value / 1e9).toFixed(2)}B`;
  if (Math.abs(value) >= 1e6)  return `IDR ${(value / 1e6).toFixed(2)}M`;
  return `IDR ${value.toLocaleString('id-ID')}`;
}

function formatNum(value, decimals = 2) {
  return Number(value).toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function printResult(title, data, notes = []) {
  console.log('\n' + '═'.repeat(55));
  console.log(`  ${title}`);
  console.log('═'.repeat(55));
  Object.entries(data).forEach(([k, v]) => {
    console.log(`  ${k.padEnd(28)} ${v}`);
  });
  if (notes.length > 0) {
    console.log('─'.repeat(55));
    notes.forEach(n => console.log(`  ℹ️  ${n}`));
  }
  console.log('═'.repeat(55));

  // Also output JSON for AI to consume
  console.log('\n[JSON_OUTPUT]');
  console.log(JSON.stringify({ mode, inputs: args, results: data, notes, timestamp: new Date().toISOString() }, null, 2));
}

// ─── MODE: Break-Even Point ───────────────────────────────────────────────────
function calcBEP() {
  const fixed    = parseFloat(args.fixed);
  const price    = parseFloat(args.price);
  const variable = parseFloat(args.variable);

  if (isNaN(fixed) || isNaN(price) || isNaN(variable)) {
    console.error('ERROR: BEP requires --fixed, --price, --variable');
    process.exit(1);
  }

  const contribution = price - variable;
  const bepUnits     = fixed / contribution;
  const bepRevenue   = bepUnits * price;
  const marginPct    = (contribution / price) * 100;

  printResult('BREAK-EVEN POINT ANALYSIS', {
    'Fixed Costs':              formatIDR(fixed),
    'Selling Price / Unit':     formatIDR(price),
    'Variable Cost / Unit':     formatIDR(variable),
    'Contribution Margin/Unit': formatIDR(contribution),
    'Contribution Margin %':    `${marginPct.toFixed(1)}%`,
    '─────────────────────────────': '─────────────────',
    'BEP (Units)':              `${formatNum(bepUnits, 0)} units`,
    'BEP (Revenue)':            formatIDR(bepRevenue),
  }, [
    'Sell MORE than BEP units = profit zone',
    `Every unit above BEP generates ${formatIDR(contribution)} net profit`,
  ]);
}

// ─── MODE: IRR ────────────────────────────────────────────────────────────────
function calcIRR() {
  if (!args.cashflows) {
    console.error('ERROR: IRR requires --cashflows="-1000,200,300,400,500"');
    process.exit(1);
  }

  const cashflows = args.cashflows.split(',').map(Number);

  // Newton-Raphson IRR solver
  function npv(rate, cfs) {
    return cfs.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
  }

  function npvDerivative(rate, cfs) {
    return cfs.reduce((sum, cf, t) => sum - (t * cf) / Math.pow(1 + rate, t + 1), 0);
  }

  let rate = 0.1; // initial guess
  let iterations = 0;
  const MAX_ITER = 1000;
  const TOLERANCE = 1e-7;

  while (iterations < MAX_ITER) {
    const f  = npv(rate, cashflows);
    const df = npvDerivative(rate, cashflows);
    if (Math.abs(df) < 1e-12) break;
    const newRate = rate - f / df;
    if (Math.abs(newRate - rate) < TOLERANCE) {
      rate = newRate;
      break;
    }
    rate = newRate;
    iterations++;
  }

  const irrPct       = rate * 100;
  const totalInvested = Math.abs(cashflows[0]);
  const totalReturns  = cashflows.slice(1).reduce((a, b) => a + b, 0);
  const npvAt15       = npv(0.15, cashflows);

  printResult('INTERNAL RATE OF RETURN (IRR)', {
    'Cash Flows':        cashflows.map(formatIDR).join(' → '),
    'Period Count':      `${cashflows.length - 1} periods`,
    'Total Invested':    formatIDR(totalInvested),
    'Total Returns':     formatIDR(totalReturns),
    '─────────────────────────────': '─────────────────',
    'IRR':               `${irrPct.toFixed(2)}%`,
    'NPV @ 15% Hurdle':  formatIDR(npvAt15),
    'Verdict':           irrPct > 20 ? '✅ ABOVE 20% threshold' : irrPct > 15 ? '⚠️  Marginal (15-20%)' : '❌ BELOW 15% hurdle',
  }, [
    'IRR > 20% considered strong for conventional business in Indonesia',
    'Compare against risk-free rate (SUN ~6-7%) + risk premium',
  ]);
}

// ─── MODE: LTV ────────────────────────────────────────────────────────────────
function calcLTV() {
  const arpu   = parseFloat(args.arpu);
  const margin = parseFloat(args.margin);
  const churn  = parseFloat(args.churn);

  if (isNaN(arpu) || isNaN(margin) || isNaN(churn)) {
    console.error('ERROR: LTV requires --arpu, --margin (0-1), --churn (0-1)');
    process.exit(1);
  }

  const avgLifetime = 1 / churn;           // months
  const ltv         = arpu * margin * avgLifetime;
  const cac         = parseFloat(args.cac) || null;
  const ltvCacRatio = cac ? ltv / cac : null;

  const resultData = {
    'ARPU (Monthly)':      formatIDR(arpu),
    'Gross Margin':        `${(margin * 100).toFixed(1)}%`,
    'Monthly Churn Rate':  `${(churn * 100).toFixed(1)}%`,
    'Avg Customer Lifetime': `${formatNum(avgLifetime, 1)} months`,
    '─────────────────────────────': '─────────────────',
    'LTV':                 formatIDR(ltv),
  };

  if (cac && ltvCacRatio) {
    resultData['CAC (Provided)']  = formatIDR(cac);
    resultData['LTV:CAC Ratio']   = `${ltvCacRatio.toFixed(1)}x`;
    resultData['Verdict LTV:CAC'] = ltvCacRatio >= 5 ? '✅ STRONG (≥5x)' : ltvCacRatio >= 3 ? '⚠️  HEALTHY (3-5x)' : '❌ WEAK (<3x)';
  }

  printResult('LIFETIME VALUE (LTV) ANALYSIS', resultData, [
    'LTV:CAC > 3x = healthy, > 5x = strong, < 1x = business model broken',
    'Churn has exponential impact — reducing churn by 1% often doubles LTV',
  ]);
}

// ─── MODE: CAC Payback ────────────────────────────────────────────────────────
function calcCAC() {
  const cac    = parseFloat(args.cac);
  const arpu   = parseFloat(args.arpu);
  const margin = parseFloat(args.margin);

  if (isNaN(cac) || isNaN(arpu) || isNaN(margin)) {
    console.error('ERROR: CAC requires --cac, --arpu, --margin (0-1)');
    process.exit(1);
  }

  const monthlyContrib = arpu * margin;
  const paybackMonths  = cac / monthlyContrib;
  const paybackYears   = paybackMonths / 12;

  printResult('CAC PAYBACK PERIOD', {
    'Customer Acquisition Cost': formatIDR(cac),
    'ARPU (Monthly)':           formatIDR(arpu),
    'Gross Margin':             `${(margin * 100).toFixed(1)}%`,
    'Monthly Contribution':     formatIDR(monthlyContrib),
    '─────────────────────────────': '─────────────────',
    'Payback Period':           `${formatNum(paybackMonths, 1)} months (${formatNum(paybackYears, 1)} years)`,
    'Verdict':                  paybackMonths <= 12 ? '✅ STRONG (≤12 months)' : paybackMonths <= 18 ? '⚠️  ACCEPTABLE (12-18 months)' : '❌ TOO LONG (>18 months)',
  }, [
    'SaaS benchmark: < 12 months payback is healthy',
    'For marketplace/consumer: < 6 months is excellent',
  ]);
}

// ─── MODE: Runway ────────────────────────────────────────────────────────────
function calcRunway() {
  const cash = parseFloat(args.cash);
  const burn = parseFloat(args.burn);

  if (isNaN(cash) || isNaN(burn)) {
    console.error('ERROR: Runway requires --cash, --burn (monthly)');
    process.exit(1);
  }

  const runwayMonths = cash / burn;
  const safeDate     = new Date();
  safeDate.setMonth(safeDate.getMonth() + Math.floor(runwayMonths));

  printResult('CASH RUNWAY', {
    'Current Cash Balance':   formatIDR(cash),
    'Monthly Burn Rate':      formatIDR(burn),
    '─────────────────────────────': '─────────────────',
    'Runway':                 `${formatNum(runwayMonths, 1)} months`,
    'Cash-Out Date (est.)':   safeDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' }),
    'Verdict':                runwayMonths >= 18 ? '✅ SAFE (≥18 months)' : runwayMonths >= 12 ? '⚠️  WATCH (12-18 months)' : '🚨 CRITICAL (<12 months)',
  }, [
    '18+ months runway = safe zone for fundraising',
    'Start next fundraise when you have 12 months of runway left',
    `Reduce burn by 20% → extends runway to ${formatNum(cash / (burn * 0.8), 1)} months`,
  ]);
}

// ─── MODE: MOIC ──────────────────────────────────────────────────────────────
function calcMOIC() {
  const exit     = parseFloat(args.exit);
  const invested = parseFloat(args.invested);
  const years    = parseFloat(args.years) || null;

  if (isNaN(exit) || isNaN(invested)) {
    console.error('ERROR: MOIC requires --exit, --invested. Optional: --years');
    process.exit(1);
  }

  const moic = exit / invested;

  const resultData = {
    'Exit Value':       formatIDR(exit),
    'Invested Capital': formatIDR(invested),
    '─────────────────────────────': '─────────────────',
    'MOIC':             `${moic.toFixed(2)}x`,
  };

  if (years) {
    // Convert MOIC to IRR equivalent
    const irr = (Math.pow(moic, 1 / years) - 1) * 100;
    resultData['Hold Period']    = `${years} years`;
    resultData['Implied IRR']    = `${irr.toFixed(1)}%`;
    resultData['Verdict']        = moic >= 3 ? '✅ STRONG (≥3x)' : moic >= 2 ? '⚠️  OK (2-3x)' : '❌ WEAK (<2x)';
  }

  printResult('MULTIPLE ON INVESTED CAPITAL (MOIC)', resultData, [
    'VC benchmark: 3x+ MOIC in 5-7 years is good; 10x+ is exceptional',
    'PE/Real Estate: 2x+ in 3-5 years is typical target',
  ]);
}

// ─── MODE: P/E Ratio ─────────────────────────────────────────────────────────
function calcPE() {
  const price = parseFloat(args.price);
  const eps   = parseFloat(args.eps);
  const pb    = parseFloat(args.pb)  || null;
  const roe   = parseFloat(args.roe) || null;

  if (isNaN(price) || isNaN(eps)) {
    console.error('ERROR: PE requires --price, --eps. Optional: --pb, --roe');
    process.exit(1);
  }

  const pe          = price / eps;
  const earningsYield = (1 / pe) * 100;

  const resultData = {
    'Share Price':       `IDR ${formatNum(price, 0)}`,
    'EPS':              `IDR ${formatNum(eps, 0)}`,
    '─────────────────────────────': '─────────────────',
    'P/E Ratio':         `${pe.toFixed(1)}x`,
    'Earnings Yield':    `${earningsYield.toFixed(1)}%`,
  };

  if (pb) resultData['P/B Ratio'] = `${parseFloat(pb).toFixed(1)}x`;
  if (roe) {
    const peg = pe / parseFloat(roe);
    resultData['ROE'] = `${parseFloat(roe).toFixed(1)}%`;
    resultData['P/E to ROE'] = `${peg.toFixed(1)}x`;
  }

  // IHSG context
  resultData['vs. IHSG avg (13-15x)'] = pe < 13 ? '✅ DISCOUNT to market' : pe <= 15 ? '⚠️  AT market multiple' : '❌ PREMIUM to market';

  printResult('PRICE-TO-EARNINGS (P/E) ANALYSIS', resultData, [
    'IHSG average P/E: ~13-15x historically',
    'Banking sector (BBCA, BBRI): premium warranted at 15-20x due to ROE',
    'P/E alone is insufficient — always check earnings growth trend',
  ]);
}

// ─── MODE: DCF ────────────────────────────────────────────────────────────────
function calcDCF() {
  if (!args.cashflows) {
    console.error('ERROR: DCF requires --cashflows="cf1,cf2,...", --rate=0.15, --terminal=10');
    process.exit(1);
  }

  const cashflows    = args.cashflows.split(',').map(Number);
  const rate         = parseFloat(args.rate)     || 0.15;
  const terminalMult = parseFloat(args.terminal) || 10;
  const invested     = parseFloat(args.invested) || null;

  const discounted = cashflows.map((cf, t) => cf / Math.pow(1 + rate, t + 1));
  const pvSum      = discounted.reduce((a, b) => a + b, 0);
  const lastCF     = cashflows[cashflows.length - 1];
  const terminalVal = (lastCF * terminalMult) / Math.pow(1 + rate, cashflows.length);
  const totalNPV   = pvSum + terminalVal;

  const resultData = {
    'Discount Rate':     `${(rate * 100).toFixed(1)}%`,
    'Terminal Multiple': `${terminalMult}x last cash flow`,
    'Projected CFs':     cashflows.map(formatIDR).join(', '),
    '─────────────────────────────': '─────────────────',
    'PV of Cash Flows':  formatIDR(pvSum),
    'Terminal Value (PV)': formatIDR(terminalVal),
    'Total NPV':         formatIDR(totalNPV),
  };

  if (invested) {
    resultData['Invested Capital'] = formatIDR(invested);
    resultData['Margin of Safety'] = `${(((totalNPV - invested) / totalNPV) * 100).toFixed(1)}%`;
    resultData['Verdict'] = totalNPV > invested ? `✅ NPV POSITIVE (+${formatIDR(totalNPV - invested)})` : `❌ NPV NEGATIVE (${formatIDR(totalNPV - invested)})`;
  }

  printResult('DISCOUNTED CASH FLOW (DCF)', resultData, [
    `Each future cash flow discounted at ${(rate * 100).toFixed(0)}% hurdle rate`,
    'Terminal value often represents 60-80% of total DCF — be conservative',
    'Margin of Safety > 30% recommended before entering position',
  ]);
}

// ─── DISPATCH ─────────────────────────────────────────────────────────────────
const modes = { bep: calcBEP, irr: calcIRR, ltv: calcLTV, cac: calcCAC,
                runway: calcRunway, moic: calcMOIC, pe: calcPE, dcf: calcDCF };

if (!mode || !modes[mode]) {
  console.error(`ERROR: Unknown mode "${mode}". Valid: ${Object.keys(modes).join(', ')}`);
  console.error('Run: .\\scripts\\run.ps1 help');
  process.exit(1);
}

modes[mode]();
