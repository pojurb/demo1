#!/usr/bin/env node
/**
 * options_pricing.js — Black-Scholes Options Pricing Engine
 * Project Living Thesis | FR-02: Quantitative Sandbox
 *
 * Usage:
 *   node options_pricing.js --S=9200 --K=9500 --T=0.25 --r=0.06 --sigma=0.25
 *
 * Parameters:
 *   --S      = Current stock price (spot price)
 *   --K      = Strike price
 *   --T      = Time to expiry in YEARS (e.g., 0.25 = 3 months, 1.0 = 1 year)
 *   --r      = Risk-free rate (e.g., 0.06 for 6%)
 *   --sigma  = Implied volatility (e.g., 0.25 for 25%)
 *   --type   = "call" | "put" | "both" (default: both)
 *   --qty    = Number of contracts (optional, for P&L calc)
 *   --paid   = Premium actually paid (optional, for breakeven calc)
 */

'use strict';

// ─── Parse CLI Arguments ──────────────────────────────────────────────────────
const args = {};
process.argv.slice(2).forEach(arg => {
  const match = arg.match(/^--([^=]+)=(.+)$/);
  if (match) args[match[1]] = match[2];
});

// ─── Validate Inputs ──────────────────────────────────────────────────────────
const S     = parseFloat(args.S);
const K     = parseFloat(args.K);
const T     = parseFloat(args.T);
const r     = parseFloat(args.r);
const sigma = parseFloat(args.sigma);
const type  = args.type || 'both';
const qty   = parseFloat(args.qty)  || 1;
const paid  = parseFloat(args.paid) || null;

if ([S, K, T, r, sigma].some(isNaN)) {
  console.error('ERROR: Options pricing requires: --S, --K, --T, --r, --sigma');
  console.error('Example: node options_pricing.js --S=9200 --K=9500 --T=0.25 --r=0.06 --sigma=0.25');
  process.exit(1);
}

// ─── Standard Normal Distribution ────────────────────────────────────────────
function cdf(x) {
  // Abramowitz & Stegun approximation (error < 7.5e-8)
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

function pdf(x) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// ─── Black-Scholes Core ───────────────────────────────────────────────────────
function blackScholes(S, K, T, r, sigma) {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const callPrice = S * cdf(d1) - K * Math.exp(-r * T) * cdf(d2);
  const putPrice  = K * Math.exp(-r * T) * cdf(-d2) - S * cdf(-d1);

  // Greeks
  const sqrtT = Math.sqrt(T);
  const expRT = Math.exp(-r * T);

  const delta_call =  cdf(d1);
  const delta_put  =  cdf(d1) - 1;

  const gamma      =  pdf(d1) / (S * sigma * sqrtT);

  const theta_call = -(S * pdf(d1) * sigma / (2 * sqrtT)) - r * K * expRT * cdf(d2);
  const theta_put  = -(S * pdf(d1) * sigma / (2 * sqrtT)) + r * K * expRT * cdf(-d2);
  // Convert theta to per-day
  const theta_call_daily = theta_call / 365;
  const theta_put_daily  = theta_put  / 365;

  const vega       =  S * pdf(d1) * sqrtT / 100; // per 1% vol move

  const rho_call   =  K * T * expRT * cdf(d2)  / 100; // per 1% rate move
  const rho_put    = -K * T * expRT * cdf(-d2) / 100;

  return {
    d1, d2,
    callPrice, putPrice,
    delta_call, delta_put,
    gamma,
    theta_call_daily, theta_put_daily,
    vega,
    rho_call, rho_put
  };
}

// ─── Calculate ────────────────────────────────────────────────────────────────
const bs = blackScholes(S, K, T, r, sigma);
const moneyness = S > K ? 'IN THE MONEY (ITM)' : S < K ? 'OUT OF THE MONEY (OTM)' : 'AT THE MONEY (ATM)';

// ─── Format helpers ───────────────────────────────────────────────────────────
const f = (n, d = 2) => Number(n).toFixed(d);
const pct = (n, d = 2) => (Number(n) * 100).toFixed(d) + '%';

// ─── Print Results ────────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(60));
console.log('  BLACK-SCHOLES OPTIONS PRICING ENGINE');
console.log('  Project Living Thesis | FR-02 Quantitative Sandbox');
console.log('═'.repeat(60));
console.log(`\n  INPUT PARAMETERS`);
console.log(`  ${'Spot Price (S):'.padEnd(25)} IDR ${S.toLocaleString('id-ID')}`);
console.log(`  ${'Strike Price (K):'.padEnd(25)} IDR ${K.toLocaleString('id-ID')}`);
console.log(`  ${'Time to Expiry (T):'.padEnd(25)} ${T} years (${Math.round(T * 365)} days)`);
console.log(`  ${'Risk-Free Rate (r):'.padEnd(25)} ${pct(r)}`);
console.log(`  ${'Implied Volatility:'.padEnd(25)} ${pct(sigma)}`);
console.log(`  ${'Moneyness:'.padEnd(25)} ${moneyness}`);

if (type === 'both' || type === 'call') {
  console.log('\n' + '─'.repeat(60));
  console.log('  📈 CALL OPTION');
  console.log('─'.repeat(60));
  console.log(`  ${'Theoretical Price:'.padEnd(25)} IDR ${f(bs.callPrice)}`);
  console.log(`  ${'Delta (Δ):'.padEnd(25)} ${f(bs.delta_call, 4)} (${pct(bs.delta_call)} prob ITM)`);
  console.log(`  ${'Gamma (Γ):'.padEnd(25)} ${f(bs.gamma, 6)}`);
  console.log(`  ${'Theta (Θ) per day:'.padEnd(25)} IDR ${f(bs.theta_call_daily)} (time decay)`);
  console.log(`  ${'Vega (V) per 1% vol:'.padEnd(25)} IDR ${f(bs.vega)}`);
  console.log(`  ${'Rho (ρ) per 1% rate:'.padEnd(25)} IDR ${f(bs.rho_call)}`);

  const callBreakeven = K + bs.callPrice;
  console.log(`  ${'Breakeven at Expiry:'.padEnd(25)} IDR ${callBreakeven.toLocaleString('id-ID')} (${f(((callBreakeven - S) / S) * 100)}% upside needed)`);

  if (paid) {
    const actualBreakeven = K + paid;
    console.log(`  ${'Breakeven (actual paid):'.padEnd(25)} IDR ${actualBreakeven.toLocaleString('id-ID')}`);
    const pnl = (bs.callPrice - paid) * qty;
    console.log(`  ${'Mark-to-Market P&L:'.padEnd(25)} IDR ${pnl.toLocaleString('id-ID', {minimumFractionDigits: 2})}`);
  }
}

if (type === 'both' || type === 'put') {
  console.log('\n' + '─'.repeat(60));
  console.log('  📉 PUT OPTION');
  console.log('─'.repeat(60));
  console.log(`  ${'Theoretical Price:'.padEnd(25)} IDR ${f(bs.putPrice)}`);
  console.log(`  ${'Delta (Δ):'.padEnd(25)} ${f(bs.delta_put, 4)} (${pct(Math.abs(bs.delta_put))} prob ITM)`);
  console.log(`  ${'Gamma (Γ):'.padEnd(25)} ${f(bs.gamma, 6)}`);
  console.log(`  ${'Theta (Θ) per day:'.padEnd(25)} IDR ${f(bs.theta_put_daily)} (time decay)`);
  console.log(`  ${'Vega (V) per 1% vol:'.padEnd(25)} IDR ${f(bs.vega)}`);
  console.log(`  ${'Rho (ρ) per 1% rate:'.padEnd(25)} IDR ${f(bs.rho_put)}`);

  const putBreakeven = K - bs.putPrice;
  console.log(`  ${'Breakeven at Expiry:'.padEnd(25)} IDR ${putBreakeven.toLocaleString('id-ID')} (${f(((S - putBreakeven) / S) * 100)}% downside needed)`);
}

// Put-Call Parity check
const pcp = bs.callPrice - bs.putPrice - (S - K * Math.exp(-r * T));
console.log('\n' + '─'.repeat(60));
console.log('  PUT-CALL PARITY CHECK');
console.log('─'.repeat(60));
console.log(`  ${'C - P - (S - Ke^-rT):'.padEnd(25)} ${f(pcp)} (should be ~0)`);
console.log(`  ${'d1:'.padEnd(25)} ${f(bs.d1, 6)}`);
console.log(`  ${'d2:'.padEnd(25)} ${f(bs.d2, 6)}`);

console.log('\n' + '═'.repeat(60));
console.log('  ⚠️  This is a theoretical model. Market prices may differ');
console.log('  due to liquidity, supply/demand, and market microstructure.');
console.log('═'.repeat(60));

// JSON output for AI consumption
const jsonOutput = {
  mode: 'options',
  inputs: { S, K, T, r, sigma },
  call: { price: bs.callPrice, delta: bs.delta_call, gamma: bs.gamma, theta_daily: bs.theta_call_daily, vega: bs.vega, rho: bs.rho_call },
  put:  { price: bs.putPrice,  delta: bs.delta_put,  gamma: bs.gamma, theta_daily: bs.theta_put_daily,  vega: bs.vega, rho: bs.rho_put  },
  moneyness,
  d1: bs.d1,
  d2: bs.d2,
  timestamp: new Date().toISOString()
};

console.log('\n[JSON_OUTPUT]');
console.log(JSON.stringify(jsonOutput, null, 2));
