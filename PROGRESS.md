# Progress Tracker — AI PM Portfolio Demo

**Goal:** A portfolio demo positioning Johannes Purba as an **AI Product Manager** for startup job applications.
**Live:** https://demo-vercel-nu-peach.vercel.app/ · **Repo:** github.com/pojurb/demo1 · **Deploy:** Vercel (root dir = `web`, auto-deploy on push to `main`)

---

## ✅ Done (as of 2026-05-30)

| # | Item | Notes |
|---|------|-------|
| 1 | Rewrote web cockpit into a clean single-file app | All JS + data + finance engine inlined into `web/index.html`; `style.css` separate. |
| 2 | Sharpened positioning into an **honest AI Product case study** | Sidebar restructured: Problem → Target User → Solution → **Key Product Decision** (separate numbers from narrative). |
| 3 | Added **AI DESIGN** tab | Honest "PROTOTYPE NOTE" + production LLM pipeline, grounding, structured output, eval & guardrails, model/cost trade-offs. |
| 4 | Added **SIM** badge on the debate panel | Honest signal that the agent debate is a curated UX simulation, not a live LLM. |
| 5 | Translated everything to **English** | Sidebar + all 6 assets' debate/advisory + UI strings. Verified no Indonesian remaining. |
| 6 | Sharpened PRD & KPI tab | Time-to-insight, bias neutralization, decision adoption, auditability; split "Shipped" vs "Roadmap". |
| 7 | Deployed to **Vercel** + verified live | Root dir `web`, no build step, static. Verified rendered content via fetch. |
| 8 | Cleaned up repo | Deleted orphan `web/data.js` & `web/calculators.js`; rewrote `web/README.md` in English. |

## 🧭 Key Decisions
- **Separate numbers from narrative** — figures are deterministic code (zero numeric hallucination); LLM only narrates/debates locked figures. Trade-off: less flexibility, more trust.
- **Honesty over hype** — explicitly mark the AI debate as simulated; document the real architecture instead of faking "live AI". Reads as AI PM maturity.
- **Static, zero-dependency** — single-file app, `file://` compatible, trivial to deploy/share.

---

## 🚀 Next: Toward Production-Ready

Turning the architecture described in the **AI DESIGN** tab into a working system.

### P0 — Make the AI real
- [ ] Backend endpoint (Vercel serverless function) — input asset params → run deterministic sandbox → prompt agents → return structured JSON.
- [ ] Wire **Claude API** for Bull / Bear / Orchestrator agents (use prompt caching; see `claude-api` skill).
- [ ] **Grounding**: compute all figures server-side, inject as locked facts in the prompt.
- [ ] **Structured output**: enforce JSON schema (claim / evidence / severity) via tool use.

### P1 — Trust & quality
- [ ] **Eval harness**: golden labeled-asset set; score faithfulness + Bull-vs-Bear balance on every prompt/model change.
- [ ] **Guardrails**: validate each claim against sandbox figures; reject lopsided output.
- [ ] **Observability**: log latency, token cost, and confidence per run.

### P2 — Real product surface
- [ ] **Data ingestion**: CSV upload + financial API (replace hardcoded presets).
- [ ] **Persistence + auth**: move the decision ledger from LocalStorage to a real DB (e.g. Vercel KV/Postgres).
- [ ] Loading/error states for live LLM latency.

### Open questions
- Target model tier? (Opus for reasoning vs Sonnet/Haiku for cost on the sandbox/cheap paths.)
- Scope for the job application: keep simulated for the demo, or ship one fully-live vertical (e.g. stocks) as proof?

---
*Maintained collaboratively. Update the tables above as items ship.*
