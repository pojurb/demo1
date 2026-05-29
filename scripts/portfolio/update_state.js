#!/usr/bin/env node
/**
 * update_state.js — Portfolio Master State Updater
 * Project Living Thesis | FR-03: Cross-Asset Risk Manager
 *
 * Usage:
 *   node update_state.js
 *   node update_state.js --add-queue --asset=BBCA --vertical=stocks --trigger="Q3 results out"
 *   node update_state.js --complete --asset=BBCA --score=72 --decision="WATCH LIST"
 *   node update_state.js --add-position --asset=BBCA --vertical=stocks --entry=9200 --allocation=5
 *   node update_state.js --update-macro --bi-rate=6.25 --cpi=2.8 --usdIdr=16200 --gdp=5.1 --ihsg=7200
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Parse CLI Arguments ──────────────────────────────────────────────────────
const args = {};
process.argv.slice(2).forEach(arg => {
  const match = arg.match(/^--([^=]+)(?:=(.+))?$/);
  if (match) args[match[1]] = match[2] || true;
});

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const STATE_FILE   = path.join(PROJECT_ROOT, 'data', 'Portfolio_Master_State.md');

// ─── Read current state ───────────────────────────────────────────────────────
if (!fs.existsSync(STATE_FILE)) {
  console.error(`ERROR: Portfolio_Master_State.md not found at: ${STATE_FILE}`);
  process.exit(1);
}

let content = fs.readFileSync(STATE_FILE, 'utf-8');

const now = new Date();
const dateStr = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
const isoDate = now.toISOString().split('T')[0];

// ─── Helper: Update a section table ──────────────────────────────────────────
function updateLastModified(content) {
  // Update the "Last Updated" date in header
  return content.replace(
    /## Living Document \| Last Updated: .+? \|/,
    `## Living Document | Last Updated: ${isoDate} |`
  );
}

function appendToUpdateLog(content, change) {
  const logEntry = `| ${isoDate} | ${change} | Orchestrator AI + CLI |`;
  return content.replace(
    /\| 2026-05-23 \| Initial setup — file dibuat \| Orchestrator AI \|/,
    `| 2026-05-23 | Initial setup — file dibuat | Orchestrator AI |\n${logEntry}`
  );
}

// ─── Command: --update-macro ──────────────────────────────────────────────────
if (args['update-macro']) {
  const biRate  = args['bi-rate'];
  const cpi     = args['cpi'];
  const usdIdr  = args['usdIdr'];
  const gdp     = args['gdp'];
  const ihsg    = args['ihsg'];
  const tenYear = args['ten-year'];
  const fed     = args['fed-rate'];

  console.log('\n▶ Updating Macro Context...');

  // Replace macro table values
  const macroUpdates = [
    { key: 'BI Rate', value: biRate ? `${biRate}%` : null },
    { key: 'Inflasi CPI YoY', value: cpi ? `${cpi}%` : null },
    { key: 'USD/IDR', value: usdIdr ? `IDR ${usdIdr}` : null },
    { key: 'GDP Growth YoY', value: gdp ? `${gdp}%` : null },
    { key: 'IHSG Level', value: ihsg ? ihsg : null },
    { key: '10-Year SUN Yield', value: tenYear ? `${tenYear}%` : null },
    { key: 'Fed Funds Rate', value: fed ? `${fed}%` : null },
  ];

  macroUpdates.forEach(({ key, value }) => {
    if (!value) return;
    // Match table rows for this indicator and update the value column
    const regex = new RegExp(`(\\| ${key}\\s*\\|)[^|]+\\|[^|]+\\|[^|]+\\|`, 'g');
    content = content.replace(regex, `$1 ${value} | ↔ | ${isoDate} |`);
  });

  content = updateLastModified(content);
  content = appendToUpdateLog(content, `Macro context updated: BI Rate=${biRate}%, CPI=${cpi}%, USD/IDR=${usdIdr}`);

  fs.writeFileSync(STATE_FILE, content, 'utf-8');
  console.log(`  ✅ Macro context updated in Portfolio_Master_State.md`);
  console.log(`  BI Rate: ${biRate}% | CPI: ${cpi}% | USD/IDR: ${usdIdr} | IHSG: ${ihsg}`);
}

// ─── Command: --add-queue ─────────────────────────────────────────────────────
else if (args['add-queue']) {
  const asset    = args.asset;
  const vertical = args.vertical;
  const trigger  = args.trigger || 'Manual request';

  if (!asset || !vertical) {
    console.error('ERROR: --add-queue requires --asset and --vertical');
    process.exit(1);
  }

  console.log(`\n▶ Adding ${asset} to Pending Analysis Queue...`);

  const newRow = `| ${asset} | ${vertical} | ${isoDate} | ${trigger} | ❌ No | MEDIUM |`;

  // Replace the placeholder row
  content = content.replace(
    '| *(Kosong — tambahkan aset yang ingin dianalisis)* | - | - | - | - | - |',
    `| *(Kosong — tambahkan aset yang ingin dianalisis)* | - | - | - | - | - |\n${newRow}`
  );

  // If placeholder is already gone, append after last row in queue section
  if (!content.includes(newRow)) {
    console.log(`  Note: Manually add row to Pending Analysis Queue section:`);
    console.log(`  ${newRow}`);
  }

  content = updateLastModified(content);
  content = appendToUpdateLog(content, `Added ${asset} (${vertical}) to analysis queue`);

  fs.writeFileSync(STATE_FILE, content, 'utf-8');
  console.log(`  ✅ ${asset} added to queue → Trigger: ${trigger}`);
}

// ─── Command: --complete ──────────────────────────────────────────────────────
else if (args.complete) {
  const asset    = args.asset;
  const score    = args.score || 'N/A';
  const decision = args.decision || 'PENDING';
  const vertical = args.vertical || '?';
  const output   = `outputs/living_thesis/${asset}.md`;

  if (!asset) {
    console.error('ERROR: --complete requires --asset');
    process.exit(1);
  }

  console.log(`\n▶ Logging completed analysis for ${asset}...`);

  const newRow = `| ${asset} | ${vertical} | ${isoDate} | ${score}% | ${decision} | [${asset}.md](../${output}) |`;

  content = content.replace(
    '| *(Belum ada)* | - | - | - | - | - |',
    `| *(Belum ada)* | - | - | - | - | - |\n${newRow}`
  );

  content = updateLastModified(content);
  content = appendToUpdateLog(content, `Analysis completed: ${asset} — Score: ${score}%, Decision: ${decision}`);

  fs.writeFileSync(STATE_FILE, content, 'utf-8');
  console.log(`  ✅ ${asset} logged in Completed Analysis section`);
  console.log(`  Score: ${score}% | Decision: ${decision} | Output: ${output}`);
}

// ─── Command: --add-position ──────────────────────────────────────────────────
else if (args['add-position']) {
  const asset      = args.asset;
  const vertical   = args.vertical;
  const entry      = args.entry;
  const allocation = args.allocation;
  const status     = args.status || 'ACTIVE';

  if (!asset || !vertical) {
    console.error('ERROR: --add-position requires --asset and --vertical');
    process.exit(1);
  }

  console.log(`\n▶ Adding position: ${asset}...`);

  const thesisLink = `[${isoDate}](../outputs/living_thesis/${asset}.md)`;

  let newRow = '';
  if (vertical === 'stocks') {
    newRow = `| ${asset} | ${asset} | IDR ${entry || '?'} | IDR ${entry || '?'} | ${allocation || '?'}% | ${status} | ${thesisLink} |`;
    content = content.replace(
      '| *(Belum ada posisi)* | - | - | - | - | - | - |',
      `${newRow}`
    );
  }

  content = updateLastModified(content);
  content = appendToUpdateLog(content, `New position opened: ${asset} (${vertical}) @ ${entry}, ${allocation}% allocation`);

  fs.writeFileSync(STATE_FILE, content, 'utf-8');
  console.log(`  ✅ Position added: ${asset} @ ${entry}, ${allocation}% portfolio`);
}

// ─── Command: default — show status ──────────────────────────────────────────
else {
  console.log('\n' + '═'.repeat(60));
  console.log('  PORTFOLIO MASTER STATE — STATUS REPORT');
  console.log('  Project Living Thesis');
  console.log('═'.repeat(60));
  console.log(`  State File: ${STATE_FILE}`);

  const stats = fs.statSync(STATE_FILE);
  console.log(`  File Size:  ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`  Last Modified: ${stats.mtime.toLocaleDateString('id-ID')}`);

  // Count sections
  const sections = content.match(/^## /gm) || [];
  console.log(`  Sections:   ${sections.length}`);

  // Quick check for active positions
  const hasStocks  = !content.includes('*(Belum ada posisi)*') || content.indexOf('*(Belum ada posisi)*') > content.indexOf('Vertikal 1');
  const hasQueue   = !content.includes('*(Kosong');

  console.log(`\n  Active Stocks:      ${hasStocks ? '⚠️  Check manually' : '❌ None yet'}`);
  console.log(`  Analysis Queue:     ${hasQueue  ? '⚠️  Check manually' : '❌ Empty'}`);

  console.log('\n  AVAILABLE COMMANDS:');
  console.log('  .\\scripts\\run.ps1 update-state                          → Show this status');
  console.log('  .\\scripts\\run.ps1 update-state --update-macro --bi-rate=6.25 --cpi=2.8 --usdIdr=16200 --gdp=5.1 --ihsg=7200');
  console.log('  .\\scripts\\run.ps1 update-state --add-queue --asset=BBCA --vertical=stocks --trigger="Q3 results"');
  console.log('  .\\scripts\\run.ps1 update-state --complete --asset=BBCA --vertical=stocks --score=72 --decision="WATCH LIST"');
  console.log('  .\\scripts\\run.ps1 update-state --add-position --asset=BBCA --vertical=stocks --entry=9200 --allocation=5');
  console.log('═'.repeat(60));
}

console.log('\n[JSON_OUTPUT]');
console.log(JSON.stringify({
  command: Object.keys(args).join(', ') || 'status',
  state_file: STATE_FILE,
  timestamp: now.toISOString(),
  args
}, null, 2));
