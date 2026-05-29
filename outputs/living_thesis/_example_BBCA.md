# Living Thesis — BBCA (Bank Central Asia Tbk)
## Vertikal: STOCKS (IDX)
## Aset: BBCA — Bank Central Asia Tbk
## Tanggal Analisis: 2026-05-23
## Analis: Orchestrator AI + Johannes Purba (Human Judgement)
## Status: DRAFT (Contoh referensi format — bukan analisis real)

> ⚠️ **DISCLAIMER:** File ini adalah **contoh format** Living Thesis, bukan analisis investasi aktual. Angka-angka bersifat ilustratif. Selalu gunakan data terkini dari sumber terpercaya.

---

## 1. Executive Summary & Data Snapshot (BLUF)

**Thesis Statement:**
BBCA adalah bank dengan moat paling defensif di IDX — didorong oleh CASA ratio tertinggi di industri (~75%), jaringan merchant acquiring terbesar, dan loyalitas nasabah yang hampir tidak tertandingi. Pada valuasi saat ini (P/E ~23x, P/B ~4.5x), BBCA diperdagangkan di premium yang signifikan terhadap rata-rata sektor. Pertanyaan kuncinya: apakah premium tersebut masih justified mengingat potensi perlambatan pertumbuhan kredit di tengah suku bunga yang masih tinggi?

**Key Data Points:**

| Metric | Value | Source | As Of |
| :--- | :--- | :--- | :--- |
| Share Price | IDR 9,200 | IDX | 2026-05-22 |
| Market Cap | ~IDR 1,134T | IDX | 2026-05-22 |
| P/E Ratio (TTM) | 23.1x | Kalkulasi | FY2025 |
| P/B Ratio | 4.5x | Kalkulasi | FY2025 |
| EPS (FY2025 est.) | IDR 398 | Estimasi konsensus | FY2025 |
| ROE | ~22% | Laporan Keuangan | FY2025 |
| CASA Ratio | ~75% | Laporan Keuangan | Q4 2025 |
| NIM (Net Interest Margin) | ~5.8% | Laporan Keuangan | Q4 2025 |
| NPL (Non-Performing Loan) | ~1.7% | Laporan Keuangan | Q4 2025 |
| Dividend Yield | ~2.2% | Kalkulasi | FY2025 |

**Current Portfolio Exposure:** Belum ada posisi

**Analysis Trigger:** Evaluasi awal — BBCA sering menjadi benchmark anchor untuk portofolio saham Indonesia.

---

## 2. Quantitative & Microstructure Tracking

### 2a. Core Financial Metrics

| Metric | Calculated Value | Formula Used | Input Parameters |
| :--- | :--- | :--- | :--- |
| P/E Ratio | 23.1x | Price / EPS | P=9,200, EPS=398 |
| Earnings Yield | 4.33% | EPS / Price | EPS=398, P=9,200 |
| P/B Ratio | 4.5x | Price / BVPS | Ref. laporan keuangan |
| ROE | ~22% | Net Income / Equity | Ref. laporan keuangan |
| Dividend Yield | 2.2% | DPS / Price | DPS ~200, P=9,200 |

**Script Command Used:**
```bash
.\scripts\run.ps1 calc pe --price=9200 --eps=398
```

**Raw Output (ilustratif):**
```json
{
  "mode": "pe",
  "results": {
    "P/E Ratio": "23.1x",
    "Earnings Yield": "4.33%",
    "vs. IHSG avg (13-15x)": "❌ PREMIUM to market"
  }
}
```

### 2b. Historical Revenue & EPS Trend

| Period | Net Interest Income | Net Profit | EPS | NIM | ROE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FY2025E | ~IDR 65T | ~IDR 49T | ~398 | 5.8% | 22% |
| FY2024 | ~IDR 62T | ~IDR 46T | ~375 | 5.9% | 21.5% |
| FY2023 | ~IDR 57T | ~IDR 41T | ~335 | 5.8% | 20.4% |
| FY2022 | ~IDR 49T | ~IDR 35T | ~285 | 5.6% | 19.1% |

**EPS Growth CAGR (3 tahun):** ~11.7% — solid, tapi melambat dari era pra-2022.

### 2c. Valuation vs. Peers

| Bank | P/E | P/B | ROE | NIM | CASA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BBCA** | 23x | 4.5x | 22% | 5.8% | 75% |
| BBRI | 13x | 2.5x | 20% | 8.0% | 65% |
| BMRI | 12x | 2.0x | 20% | 5.5% | 62% |
| BBNI | 9x | 1.3x | 16% | 4.8% | 55% |

**Takeaway:** BBCA trades at 10x P/E premium vs. BBRI — ini konsisten secara historis karena CASA advantage dan kualitas aset lebih baik. Pertanyaan: apakah gap ini akan melebar atau menyempit?

---

## 3. Macro-Economic & Portfolio Correlation

### 3a. Macro Context

| Faktor Makro | Kondisi Saat Ini | Impact ke BBCA | Severity |
| :--- | :--- | :--- | :--- |
| BI Rate | ~6.25% | **NEGATIF** — High rates compress loan growth & increase funding cost meski CASA buffer BBCA. | HIGH |
| Inflasi CPI | ~2.8% | **NETRAL** — Dalam target BI. Tidak ada pressure untuk rate cut agresif. | LOW |
| USD/IDR | ~16,200 | **NETRAL** — BBCA predominantly IDR book, minimal forex exposure. | LOW |
| Pertumbuhan GDP | ~5.0% | **POSITIF** — Kredit konsumer dan korporat tetap tumbuh meski moderat. | MEDIUM |
| IHSG Trend | Volatile | **NEGATIF SENTIMEN** — Risk-off flow bisa tekan seluruh sektor perbankan. | MEDIUM |

### 3b. Cross-Asset Correlation

| Aset Existing | Korelasi | Mekanisme |
| :--- | :--- | :--- |
| *(Belum ada posisi lain)* | — | — |

### 3c. Tailwinds & Headwinds

**Tailwinds:**
- Digitalisasi perbankan Indonesia masih early stage — BYOND (super app BBCA) terus tumbuh
- CASA ratio 75% = cost of fund tetap rendah meski BI rate tinggi
- Kualitas aset premium — NPL ~1.7% terendah di big-4 bank

**Headwinds:**
- Valuasi premium (P/B 4.5x) memberikan sedikit margin of safety
- Pertumbuhan kredit mungkin moderat di lingkungan rate tinggi
- Kompetisi dari neo-bank (Blu, Jago) untuk segmen muda mulai terasa

---

## 4. The Red Team Debate Logs

---

**[BULL 🐂]**
> BBCA adalah "Berkshire Hathaway of Indonesia banking" — moat yang dibangun selama 40+ tahun nyaris tidak bisa ditiru. CASA ratio 75% berarti cost of fund BBCA rata-rata 1-2% di bawah peers, menghasilkan NIM struktural yang lebih tinggi. Jaringan 22,000+ EDC merchant acquiring dan 1,200+ kantor cabang menciptakan switching cost yang sangat tinggi. Bahkan di environment rate tinggi, ROE BBCA konsisten di 20%+. Dengan EPS growth CAGR ~10-12% dan quality-premium yang justified, harga saat ini masih reasonable untuk jangka panjang 5+ tahun. Setiap koreksi >15% adalah akumulasi opportunity.

---

**[BEAR 🐻]**
> Premium valuasi BBCA hanya masuk akal jika growth akselerasi — yang tidak terjadi. EPS growth melambat dari 15%+ era pra-2022 ke ~10% sekarang, tapi P/E masih 23x vs. rata-rata sektor 13x. Ini berarti growth-adjusted, BBCA mungkin lebih mahal dari yang terlihat. Tambah risiko: neo-bank mengejar segmen anak muda yang selama ini loyal ke BBCA; BI rate yang masih elevated menekan appetite kredit. Dan yang paling kritis: ketika cycle akhirnya berputar dan rate turun, bank-bank lain dengan loan book lebih besar (BBRI) akan benefit lebih besar. Money akan rotate keluar dari BBCA ke cheaper alternatives. P/B 4.5x vs. book value tidak memberikan margin of safety apapun.

---

**[BULL 🐂 REBUTTAL]**
> Bear mengabaikan "quality premium persistence." BBCA selalu diperdagangkan di premium 40-60% ke peers selama 15 tahun terakhir — ini bukan anomali, ini adalah market's rational pricing of superior ROE sustainability. Neo-bank threat sangat overstated: BBCA justru memimpin digital dengan BYOND app yang tumbuh 40% YoY. Dan saat rate cut cycle dimulai, BBCA akan benefit dari repricing funding lebih cepat dari peers karena CASA-heavy structure.

---

**[BEAR 🐻 REBUTTAL]**
> CASA advantage akan berkurang ketika deposito berjangka menjadi lebih menarik di rate tinggi. Historical premium tidak menjamin future premium — multiple contraction bisa terjadi jika EPS growth terus melambat. Dan "quality" tidak melindungi dari penurunan jika market secara keseluruhan de-rating.

---

**[ORCHESTRATOR VERDICT]**
> Bull memiliki argumen yang lebih kuat secara struktural — CASA moat dan ROE konsistensi adalah keunggulan yang terbukti dan bukan sedang memburuk. Namun Bear benar bahwa harga saat ini tidak memberikan margin of safety yang signifikan. **Synthesis:** BBCA adalah kualitas tidak terbantahkan, tapi valuasinya mencerminkan hal itu. Entry point yang optimal adalah pada koreksi — bukan saat ini jika mengharapkan return 15%+ per tahun dalam 2-3 tahun.

---

## 5. Market Competitor & Supply Landscape

### 5a. Competitive Landscape

| Kompetitor | Market Share Kredit | Keunggulan | Kelemahan vs. BBCA |
| :--- | :--- | :--- | :--- |
| BBRI | ~22% | UMKM dominance, rural network | CASA lebih rendah, NPL lebih tinggi |
| BMRI | ~18% | Wholesale banking kuat, BUMN flow | Efisiensi lebih rendah |
| BBNI | ~10% | Jaringan luar negeri | ROE lebih rendah, less retail-focused |
| Neo-bank (Blu, Jago, Neon) | <1% combined | UX, zero-fee | Belum profitable, no physical presence |

### 5b. Barrier to Entry

- **Capital Requirements:** SANGAT TINGGI — modal inti bank kategori BUKU IV miliaran USD
- **Regulatory Moat:** TINGGI — lisensi, OJK oversight, GWM requirements
- **Network Effects:** KUAT — setiap merchant/nasabah baru meningkatkan nilai jaringan
- **Switching Costs:** TINGGI — ganti bank utama sangat friction-heavy untuk nasabah korporat

### 5c. Supply/Demand Dynamics

Penetrasi kredit Indonesia masih ~35% dari GDP vs. regional peers 100%+ — ruang tumbuh masih ada secara struktural. Namun dalam 2-3 tahun ke depan, pertumbuhan akan lebih gradual karena BI rate masih elevated dan demand kredit korporat moderat.

---

## 6. The Advisory Board Scenarios

> ⚠️ **HUMAN JUDGEMENT PROTOCOL** — AI hanya menyajikan perspektif. Keputusan eksekusi 100% ada di tangan Johannes Purba.

---

### 🔧 Lens #1 — The Operator (Moat & Efficiency)
*"Bagaimana BBCA membangun sistem yang defensif? Dan bagaimana kita sebagai investor harus memposisikan diri terhadap moat-nya?"*

BBCA telah membangun sesuatu yang sangat langka: **payment infrastructure moat**. Bukan hanya bank, BBCA adalah backbone transaksi B2C Indonesia — setiap SPBU, minimarket, dan restoran premium kemungkinan memiliki terminal BCA. Ini menciptakan flywheel: lebih banyak merchant → lebih banyak nasabah retain → CASA lebih tinggi → funding lebih murah → lebih bisa compete di lending → lebih banyak merchant.

Sebagai investor, yang perlu diperhatikan adalah: apakah BBCA sedang **memperluas** flywheel ini ke ranah baru? Jawabannya ya — BYOND app, VIRA chatbot, dan ekspansi ke wealth management adalah ekstensi alami. SOP "service excellence" BBCA yang sudah ter-embed di culture karyawan selama dekade adalah **soft moat** yang paling sulit ditiru neo-bank manapun.

**Recommended Actions untuk Dipertimbangkan:**
1. Monitor metrik BYOND app (MAU growth, transaction volume) sebagai leading indicator adaptasi digital
2. Track CASA ratio setiap kuartal — jika mulai turun dari 75%, itu early warning signal
3. Watch untuk ekspansi ke segmen UMKM yang selama ini underserved oleh BBCA

**Key Metric yang Harus Dimonitor:** CASA ratio, BYOND MAU, NIM trend quarterly

---

### 🛡️ Lens #2 — The Risk Manager (Stress-Test & Survival)

**Skenario Stress Test:**

| Skenario | Trigger | Impact ke BBCA | Cash Flow Negative At | Mitigasi |
| :--- | :--- | :--- | :--- | :--- |
| BI Rate naik ke 7.5% | Inflasi shock eksternal | NIM compressed, loan growth -20% | EPS turun ~15-20% tapi tidak negatif | Kurangi ukuran posisi |
| Resesi Indonesia | GDP kontraksi | NPL naik ke 3-4%, provisioning melonjak | ROE turun ke 14-16% | Hedging via put options |
| Skandal governance | Internal fraud besar | Multiple de-rating cepat | Tidak relevan — exit segera | Predefined stop-loss |
| Regional banking crisis | Contagion dari luar | Capital flight, likuiditas ketat | BI dan OJK intervention likely | BBCA paling well-capitalized |

**Survival Checklist:**
- [ ] Exit trigger: Jika P/B turun di bawah 3x (menunjukkan fundamental concern) → re-evaluate thesis
- [ ] Maximum drawdown yang bisa ditolerir: 25% dari entry price sebelum sizing review
- [ ] BBCA adalah BUKU IV — systemically important, probabilitas bail-out sangat tinggi jika krisis
- [ ] Hedging: Put options tersedia di IDX derivatives (cek likuiditas sebelum eksekusi)

**Verdict Risk Manager:** Risk/reward acceptable hanya dengan entry di bawah IDR 8,500 (P/B ~4x). Di harga saat ini IDR 9,200, downside protection tipis. Posisi kecil acceptable, full sizing tidak.

---

### 🦁 Lens #3 — The Predator (Fat Pitch & Opportunism)
*"BBCA: kapan momen untuk swing besar?"*

**Definisi Fat Pitch untuk BBCA:**
BBCA adalah saham "always expensive, rarely cheap." Fat Pitch terjadi ketika: (1) harga turun >20% dari ATH tanpa perubahan fundamental, (2) P/B menyentuh 3.0-3.5x (turun dari 4.5x saat ini), (3) sentiment market secara keseluruhan di titik ketakutan ekstrem (fear index tinggi, net foreign sell masif selama 2+ bulan), dan (4) BI mulai sinyal rate cut cycle.

**Trigger Matrix:**

| Kondisi | Current Status | Fat Pitch Level | Aksi |
| :--- | :--- | :--- | :--- |
| P/B < 3.5x | 4.5x ❌ | 🔴 Not Yet | Pantau |
| Harga < IDR 7,500 | IDR 9,200 ❌ | 🔴 Not Yet | Pantau |
| BI rate cut 2x dalam 6 bulan | Belum ❌ | 🔴 Not Yet | Pantau |
| Net foreign sell > IDR 10T / bulan selama 2 bulan | ❌ | 🔴 Not Yet | Pantau |
| EPS growth konsisten >12% YoY | ~10% ⚠️ | 🟡 Getting Close | Monitor |

**Sizing Framework:**
- **Starter Position (P/B < 4x, harga < IDR 8,500):** 3-5% dari portfolio
- **Full Position (P/B < 3.5x, fundamental intact):** 8-10% dari portfolio
- **Max Conviction Fat Pitch (P/B < 3x + rate cut + foreign sell exhaustion):** 15% dari portfolio

**Predator Verdict:** **BELUM Fat Pitch.** Harga saat ini IDR 9,200 tidak memberikan asymmetric upside. Be patient — BBCA akan ada peluangnya, terutama jika ada shock eksternal yang irasional (global risk-off, EM selloff). Simpan amunisi. Set price alert di IDR 8,000 dan IDR 7,500.

---

## 7. Orchestrator Confidence Score

```
┌─────────────────────────────────────────────────────┐
│  CONFIDENCE SCORE: 68%                              │
│                                                     │
│  Data Quality:        MEDIUM (data ilustratif)      │
│  Bull Argument:       Strength: 7.5/10              │
│  Bear Argument:       Strength: 6.5/10              │
│  Macro Alignment:     Neutral (rate high = headwind) │
│  Portfolio Fit:       Good (anchor quality stock)   │
│                                                     │
│  ⚠️ Score ini bukan rekomendasi investasi.          │
│  Ini hanya ukuran keyakinan analitis AI.            │
└─────────────────────────────────────────────────────┘
```

**Alasan Score 68%:**
Fundamental BBCA tidak diragukan (Bull argument kuat), namun uncertainty berasal dari timing entry dan valuasi premium yang memberikan sedikit margin of safety. Score tidak lebih tinggi karena data yang digunakan adalah ilustratif, bukan data aktual terkini.

**Open Questions yang Belum Terjawab:**
1. Bagaimana trajectory CASA ratio di Q1-Q2 2026? Apakah mulai tergerus oleh time deposit?
2. Berapa MAU dan transaction volume BYOND app saat ini vs. tahun lalu?

**Next Review Trigger:**
- Ketika laporan keuangan Q2 2026 dirilis (est. Juli-Agustus 2026)
- Jika harga BBCA menyentuh IDR 8,000 (re-evaluate Fat Pitch criteria)
- Jika BI mengumumkan rate cut pertama

---

## ⚡ Human Decision Log

**Tanggal Keputusan:** *(Belum diisi — menunggu keputusan founder)*

**Diputuskan Oleh:** Johannes Purba

**Lens yang Paling Relevan:** *(Pilih setelah membaca 3 lenses)*

**Keputusan:**
- [ ] GO — Eksekusi posisi dengan sizing: ___% dari portfolio
- [ ] NO GO — Tidak ada aksi saat ini. Review ulang ketika: ___
- [x] WATCH LIST — Monitor terus. Trigger untuk re-analisis: Harga < IDR 8,000 atau P/B < 4x
- [ ] PARTIAL — ___

**Reasoning Founder:**
*(Isi di sini setelah membaca semua lenses)*

**Next Review Date:** 2026-08-01 (setelah laporan Q2 2026)

---
*Generated by: Orchestrator AI — Project Living Thesis*
*Template Version: 1.0 | Example File — Not Real Analysis | 2026-05-23*
