# ⚙️ JP Family Office — AI PM Portfolio & Cockpit

Aplikasi ini adalah **Portfolio Web App & Interactive Cockpit** yang dirancang khusus untuk memposisikan **Johannes Purba** sebagai **AI Product Manager (AI PM)**. Aplikasi ini mendemonstrasikan kemampuan *product thinking*, desain interaksi kecerdasan buatan (*AI-UX*), serta validasi logika bisnis kuantitatif.

---

## 🎯 Product Objective & Problem Statement

*   **Problem**: Dalam mengelola dana keluarga (*Family Office*), investor harus menganalisis tiga vertikal aset yang memiliki metrik sangat bertolak belakang (Saham, Startup VC, Bisnis Konvensional). Proses ini rentan terhadap **bias konfirmasi manusia** (hanya melihat sisi positif) dan waktu analisis manual yang lambat (~8 jam per aset).
*   **Solution**: Sebuah kokpit instrumen finansial yang menggabungkan:
    1.  **Quantitative Engine Sandbox**: Kalkulator instan untuk DCF, BEP, LTV/CAC, dan Runway.
    2.  **Multi-Agent Red Teaming**: Simulasi debat otonom antara agen **BULL** dan **BEAR** untuk menetralisir bias optimisme berlebih.
    3.  **The 3-Lens Advisory Board**: Memecah analisis menjadi skenario taktis (Operator), skenario survival (Risk), dan skenario agresif (Predator).
    4.  **Human-in-the-Loop Protocol**: AI dilarang mengambil keputusan akhir. Keputusan eksekusi diinput oleh manusia dan disimpan dalam jurnal audit (*Committed Decision Log*).

---

## 🎨 Design Theme: Industrial & Grunge Cockpit

Desain visual aplikasi menggunakan pendekatan **Industrial/Brutalist Grunge**:
*   **Estetika Mesin Berat**: Border solid tebal (`2px`), minim sudut membulat (*no heavy border-radius*), grid blueprint bernuansa gelap (`#121316`), dan hazard stripes kuning-hitam di area sensitif risiko.
*   **Fisik & Mekanis**: Tombol-tombol navigasi dan input sliders didesain menyerupai tombol kendali pabrik konvensional yang memendek secara visual saat ditekan (*active button press effect*).
*   **Retro Technical**: Visualisasi kurva Break-Even Point (BEP) dan arus kas DCF digambar secara dinamis dalam format SVG menyerupai layar osiloskop/radar kuno.

---

## 📂 Struktur Kode (Zero-Dependency Direct Script Loading)

Seluruh aplikasi dibangun dengan teknologi web fundamental (HTML, CSS, Vanilla JS) tanpa dependensi library pihak ketiga atau build step, di-load secara sequential agar 100% aman dijalankan secara lokal:

```text
web/
├── index.html       # Struktur HTML5 + logika app inline (interaksi DOM, typewriter debat, state manager)
├── style.css        # Variabel warna, grid cockpit, status LED, dan animasi grunge
├── calculators.js   # Porting formula keuangan (DCF, NPV, BEP, IRR, LTV, CAC, Black-Scholes)
└── data.js          # Dataset fundamental aset, log perdebatan agen, dan teks lensa
```

---

## 🚀 Cara Menjalankan Secara Lokal (Zero-Setup & Zero-Dependency)

Aplikasi ini telah dioptimalkan agar **100% kompatibel dengan protokol `file://`**. Ini berarti Anda tidak memerlukan web server (seperti Python atau Node.js) sama sekali!

### Cara Tercepat (Tinggal Double-Click):
1. Buka folder `web/` di File Explorer Anda.
2. Klik ganda (double-click) pada file **`index.html`**.
3. Aplikasi Cockpit Interaktif akan langsung terbuka dan berfungsi penuh di web browser Anda!

### Alternatif (Jika ingin menggunakan Local Server):
Jika Anda tetap ingin menggunakan protokol HTTP untuk mensimulasikan lingkungan produksi:
1. Jalankan perintah berikut menggunakan Python (jika tersedia):
   ```bash
   cd web
   python -m http.server 8000
   ```
   Lalu buka browser Anda di: `http://localhost:8000`
2. Atau buka folder `web/` di VS Code dan jalankan ekstensi **Live Server**.

---

## 🌐 Panduan Deployment (100% Gratis)

Aplikasi statis ini sangat mudah dideploy dalam waktu kurang dari 2 menit:

### 1. Vercel (Rekomendasi)
*   Hubungkan repositori GitHub Anda ke Vercel.
*   Set **Root Directory** ke folder `web`.
*   Klik **Deploy**. Selesai!

### 2. GitHub Pages
*   Push repositori Anda ke GitHub.
*   Masuk ke Settings > Pages pada repositori Anda.
*   Pilih branch utama Anda dan arahkan folder build ke `/` (jika repo Anda hanya berisi folder `web`, atau gunakan GitHub Action untuk mengarahkan subfolder `web` ke GitHub Pages).
