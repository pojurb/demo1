#!/usr/bin/env node
/**
 * parse_inputs.js — Data Ingestion Engine
 * Project Living Thesis | Tri-Vertical Input Parser
 *
 * Usage:
 *   node parse_inputs.js --vertical=stocks
 *   node parse_inputs.js --vertical=startups
 *   node parse_inputs.js --vertical=conventional_biz
 *   node parse_inputs.js --vertical=stocks --ticker=BBCA
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────
const args = {};
process.argv.slice(2).forEach(arg => {
  const match = arg.match(/^--([^=]+)=(.+)$/);
  if (match) args[match[1]] = match[2];
});

const VERTICAL = args.vertical;
const TICKER   = args.ticker || null;

// Resolve paths relative to project root (2 levels up from scripts/ingestion/)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const INPUT_DIR    = path.join(PROJECT_ROOT, 'inputs', VERTICAL || '');
const OUTPUT_DIR   = path.join(PROJECT_ROOT, 'data');

// ─── Validators ───────────────────────────────────────────────────────────────
const VALID_VERTICALS = ['stocks', 'startups', 'conventional_biz'];

if (!VERTICAL || !VALID_VERTICALS.includes(VERTICAL)) {
  console.error(`ERROR: --vertical must be one of: ${VALID_VERTICALS.join(', ')}`);
  process.exit(1);
}

if (!fs.existsSync(INPUT_DIR)) {
  console.error(`ERROR: Input directory not found: ${INPUT_DIR}`);
  process.exit(1);
}

// ─── Utility Functions ────────────────────────────────────────────────────────
function parseCSV(content) {
  const lines = content.trim().split('\n').filter(l => l.trim() && !l.startsWith('#'));
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      const val = values[i] || '';
      // Try to parse as number
      const num = parseFloat(val.replace(/[^\d.-]/g, ''));
      obj[h] = !isNaN(num) && val !== '' ? num : val;
    });
    return obj;
  });
}

function extractKeyMetrics_Stocks(rows) {
  if (!rows.length) return {};
  const latest = rows[0]; // assume newest first
  const prev   = rows[1] || {};

  const revenueGrowth = prev.revenue
    ? ((latest.revenue - prev.revenue) / Math.abs(prev.revenue) * 100).toFixed(1) + '%'
    : 'N/A';

  const netMargin = latest.revenue && latest.net_income
    ? ((latest.net_income / latest.revenue) * 100).toFixed(1) + '%'
    : 'N/A';

  const fcf = (latest.operating_cashflow && latest.capex)
    ? latest.operating_cashflow - Math.abs(latest.capex)
    : null;

  const roe = (latest.net_income && latest.total_equity)
    ? ((latest.net_income / latest.total_equity) * 100).toFixed(1) + '%'
    : 'N/A';

  const debtEquity = (latest.total_debt && latest.total_equity)
    ? (latest.total_debt / latest.total_equity).toFixed(2) + 'x'
    : 'N/A';

  return {
    period:        latest.period || 'N/A',
    revenue:       latest.revenue || 'N/A',
    net_income:    latest.net_income || 'N/A',
    eps:           latest.eps || 'N/A',
    revenue_growth: revenueGrowth,
    net_margin:    netMargin,
    roe,
    debt_equity:   debtEquity,
    free_cashflow: fcf,
    total_assets:  latest.total_assets || 'N/A',
  };
}

function extractKeyMetrics_Startups(rows) {
  if (!rows.length) return {};
  // Sort by month ascending
  const sorted   = [...rows].sort((a, b) => String(a.month).localeCompare(String(b.month)));
  const latest   = sorted[sorted.length - 1] || {};
  const prev     = sorted[sorted.length - 2] || {};
  const oldest   = sorted[0] || {};

  const momGrowth = (prev.mrr && latest.mrr)
    ? ((latest.mrr - prev.mrr) / Math.abs(prev.mrr) * 100).toFixed(1) + '%'
    : 'N/A';

  const churnRate = (latest.churned_customers && latest.total_customers)
    ? ((latest.churned_customers / latest.total_customers) * 100).toFixed(1) + '%'
    : 'N/A';

  const runway = (latest.cash_balance && latest.monthly_burn)
    ? (latest.cash_balance / latest.monthly_burn).toFixed(1) + ' months'
    : 'N/A';

  const ltv = (latest.arpu && latest.gross_margin_pct && latest.churned_customers && latest.total_customers)
    ? latest.arpu * latest.gross_margin_pct / (latest.churned_customers / latest.total_customers)
    : null;

  const ltvCac = (ltv && latest.cac) ? (ltv / latest.cac).toFixed(2) + 'x' : 'N/A';

  const burnMultiple = (latest.monthly_burn && latest.mrr && prev.mrr)
    ? (latest.monthly_burn / (latest.mrr - (prev.mrr || 0))).toFixed(2) + 'x'
    : 'N/A';

  return {
    as_of:          latest.month,
    mrr:            latest.mrr,
    total_customers: latest.total_customers,
    arpu:           latest.arpu,
    cac:            latest.cac,
    monthly_burn:   latest.monthly_burn,
    cash_balance:   latest.cash_balance,
    mom_growth:     momGrowth,
    churn_rate:     churnRate,
    runway,
    ltv_cac_ratio:  ltvCac,
    burn_multiple:  burnMultiple,
    data_periods:   sorted.length,
  };
}

function extractKeyMetrics_ConvBiz(rows) {
  if (!rows.length) return {};

  const capex = rows.filter(r => String(r.type).toUpperCase() === 'CAPEX');
  const opex  = rows.filter(r => String(r.type).toUpperCase() === 'OPEX');

  const totalCapex = capex.reduce((sum, r) => {
    return sum + (String(r.frequency).toLowerCase() === 'once' ? (r.amount_idr || 0) : 0);
  }, 0);

  const monthlyFixedOpex = opex.reduce((sum, r) => {
    return sum + (String(r.frequency).toLowerCase() === 'monthly' ? (r.amount_idr || 0) : 0);
  }, 0);

  const categories = [...new Set(rows.map(r => r.category).filter(Boolean))];

  return {
    total_capex:        totalCapex,
    monthly_fixed_opex: monthlyFixedOpex,
    capex_line_items:   capex.length,
    opex_line_items:    opex.length,
    categories:         categories.join(', '),
    note: 'Variable OpEx (COGS) excluded — depends on revenue. Run BEP calc for breakeven analysis.',
  };
}

// ─── Main Scan ────────────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(60));
console.log(`  INGESTION ENGINE — ${VERTICAL.toUpperCase()}`);
console.log(`  Project Living Thesis`);
console.log('═'.repeat(60));
console.log(`  Scanning: ${INPUT_DIR}\n`);

const files = fs.readdirSync(INPUT_DIR).filter(f => {
  const ext = path.extname(f).toLowerCase();
  const notReadme = !f.toLowerCase().includes('readme');
  const tickerMatch = TICKER ? f.toLowerCase().startsWith(TICKER.toLowerCase()) : true;
  return ['.csv', '.txt', '.md'].includes(ext) && notReadme && tickerMatch;
});

if (files.length === 0) {
  console.log(`  ⚠️  No data files found in inputs/${VERTICAL}/`);
  console.log(`  Drop CSV or markdown files there, then re-run.`);
  console.log(`  See: inputs/${VERTICAL}/README.md for format guidance.\n`);
  process.exit(0);
}

console.log(`  Found ${files.length} file(s):\n`);

const allParsed = {};

files.forEach(filename => {
  const filePath = path.join(INPUT_DIR, filename);
  const ext      = path.extname(filename).toLowerCase();
  const stats    = fs.statSync(filePath);

  console.log(`  📄 ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);

  const content = fs.readFileSync(filePath, 'utf-8');
  let parsed    = null;
  let metrics   = null;

  if (ext === '.csv') {
    parsed = parseCSV(content);
    console.log(`     Parsed: ${parsed.length} rows`);

    if (parsed.length > 0) {
      const cols = Object.keys(parsed[0]);
      console.log(`     Columns: ${cols.join(', ')}`);

      // Extract key metrics by vertical
      if (VERTICAL === 'stocks') {
        metrics = extractKeyMetrics_Stocks(parsed);
      } else if (VERTICAL === 'startups') {
        metrics = extractKeyMetrics_Startups(parsed);
      } else if (VERTICAL === 'conventional_biz') {
        metrics = extractKeyMetrics_ConvBiz(parsed);
      }
    }
  } else {
    // Text/Markdown — just report size and first few lines
    const lines = content.split('\n').filter(l => l.trim());
    console.log(`     Lines: ${lines.length}`);
    console.log(`     Preview: ${lines.slice(0, 2).join(' | ').substring(0, 80)}...`);
    parsed = { raw_text: content, line_count: lines.length };
  }

  allParsed[filename] = { rows: Array.isArray(parsed) ? parsed.length : 1, metrics };

  if (metrics) {
    console.log(`\n     KEY METRICS EXTRACTED:`);
    Object.entries(metrics).forEach(([k, v]) => {
      if (v !== null && v !== undefined) {
        console.log(`       ${k.replace(/_/g, ' ').padEnd(22)} ${v}`);
      }
    });
  }
  console.log('');
});

// ─── Summary JSON Output ──────────────────────────────────────────────────────
const summary = {
  vertical:   VERTICAL,
  files_found: files.length,
  ticker_filter: TICKER || null,
  parsed:     allParsed,
  scanned_at: new Date().toISOString(),
  next_step:  `Ask AI to analyze using this data — e.g., "Buat Living Thesis untuk ${TICKER || 'aset yang baru di-parse'}"`
};

console.log('─'.repeat(60));
console.log(`  ✅ Parsing complete. ${files.length} file(s) processed.`);
console.log(`  Pass this summary to AI for Living Thesis generation.`);
console.log('═'.repeat(60));

console.log('\n[JSON_OUTPUT]');
console.log(JSON.stringify(summary, null, 2));
