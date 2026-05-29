# Input Folder — Startup / VC
## `inputs/startups/` | Project Living Thesis

---

## Cara Menggunakan Folder Ini

Drop semua material startup di sini sebelum meminta analisis.  
Cocok untuk: due diligence investasi, evaluasi co-founder pitch, atau review startup milik sendiri.

---

## Format File yang Diterima

### 1. Unit Economics (CSV)
**Nama file:** `{STARTUP_NAME}_unit_economics.csv`  
**Contoh:** `startupXYZ_unit_economics.csv`

**Kolom yang diharapkan:**
```
month, new_customers, churned_customers, total_customers,
mrr, arpu, cac, gross_margin_pct, monthly_burn, cash_balance
```

**Contoh isi:**
```csv
month,new_customers,churned_customers,total_customers,mrr,arpu,cac,gross_margin_pct,monthly_burn,cash_balance
2025-01,150,10,500,75000000,150000,450000,0.65,200000000,3000000000
2025-02,180,12,668,100200000,150000,430000,0.66,195000000,2805000000
2025-03,200,15,853,127950000,150000,420000,0.67,190000000,2615000000
```

---

### 2. Pitch Deck Summary (Markdown)
**Nama file:** `{STARTUP_NAME}_pitch_deck.md`

**Isi yang diharapkan:**
```markdown
# {Nama Startup} — Pitch Deck Summary

## Problem
## Solution
## Market Size (TAM/SAM/SOM)
## Business Model
## Traction (key metrics)
## Team
## Funding Ask & Use of Funds
## Cap Table
```

---

### 3. PRD atau Product Spec (Text/Markdown)
**Nama file:** `{STARTUP_NAME}_prd.md`  
**Isi:** Product roadmap, feature list, atau tech spec relevan untuk evaluasi moat

---

### 4. Financial Projections (CSV atau Markdown)
**Nama file:** `{STARTUP_NAME}_projections.csv`

**Kolom yang diharapkan:**
```
year, revenue, gross_profit, ebitda, net_income, headcount, total_funding
```

---

### 5. Cap Table (Markdown)
**Nama file:** `{STARTUP_NAME}_captable.md`

**Isi:**
```markdown
| Shareholder | Shares | Ownership % | Round | Valuation |
```

---

## Cara Meminta Analisis

```
"Analisis startup XYZ sebagai potential investment"
"Buat due diligence report untuk {nama startup}"
"Hitung LTV:CAC ratio untuk data di startupXYZ_unit_economics.csv"
"Red team pitch deck ini — apa yang paling lemah?"
```

---

## Metric yang Akan Dikalkulasi Otomatis

| Metric | Formula | Target Benchmark |
| :--- | :--- | :--- |
| LTV | ARPU × GrossMargin / ChurnRate | LTV > 3× CAC |
| CAC Payback | CAC / (ARPU × GrossMargin) | < 12 bulan |
| LTV:CAC Ratio | LTV / CAC | > 3x (healthy), > 5x (strong) |
| Burn Multiple | Monthly Burn / Net New MRR | < 1x (efficient), > 2x (warning) |
| Runway | Cash Balance / Monthly Burn | > 18 bulan (safe) |
| MoM Growth | (MRR_now / MRR_prev) - 1 | > 10% MoM (strong) |
| Churn Rate | Churned / Total Customers | < 5% monthly (SaaS) |
| Magic Number | Net New ARR / Prior Quarter S&M | > 0.75x |

---

## Checklist Due Diligence Startup

Sebelum meminta analisis, pastikan minimal ada:

- [ ] Unit economics data (minimal 6 bulan terakhir)
- [ ] Total funding yang sudah diterima
- [ ] Current monthly burn rate
- [ ] Cash balance saat ini
- [ ] Revenue run rate (MRR/ARR)
- [ ] Jumlah paying customers

---

## ⚠️ Catatan

- Untuk early-stage (pre-revenue), fokus pada **Runway** dan **Burn efficiency**
- Untuk growth-stage, fokus pada **LTV:CAC** dan **Burn Multiple**
- AI akan jelas menyatakan jika data tidak cukup untuk kalkulasi tertentu

---
*inputs/startups/ | Project Living Thesis v1.0*
