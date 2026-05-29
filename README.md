# Project Living Thesis — AI Family Office Assistant

An institutional-grade, file-based quantitative and qualitative investment cockpit. This system is designed to analyze opportunities across three asset verticals: **Listed Equities**, **Startups/VC**, and **Real/Conventional Businesses**, presenting analysis through a strict dual-perspective (Bull vs. Bear) debate and a multi-scenario Advisory Board framework. 

This project runs 100% locally and can be easily ported to other machines or integrated with any AI LLM system of your choice.

---

## ⚡ Quick Start (60 Seconds)
1. Install Node.js ([nodejs.org](https://nodejs.org)) if not already installed.
2. Open this folder in your AI-enabled IDE (Cursor, Windsurf, Antigravity, VS Code, etc.).
3. The AI will automatically load the rules — just start chatting!
4. Try typing: *"Analisis BBCA berdasarkan data sample yang ada"*

To verify everything is configured correctly, run the health check in your terminal:
```bash
node scripts/run.js check
```

---

## 📂 Project Directory Structure

```text
jp-invest/
│
├── README.md                         # Universal user manual (this file)
├── prd.md                            # Product Requirement Document (v8 Specification)
├── package.json                      # Node.js project manifest
│
├── system/
│   ├── system_prompt.md              # AI behavior rules & operational protocols
│   ├── living_thesis_template.md     # Standardized 7-section analysis template
│   └── advisory_board_protocol.md    # Principles governing the 3 advisory lenses
│
├── inputs/
│   ├── stocks/                       # Equities ingestion guidelines & CSV templates
│   ├── startups/                     # Startup/VC unit economics guidelines
│   └── conventional_biz/             # Real business CapEx/OpEx scanning guidelines
│
├── data/
│   └── Portfolio_Master_State.md     # The central, living ledger of your portfolio
│
├── scripts/
│   ├── run.js                        # Universal cross-platform command dispatcher
│   ├── health_check.js               # Environment verification tool
│   ├── sandbox/
│   │   ├── financial_calc.js         # Quantitative engine (BEP, IRR, LTV, CAC, DCF, etc.)
│   │   └── options_pricing.js        # Black-Scholes options pricing model & Greeks
│   ├── ingestion/
│   │   └── parse_inputs.js           # Tri-vertical data-ingestion scanning engine
│   └── portfolio/
│       └── update_state.js           # Master portfolio state editing tool
│
└── outputs/
    └── living_thesis/
        └── _example_BBCA.md          # Complete reference example of a Living Thesis
```

---

## 🤖 Supported AI Platforms (Zero-Config Integration)

This project contains auto-discovery files that instantly map the `system/` protocols into your AI's context window.

| IDE / Platform | Auto-Discovery File | Setup Required |
| :--- | :--- | :--- |
| **Google Antigravity** | `GEMINI.md` | None — just open the folder |
| **Cursor** | `.cursorrules` | None — just open the folder |
| **Windsurf** | `.windsurfrules` | None — just open the folder |
| **VS Code + Copilot** | `.github/copilot-instructions.md` | None |
| **Cline / Roo Code** | `.clinerules` | None — just open the folder |
| **Claude Code/Cowork** | `CLAUDE.md` | None — just open the folder |
| **OpenAI Codex** | `AGENTS.md` | None — just open the folder |
| **ChatGPT / Claude Web** | — | Paste `system/system_prompt.md` as your first message |
| **Ollama (terminal)** | — | Use `--system "$(cat system/system_prompt.md)"` |

---

## 💻 Command Line Reference (Quantitative Sandbox)

This project uses a **universal Node.js runner** (`run.js`) that works identically on Windows, Mac, and Linux.

If you are on Windows, you can also use `.\scripts\run.ps1`. If you are on Mac/Linux, you can use `./scripts/run.sh`. But the command below works everywhere:

### Quantitative Calculations
*   **Break-Even Point (BEP)**:
    ```bash
    node scripts/run.js calc bep --fixed=500000000 --price=150000 --variable=80000
    ```
*   **Discounted Cash Flow (5-Year NPV)**:
    ```bash
    node scripts/run.js calc dcf --cashflows="100,120,144,173,207" --rate=0.15 --terminal=10
    ```
*   **Black-Scholes Options Pricing & Greeks**:
    ```bash
    node scripts/run.js calc options --S=9200 --K=9500 --T=0.25 --r=0.06 --sigma=0.25
    ```

### Data Ingestion Scanner
*   Parse all dropped CSV files in an input folder:
    ```bash
    node scripts/run.js parse stocks
    ```

### Portfolio Ledger Control
*   **Show Portfolio Status**:
    ```bash
    node scripts/run.js update-state
    ```
*   **Update Macro variables**:
    ```bash
    node scripts/run.js update-state --update-macro --bi-rate=6.25 --ihsg=7200 --usdIdr=16200
    ```

---

## ⚡ The Human-in-the-Loop Protocol
Always remember that **AI is merely a quantitative analyst.**
Every Living Thesis output is designed to produce 3 distinct scenario lenses (Operator, Risk Manager, and Predator) rather than a single rigid conclusion. 

The execution decision resides 100% with you. Fill in the **Human Decision Log** at the end of each thesis to commit actions to your central ledger.
