#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

console.log('\n' + '═'.repeat(60));
console.log(`  PROJECT LIVING THESIS — HEALTH CHECK`);
console.log('═'.repeat(60) + '\n');

let allPassed = true;

function check(name, condition, fixMsg) {
  if (condition) {
    console.log(`  ${GREEN}✅ PASS${RESET} | ${name}`);
  } else {
    console.log(`  ${RED}❌ FAIL${RESET} | ${name}`);
    console.log(`          ${YELLOW}Fix: ${fixMsg}${RESET}`);
    allPassed = false;
  }
}

// 1. Check Node Version
const nodeVer = process.version;
const majorVer = parseInt(nodeVer.replace('v', '').split('.')[0], 10);
check(`Node.js Version (Found ${nodeVer})`, majorVer >= 18, 'Upgrade Node.js to v18+ at https://nodejs.org');

// 2. Directories
const requiredDirs = ['system', 'inputs', 'data', 'outputs', 'scripts'];
requiredDirs.forEach(dir => {
  const dirPath = path.join(PROJECT_ROOT, dir);
  check(`Directory: ${dir}/`, fs.existsSync(dirPath), `Create missing directory: mkdir ${dir}`);
});

// 3. Core Files
const coreFiles = [
  'system/system_prompt.md',
  'system/living_thesis_template.md',
  'system/advisory_board_protocol.md',
  'data/Portfolio_Master_State.md'
];
coreFiles.forEach(file => {
  const filePath = path.join(PROJECT_ROOT, file);
  check(`Core File: ${file}`, fs.existsSync(filePath), `Restore ${file} from the project template`);
});

// 4. Sample Files
const sampleFiles = [
  'inputs/stocks/_sample_BBCA.csv',
  'inputs/startups/_sample_fintech.csv',
  'inputs/conventional_biz/_sample_cafe.csv'
];
sampleFiles.forEach(file => {
  const filePath = path.join(PROJECT_ROOT, file);
  check(`Sample Data: ${file}`, fs.existsSync(filePath), `Restore ${file} from the project template`);
});

// 5. Scripts
const scriptFiles = [
  'scripts/sandbox/financial_calc.js',
  'scripts/sandbox/options_pricing.js',
  'scripts/ingestion/parse_inputs.js',
  'scripts/portfolio/update_state.js',
  'scripts/run.js'
];
scriptFiles.forEach(file => {
  const filePath = path.join(PROJECT_ROOT, file);
  check(`Script: ${file}`, fs.existsSync(filePath), `Restore ${file} from the project template`);
});

console.log('\n' + '─'.repeat(60));
if (allPassed) {
  console.log(`  ${GREEN}🎉 System is perfectly configured and ready to use!${RESET}`);
} else {
  console.log(`  ${RED}⚠️  Some checks failed. Please address the fixes above.${RESET}`);
  process.exit(1);
}
