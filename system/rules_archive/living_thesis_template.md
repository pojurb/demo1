# Living Thesis Template — Project Living Thesis
## Vertikal: {STOCKS | STARTUP | CONVENTIONAL_BIZ}
## Aset: {NAMA ASET / TICKER}
## Tanggal Analisis: {YYYY-MM-DD}
## Analis: Orchestrator AI + Johannes Purba (Human Judgement)
## Status: {DRAFT | UNDER_REVIEW | HUMAN_DECIDED}

---

## 1. Executive Summary & Data Snapshot (BLUF)
> *Bottom Line Up Front — Apa yang paling penting yang harus diketahui dalam 30 detik.*

**Thesis Statement:**
{Satu paragraf ringkas: apa aset ini, kenapa menarik atau mengkhawatirkan, dan apa pertanyaan kunci yang harus dijawab.}

**Key Data Points:**

| Metric | Value | Source | As Of |
| :--- | :--- | :--- | :--- |
| {Metric 1} | {Value} | {Sumber} | {Tanggal} |
| {Metric 2} | {Value} | {Sumber} | {Tanggal} |
| {Metric 3} | {Value} | {Sumber} | {Tanggal} |
| {Metric 4} | {Value} | {Sumber} | {Tanggal} |

**Current Portfolio Exposure:** {X% dari total portfolio / Belum ada posisi}

**Analysis Trigger:** {Mengapa analisis ini dilakukan sekarang?}

---

## 2. Quantitative & Microstructure Tracking
> *Validasi angka — semua klaim numerik harus bisa diverifikasi.*

### 2a. Core Financial Metrics

| Metric | Calculated Value | Formula Used | Input Parameters |
| :--- | :--- | :--- | :--- |
| {e.g., P/E Ratio} | {e.g., 14.5x} | Price / EPS | P={x}, EPS={y} |
| {e.g., BEP Units} | {e.g., 7,143 units} | Fixed / (Price-VC) | F={x}, P={y}, VC={z} |
| {e.g., Runway} | {e.g., 18 months} | Cash / Burn | Cash={x}, Burn={y}/mo |

**Script Command Used:**
```bash
.\scripts\run.ps1 calc {mode} {--params}
```

**Raw Output:**
```json
{
  "result": {},
  "timestamp": ""
}
```

### 2b. Historical Trend (jika data tersedia)

| Period | Revenue/Rev Growth | Margin | Key Event |
| :--- | :--- | :--- | :--- |
| {Q/FY} | {IDR/USD} | {%} | {Event} |

### 2c. Valuation vs. Peers

| Comparable | Metric | vs. Target | Premium/Discount |
| :--- | :--- | :--- | :--- |
| {Peer 1} | {Value} | {Diff} | {+/- %} |
| {Peer 2} | {Value} | {Diff} | {+/- %} |

---

## 3. Macro-Economic & Portfolio Correlation
> *Bagaimana kondisi makro mempengaruhi aset ini? Bagaimana korelasi dengan posisi existing?*

### 3a. Macro Context Saat Ini

| Faktor Makro | Kondisi Saat Ini | Impact ke Aset Ini | Severity |
| :--- | :--- | :--- | :--- |
| Suku Bunga BI | {X%} | {Positif/Negatif/Netral — alasan} | {HIGH/MED/LOW} |
| Inflasi CPI | {X%} | {Positif/Negatif/Netral — alasan} | {HIGH/MED/LOW} |
| USD/IDR | {X} | {Positif/Negatif/Netral — alasan} | {HIGH/MED/LOW} |
| Pertumbuhan GDP | {X%} | {Positif/Negatif/Netral — alasan} | {HIGH/MED/LOW} |
| {Faktor Sektoral} | {Kondisi} | {Impact} | {Severity} |

### 3b. Cross-Asset Correlation

| Aset Existing | Korelasi | Mekanisme | Risk |
| :--- | :--- | :--- | :--- |
| {Aset di portfolio} | {Positif/Negatif} | {Bagaimana keduanya bergerak bersama} | {Jika keduanya drop bersamaan...} |

### 3c. Macro Tailwind / Headwind

**Tailwinds (mendukung thesis):**
- {Tailwind 1}
- {Tailwind 2}

**Headwinds (menentang thesis):**
- {Headwind 1}
- {Headwind 2}

---

## 4. The Red Team Debate Logs
> *Debat objektif data-driven. Tidak ada pemenang — hanya kualitas argumen.*

---

**[BULL 🐂]**
> {Argumen bullish terkuat. Apa katalis pertumbuhan? Apa yang market belum price-in? Kenapa ini undervalued atau memiliki moat yang kuat? Sertakan data spesifik.}

---

**[BEAR 🐻]**
> {Argumen bearish terkuat. Apa risiko struktural? Red flag apa yang ada di data? Skenario apa yang bisa membuat ini gagal total? Sertakan data spesifik.}

---

**[BULL 🐂 REBUTTAL]**
> {Bantahan terhadap argumen Bear di atas. Apakah risiko yang disebutkan sudah terlalu priced-in? Apakah ada mitigasi yang Bear abaikan?}

---

**[BEAR 🐻 REBUTTAL]**
> {Bantahan terhadap argumen Bull di atas. Apakah katalis yang disebutkan memiliki execution risk? Apakah timing-nya realistis?}

---

**[ORCHESTRATOR VERDICT]**
> *Sintesis objektif berdasarkan kekuatan data — bukan keputusan beli/jual.*
>
> {Pihak mana yang memiliki argumen lebih kuat secara kuantitatif? Di mana uncertainty terbesar? Apa pertanyaan kunci yang masih belum terjawab?}

---

## 5. Market Competitor & Supply Landscape
> *Posisi kompetitif dan dinamika pasar.*

### 5a. Competitive Landscape

| Kompetitor | Market Share | Keunggulan | Kelemahan vs Target |
| :--- | :--- | :--- | :--- |
| {Kompetitor 1} | {%} | {Apa yang mereka lakukan baik} | {Di mana target lebih unggul} |
| {Kompetitor 2} | {%} | {Apa yang mereka lakukan baik} | {Di mana target lebih unggul} |

### 5b. Barrier to Entry

- **Capital Requirements:** {Tinggi/Sedang/Rendah — alasan}
- **Regulatory Moat:** {Ada/Tidak — jelaskan}
- **Network Effects:** {Ada/Tidak — jelaskan}
- **Switching Costs:** {Tinggi/Rendah — alasan}

### 5c. Supply/Demand Dynamics

{Analisis supply-demand spesifik untuk sektor ini. Apakah ada oversupply? Undersupply? Perubahan struktural dalam permintaan?}

---

## 6. The Advisory Board Scenarios
> ⚠️ **HUMAN JUDGEMENT PROTOCOL** — AI hanya menyajikan perspektif. Keputusan eksekusi 100% ada di tangan Johannes Purba.

---

### 🔧 Lens #1 — The Operator (Moat & Efficiency)
*Pertanyaan kunci: Bagaimana membangun sistem/SOP yang sulit ditiru? Bagaimana menekan CapEx?*

**Skenario:**
{Narasi skenario dari perspektif operator yang berpengalaman membangun bisnis. Fokus pada:
- Pendekatan asset-light atau system integrator
- SOP atau proses yang bisa dipatenkan/diskalakan
- Efisiensi operasional yang bisa dioptimalkan
- Langkah konkret untuk membangun moat defensif}

**Recommended Actions untuk Dipertimbangkan:**
1. {Aksi konkret 1}
2. {Aksi konkret 2}
3. {Aksi konkret 3}

**Key Metric yang Harus Dimonitor:** {Metric 1}, {Metric 2}

---

### 🛡️ Lens #2 — The Risk Manager (Stress-Test & Survival)
*Pertanyaan kunci: Kapan cash flow negatif? Apa skenario worst-case? Bagaimana bertahan?*

**Skenario Stress Test:**

| Skenario | Trigger | Impact ke Aset | Cash Flow Negative At | Mitigasi |
| :--- | :--- | :--- | :--- | :--- |
| Suku bunga naik 200bps | BI rate > {X%} | {Impact} | {Kapan} | {Mitigasi} |
| Resesi/GDP kontraksi | GDP < 0% | {Impact} | {Kapan} | {Mitigasi} |
| {Risiko Spesifik} | {Trigger} | {Impact} | {Kapan} | {Mitigasi} |

**Survival Checklist:**
- [ ] Exit trigger price/metric sudah didefinisikan: {threshold}
- [ ] Maximum drawdown yang bisa ditolerir: {X%}
- [ ] Liquidity buffer tersedia: {Ya/Tidak}
- [ ] Hedging instrument tersedia: {Ya/Tidak — apa?}

**Verdict Risk Manager:** {Apakah risk/reward acceptable? Apa syaratnya?}

---

### 🦁 Lens #3 — The Predator (Fat Pitch & Opportunism)
*Pertanyaan kunci: Kapan momen "Fat Pitch"? Kapan swing agresif dengan modal besar?*

**Definisi Fat Pitch untuk Aset Ini:**
{Kondisi spesifik yang mengindikasikan peluang langka — misal: harga turun X% dari NAV, sentiment negatif ekstrem sementara fundamental tidak berubah, momen forced selling, dll.}

**Trigger Matrix:**

| Kondisi | Current Status | Fat Pitch Level | Aksi yang Dipertimbangkan |
| :--- | :--- | :--- | :--- |
| {Kondisi 1, e.g., P/E < 10x} | {Status saat ini} | 🔴 Not Yet / 🟡 Getting Close / 🟢 NOW | {Aksi} |
| {Kondisi 2} | {Status saat ini} | {Level} | {Aksi} |
| {Kondisi 3} | {Status saat ini} | {Level} | {Aksi} |

**Sizing Framework:**
- **Starter Position (jika kondisi X terpenuhi):** {X% dari portfolio}
- **Full Position (jika kondisi Y terpenuhi):** {Y% dari portfolio}
- **Max Conviction (Fat Pitch terkonfirmasi):** {Z% dari portfolio}

**Predator Verdict:** {Apakah ini sudah Fat Pitch? Apa yang perlu terjadi agar jadi Fat Pitch?}

---

## 7. Orchestrator Confidence Score

```
┌─────────────────────────────────────────────────┐
│  CONFIDENCE SCORE: XX%                          │
│                                                 │
│  Data Quality:        {HIGH | MED | LOW}        │
│  Bull Argument:       {Strength: X/10}          │
│  Bear Argument:       {Strength: X/10}          │
│  Macro Alignment:     {Favorable | Neutral | Adverse} │
│  Portfolio Fit:       {Good | Neutral | Poor}   │
│                                                 │
│  ⚠️ Score ini bukan rekomendasi investasi.      │
│  Ini hanya ukuran keyakinan analitis AI.        │
└─────────────────────────────────────────────────┘
```

**Alasan Score:**
{Penjelasan 2-3 kalimat mengapa score ini diberikan. Apa yang mendorong confidence naik? Apa yang menahan?}

**Open Questions yang Belum Terjawab:**
1. {Pertanyaan kunci 1}
2. {Pertanyaan kunci 2}

**Next Review Trigger:**
{Kapan atau kondisi apa yang harus men-trigger re-analisis? e.g., "Ketika laporan keuangan Q3 keluar" atau "Jika harga turun di bawah IDR X"}

---
*Generated by: Orchestrator AI — Project Living Thesis*
*Template Version: 1.0 | Last Updated: 2026-05-23*
