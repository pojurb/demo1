/**
 * data.js — Fundamental Datasets, AI Debates, and Advisory Board recommendations
 * for three asset verticals: Equities, Startups, and Conventional Businesses.
 */

const dataset = {
    stocks: [
        {
            id: 'bbca',
            name: 'PT Bank Central Asia Tbk (BBCA)',
            description: 'The largest private bank in Indonesia, serving as the benchmark for premium valuation due to strong low-cost funding (CASA) and high ROE.',
            // Inputs for Sandbox
            parameters: {
                price: 9200,
                eps: 680,
                pb: 4.8,
                roe: 22.5,
                discountRate: 0.10, // 10%
                terminalMult: 15,
                invested: 8500,
                cashflows: [600, 680, 780, 890, 1020] // Earnings/Dividend projection per share
            },
            // Agentic Debate Logs
            debate: {
                confidence: 85,
                bull: [
                    { agent: "Growth Lead", text: "CASA Ratio di level 80% memberikan cost of fund sangat rendah, melindunginya dari kenaikan suku bunga Bank Indonesia." },
                    { agent: "Technologist", text: "Aplikasi myBCA dan e-channel banking berhasil memproses milyaran transaksi harian, mengamankan fee-based income yang stabil." },
                    { agent: "Asset Allocator", text: "NPK (Non-Performing Loan) terjaga di 1.9%, jauh di bawah rata-rata industri perbankan nasional." }
                ],
                bear: [
                    { agent: "Valuation Bear", text: "P/B Ratio mendekati 4.8x sudah tergolong sangat premium (priced-in) dibandingkan bank regional SEA lainnya." },
                    { agent: "Macro Adversary", text: "Jika pertumbuhan GDP Indonesia melambat ke <5.0%, ekspansi kredit korporasi akan melemah." },
                    { agent: "Risk Skeptic", text: "Persaingan ketat dengan bank digital baru dan fintech lending berpotensi menggerus porsi retail CASA dalam jangka panjang." }
                ]
            },
            // Advisory Board Lenses
            advisory: {
                operator: {
                    title: "Operator Moat & Efficiency Lenses",
                    text: "SOP digitalisasi BBCA adalah standar emas industri. Strategi Operator harus fokus pada peningkatan kapasitas infrastruktur cloud untuk menghemat maintenance IT konvensional, serta mematenkan algoritma credit scoring internal untuk retail lending demi efisiensi biaya approval."
                },
                risk: {
                    title: "Risk Stress-Test & Survival Lenses",
                    text: "Skenario stress-test: Jika suku bunga naik ke 7%, NPL sektor korporasi diprediksi naik ke 3.5%. Mitigasi: Alokasikan lebih banyak likuiditas ke SBN (Surat Berharga Negara) bertenor pendek dan kurangi eksposur kredit pada sektor komoditas yang volatile."
                },
                predator: {
                    title: "Predator Opportunism & Fat Pitch Lenses",
                    text: "Momen Fat Pitch teridentifikasi jika terjadi koreksi IHSG irasional yang menyeret harga BBCA ke P/B < 3.8x (sekitar Rp 7.500 - Rp 8.000). Ayunkan modal secara agresif di level ini, karena secara historis valuasi BBCA selalu kembali pulih ke rata-rata P/B 4.5x dalam waktu 6-9 bulan."
                }
            }
        },
        {
            id: 'tlkm',
            name: 'PT Telkom Indonesia Tbk (TLKM)',
            description: 'BUMN telekomunikasi raksasa dengan pangsa pasar mobile terbesar di Indonesia (Telkomsel) dan infrastruktur broadband (Indibiz/Indihome) terluas.',
            parameters: {
                price: 3400,
                eps: 250,
                pb: 2.8,
                roe: 16.2,
                discountRate: 0.12, // 12%
                terminalMult: 10,
                invested: 3800,
                cashflows: [230, 250, 270, 290, 310]
            },
            debate: {
                confidence: 68,
                bull: [
                    { agent: "Infras Lead", text: "Infrastruktur fiber-optic nasional terbesar dan kepemilikan tower via Mitratel menjamin dominasi pasar konektivitas." },
                    { agent: "Cloud Architect", text: "Bisnis data center NeutraDC tumbuh pesat seiring tingginya adopsi cloud computing oleh BUMN & enterprise." }
                ],
                bear: [
                    { agent: "Yield Skeptic", text: "Tarif data (yield per GB) terus turun akibat perang harga telko yang tak kunjung usai." },
                    { agent: "Legacy Bear", text: "Beban pensiun karyawan dan belanja modal (CapEx) fiber-optic yang sangat berat membatasi dividen payout ratio." }
                ]
            },
            advisory: {
                operator: {
                    title: "Operator Moat & Efficiency Lenses",
                    text: "Fokus pada konsolidasi infrastruktur (FMC - Fixed Mobile Convergence) antara Telkomsel dan Indihome untuk mengeliminasi duplikasi tim sales dan teknisi di lapangan, menekan OpEx hingga 15%."
                },
                risk: {
                    title: "Risk Stress-Test & Survival Lenses",
                    text: "Krisis suku bunga tinggi berpotensi meningkatkan beban utang sindikasi. Batasi ekspansi fiber-optic non-produktif di luar wilayah urban utama dan lakukan restrukturisasi utang dalam denominasi USD ke IDR."
                },
                predator: {
                    title: "Predator Opportunism & Fat Pitch Lenses",
                    text: "Tunggu momen diskon ekstrim ketika aksi jual asing menyeret TLKM di bawah P/E 10x. Ini adalah level 'Margin of Safety' yang tebal untuk jangka panjang."
                }
            }
        }
    ],
    
    startups: [
        {
            id: 'fintech-x',
            name: 'PayGuard (Fintech Lending Series B)',
            description: 'Startup fintech yang fokus pada digital invoice factoring untuk UKM di Indonesia dengan credit scoring berbasis AI.',
            parameters: {
                cash: 18000000000, // Rp 18M cash balance
                burn: 1200000000,  // Rp 1.2M monthly burn
                cac: 1500000,      // Rp 1.5M CAC
                arpu: 450000,      // Rp 450rb monthly ARPU
                margin: 0.70,      // 70% gross margin
                churn: 0.04        // 4% monthly churn rate
            },
            debate: {
                confidence: 75,
                bull: [
                    { agent: "Risk Modeling", text: "Algoritma AI berhasil menekan NPL (Non-Performing Loan) di level 1.8%, jauh di bawah batas OJK 5%." },
                    { agent: "BizDev Lead", text: "Kolaborasi dengan platform e-commerce B2B meningkatkan loan volume bulanan sebesar 35% secara organik." }
                ],
                bear: [
                    { agent: "Liquidity Analyst", text: "Runway tersisa kurang dari 15 bulan, sementara likuiditas pasar modal untuk pendanaan Seri C sedang mengalami Tech Winter." },
                    { agent: "Regulatory Bear", text: "Regulasi baru OJK yang membatasi batas atas bunga pinjaman produktif akan membatasi profit margin perusahaan." }
                ]
            },
            advisory: {
                operator: {
                    title: "Operator Moat & Efficiency Lenses",
                    text: "Segera lakukan otomatisasi credit assessment menggunakan model data terdistribusi. Kurangi staff review manual di lapangan untuk menghemat unit economics per loan disbursement."
                },
                risk: {
                    title: "Risk Stress-Test & Survival Lenses",
                    text: "Stress-test runway: Monthly burn harus dikurangi 25% dari Rp 1.2M menjadi Rp 900jt melalui moratorium hiring dan efisiensi cloud server, memperpanjang runway menjadi 20 bulan demi mengamankan fundraising window."
                },
                predator: {
                    title: "Predator Opportunism & Fat Pitch Lenses",
                    text: "Gunakan kondisi Tech Winter untuk mengakuisisi startup fintech kecil yang kehabisan runway di valuasi murah, mengintegrasikan database merchant mereka untuk mempercepat ekspansi pasar."
                }
            }
        },
        {
            id: 'saas-builder',
            name: 'Omni Retail SaaS',
            description: 'SaaS POS (Point of Sales) dan manajemen inventaris multi-channel untuk brand fashion lokal dan UMKM retail.',
            parameters: {
                cash: 8000000000,
                burn: 450000000,
                cac: 600000,
                arpu: 180000,
                margin: 0.85,
                churn: 0.02
            },
            debate: {
                confidence: 89,
                bull: [
                    { agent: "Retention Advocate", text: "Churn sangat rendah di angka 2% per bulan menunjukkan product-market fit yang sangat kuat dan stickiness produk yang tinggi." },
                    { agent: "Unit Econ", text: "LTV/CAC ratio di level 4.25x membuktikan efisiensi konversi marketing budget yang sangat sehat." }
                ],
                bear: [
                    { agent: "TAM Critic", text: "Pasar UMKM retail di Indonesia sangat sensitif harga; ARPU sulit dinaikkan di atas Rp 200rb/bulan tanpa risiko churn melonjak." },
                    { agent: "Competitor Bear", text: "Banyak POS gratisan yang disubsidi oleh platform dompet digital (e-wallet) untuk mengincar merchant volume." }
                ]
            },
            advisory: {
                operator: {
                    title: "Operator Moat & Efficiency Lenses",
                    text: "Tambahkan fitur supply chain integration (menghubungkan toko ke produsen bahan baku) untuk menciptakan ekosistem moat yang mustahil diganti oleh POS gratisan biasa."
                },
                risk: {
                    title: "Risk Stress-Test & Survival Lenses",
                    text: "Sediakan paket berlangganan tahunan berdiskon untuk menarik cash upfront, mengamankan net cash-flow lebih awal di tengah ketidakpastian makro."
                },
                predator: {
                    title: "Predator Opportunism & Fat Pitch Lenses",
                    text: "Targetkan brand ritel besar yang tidak puas dengan software enterprise luar negeri yang mahal; tawarkan migrasi sistem custom dengan kontrak jangka panjang."
                }
            }
        }
    ],
    
    conventional: [
        {
            id: 'laundry-franchise',
            name: 'SpinExpress (Laundry Koin 10 Cabang)',
            description: 'Rencana investasi ekspansi outlet laundry koin premium di kawasan apartemen padat penduduk Jabodetabek.',
            parameters: {
                fixed: 180000000,   // Rp 180jt fixed cost per outlet per tahun (sewa + gaji + penyusutan mesin)
                price: 45000,       // Rp 45rb per load cuci + kering
                variable: 12000,    // Rp 12rb variable cost (air, listrik, deterjen, gas mesin pengering)
                invested: 350000000 // Rp 350jt total modal awal per outlet
            },
            debate: {
                confidence: 79,
                bull: [
                    { agent: "Cashflow Lead", text: "Bisnis berbasis cash-upfront (koin/e-wallet), tidak ada piutang macet. Working capital sangat bersih." },
                    { agent: "Location Expert", text: "Apartemen kelas menengah ke bawah dengan unit tanpa balkon jemuran menjamin occupancy rate mesin >60%." }
                ],
                bear: [
                    { agent: "CapEx Bear", text: "Depresiasi mesin cuci komersial berkecepatan tinggi sangat cepat, biaya maintenance naik setelah tahun ke-2." },
                    { agent: "Utility Risk", text: "Sensitif terhadap kenaikan tarif dasar listrik dan gas LPG 3kg/12kg yang fluktuatif." }
                ]
            },
            advisory: {
                operator: {
                    title: "Operator Moat & Efficiency Lenses",
                    text: "Terapkan SOP pencatatan beban utilitas harian via IoT meteran air & listrik untuk mendeteksi kebocoran gas/air lebih cepat. Integrasikan aplikasi booking mesin agar antrean teratur."
                },
                risk: {
                    title: "Risk Stress-Test & Survival Lenses",
                    text: "Stress-test: Jika sewa ruko naik 30% dan pelanggan turun 20%, hitung ulang BEP harian. Mitigasi: Ikat kontrak sewa jangka panjang (minimal 5 tahun) di awal dengan opsi penyesuaian sewa bertahap."
                },
                predator: {
                    title: "Predator Opportunism & Fat Pitch Lenses",
                    text: "Cari kompetitor laundry terdekat yang mesinnya terbengkalai/pemiliknya bosan mengelola; tawarkan akuisisi lokasi di bawah nilai likuidasi mesin (distressed asset purchase)."
                }
            }
        },
        {
            id: 'coffee-shop',
            name: 'Kopi Kencana (Coffee Shop & Roastery)',
            description: 'Rencana pendirian outlet specialty coffee shop dengan konsep roastery mandiri di area komersial sub-urban.',
            parameters: {
                fixed: 240000000,
                price: 35000,
                variable: 8500,
                invested: 500000000
            },
            debate: {
                confidence: 72,
                bull: [
                    { agent: "Roastery Moat", text: "Me-roast biji kopi sendiri menekan variable cost (COGS) kopi susu dari Rp 12rb menjadi Rp 8.5rb, menghasilkan margin kotor 75%." },
                    { agent: "Social Space", text: "Konsep co-working space dan meeting room menarik segmen korporat yang loyal dengan billing per transaction lebih tinggi." }
                ],
                bear: [
                    { agent: "Saturated Bear", text: "Kepadatan kedai kopi di radius 1 km sudah mencapai tingkat jenuh. Biaya marketing untuk akuisisi pelanggan baru tinggi." },
                    { agent: "Churn Risk", text: "Minimnya loyalitas pelanggan specialty coffee karena mereka selalu mencari tempat baru untuk estetika media sosial." }
                ]
            },
            advisory: {
                operator: {
                    title: "Operator Moat & Efficiency Lenses",
                    text: "Jual biji kopi sangrai (packaged beans) ke cafe-cafe kecil lain di sekitar kota untuk memaksimalkan utilitas kapasitas mesin roasting yang mahal."
                },
                risk: {
                    title: "Risk Stress-Test & Survival Lenses",
                    text: "Jika harga green beans komoditas naik 40%, segera diversifikasi blend dengan robusta berkualitas tinggi tanpa merusak cita rasa utama."
                },
                predator: {
                    title: "Predator Opportunism & Fat Pitch Lenses",
                    text: "Jika ada kedai kopi tetangga yang bangkrut, beli mesin espresso La Marzocco bekas mereka di harga 40% diskon pasar untuk stok ekspansi outlet kedua."
                }
            }
        }
    ]
};

// Bind to window object
window.portfolioData = dataset;
