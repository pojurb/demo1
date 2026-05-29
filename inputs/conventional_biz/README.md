# Input Folder — Sektor Riil / Conventional Business
## `inputs/conventional_biz/` | Project Living Thesis

---

## Cara Menggunakan Folder Ini

Drop data proyek fisik, asumsi bisnis konvensional, atau studi kelayakan di sini.  
Cocok untuk: properti, F&B, manufaktur, distribusi, franchise, jasa, atau proyek infrastruktur.

---

## Format File yang Diterima

### 1. Asumsi CapEx / OpEx (CSV atau Markdown)
**Nama file:** `{PROYEK_NAME}_capex_opex.csv`  
**Contoh:** `restoXYZ_capex_opex.csv`, `gudang_bekasi_capex_opex.csv`

**Format CSV:**
```csv
category,type,item,amount_idr,frequency,notes
CapEx,One-time,Sewa Lokasi (1 tahun),120000000,once,dibayar di muka
CapEx,One-time,Renovasi & Interior,250000000,once,termasuk kitchen equipment
CapEx,One-time,Peralatan Masak,80000000,once,kompor, chiller, dll
CapEx,One-time,Working Capital Awal,100000000,once,buffer 3 bulan OpEx
OpEx,Monthly,Sewa (setelah tahun 1),10000000,monthly,
OpEx,Monthly,Gaji Karyawan (5 orang),25000000,monthly,
OpEx,Monthly,COGS (40% dari revenue),variable,monthly,depends on revenue
OpEx,Monthly,Marketing & Promosi,5000000,monthly,
OpEx,Monthly,Utilitas (listrik, air, gas),8000000,monthly,
```

**Format Markdown (alternatif):**
```markdown
## CapEx Total: IDR 550,000,000
- Sewa lokasi (dp 1 tahun): Rp 120jt
- Renovasi: Rp 250jt
- Peralatan: Rp 80jt
- Working capital: Rp 100jt

## Monthly OpEx: IDR 48,000,000 (fixed)
- Sewa bulanan: Rp 10jt
- Gaji: Rp 25jt
- Marketing: Rp 5jt
- Utilitas: Rp 8jt

## Revenue Assumption
- Target revenue/bulan: Rp 150jt
- COGS: 40% → Rp 60jt
- Gross Profit: Rp 90jt
```

---

### 2. Revenue Projections (CSV)
**Nama file:** `{PROYEK_NAME}_revenue_projections.csv`

**Kolom yang diharapkan:**
```
month, projected_revenue, actual_revenue, gross_margin_pct, 
net_profit, cumulative_cashflow, notes
```

---

### 3. Asumsi Pasar / Market Research (Markdown)
**Nama file:** `{PROYEK_NAME}_market_research.md`

**Isi yang berguna:**
```markdown
## Target Market
## Jumlah Kompetitor di Area
## Average Ticket Size Kompetitor
## Estimasi Foot Traffic / Demand
## Seasonality Pattern
## Regulatory Requirements
## Sumber Data (BPS, Google Maps, survei lapangan, dll)
```

---

### 4. Data Kompetitor (CSV)
**Nama file:** `{PROYEK_NAME}_competitors.csv`

**Kolom yang diharapkan:**
```
name, location, distance_km, estimated_revenue, menu_price_avg, 
rating_google, review_count, years_operating
```

---

### 5. Sensitivity Analysis Assumptions (Markdown)
**Nama file:** `{PROYEK_NAME}_sensitivity.md`

**Isi:**
```markdown
## Base Case: Revenue = Rp X/bulan
## Bear Case: Revenue = Rp Y/bulan (-30%)
## Bull Case: Revenue = Rp Z/bulan (+40%)
## Key Assumptions yang Paling Kritis
```

---

## Cara Meminta Analisis

```
"Analisis kelayakan restoran XYZ dengan data yang ada"
"Hitung BEP untuk proyek gudang Bekasi"
"Berapa IRR proyek ini dengan asumsi exit di tahun ke-5?"
"Red team proyek ini — apa yang paling likely gagal?"
"Bandingkan 2 pilihan lokasi ini secara finansial"
```

---

## Metric yang Akan Dikalkulasi Otomatis

| Metric | Formula | Benchmark Sehat |
| :--- | :--- | :--- |
| Break-Even Point (units) | Fixed Costs / (Price - Variable Cost) | Tercapai < 12 bulan |
| Break-Even Revenue | Fixed Costs / Gross Margin % | Bandingkan vs. kapasitas |
| Payback Period | CapEx / Monthly Net Profit | < 36 bulan (ideal) |
| IRR | NPV = 0 solver | > 20% untuk sektor riil |
| MOIC | Exit Value / Invested Capital | > 2x dalam 5 tahun |
| NPV (5 tahun) | Σ CF_t / (1+r)^t | Positif dengan r=15% |
| Gross Margin | (Revenue - COGS) / Revenue | > 50% (F&B/jasa) |
| EBITDA Margin | EBITDA / Revenue | > 15% (mature biz) |

---

## Proksi Data yang Bisa Digunakan AI

Jika data langsung tidak tersedia, AI bisa menggunakan proxy data dari:
- **BPS (bps.go.id):** Statistik ekonomi, populasi, pendapatan per kapita
- **LPSE:** Data pengadaan pemerintah (untuk bisnis B2G)
- **Google Maps Data:** Estimasi kompetitor density, review, foot traffic
- **Sumber publik lain:** Laporan industri, berita bisnis

*Catatan: AI akan selalu menyebutkan jika menggunakan proxy data dan batas validitasnya.*

---

## ⚠️ Catatan Penting

- Selalu sertakan **asumsi occupancy rate atau utilization rate** (sangat kritikal untuk properti/F&B)
- Selalu ada **skenario bear case** — jangan hanya optimistic projection
- Untuk proyek dengan partner, sertakan struktur kepemilikan dan pembagian profit

---
*inputs/conventional_biz/ | Project Living Thesis v1.0*
