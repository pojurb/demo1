# Execution Task Checklist (jp-invest Web App Portfolio)

Gunakan checklist ini sebagai panduan checkpoint pengerjaan proyek. Setiap item menandakan checkpoint logis yang dapat dipause atau dilanjutkan.

## 🟩 Fase 1: Kerangka HTML & Folder Setup
- [x] **Task 1.1**: Buat sub-folder `web/` di dalam root project.
- [x] **Task 1.2**: Buat file [index.html](file:///d:/jp-invest/web/index.html) dasar dengan struktur semantic HTML5, tag meta SEO, dan load ES module `app.js` serta `style.css`.
- [x] **Task 1.3**: Buat kerangka layout utama di HTML (Sidebar Case Study, Main Dashboard, Control Panel).

---

## 🎨 Fase 2: Pembangunan CSS Design System (Industrial-Grunge Theme)
- [x] **Task 2.1**: Buat file [style.css](file:///d:/jp-invest/web/style.css):
  - Setup CSS Variables untuk warna (steel `#121316`, concrete `#1A1C20`, rust red `#EF4444`, acid green `#22C55E`, caution yellow `#D97706`).
  - Tambahkan blueprint grid pattern background menggunakan CSS linear-gradients.
  - Definisikan styling typography (Monospace & Bold Sans-Serif via Google Fonts).
  - Buat utility class untuk efek grunge/industri: `hazard-stripes`, mechanical button transitions (`active:translate-y-px`), solid chunky borders (`border: 2px solid`), dan neon glows.
  - Selesaikan styling layout responsive (Flexbox/Grid) untuk menyusun panel-panel instrumen cockpit.

---

## ⚙️ Fase 3: Porting Quantitative Engine & Data Fundamental
- [x] **Task 3.1**: Buat module calculator di [calculators.js](file:///d:/jp-invest/web/calculators.js):
  - Porting logic perhitungan BEP (Break-Even Point).
  - Porting logic perhitungan DCF (Discounted Cash Flow 5-year) dan NPV.
  - Porting logic perhitungan Black-Scholes Options Pricing.
- [x] **Task 3.2**: Susun dataset fundamental di [data.js](file:///d:/jp-invest/web/data.js):
  - Setup dataset Saham Publik (misal: BBCA fundamental metrics).
  - Setup dataset Unit Economics Startup (misal: CAC, LTV, Monthly Burn, Runway).
  - Setup dataset Proyek Sektor Riil (misal: CapEx, OpEx, Revenue Projection).

---

## 🛠️ Fase 4: Pembuatan Komponen & Logic UI (app.js)
- [x] **Task 4.1**: Hubungkan state manajemen dasar di [app.js](file:///d:/jp-invest/web/app.js) (menyimpan aset aktif, input parameter, dan riwayat simulasi).
- [x] **Task 4.2**: Implementasikan pemilih tipe aset (stocks, startups, conventional) yang memperbarui form input parameter secara dinamis.
- [x] **Task 4.3**: Buat fungsi rendering grafik SVG/Canvas bergaya osciloscope retro untuk menampilkan kurva BEP dan DCF Cashflow secara dinamis.
- [x] **Task 4.4**: Implementasikan simulasi debat AI Bull vs Bear dengan animasi ketikan retro (*typing terminal log*) dan visualisasi skor keyakinan (*Confidence Score*).
- [x] **Task 4.5**: Implementasikan toggle 3 Lensa Advisory (Operator, Risk, Predator) dan form input manual "Human Decision Log" yang menyimpan data langsung ke browser local storage.
- [x] **Task 4.6**: Tulis konten interaktif untuk Sidebar PM Case Study (menjelaskan framework produk, metrics, dan value proposition AI PM).

---

## ⚡ Fase 5: Integrasi & Verifikasi Lokal
- [x] **Task 5.1**: Hubungkan semua logic interaksi antara input sliders, kalkulator, visualizer grafik, dan debat terminal.
- [x] **Task 5.2**: Verifikasi manual dengan membuka `index.html` di Chrome browser lokal untuk memastikan interaksi bebas hambatan dan estetika industrial grunge terlihat konsisten.
- [x] **Task 5.3**: Uji penyimpanan data "Human Decision Log" ke LocalStorage dan pastikan log tersimpan saat halaman direfresh.

---

## 🌐 Fase 6: Deployment & Dokumentasi
- [x] **Task 6.1**: Buat panduan deployment ke GitHub Pages / Vercel (sangat mudah dengan upload folder `web/`).
- [x] **Task 6.2**: Lengkapi dokumentasi [README.md](file:///d:/jp-invest/web/README.md) di folder frontend.
