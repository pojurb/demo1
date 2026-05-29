# Implementation Plan: AI PM Portfolio Web App (jp-invest Cockpit)

Aplikasi portfolio ini akan dibuat di dalam sub-folder `web/` pada repositori ini agar recruiter dapat melihat kesinambungan dari backend CLI agent ke dashboard visual yang interaktif.

Kita menggunakan **Opsi A: Standalone SPA (Zero-Setup & Zero-Dependency)** menggunakan Vanilla HTML, CSS, dan modern JavaScript (ES Modules). Aplikasi ini bisa langsung dijalankan dengan membuka `index.html` di browser web mana pun tanpa memerlukan instalasi Node.js atau NPM.

---

## 🎨 Industrial & Grunge Design System

Kita akan menggunakan gaya **Industrial + Grunge Cockpit** untuk memberikan kesan "raw, heavy, functional, dan data-heavy institutional".

### Design Tokens & Palette
- **Primary Background**: Raw Steel / Charcoal (`#121316` dengan grid pattern bintik-bintik/dots layaknya blueprints pabrik).
- **Secondary Panels**: Rusty Iron / Concrete Grey (`#1A1C20` dengan solid border 2px `#2E323A`).
- **Accents (Warning/Action)**:
  - Caution Yellow/Orange (`#D97706` atau `#EA580C` untuk status aktif & warning).
  - Hazard Stripes (Garis kuning-hitam diagonal `/ / /` untuk panel analisis risiko / Risk Lens).
- **Sentiment Indicators**:
  - **BULL**: Acid Green (`#22C55E` atau `#10B981` terang).
  - **BEAR**: Crimson/Rust Red (`#EF4444` atau `#B91C1C`).
- **Typography**: 
  - Monospace (untuk data kuantitatif, coding sandbox, dan logs: e.g., `JetBrains Mono` / `Courier New`).
  - Bold Sans-Serif (untuk heading industri yang tegas: e.g., `Space Grotesk` atau `Impact-adjacent` clean sans).
- **Borders & UI Elements**: 
  - Chunky borders (`2px solid`) tanpa rounded corners yang berlebihan (border-radius minimal `2px` - `4px` untuk kesan box besi cetak).
  - Efek tombol "Mechanical Switch" (border-bottom tebal yang memendek saat ditekan untuk mensimulasikan tombol fisik).

---

## 📐 Arsitektur & Struktur Folder (Vanilla ES Modules)

Proyek frontend ditempatkan di folder `web/` menggunakan Native ES Modules di browser:

```text
jp-invest/
├── web/
│   ├── index.html                   # HTML entry point (Case study + Cockpit UI layout)
│   ├── style.css                    # Custom Industrial & Grunge CSS variables, layouts & panels
│   ├── app.js                       # Main App Controller (DOM rendering, event handlers, tab routing)
│   ├── calculators.js               # Quantitative engine porting (DCF, BEP, Options Pricing)
│   └── data.js                      # Dataset fundamental (BBCA, Startup VC, Cafe)
```

---

## 🛠️ Rencana Eksekusi (Phase-by-Phase Execution Plan)

### Fase 1: Pembuatan Folder & Kerangka HTML
1. Buat folder `web/` jika belum ada.
2. Buat file `index.html` dengan struktur dasar semantic HTML5 dan link ke `style.css` serta script `app.js` sebagai `type="module"`.

### Fase 2: Pembangunan CSS Design System (Industrial & Grunge Theme)
1. Tulis `style.css` untuk mengimplementasikan:
   - Grid background bertema blueprint / steel plates.
   - Efek glow neon berkarat.
   - Styling hazard-stripes class.
   - Transisi hover mekanik dan efek active button press.
   - Import font Google (`Space Grotesk` & `JetBrains Mono`).

### Fase 3: Porting Quantitative Engine & Setup Data Fundamental
1. Buat `calculators.js` dengan porting fungsi-fungsi matematika keuangan (DCF, BEP, Options Pricing) ke ES6 Javascript.
2. Buat `data.js` berisi sample fundamental terstruktur untuk mempermudah HR/Hiring Manager mencoba demo tanpa kebingungan mencari data input.

### Fase 4: Pembuatan Komponen & Logic UI di app.js
1. Implementasikan modular render functions di `app.js` untuk mengontrol:
   - **Header & System Indicators**: Menampilkan status "ACTIVE / STANDBY" dengan kedipan lampu LED.
   - **PM Case Study View**: Navigasi/tab untuk menampilkan penjelasan produk, metodologi AI, dan decision tree.
   - **Interactive Sandbox Cockpit**: Slider input untuk memodifikasi parameter keuangan secara real-time.
   - **Chart Render**: Menggambar kurva BEP (Break-Even Point) dan DCF proyeksi menggunakan Canvas API bawaan browser atau grafik SVG yang responsif dan berpenampilan retro (osciloscope style).
   - **Agent Debate Log Terminal**: Animasi ketikan teks debat otonom Bull vs Bear.
   - **3 Lenses Advisory & Human Decision Log**: Switch panel untuk 3 lensa dan form input keputusan untuk disimpan di LocalStorage.

### Fase 5: Integrasi & Verifikasi Lokal
1. Lakukan uji coba input perubahan parameter kuantitatif untuk memastikan grafik dan hasil analisis ter-update secara real-time.
2. Tambahkan tombol-tombol shortcut seperti "Load BBCA Stock Sample" atau "Load VC Startup Pitch Deck" agar mempermudah pengujian cepat.

### Fase 6: Deployment & Dokumentasi
1. Siapkan file panduan deployment ke GitHub Pages / Vercel.
2. Lengkapi dokumentasi `README.md` di folder frontend.

---

## 🔍 Rencana Verifikasi (Verification Plan)

### Pengujian Manual & UX
- Gunakan internal browser tool untuk membuka dashboard secara lokal dan memverifikasi:
  1. **Keindahan Visual**: Estetika Industrial & Grunge terasa konsisten, tidak ada font default browser, warna dan contrast rasio terbaca dengan baik.
  2. **Interaktivitas Sandbox**: Menggeser slider atau mengubah angka input langsung memperbarui chart tanpa lag yang mengganggu.
  3. **Responsivitas**: Tampilan dashboard tidak pecah di berbagai resolusi layar (desktop & tablet).
  4. **Simulasi Debat**: Animasi debat mengalir dengan lancar.
