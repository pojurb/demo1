# Input Folder — Saham Publik (Stocks)
## `inputs/stocks/` | Project Living Thesis

---

## Cara Menggunakan Folder Ini

Drop file data mentah saham di sini sebelum meminta analisis ke Orchestrator AI.  
AI akan otomatis membaca folder ini saat Anda menyebut ticker atau nama perusahaan.

---

## Format File yang Diterima

### 1. Data Keuangan (CSV)
**Nama file:** `{TICKER}_financials.csv`  
**Contoh:** `BBCA_financials.csv`, `TLKM_financials.csv`, `AAPL_financials.csv`

**Kolom yang diharapkan (minimal):**
```
period, revenue, net_income, eps, total_assets, total_equity, 
total_debt, operating_cashflow, capex, dividends_per_share
```

**Contoh isi:**
```csv
period,revenue,net_income,eps,total_assets,total_equity,total_debt,operating_cashflow,capex,dividends_per_share
FY2024,100000000000,25000000000,680,850000000000,120000000000,50000000000,30000000000,5000000000,200
FY2023,95000000000,22000000000,600,800000000000,110000000000,55000000000,28000000000,4500000000,180
FY2022,88000000000,20000000000,540,750000000000,100000000000,60000000000,25000000000,4000000000,160
```

---

### 2. Harga & Volume (CSV)
**Nama file:** `{TICKER}_prices.csv`  
**Contoh:** `BBCA_prices.csv`

**Kolom yang diharapkan:**
```
date, open, high, low, close, volume, market_cap
```

---

### 3. Laporan Keuangan (Text/Markdown)
**Nama file:** `{TICKER}_annual_report_{YEAR}.txt` atau `.md`  
**Contoh:** `BBCA_annual_report_2024.txt`  
**Isi:** Copy-paste bagian relevan dari laporan tahunan (MD&A, catatan keuangan penting)

---

### 4. Sentimen & News (Text)
**Nama file:** `{TICKER}_news_{YYYYMM}.txt`  
**Contoh:** `BBCA_news_202605.txt`  
**Isi:** Kumpulan headline berita atau riset analis yang relevan

---

### 5. Asumsi Analisis Manual (Markdown)
**Nama file:** `{TICKER}_assumptions.md`  
**Isi:** Catatan asumsi pribadi, target price, atau hipotesis awal

---

## Cara Meminta Analisis ke AI

Setelah file tersedia di folder ini, cukup ketik:

```
"Analisis BBCA" 
atau
"Buat Living Thesis untuk TLKM"
atau  
"Red team GOTO dengan data yang ada"
```

AI akan otomatis:
1. Membaca semua file `BBCA_*.csv` atau `BBCA_*.txt`
2. Menjalankan kalkulasi P/E, DCF jika data tersedia
3. Menghasilkan Living Thesis lengkap

---

## Metric yang Akan Dikalkulasi Otomatis

| Metric | Formula | Data yang Dibutuhkan |
| :--- | :--- | :--- |
| P/E Ratio | Price / EPS | `close` dari prices + `eps` dari financials |
| P/B Ratio | Price / (Equity/Shares) | prices + financials |
| EPS Growth | (EPS_now - EPS_prev) / EPS_prev | financials multi-year |
| Dividend Yield | DPS / Price | prices + financials |
| ROE | Net Income / Total Equity | financials |
| Debt/Equity | Total Debt / Total Equity | financials |
| Free Cash Flow | Op. CF - CapEx | financials |

---

## ⚠️ Catatan Penting

- Semua angka dalam **IDR (Rupiah)** untuk saham IDX, **USD** untuk saham US
- Tidak ada format yang wajib — AI akan berusaha membaca format apapun
- Jika data tidak lengkap, AI akan menyebutkan asumsi yang digunakan
- File besar (>5MB) mungkin perlu dipecah menjadi beberapa file

---
*inputs/stocks/ | Project Living Thesis v1.0*
