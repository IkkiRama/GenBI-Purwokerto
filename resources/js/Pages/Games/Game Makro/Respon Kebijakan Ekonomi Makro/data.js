export const SECTORS = [
    { id: "Manufaktur", icon: "🏭", desc: "Hilirisasi" },
    { id: "Energi", icon: "⚡", desc: "Transisi Energi" },
    { id: "Digital", icon: "📡", desc: "AI & Data" },
    { id: "Maritim", icon: "🚢", desc: "Logistik" },
    { id: "Pangan", icon: "🌾", desc: "Ketahanan" },
    { id: "Finansial", icon: "🏦", desc: "Stabilitas" },
    { id: "Pendidikan", icon: "🎓", desc: "SDM" },
    { id: "Pertahanan", icon: "🛡️", desc: "Geopolitik" },
];

export const SCENARIOS = {
    Manufaktur: [
        {
            t: "Hilirisasi Nikel Nasional",
            d: "Tekanan global meningkat untuk ekspor bahan mentah, sementara pemerintah ingin meningkatkan nilai tambah dalam negeri.",
            o: [
                {
                    t: "Larangan ekspor total",
                    s: 90,
                    f: "Mendorong industrialisasi cepat.",
                },
                {
                    t: "Kuota ekspor terbatas",
                    s: 80,
                    f: "Transisi lebih stabil.",
                },
                { t: "Ekspor bebas", s: 40, f: "Nilai tambah hilang." },
                {
                    t: "Kerjasama asing",
                    s: 70,
                    f: "Transfer teknologi tapi ada risiko dominasi.",
                },
                {
                    t: "Fokus UMKM turunan",
                    s: 60,
                    f: "Dampak luas tapi lambat.",
                },
            ],
            i: "Pendekatan ideal adalah kombinasi larangan ekspor terbatas dengan percepatan pembangunan smelter domestik serta kewajiban transfer teknologi untuk memastikan nilai tambah maksimal tetap berada di dalam negeri.",
        },

        {
            t: "Ketergantungan Impor Bahan Baku",
            d: "Sebagian besar bahan baku industri masih berasal dari impor.",
            o: [
                {
                    t: "Bangun industri bahan baku lokal",
                    s: 90,
                    f: "Kemandirian meningkat.",
                },
                {
                    t: "Diversifikasi negara impor",
                    s: 75,
                    f: "Risiko geopolitik berkurang.",
                },
                { t: "Subsidi impor", s: 50, f: "Tidak sustainable." },
                {
                    t: "Biarkan pasar",
                    s: 40,
                    f: "Ketergantungan tetap tinggi.",
                },
                {
                    t: "Kerjasama regional",
                    s: 80,
                    f: "Supply chain lebih stabil.",
                },
            ],
            i: "Strategi ideal adalah membangun kapasitas produksi bahan baku domestik secara bertahap sambil menjaga stabilitas rantai pasok melalui diversifikasi impor dan kerja sama regional.",
        },

        {
            t: "Otomatisasi Industri",
            d: "Perusahaan mulai mengganti tenaga kerja dengan mesin otomatis.",
            o: [
                {
                    t: "Dorong otomatisasi penuh",
                    s: 85,
                    f: "Produktivitas tinggi.",
                },
                { t: "Batasi otomatisasi", s: 50, f: "Lindungi tenaga kerja." },
                {
                    t: "Upskilling tenaga kerja",
                    s: 95,
                    f: "Solusi jangka panjang terbaik.",
                },
                { t: "Subsidi tenaga kerja", s: 60, f: "Menahan perubahan." },
                { t: "Hybrid automation", s: 80, f: "Seimbang." },
            ],
            i: "Pendekatan ideal adalah mengintegrasikan otomatisasi dengan program peningkatan keterampilan tenaga kerja agar produktivitas meningkat tanpa menciptakan pengangguran struktural.",
        },

        {
            t: "Overcapacity Industri",
            d: "Produksi berlebih menyebabkan harga jatuh di pasar.",
            o: [
                { t: "Kurangi produksi", s: 70, f: "Harga stabil." },
                { t: "Ekspor agresif", s: 85, f: "Serap pasar global." },
                { t: "Diversifikasi produk", s: 90, f: "Kurangi risiko." },
                { t: "Biarkan pasar", s: 40, f: "Inefisiensi." },
                { t: "Subsidi produksi", s: 50, f: "Beban fiskal." },
            ],
            i: "Strategi terbaik adalah melakukan diversifikasi produk dan ekspansi pasar ekspor untuk menjaga keseimbangan antara produksi dan permintaan.",
        },

        {
            t: "Rendahnya Produktivitas Industri",
            d: "Output industri stagnan meskipun investasi meningkat.",
            o: [
                { t: "Reformasi manajemen", s: 85, f: "Efisiensi meningkat." },
                { t: "Tambah tenaga kerja", s: 60, f: "Tidak efektif." },
                {
                    t: "Investasi teknologi",
                    s: 95,
                    f: "Produktivitas melonjak.",
                },
                {
                    t: "Subsidi operasional",
                    s: 50,
                    f: "Tidak menyelesaikan akar masalah.",
                },
                { t: "Benchmark global", s: 80, f: "Standar meningkat." },
            ],
            i: "Pendekatan ideal adalah mendorong adopsi teknologi dan reformasi manajemen berbasis best practice global untuk meningkatkan efisiensi dan daya saing industri.",
        },

        {
            t: "Persaingan Produk Impor Murah",
            d: "Produk luar negeri lebih murah dan menguasai pasar domestik.",
            o: [
                {
                    t: "Tarif impor tinggi",
                    s: 80,
                    f: "Lindungi industri lokal.",
                },
                { t: "Anti dumping", s: 85, f: "Fair competition." },
                { t: "Biarkan pasar", s: 40, f: "Industri lokal tertekan." },
                { t: "Subsidi industri lokal", s: 70, f: "Dorong daya saing." },
                {
                    t: "Inovasi produk lokal",
                    s: 90,
                    f: "Solusi jangka panjang.",
                },
            ],
            i: "Strategi ideal adalah kombinasi perlindungan moderat dan peningkatan daya saing melalui inovasi produk serta efisiensi produksi.",
        },

        {
            t: "Krisis Rantai Pasok Global",
            d: "Gangguan global menyebabkan keterlambatan bahan baku.",
            o: [
                { t: "Diversifikasi supplier", s: 90, f: "Risiko berkurang." },
                { t: "Stok besar", s: 70, f: "Biaya tinggi." },
                { t: "Produksi lokal", s: 85, f: "Kemandirian." },
                { t: "Biarkan pasar", s: 40, f: "Rentan." },
                { t: "Kerjasama regional", s: 80, f: "Stabilitas." },
            ],
            i: "Pendekatan terbaik adalah diversifikasi rantai pasok dan penguatan produksi lokal untuk meningkatkan ketahanan industri terhadap guncangan global.",
        },

        {
            t: "Standar Lingkungan Industri",
            d: "Tekanan global untuk produksi ramah lingkungan meningkat.",
            o: [
                { t: "Regulasi ketat", s: 85, f: "Lingkungan terjaga." },
                { t: "Insentif hijau", s: 90, f: "Dorong adaptasi." },
                { t: "Biarkan industri", s: 40, f: "Risiko lingkungan." },
                { t: "Pajak karbon", s: 80, f: "Tekanan finansial." },
                { t: "Transisi bertahap", s: 88, f: "Realistis." },
            ],
            i: "Strategi ideal adalah mendorong transisi industri hijau melalui kombinasi insentif dan regulasi bertahap agar tetap kompetitif secara global.",
        },

        {
            t: "Keterbatasan SDM Industri",
            d: "Tenaga kerja tidak memiliki skill sesuai kebutuhan industri modern.",
            o: [
                { t: "Pelatihan vokasi", s: 95, f: "Solusi utama." },
                {
                    t: "Impor tenaga kerja",
                    s: 60,
                    f: "Cepat tapi tidak sustainable.",
                },
                { t: "Biarkan pasar", s: 40, f: "Mismatch terus." },
                { t: "Kolaborasi kampus-industri", s: 90, f: "Link & match." },
                { t: "Subsidi pendidikan", s: 75, f: "Dampak jangka panjang." },
            ],
            i: "Pendekatan ideal adalah membangun sistem pendidikan vokasi berbasis industri yang terintegrasi dengan kebutuhan pasar kerja.",
        },

        {
            t: "Investasi Asing di Manufaktur",
            d: "Investor asing ingin masuk besar-besaran ke sektor manufaktur.",
            o: [
                { t: "Buka penuh investasi", s: 80, f: "Modal masuk besar." },
                { t: "Batasi kepemilikan", s: 85, f: "Jaga kontrol nasional." },
                {
                    t: "Wajib transfer teknologi",
                    s: 95,
                    f: "Nilai strategis tinggi.",
                },
                { t: "Tolak investasi asing", s: 50, f: "Kehilangan peluang." },
                { t: "Joint venture", s: 90, f: "Win-win solution." },
            ],
            i: "Strategi ideal adalah mendorong investasi asing dengan syarat transfer teknologi dan kemitraan lokal agar memberikan dampak jangka panjang bagi industrialisasi nasional.",
        },
    ],

    Energi: [
        {
            t: "Lonjakan Harga Minyak Global",
            d: "Harga minyak dunia melonjak drastis dan membebani APBN serta inflasi domestik.",
            o: [
                {
                    t: "Tambah subsidi BBM besar-besaran",
                    s: 55,
                    f: "Menjaga daya beli tapi membebani fiskal.",
                },
                {
                    t: "Kurangi subsidi secara tiba-tiba",
                    s: 60,
                    f: "Fiskal sehat tapi shock ke masyarakat.",
                },
                {
                    t: "Subsidi tepat sasaran berbasis data",
                    s: 90,
                    f: "Efektif dan efisien.",
                },
                {
                    t: "Kontrol harga nasional",
                    s: 65,
                    f: "Stabil jangka pendek tapi distorsi pasar.",
                },
                {
                    t: "Biarkan harga mengikuti pasar",
                    s: 50,
                    f: "Efisien tapi risiko sosial tinggi.",
                },
            ],
            i: "Pendekatan ideal adalah mengalihkan subsidi menjadi tepat sasaran berbasis data, disertai reformasi bertahap harga energi untuk menjaga stabilitas fiskal tanpa menimbulkan gejolak sosial.",
        },

        {
            t: "Transisi Energi dari Batubara",
            d: "Tekanan global meningkat untuk menghentikan PLTU batubara.",
            o: [
                {
                    t: "Tutup PLTU secara cepat",
                    s: 60,
                    f: "Pro lingkungan tapi berisiko blackout.",
                },
                { t: "Transisi bertahap", s: 90, f: "Lebih realistis." },
                { t: "Tetap gunakan batubara", s: 40, f: "Tidak sustainable." },
                {
                    t: "Impor energi bersih",
                    s: 65,
                    f: "Cepat tapi bergantung luar.",
                },
                {
                    t: "Hybrid energi (batubara + EBT)",
                    s: 85,
                    f: "Transisi lebih stabil.",
                },
            ],
            i: "Strategi terbaik adalah melakukan transisi bertahap dengan kombinasi energi konvensional dan terbarukan, sambil memastikan kesiapan infrastruktur dan stabilitas pasokan listrik nasional.",
        },

        {
            t: "Investasi Energi Terbarukan Rendah",
            d: "Investor kurang tertarik pada proyek energi terbarukan.",
            o: [
                {
                    t: "Berikan insentif fiskal besar",
                    s: 90,
                    f: "Menarik investor.",
                },
                {
                    t: "Biarkan pasar menentukan",
                    s: 50,
                    f: "Pertumbuhan lambat.",
                },
                {
                    t: "Pinjaman luar negeri besar",
                    s: 65,
                    f: "Cepat tapi risiko utang.",
                },
                {
                    t: "Wajibkan penggunaan EBT",
                    s: 70,
                    f: "Dorong demand tapi bisa membebani industri.",
                },
                {
                    t: "Public-private partnership",
                    s: 85,
                    f: "Risiko terbagi.",
                },
            ],
            i: "Pendekatan ideal adalah mengkombinasikan insentif fiskal dengan skema kemitraan publik-swasta untuk menurunkan risiko investasi dan mempercepat pengembangan energi terbarukan.",
        },

        {
            t: "Ketahanan Energi Nasional",
            d: "Pasokan energi terganggu akibat konflik geopolitik global.",
            o: [
                {
                    t: "Bangun cadangan energi strategis",
                    s: 90,
                    f: "Resilience tinggi.",
                },
                {
                    t: "Tingkatkan impor dari satu negara",
                    s: 40,
                    f: "Risiko tinggi.",
                },
                { t: "Diversifikasi sumber energi", s: 85, f: "Lebih aman." },
                {
                    t: "Aliansi energi regional",
                    s: 80,
                    f: "Stabilitas meningkat.",
                },
                {
                    t: "Kurangi konsumsi energi nasional",
                    s: 70,
                    f: "Efektif tapi menekan ekonomi.",
                },
            ],
            i: "Strategi terbaik adalah membangun cadangan energi nasional dan melakukan diversifikasi sumber energi untuk mengurangi ketergantungan pada satu sumber atau wilayah.",
        },

        {
            t: "Subsidi Listrik Rumah Tangga",
            d: "Subsidi listrik membengkak dan tidak tepat sasaran.",
            o: [
                {
                    t: "Hapus subsidi total",
                    s: 60,
                    f: "Fiskal sehat tapi dampak sosial tinggi.",
                },
                { t: "Subsidi tepat sasaran", s: 92, f: "Efisien dan adil." },
                { t: "Tambah subsidi", s: 50, f: "Populis tapi membebani." },
                {
                    t: "Flat tariff nasional",
                    s: 65,
                    f: "Sederhana tapi tidak adil.",
                },
                {
                    t: "Biarkan PLN menentukan harga",
                    s: 70,
                    f: "Lebih fleksibel.",
                },
            ],
            i: "Pendekatan ideal adalah reformasi subsidi listrik menjadi tepat sasaran berbasis data ekonomi rumah tangga, sehingga efisiensi fiskal tercapai tanpa mengorbankan kelompok rentan.",
        },

        {
            t: "Pengembangan Kendaraan Listrik",
            d: "Pemerintah ingin mempercepat adopsi kendaraan listrik.",
            o: [
                {
                    t: "Subsidi pembelian EV besar",
                    s: 80,
                    f: "Adopsi cepat tapi mahal.",
                },
                { t: "Bangun infrastruktur dulu", s: 90, f: "Fondasi kuat." },
                {
                    t: "Wajibkan penggunaan EV",
                    s: 60,
                    f: "Cepat tapi tidak realistis.",
                },
                { t: "Biarkan pasar berkembang", s: 55, f: "Lambat." },
                {
                    t: "Fokus industri baterai",
                    s: 85,
                    f: "Nilai strategis tinggi.",
                },
            ],
            i: "Strategi ideal adalah membangun ekosistem kendaraan listrik secara menyeluruh, dimulai dari infrastruktur dan industri pendukung sebelum mendorong adopsi massal.",
        },

        {
            t: "Ketergantungan pada Energi Fosil",
            d: "Sebagian besar energi masih berasal dari fosil.",
            o: [
                {
                    t: "Kurangi drastis fosil",
                    s: 60,
                    f: "Risiko gangguan pasokan.",
                },
                { t: "Transisi bertahap", s: 90, f: "Stabil." },
                { t: "Tetap fosil", s: 40, f: "Tidak sustainable." },
                {
                    t: "Impor energi bersih",
                    s: 65,
                    f: "Cepat tapi bergantung.",
                },
                {
                    t: "Diversifikasi energi domestik",
                    s: 85,
                    f: "Lebih mandiri.",
                },
            ],
            i: "Pendekatan terbaik adalah melakukan transisi bertahap dengan fokus pada diversifikasi energi domestik untuk menjaga stabilitas dan keberlanjutan.",
        },

        {
            t: "Harga Listrik Industri",
            d: "Industri mengeluhkan tarif listrik tinggi.",
            o: [
                {
                    t: "Turunkan tarif listrik",
                    s: 75,
                    f: "Daya saing naik tapi fiskal tertekan.",
                },
                { t: "Subsidi industri", s: 65, f: "Tidak efisien." },
                {
                    t: "Efisiensi energi industri",
                    s: 90,
                    f: "Solusi jangka panjang.",
                },
                { t: "Biarkan pasar", s: 50, f: "Industri tertekan." },
                {
                    t: "Tarif khusus industri strategis",
                    s: 85,
                    f: "Lebih terarah.",
                },
            ],
            i: "Strategi ideal adalah mendorong efisiensi energi di sektor industri serta memberikan insentif terbatas pada sektor strategis untuk meningkatkan daya saing tanpa membebani fiskal.",
        },

        {
            t: "Pengelolaan Sumber Daya Gas",
            d: "Cadangan gas nasional terbatas dan permintaan meningkat.",
            o: [
                {
                    t: "Prioritaskan domestik",
                    s: 85,
                    f: "Ketahanan meningkat.",
                },
                {
                    t: "Ekspor gas",
                    s: 60,
                    f: "Pendapatan naik tapi domestik berisiko.",
                },
                { t: "Impor gas", s: 65, f: "Stabil tapi tergantung luar." },
                {
                    t: "Efisiensi penggunaan",
                    s: 90,
                    f: "Optimalisasi sumber daya.",
                },
                { t: "Alihkan ke energi lain", s: 80, f: "Diversifikasi." },
            ],
            i: "Pendekatan terbaik adalah memprioritaskan kebutuhan domestik sambil meningkatkan efisiensi penggunaan dan melakukan diversifikasi energi untuk mengurangi tekanan pada sumber daya gas.",
        },

        {
            t: "Tekanan Net Zero Emission",
            d: "Komitmen global menuntut percepatan target net zero.",
            o: [
                {
                    t: "Percepat target drastis",
                    s: 65,
                    f: "Ambisius tapi berisiko ekonomi.",
                },
                {
                    t: "Target realistis bertahap",
                    s: 90,
                    f: "Lebih sustainable.",
                },
                { t: "Tunda komitmen", s: 40, f: "Tekanan global meningkat." },
                {
                    t: "Beli carbon credit",
                    s: 70,
                    f: "Cepat tapi tidak struktural.",
                },
                {
                    t: "Fokus teknologi hijau",
                    s: 85,
                    f: "Solusi jangka panjang.",
                },
            ],
            i: "Strategi ideal adalah menetapkan target net zero yang realistis dengan fokus pada pengembangan teknologi hijau domestik dan transisi energi yang terukur.",
        },
    ],

    Digital: [
        {
            t: "Kedaulatan Data Nasional",
            d: "Data pengguna Indonesia banyak disimpan di luar negeri oleh platform global.",
            o: [
                {
                    t: "Wajibkan semua data di dalam negeri",
                    s: 85,
                    f: "Kedaulatan meningkat tapi biaya tinggi.",
                },
                {
                    t: "Izinkan bebas lintas negara",
                    s: 50,
                    f: "Efisien tapi berisiko keamanan.",
                },
                {
                    t: "Hybrid data localization",
                    s: 92,
                    f: "Seimbang antara keamanan dan efisiensi.",
                },
                {
                    t: "Serahkan ke mekanisme pasar",
                    s: 45,
                    f: "Kontrol negara lemah.",
                },
                {
                    t: "Kerjasama bilateral data",
                    s: 75,
                    f: "Solusi diplomatik.",
                },
            ],
            i: "Pendekatan ideal adalah menerapkan skema hybrid data localization sesuai prinsip perlindungan data pribadi, di mana data sensitif wajib berada di dalam negeri sementara data non-strategis dapat dikelola lintas batas dengan pengawasan ketat.",
        },

        {
            t: "Implementasi UU Perlindungan Data Pribadi",
            d: "Perusahaan digital belum sepenuhnya patuh terhadap regulasi perlindungan data.",
            o: [
                {
                    t: "Penegakan hukum ketat",
                    s: 90,
                    f: "Perlindungan kuat tapi bisa menghambat inovasi.",
                },
                { t: "Sanksi ringan", s: 55, f: "Kurang efektif." },
                { t: "Edukasi & transisi bertahap", s: 85, f: "Adaptif." },
                {
                    t: "Biarkan industri menyesuaikan sendiri",
                    s: 45,
                    f: "Risiko kebocoran tinggi.",
                },
                { t: "Insentif kepatuhan", s: 80, f: "Dorong compliance." },
            ],
            i: "Strategi terbaik adalah kombinasi penegakan hukum yang tegas dengan masa transisi dan edukasi bagi pelaku industri agar kepatuhan terhadap perlindungan data dapat berjalan tanpa menghambat inovasi.",
        },

        {
            t: "Dominasi Big Tech Global",
            d: "Perusahaan teknologi global mendominasi pasar digital nasional.",
            o: [
                {
                    t: "Regulasi anti-monopoli ketat",
                    s: 85,
                    f: "Fair competition.",
                },
                {
                    t: "Proteksi startup lokal",
                    s: 75,
                    f: "Dukung lokal tapi bisa tidak efisien.",
                },
                {
                    t: "Biarkan pasar bebas",
                    s: 50,
                    f: "Dominasi asing berlanjut.",
                },
                {
                    t: "Kolaborasi dengan big tech",
                    s: 80,
                    f: "Transfer knowledge.",
                },
                {
                    t: "Pajak digital tinggi",
                    s: 70,
                    f: "Pendapatan negara naik.",
                },
            ],
            i: "Pendekatan ideal adalah mengatur kompetisi secara adil melalui regulasi anti-monopoli sambil mendorong kolaborasi strategis untuk transfer teknologi dan penguatan ekosistem lokal.",
        },

        {
            t: "Konten Negatif di Platform Digital",
            d: "Penyebaran hoaks dan konten berbahaya meningkat.",
            o: [
                { t: "Blokir platform", s: 60, f: "Cepat tapi ekstrem." },
                { t: "Regulasi moderasi konten", s: 85, f: "Lebih terarah." },
                {
                    t: "Biarkan kebebasan penuh",
                    s: 40,
                    f: "Risiko sosial tinggi.",
                },
                {
                    t: "Edukasi literasi digital",
                    s: 90,
                    f: "Solusi jangka panjang.",
                },
                {
                    t: "Kerjasama dengan platform",
                    s: 80,
                    f: "Efektif jika diawasi.",
                },
            ],
            i: "Strategi terbaik adalah menggabungkan regulasi moderasi konten dengan peningkatan literasi digital masyarakat serta kerja sama dengan platform untuk menjaga keseimbangan antara kebebasan berekspresi dan keamanan informasi.",
        },

        {
            t: "Pengembangan AI Nasional",
            d: "Indonesia tertinggal dalam pengembangan kecerdasan buatan.",
            o: [
                { t: "Investasi besar AI", s: 90, f: "Dorong daya saing." },
                { t: "Kerjasama global", s: 85, f: "Transfer teknologi." },
                { t: "Biarkan swasta berkembang", s: 60, f: "Tidak terarah." },
                { t: "Fokus regulasi dulu", s: 70, f: "Aman tapi lambat." },
                { t: "Batasi AI karena risiko", s: 50, f: "Tertinggal." },
            ],
            i: "Pendekatan ideal adalah mengembangkan AI nasional melalui investasi strategis dan kolaborasi global dengan tetap memastikan kerangka regulasi etis dan perlindungan data yang kuat.",
        },

        {
            t: "Keamanan Siber Nasional",
            d: "Serangan siber terhadap infrastruktur kritikal meningkat.",
            o: [
                {
                    t: "Bangun cyber defense nasional",
                    s: 95,
                    f: "Perlindungan maksimal.",
                },
                { t: "Outsource keamanan", s: 60, f: "Cepat tapi bergantung." },
                { t: "Regulasi ketat", s: 80, f: "Kontrol meningkat." },
                { t: "Biarkan swasta", s: 50, f: "Fragmentasi." },
                { t: "Edukasi publik", s: 85, f: "Kesadaran meningkat." },
            ],
            i: "Strategi terbaik adalah membangun sistem pertahanan siber nasional yang terintegrasi dengan sektor swasta serta meningkatkan kesadaran publik terhadap keamanan digital.",
        },

        {
            t: "Pajak Ekonomi Digital",
            d: "Pendapatan negara dari ekonomi digital masih rendah.",
            o: [
                {
                    t: "Pajak digital tinggi",
                    s: 75,
                    f: "Pendapatan naik tapi bisa menekan inovasi.",
                },
                { t: "Pajak moderat", s: 85, f: "Seimbang." },
                { t: "Biarkan tanpa pajak", s: 40, f: "Potensi hilang." },
                { t: "Pajak hanya big tech", s: 80, f: "Lebih adil." },
                { t: "Insentif pajak startup", s: 70, f: "Dorong inovasi." },
            ],
            i: "Pendekatan ideal adalah menerapkan pajak digital yang adil dan proporsional dengan mempertimbangkan skala usaha serta memberikan insentif bagi startup lokal.",
        },

        {
            t: "Regulasi Fintech & Pinjol",
            d: "Pertumbuhan fintech cepat tapi menimbulkan banyak kasus penyalahgunaan.",
            o: [
                { t: "Regulasi ketat", s: 90, f: "Lindungi konsumen." },
                {
                    t: "Larangan total pinjol",
                    s: 50,
                    f: "Akses keuangan terganggu.",
                },
                { t: "Self-regulation", s: 45, f: "Risiko tinggi." },
                { t: "Lisensi ketat + pengawasan", s: 92, f: "Seimbang." },
                {
                    t: "Biarkan berkembang",
                    s: 40,
                    f: "Masalah sosial meningkat.",
                },
            ],
            i: "Strategi ideal adalah memperkuat sistem perizinan dan pengawasan fintech dengan regulasi ketat namun tetap mendukung inklusi keuangan.",
        },

        {
            t: "Digitalisasi Layanan Publik",
            d: "Pemerintah ingin mempercepat transformasi digital layanan publik.",
            o: [
                {
                    t: "Bangun sistem nasional terpusat",
                    s: 85,
                    f: "Efisien tapi rigid.",
                },
                {
                    t: "Desentralisasi digital",
                    s: 70,
                    f: "Fleksibel tapi tidak terintegrasi.",
                },
                {
                    t: "Kerjasama swasta",
                    s: 80,
                    f: "Cepat tapi ada risiko data.",
                },
                {
                    t: "Open-source system",
                    s: 90,
                    f: "Transparan & fleksibel.",
                },
                { t: "Biarkan bertahap", s: 60, f: "Lambat." },
            ],
            i: "Pendekatan ideal adalah membangun sistem digital publik berbasis interoperabilitas dengan prinsip keamanan data, transparansi, dan efisiensi layanan.",
        },

        {
            t: "Sensor Internet & Kebebasan Digital",
            d: "Tekanan meningkat untuk mengontrol konten internet.",
            o: [
                {
                    t: "Sensor ketat",
                    s: 60,
                    f: "Kontrol tinggi tapi risiko kebebasan.",
                },
                { t: "Kebebasan penuh", s: 50, f: "Risiko konten negatif." },
                { t: "Regulasi proporsional", s: 90, f: "Balance terbaik." },
                { t: "Blokir selektif", s: 80, f: "Targeted control." },
                {
                    t: "Serahkan ke platform",
                    s: 65,
                    f: "Kurang kontrol negara.",
                },
            ],
            i: "Strategi ideal adalah menerapkan regulasi yang proporsional dan transparan untuk menjaga keseimbangan antara kebebasan berekspresi dan keamanan digital masyarakat.",
        },
    ],

    Maritim: [
        {
            t: "Illegal Fishing oleh Kapal Asing",
            d: "Kapal asing terus melakukan penangkapan ikan ilegal di perairan Indonesia.",
            o: [
                {
                    t: "Tenggelamkan kapal ilegal",
                    s: 85,
                    f: "Tegas tapi berisiko diplomatik.",
                },
                {
                    t: "Penegakan hukum + denda",
                    s: 90,
                    f: "Efektif dan terukur.",
                },
                {
                    t: "Pendekatan diplomasi",
                    s: 70,
                    f: "Lebih aman tapi kurang deterrence.",
                },
                { t: "Biarkan aktivitas", s: 30, f: "Kerugian besar." },
                { t: "Patroli bersama negara lain", s: 80, f: "Kolaboratif." },
            ],
            i: "Pendekatan ideal adalah penegakan hukum tegas berbasis hukum internasional yang dikombinasikan dengan kerja sama regional untuk menciptakan efek jera tanpa memicu konflik diplomatik.",
        },

        {
            t: "Efisiensi Logistik Nasional",
            d: "Biaya logistik laut Indonesia masih tinggi dibanding negara lain.",
            o: [
                { t: "Bangun tol laut", s: 90, f: "Distribusi lebih efisien." },
                {
                    t: "Subsidi logistik",
                    s: 65,
                    f: "Cepat tapi tidak sustainable.",
                },
                {
                    t: "Serahkan ke swasta",
                    s: 70,
                    f: "Efisien tapi tidak merata.",
                },
                {
                    t: "Digitalisasi logistik",
                    s: 85,
                    f: "Efisiensi meningkat.",
                },
                { t: "Biarkan pasar", s: 50, f: "Inefisiensi berlanjut." },
            ],
            i: "Strategi ideal adalah mengembangkan infrastruktur tol laut yang didukung digitalisasi sistem logistik untuk meningkatkan efisiensi dan konektivitas antar wilayah.",
        },

        {
            t: "Sengketa Laut Natuna",
            d: "Ketegangan meningkat akibat klaim wilayah laut oleh negara lain.",
            o: [
                { t: "Perkuat militer laut", s: 85, f: "Deterrence kuat." },
                { t: "Diplomasi intensif", s: 80, f: "Menghindari konflik." },
                { t: "Kerjasama ekonomi", s: 70, f: "Pendekatan lunak." },
                { t: "Biarkan tanpa respon", s: 30, f: "Kedaulatan terancam." },
                {
                    t: "Gabungan militer & diplomasi",
                    s: 92,
                    f: "Strategi seimbang.",
                },
            ],
            i: "Pendekatan ideal adalah menggabungkan kekuatan militer sebagai deterrence dengan diplomasi aktif untuk menjaga kedaulatan tanpa memicu eskalasi konflik.",
        },

        {
            t: "Pengembangan Pelabuhan Internasional",
            d: "Indonesia ingin menjadi hub logistik global.",
            o: [
                {
                    t: "Bangun pelabuhan besar",
                    s: 85,
                    f: "Daya saing meningkat.",
                },
                { t: "Kerjasama asing", s: 80, f: "Pendanaan cepat." },
                { t: "Fokus pelabuhan kecil", s: 60, f: "Tidak optimal." },
                { t: "Biarkan berkembang alami", s: 50, f: "Lambat." },
                { t: "Hub regional terintegrasi", s: 90, f: "Strategis." },
            ],
            i: "Strategi ideal adalah mengembangkan pelabuhan sebagai hub regional yang terintegrasi dengan rantai pasok global melalui investasi dan konektivitas nasional.",
        },

        {
            t: "Eksploitasi Sumber Daya Laut",
            d: "Potensi sumber daya laut besar tapi eksploitasi berisiko merusak lingkungan.",
            o: [
                {
                    t: "Eksploitasi maksimal",
                    s: 60,
                    f: "Pendapatan tinggi tapi merusak.",
                },
                { t: "Regulasi ketat", s: 85, f: "Lingkungan terjaga." },
                { t: "Zona konservasi", s: 80, f: "Sustainability." },
                { t: "Biarkan swasta", s: 50, f: "Risiko tinggi." },
                { t: "Eksploitasi terbatas", s: 90, f: "Seimbang." },
            ],
            i: "Pendekatan ideal adalah eksploitasi terbatas berbasis prinsip keberlanjutan dengan pengawasan ketat untuk menjaga keseimbangan ekonomi dan lingkungan.",
        },

        {
            t: "Ketergantungan Kapal Asing",
            d: "Sebagian besar armada logistik masih menggunakan kapal asing.",
            o: [
                {
                    t: "Bangun armada nasional",
                    s: 90,
                    f: "Kemandirian meningkat.",
                },
                {
                    t: "Biarkan kapal asing",
                    s: 50,
                    f: "Ketergantungan tinggi.",
                },
                { t: "Subsidi kapal lokal", s: 80, f: "Dorong industri." },
                { t: "Kerjasama internasional", s: 75, f: "Transisi." },
                { t: "Batasi kapal asing", s: 85, f: "Proteksi nasional." },
            ],
            i: "Strategi ideal adalah memperkuat armada nasional secara bertahap sambil menjaga efisiensi logistik melalui kerja sama internasional yang terkontrol.",
        },

        {
            t: "Perubahan Iklim & Kenaikan Permukaan Laut",
            d: "Wilayah pesisir terancam akibat perubahan iklim.",
            o: [
                { t: "Bangun tanggul besar", s: 80, f: "Proteksi fisik." },
                { t: "Relokasi penduduk", s: 70, f: "Solusi ekstrem." },
                { t: "Mitigasi berbasis ekosistem", s: 90, f: "Sustainable." },
                { t: "Biarkan alami", s: 30, f: "Risiko tinggi." },
                { t: "Kombinasi solusi", s: 92, f: "Paling realistis." },
            ],
            i: "Pendekatan ideal adalah kombinasi perlindungan infrastruktur, mitigasi berbasis ekosistem, dan adaptasi sosial untuk menghadapi dampak perubahan iklim secara berkelanjutan.",
        },

        {
            t: "Pencemaran Laut oleh Industri",
            d: "Aktivitas industri menyebabkan pencemaran laut meningkat.",
            o: [
                { t: "Regulasi ketat", s: 85, f: "Lingkungan terjaga." },
                { t: "Denda tinggi", s: 80, f: "Efek jera." },
                { t: "Biarkan industri", s: 40, f: "Kerusakan besar." },
                {
                    t: "Insentif ramah lingkungan",
                    s: 90,
                    f: "Perubahan positif.",
                },
                { t: "Pengawasan minimal", s: 50, f: "Tidak efektif." },
            ],
            i: "Strategi ideal adalah kombinasi regulasi ketat dan insentif bagi industri untuk beralih ke praktik yang lebih ramah lingkungan.",
        },

        {
            t: "Digitalisasi Sektor Maritim",
            d: "Sistem pelabuhan dan logistik masih manual.",
            o: [
                { t: "Digitalisasi penuh", s: 90, f: "Efisiensi tinggi." },
                { t: "Bertahap", s: 85, f: "Lebih realistis." },
                { t: "Biarkan manual", s: 40, f: "Inefisiensi." },
                { t: "Kerjasama swasta", s: 80, f: "Cepat." },
                { t: "Pilot project dulu", s: 88, f: "Minim risiko." },
            ],
            i: "Pendekatan ideal adalah digitalisasi bertahap berbasis pilot project untuk memastikan kesiapan sistem sebelum implementasi nasional.",
        },

        {
            t: "Perdagangan Laut Internasional",
            d: "Indonesia ingin meningkatkan posisi dalam jalur perdagangan global.",
            o: [
                { t: "Perkuat armada dagang", s: 90, f: "Kontrol meningkat." },
                { t: "Kerjasama global", s: 85, f: "Akses luas." },
                { t: "Biarkan pasar", s: 50, f: "Tidak optimal." },
                { t: "Proteksi perdagangan", s: 70, f: "Kurangi kompetisi." },
                { t: "Integrasi logistik nasional", s: 92, f: "Strategis." },
            ],
            i: "Strategi ideal adalah memperkuat integrasi logistik nasional dan meningkatkan peran dalam rantai perdagangan global melalui kolaborasi internasional yang strategis.",
        },
    ],

    Pangan: [
        {
            t: "Lonjakan Harga Beras",
            d: "Harga beras naik drastis akibat gagal panen dan distribusi terganggu.",
            o: [
                {
                    t: "Impor besar-besaran",
                    s: 75,
                    f: "Harga stabil tapi petani tertekan.",
                },
                {
                    t: "Larangan impor",
                    s: 50,
                    f: "Petani terlindungi tapi harga naik.",
                },
                { t: "Operasi pasar", s: 85, f: "Stabilisasi jangka pendek." },
                {
                    t: "Subsidi konsumen",
                    s: 65,
                    f: "Bantu masyarakat tapi fiskal terbebani.",
                },
                {
                    t: "Kombinasi impor terbatas + operasi pasar",
                    s: 92,
                    f: "Paling seimbang.",
                },
            ],
            i: "Strategi ideal adalah melakukan impor terbatas untuk menjaga stabilitas harga disertai operasi pasar dan perlindungan terhadap petani domestik agar keseimbangan antara produksi dan konsumsi tetap terjaga.",
        },

        {
            t: "Ketergantungan Impor Pangan",
            d: "Sebagian kebutuhan pangan masih bergantung pada impor.",
            o: [
                {
                    t: "Tingkatkan produksi lokal",
                    s: 90,
                    f: "Kemandirian meningkat.",
                },
                {
                    t: "Diversifikasi impor",
                    s: 75,
                    f: "Risiko geopolitik berkurang.",
                },
                {
                    t: "Biarkan impor bebas",
                    s: 50,
                    f: "Ketergantungan tinggi.",
                },
                { t: "Subsidi impor", s: 55, f: "Tidak sustainable." },
                {
                    t: "Kerjasama regional pangan",
                    s: 85,
                    f: "Supply chain stabil.",
                },
            ],
            i: "Pendekatan ideal adalah meningkatkan produksi dalam negeri secara bertahap sambil menjaga stabilitas pasokan melalui diversifikasi impor dan kerja sama regional.",
        },

        {
            t: "Alih Fungsi Lahan Pertanian",
            d: "Banyak lahan pertanian beralih menjadi kawasan industri dan perumahan.",
            o: [
                { t: "Larangan alih fungsi", s: 85, f: "Lahan terlindungi." },
                {
                    t: "Zonasi ketat",
                    s: 90,
                    f: "Lebih fleksibel dan terkontrol.",
                },
                { t: "Biarkan pasar", s: 40, f: "Lahan pertanian hilang." },
                { t: "Insentif petani", s: 80, f: "Menahan alih fungsi." },
                {
                    t: "Kompensasi konversi",
                    s: 65,
                    f: "Tidak menyelesaikan akar masalah.",
                },
            ],
            i: "Strategi ideal adalah penerapan zonasi ketat berbasis tata ruang yang melindungi lahan produktif sambil memberikan insentif ekonomi bagi petani agar tetap bertahan.",
        },

        {
            t: "Produktivitas Pertanian Rendah",
            d: "Hasil panen stagnan meskipun luas lahan besar.",
            o: [
                {
                    t: "Modernisasi teknologi",
                    s: 95,
                    f: "Produktivitas meningkat signifikan.",
                },
                { t: "Tambah tenaga kerja", s: 60, f: "Kurang efisien." },
                { t: "Subsidi pupuk", s: 75, f: "Bantu tapi terbatas." },
                { t: "Biarkan tradisional", s: 40, f: "Tidak berkembang." },
                { t: "Pelatihan petani", s: 90, f: "Dampak besar." },
            ],
            i: "Pendekatan ideal adalah kombinasi modernisasi teknologi pertanian dan peningkatan kapasitas petani melalui pelatihan agar produktivitas meningkat secara berkelanjutan.",
        },

        {
            t: "Distribusi Pangan Tidak Merata",
            d: "Beberapa daerah surplus, sementara daerah lain kekurangan pangan.",
            o: [
                {
                    t: "Bangun infrastruktur logistik",
                    s: 90,
                    f: "Distribusi lancar.",
                },
                { t: "Subsidi transportasi", s: 70, f: "Cepat tapi mahal." },
                { t: "Biarkan pasar", s: 50, f: "Ketimpangan tetap." },
                { t: "Digitalisasi distribusi", s: 85, f: "Efisien." },
                {
                    t: "Intervensi pemerintah penuh",
                    s: 75,
                    f: "Efektif tapi tidak fleksibel.",
                },
            ],
            i: "Strategi ideal adalah memperkuat infrastruktur logistik dan sistem distribusi berbasis teknologi untuk memastikan pemerataan akses pangan di seluruh wilayah.",
        },

        {
            t: "Fluktuasi Harga Pangan",
            d: "Harga komoditas pangan sangat fluktuatif.",
            o: [
                {
                    t: "Harga dikontrol pemerintah",
                    s: 65,
                    f: "Stabil tapi distorsi pasar.",
                },
                {
                    t: "Cadangan pangan nasional",
                    s: 90,
                    f: "Stabilitas tinggi.",
                },
                { t: "Biarkan pasar", s: 50, f: "Tidak stabil." },
                { t: "Subsidi harga", s: 70, f: "Bantu konsumen." },
                { t: "Kontrak forward petani", s: 85, f: "Harga lebih pasti." },
            ],
            i: "Pendekatan terbaik adalah membangun cadangan pangan nasional serta mendorong mekanisme kontrak yang memberikan kepastian harga bagi petani dan konsumen.",
        },

        {
            t: "Ketahanan Pangan Nasional",
            d: "Ancaman krisis global membuat pasokan pangan tidak pasti.",
            o: [
                { t: "Stok besar nasional", s: 85, f: "Aman tapi mahal." },
                { t: "Diversifikasi pangan", s: 90, f: "Lebih resilient." },
                { t: "Impor terus", s: 50, f: "Rentan." },
                { t: "Produksi lokal penuh", s: 80, f: "Mandiri tapi berat." },
                { t: "Kerjasama internasional", s: 75, f: "Akses global." },
            ],
            i: "Strategi ideal adalah diversifikasi sumber pangan domestik disertai cadangan strategis untuk meningkatkan ketahanan terhadap krisis global.",
        },

        {
            t: "Perubahan Iklim & Pertanian",
            d: "Perubahan iklim mengganggu pola tanam dan hasil panen.",
            o: [
                { t: "Adaptasi teknologi", s: 95, f: "Solusi jangka panjang." },
                { t: "Subsidi petani", s: 75, f: "Bantu sementara." },
                { t: "Relokasi pertanian", s: 70, f: "Sulit implementasi." },
                { t: "Biarkan alami", s: 30, f: "Risiko tinggi." },
                { t: "Diversifikasi tanaman", s: 90, f: "Lebih tahan." },
            ],
            i: "Pendekatan ideal adalah adaptasi berbasis teknologi dan diversifikasi tanaman untuk meningkatkan ketahanan terhadap perubahan iklim.",
        },

        {
            t: "Kesejahteraan Petani",
            d: "Pendapatan petani rendah dan tidak stabil.",
            o: [
                { t: "Subsidi langsung", s: 75, f: "Bantu cepat." },
                { t: "Akses pasar langsung", s: 90, f: "Nilai tambah naik." },
                { t: "Biarkan pasar", s: 50, f: "Tidak berubah." },
                { t: "Koperasi petani", s: 85, f: "Penguatan kolektif." },
                { t: "Harga minimum", s: 80, f: "Pendapatan stabil." },
            ],
            i: "Strategi ideal adalah memperkuat akses pasar dan kelembagaan petani seperti koperasi untuk meningkatkan posisi tawar dan pendapatan secara berkelanjutan.",
        },

        {
            t: "Food Waste Tinggi",
            d: "Banyak pangan terbuang di rantai distribusi.",
            o: [
                { t: "Edukasi masyarakat", s: 80, f: "Kesadaran meningkat." },
                { t: "Perbaiki rantai logistik", s: 90, f: "Efektif." },
                { t: "Biarkan pasar", s: 40, f: "Masalah berlanjut." },
                { t: "Regulasi ketat", s: 75, f: "Mengurangi limbah." },
                { t: "Teknologi penyimpanan", s: 85, f: "Kurangi kerugian." },
            ],
            i: "Pendekatan ideal adalah memperbaiki rantai distribusi dan teknologi penyimpanan disertai edukasi masyarakat untuk mengurangi pemborosan pangan secara signifikan.",
        },
    ],

    Finansial: [
        {
            t: "Inflasi Tinggi di Atas Target",
            d: "Inflasi melonjak akibat kenaikan harga energi dan pangan.",
            o: [
                {
                    t: "Naikkan suku bunga agresif",
                    s: 80,
                    f: "Tekan inflasi tapi perlambat ekonomi.",
                },
                { t: "Naikkan suku bunga bertahap", s: 90, f: "Lebih stabil." },
                { t: "Biarkan pasar", s: 40, f: "Inflasi tak terkendali." },
                {
                    t: "Subsidi harga",
                    s: 65,
                    f: "Redam inflasi tapi beban fiskal.",
                },
                { t: "Intervensi nilai tukar", s: 75, f: "Stabilkan impor." },
            ],
            i: "Strategi ideal adalah pengetatan moneter secara bertahap yang dikombinasikan dengan kebijakan fiskal yang tepat sasaran untuk menekan inflasi tanpa mengganggu pertumbuhan ekonomi secara signifikan.",
        },

        {
            t: "Nilai Tukar Rupiah Melemah",
            d: "Rupiah tertekan akibat arus modal keluar dan kondisi global.",
            o: [
                {
                    t: "Intervensi pasar valas",
                    s: 85,
                    f: "Stabilisasi jangka pendek.",
                },
                { t: "Naikkan suku bunga", s: 80, f: "Tarik investor." },
                {
                    t: "Kontrol devisa ketat",
                    s: 60,
                    f: "Kurangi tekanan tapi distorsi.",
                },
                {
                    t: "Biarkan melemah",
                    s: 50,
                    f: "Ekspor naik tapi impor mahal.",
                },
                { t: "Diversifikasi ekspor", s: 90, f: "Solusi fundamental." },
            ],
            i: "Pendekatan ideal adalah menjaga stabilitas nilai tukar melalui intervensi terukur sambil memperkuat fundamental ekonomi seperti ekspor dan arus investasi.",
        },

        {
            t: "Defisit Anggaran Membengkak",
            d: "Pengeluaran negara meningkat sementara pendapatan stagnan.",
            o: [
                {
                    t: "Kurangi belanja negara",
                    s: 75,
                    f: "Defisit turun tapi pertumbuhan melambat.",
                },
                {
                    t: "Naikkan pajak",
                    s: 70,
                    f: "Pendapatan naik tapi konsumsi turun.",
                },
                {
                    t: "Tambah utang",
                    s: 65,
                    f: "Cepat tapi risiko jangka panjang.",
                },
                { t: "Efisiensi anggaran", s: 90, f: "Lebih optimal." },
                { t: "Cetak uang", s: 30, f: "Risiko inflasi tinggi." },
            ],
            i: "Strategi ideal adalah melakukan efisiensi belanja negara dan reformasi penerimaan pajak tanpa mengganggu aktivitas ekonomi secara signifikan.",
        },

        {
            t: "Krisis Likuiditas Perbankan",
            d: "Bank mengalami kekurangan likuiditas akibat penarikan dana besar-besaran.",
            o: [
                { t: "Bailout bank", s: 75, f: "Stabil tapi moral hazard." },
                {
                    t: "Likuiditas dari bank sentral",
                    s: 90,
                    f: "Stabilisasi cepat.",
                },
                { t: "Biarkan bank gagal", s: 40, f: "Risiko sistemik." },
                { t: "Gabungkan bank", s: 80, f: "Konsolidasi." },
                { t: "Batasi penarikan dana", s: 60, f: "Kontroversial." },
            ],
            i: "Pendekatan ideal adalah penyediaan likuiditas oleh bank sentral secara terukur disertai pengawasan ketat untuk menjaga stabilitas sistem keuangan tanpa menciptakan moral hazard.",
        },

        {
            t: "Inklusi Keuangan Rendah",
            d: "Sebagian masyarakat belum memiliki akses ke layanan keuangan formal.",
            o: [
                { t: "Dorong fintech", s: 90, f: "Akses cepat meningkat." },
                {
                    t: "Perluas bank konvensional",
                    s: 75,
                    f: "Stabil tapi lambat.",
                },
                { t: "Subsidi layanan keuangan", s: 70, f: "Bantu akses." },
                { t: "Biarkan pasar", s: 50, f: "Gap tetap." },
                { t: "Edukasi keuangan", s: 85, f: "Dampak jangka panjang." },
            ],
            i: "Strategi ideal adalah menggabungkan pengembangan fintech dengan edukasi keuangan untuk meningkatkan inklusi secara cepat dan berkelanjutan.",
        },

        {
            t: "Utang Luar Negeri Meningkat",
            d: "Utang pemerintah meningkat untuk pembiayaan pembangunan.",
            o: [
                { t: "Tambah utang", s: 60, f: "Cepat tapi berisiko." },
                { t: "Batasi utang", s: 75, f: "Lebih aman." },
                { t: "Refinancing utang", s: 85, f: "Optimalkan beban." },
                { t: "Gunakan pajak domestik", s: 80, f: "Mandiri." },
                { t: "Investasi produktif", s: 90, f: "Return tinggi." },
            ],
            i: "Pendekatan ideal adalah memastikan utang digunakan untuk investasi produktif serta mengelola profil utang secara hati-hati agar tetap berkelanjutan.",
        },

        {
            t: "Pertumbuhan Kredit Melambat",
            d: "Penyaluran kredit perbankan stagnan.",
            o: [
                { t: "Turunkan suku bunga", s: 85, f: "Dorong kredit." },
                {
                    t: "Relaksasi regulasi",
                    s: 80,
                    f: "Fleksibilitas meningkat.",
                },
                { t: "Biarkan pasar", s: 50, f: "Tidak berubah." },
                { t: "Subsidi bunga", s: 70, f: "Bantu UMKM." },
                { t: "Penjaminan kredit", s: 90, f: "Kurangi risiko bank." },
            ],
            i: "Strategi ideal adalah memberikan stimulus kredit melalui penjaminan dan penyesuaian suku bunga untuk menjaga keseimbangan antara pertumbuhan dan risiko.",
        },

        {
            t: "Volatilitas Pasar Saham",
            d: "IHSG mengalami fluktuasi tajam akibat sentimen global.",
            o: [
                { t: "Intervensi pasar", s: 70, f: "Stabil jangka pendek." },
                { t: "Circuit breaker", s: 85, f: "Redam volatilitas." },
                { t: "Biarkan pasar", s: 60, f: "Natural correction." },
                {
                    t: "Batasi transaksi asing",
                    s: 65,
                    f: "Kurangi tekanan tapi distorsi.",
                },
                {
                    t: "Perkuat fundamental ekonomi",
                    s: 90,
                    f: "Solusi jangka panjang.",
                },
            ],
            i: "Pendekatan ideal adalah menjaga stabilitas pasar melalui mekanisme pengaman seperti circuit breaker sambil memperkuat fundamental ekonomi domestik.",
        },

        {
            t: "Risiko Fintech & Pinjaman Online",
            d: "Kasus gagal bayar dan penyalahgunaan data meningkat.",
            o: [
                { t: "Larangan total", s: 50, f: "Akses hilang." },
                { t: "Regulasi ketat", s: 90, f: "Perlindungan kuat." },
                { t: "Self-regulation", s: 45, f: "Risiko tinggi." },
                { t: "Lisensi ketat", s: 92, f: "Seimbang." },
                { t: "Biarkan berkembang", s: 40, f: "Masalah meningkat." },
            ],
            i: "Strategi ideal adalah memperkuat regulasi dan pengawasan fintech untuk melindungi konsumen tanpa menghambat inovasi.",
        },

        {
            t: "Ketimpangan Akses Modal",
            d: "UMKM kesulitan mendapatkan pembiayaan.",
            o: [
                { t: "Kredit subsidi UMKM", s: 85, f: "Akses meningkat." },
                { t: "Penjaminan kredit", s: 90, f: "Risiko berkurang." },
                { t: "Biarkan pasar", s: 50, f: "Ketimpangan tetap." },
                { t: "Crowdfunding", s: 80, f: "Alternatif pembiayaan." },
                { t: "Bank khusus UMKM", s: 88, f: "Fokus sektor." },
            ],
            i: "Pendekatan ideal adalah memperluas akses pembiayaan melalui penjaminan kredit dan inovasi keuangan seperti fintech dan crowdfunding untuk mendukung UMKM.",
        },
    ],

    Pendidikan: [
        {
            t: "Kualitas Pendidikan Nasional Rendah",
            d: "Hasil asesmen menunjukkan kualitas pendidikan Indonesia tertinggal.",
            o: [
                {
                    t: "Reformasi kurikulum total",
                    s: 85,
                    f: "Perubahan besar tapi berisiko implementasi.",
                },
                {
                    t: "Peningkatan kualitas guru",
                    s: 92,
                    f: "Dampak langsung ke pembelajaran.",
                },
                {
                    t: "Bangun infrastruktur sekolah",
                    s: 75,
                    f: "Penting tapi tidak cukup.",
                },
                {
                    t: "Biarkan sistem berjalan",
                    s: 40,
                    f: "Tidak ada perubahan.",
                },
                {
                    t: "Adopsi sistem luar negeri",
                    s: 80,
                    f: "Cepat tapi belum tentu cocok.",
                },
            ],
            i: "Strategi ideal adalah meningkatkan kualitas guru sebagai faktor utama pembelajaran, disertai reformasi kurikulum yang kontekstual dan relevan dengan kebutuhan nasional.",
        },

        {
            t: "Ketimpangan Akses Pendidikan",
            d: "Daerah terpencil memiliki akses pendidikan yang terbatas.",
            o: [
                {
                    t: "Bangun sekolah fisik",
                    s: 80,
                    f: "Akses meningkat tapi mahal.",
                },
                {
                    t: "Digital learning",
                    s: 85,
                    f: "Cepat tapi tergantung infrastruktur.",
                },
                {
                    t: "Subsidi pendidikan",
                    s: 75,
                    f: "Membantu tapi tidak menyelesaikan akses.",
                },
                { t: "Biarkan pasar", s: 40, f: "Ketimpangan meningkat." },
                { t: "Hybrid solusi", s: 92, f: "Lebih efektif." },
            ],
            i: "Pendekatan ideal adalah kombinasi pembangunan infrastruktur dasar dan pemanfaatan teknologi digital untuk menjangkau wilayah terpencil secara berkelanjutan.",
        },

        {
            t: "Mismatch Lulusan dengan Industri",
            d: "Lulusan tidak sesuai dengan kebutuhan pasar kerja.",
            o: [
                {
                    t: "Revisi kurikulum berbasis industri",
                    s: 90,
                    f: "Lebih relevan.",
                },
                { t: "Magang wajib", s: 85, f: "Pengalaman praktis." },
                { t: "Biarkan pasar", s: 50, f: "Mismatch tetap." },
                {
                    t: "Subsidi pendidikan tinggi",
                    s: 70,
                    f: "Tidak langsung menyelesaikan.",
                },
                {
                    t: "Kolaborasi kampus-industri",
                    s: 92,
                    f: "Solusi terbaik.",
                },
            ],
            i: "Strategi ideal adalah memperkuat kolaborasi antara institusi pendidikan dan industri untuk menciptakan lulusan yang relevan dengan kebutuhan pasar kerja.",
        },

        {
            t: "Biaya Pendidikan Tinggi",
            d: "Biaya kuliah semakin mahal dan tidak terjangkau sebagian masyarakat.",
            o: [
                {
                    t: "Subsidi penuh",
                    s: 80,
                    f: "Akses meningkat tapi beban fiskal tinggi.",
                },
                {
                    t: "Pinjaman pendidikan",
                    s: 75,
                    f: "Akses terbuka tapi ada risiko utang.",
                },
                { t: "Biarkan pasar", s: 50, f: "Akses terbatas." },
                { t: "Beasiswa targeted", s: 90, f: "Efisien dan adil." },
                { t: "Skema income sharing", s: 85, f: "Lebih fleksibel." },
            ],
            i: "Pendekatan ideal adalah menyediakan beasiswa berbasis kebutuhan dan skema pembiayaan inovatif seperti income sharing untuk menjaga akses pendidikan tinggi tanpa membebani fiskal.",
        },

        {
            t: "Kualitas Guru Rendah",
            d: "Banyak guru belum memiliki kompetensi yang memadai.",
            o: [
                { t: "Pelatihan intensif", s: 90, f: "Kualitas meningkat." },
                { t: "Naikkan gaji guru", s: 80, f: "Motivasi naik." },
                { t: "Sertifikasi ketat", s: 85, f: "Standar meningkat." },
                { t: "Biarkan sistem", s: 40, f: "Tidak berubah." },
                { t: "Evaluasi berkala", s: 88, f: "Kontrol kualitas." },
            ],
            i: "Strategi ideal adalah meningkatkan kualitas guru melalui pelatihan berkelanjutan, evaluasi berkala, dan sistem insentif yang mendorong profesionalisme.",
        },

        {
            t: "Digitalisasi Pendidikan",
            d: "Sekolah didorong untuk beralih ke sistem digital.",
            o: [
                {
                    t: "Digitalisasi penuh",
                    s: 80,
                    f: "Modern tapi belum merata.",
                },
                { t: "Bertahap", s: 90, f: "Lebih realistis." },
                { t: "Biarkan tradisional", s: 40, f: "Tertinggal." },
                { t: "Kerjasama edtech", s: 85, f: "Cepat berkembang." },
                { t: "Pilot project dulu", s: 88, f: "Minim risiko." },
            ],
            i: "Pendekatan ideal adalah digitalisasi bertahap yang disesuaikan dengan kesiapan infrastruktur dan kompetensi tenaga pendidik.",
        },

        {
            t: "Brain Drain",
            d: "Banyak talenta terbaik memilih bekerja di luar negeri.",
            o: [
                { t: "Insentif talenta", s: 85, f: "Menarik kembali." },
                { t: "Biarkan bebas", s: 50, f: "Kehilangan SDM." },
                { t: "Wajib kerja dalam negeri", s: 60, f: "Kontroversial." },
                {
                    t: "Bangun ekosistem kerja",
                    s: 92,
                    f: "Solusi jangka panjang.",
                },
                { t: "Kerjasama global", s: 80, f: "Transfer knowledge." },
            ],
            i: "Strategi ideal adalah menciptakan ekosistem kerja yang kompetitif dan menarik sehingga talenta memilih untuk berkontribusi di dalam negeri.",
        },

        {
            t: "Standarisasi Pendidikan Nasional",
            d: "Kualitas pendidikan tidak merata antar daerah.",
            o: [
                {
                    t: "Standar nasional ketat",
                    s: 85,
                    f: "Kualitas naik tapi rigid.",
                },
                {
                    t: "Desentralisasi pendidikan",
                    s: 75,
                    f: "Fleksibel tapi tidak merata.",
                },
                { t: "Biarkan daerah", s: 50, f: "Ketimpangan tetap." },
                { t: "Hybrid standar", s: 90, f: "Seimbang." },
                { t: "Benchmark global", s: 80, f: "Standar meningkat." },
            ],
            i: "Pendekatan ideal adalah menerapkan standar nasional minimum dengan fleksibilitas lokal untuk memastikan kualitas merata tanpa mengabaikan konteks daerah.",
        },

        {
            t: "Pendidikan Vokasi vs Akademik",
            d: "Proporsi lulusan akademik lebih besar dibanding vokasi.",
            o: [
                { t: "Perbanyak vokasi", s: 90, f: "Lebih siap kerja." },
                { t: "Fokus akademik", s: 60, f: "Kurang relevan." },
                { t: "Biarkan pasar", s: 50, f: "Mismatch tetap." },
                { t: "Integrasi vokasi-akademik", s: 92, f: "Solusi terbaik." },
                { t: "Subsidi vokasi", s: 85, f: "Dorong minat." },
            ],
            i: "Strategi ideal adalah mengintegrasikan pendidikan vokasi dan akademik untuk menciptakan sistem pendidikan yang fleksibel dan relevan dengan kebutuhan industri.",
        },

        {
            t: "Pendidikan Karakter vs Kompetensi",
            d: "Fokus pendidikan terpecah antara karakter dan skill.",
            o: [
                { t: "Fokus karakter", s: 70, f: "Nilai moral kuat." },
                { t: "Fokus skill", s: 75, f: "Siap kerja." },
                { t: "Kombinasi keduanya", s: 92, f: "Seimbang." },
                { t: "Biarkan sistem", s: 50, f: "Tidak optimal." },
                {
                    t: "Tambahkan kurikulum khusus",
                    s: 85,
                    f: "Lebih terstruktur.",
                },
            ],
            i: "Pendekatan ideal adalah mengintegrasikan pendidikan karakter dan kompetensi secara seimbang untuk menghasilkan individu yang tidak hanya kompeten tetapi juga berintegritas.",
        },
    ],

    Pertahanan: [
        {
            t: "Pelanggaran Wilayah Udara",
            d: "Pesawat asing memasuki wilayah udara Indonesia tanpa izin.",
            o: [
                {
                    t: "Intercept militer",
                    s: 90,
                    f: "Tegas menjaga kedaulatan.",
                },
                {
                    t: "Protes diplomatik",
                    s: 75,
                    f: "Lebih aman tapi kurang deterrence.",
                },
                { t: "Biarkan", s: 30, f: "Kedaulatan terancam." },
                {
                    t: "Kerjasama militer regional",
                    s: 80,
                    f: "Koordinasi meningkat.",
                },
                {
                    t: "Gabungan militer + diplomasi",
                    s: 92,
                    f: "Paling seimbang.",
                },
            ],
            i: "Pendekatan ideal adalah melakukan intersepsi militer untuk menjaga kedaulatan disertai langkah diplomatik guna menghindari eskalasi konflik.",
        },

        {
            t: "Modernisasi Alutsista",
            d: "Sebagian alat utama sistem senjata sudah usang.",
            o: [
                {
                    t: "Belanja besar alutsista",
                    s: 85,
                    f: "Kekuatan meningkat cepat.",
                },
                {
                    t: "Produksi dalam negeri",
                    s: 90,
                    f: "Kemandirian meningkat.",
                },
                { t: "Kerjasama teknologi", s: 88, f: "Transfer knowledge." },
                { t: "Biarkan", s: 40, f: "Kekuatan melemah." },
                { t: "Modernisasi bertahap", s: 92, f: "Lebih realistis." },
            ],
            i: "Strategi ideal adalah modernisasi bertahap yang mengutamakan pengembangan industri pertahanan dalam negeri dengan dukungan transfer teknologi.",
        },

        {
            t: "Ancaman Siber Nasional",
            d: "Serangan siber meningkat terhadap infrastruktur vital.",
            o: [
                { t: "Bangun cyber command", s: 95, f: "Pertahanan kuat." },
                { t: "Outsource keamanan", s: 60, f: "Cepat tapi bergantung." },
                { t: "Regulasi ketat", s: 80, f: "Kontrol meningkat." },
                { t: "Biarkan", s: 40, f: "Risiko tinggi." },
                { t: "Kolaborasi publik-swasta", s: 90, f: "Efektif." },
            ],
            i: "Pendekatan ideal adalah membangun kemampuan pertahanan siber nasional yang terintegrasi dengan kolaborasi sektor swasta dan lembaga terkait.",
        },

        {
            t: "Konflik Laut Teritorial",
            d: "Ketegangan meningkat di wilayah perairan strategis.",
            o: [
                { t: "Perkuat militer", s: 85, f: "Deterrence tinggi." },
                { t: "Diplomasi aktif", s: 80, f: "Kurangi konflik." },
                { t: "Kerjasama ekonomi", s: 70, f: "Pendekatan lunak." },
                { t: "Biarkan", s: 30, f: "Risiko besar." },
                { t: "Gabungan strategi", s: 92, f: "Seimbang." },
            ],
            i: "Strategi ideal adalah kombinasi kekuatan militer sebagai deterrence dengan diplomasi aktif untuk menjaga stabilitas kawasan.",
        },

        {
            t: "Anggaran Pertahanan Terbatas",
            d: "Kebutuhan pertahanan meningkat tapi anggaran terbatas.",
            o: [
                { t: "Naikkan anggaran", s: 85, f: "Kekuatan meningkat." },
                { t: "Efisiensi anggaran", s: 90, f: "Optimalisasi." },
                { t: "Kurangi program", s: 70, f: "Fokus prioritas." },
                { t: "Utang luar negeri", s: 65, f: "Cepat tapi berisiko." },
                { t: "Kerjasama militer", s: 80, f: "Berbagi beban." },
            ],
            i: "Pendekatan ideal adalah meningkatkan efisiensi anggaran pertahanan dengan fokus pada prioritas strategis dan kolaborasi internasional yang selektif.",
        },

        {
            t: "Ketergantungan Alutsista Impor",
            d: "Sebagian besar peralatan militer berasal dari luar negeri.",
            o: [
                { t: "Produksi lokal", s: 90, f: "Kemandirian meningkat." },
                { t: "Diversifikasi pemasok", s: 85, f: "Kurangi risiko." },
                { t: "Biarkan impor", s: 50, f: "Ketergantungan tinggi." },
                { t: "Transfer teknologi", s: 92, f: "Strategis." },
                { t: "Proteksi industri lokal", s: 80, f: "Dorong domestik." },
            ],
            i: "Strategi ideal adalah mengurangi ketergantungan impor melalui pengembangan industri dalam negeri dan transfer teknologi yang berkelanjutan.",
        },

        {
            t: "Keterlibatan dalam Konflik Global",
            d: "Tekanan internasional untuk ikut serta dalam konflik global meningkat.",
            o: [
                { t: "Ikut aktif", s: 60, f: "Risiko tinggi." },
                { t: "Netral aktif", s: 90, f: "Sejalan politik luar negeri." },
                { t: "Dukungan logistik", s: 75, f: "Kompromi." },
                { t: "Biarkan", s: 50, f: "Kurang peran global." },
                { t: "Diplomasi damai", s: 85, f: "Peran mediator." },
            ],
            i: "Pendekatan ideal adalah mempertahankan posisi netral aktif dengan mengedepankan diplomasi dan peran sebagai mediator dalam konflik global.",
        },

        {
            t: "Ancaman Terorisme",
            d: "Ancaman terorisme domestik meningkat.",
            o: [
                { t: "Operasi militer", s: 85, f: "Tegas tapi sensitif." },
                { t: "Intelijen kuat", s: 92, f: "Pencegahan efektif." },
                { t: "Pendekatan sosial", s: 85, f: "Akar masalah." },
                { t: "Biarkan", s: 30, f: "Bahaya tinggi." },
                { t: "Gabungan strategi", s: 95, f: "Paling efektif." },
            ],
            i: "Strategi ideal adalah pendekatan terpadu antara intelijen, penegakan hukum, dan pendekatan sosial untuk menangani akar masalah terorisme.",
        },

        {
            t: "Keamanan Perbatasan",
            d: "Wilayah perbatasan rawan aktivitas ilegal.",
            o: [
                { t: "Perkuat militer", s: 85, f: "Kontrol meningkat." },
                { t: "Bangun infrastruktur", s: 80, f: "Kesejahteraan naik." },
                { t: "Kerjasama negara tetangga", s: 90, f: "Efektif." },
                { t: "Biarkan", s: 40, f: "Risiko tinggi." },
                { t: "Teknologi pengawasan", s: 92, f: "Modern & efisien." },
            ],
            i: "Pendekatan ideal adalah kombinasi penguatan keamanan, pembangunan ekonomi perbatasan, dan kerja sama dengan negara tetangga.",
        },

        {
            t: "Wajib Militer",
            d: "Wacana penerapan wajib militer muncul untuk memperkuat pertahanan.",
            o: [
                {
                    t: "Terapkan wajib militer",
                    s: 70,
                    f: "Kapasitas meningkat.",
                },
                { t: "Profesional militer saja", s: 85, f: "Lebih efisien." },
                { t: "Sukarela militer", s: 80, f: "Fleksibel." },
                { t: "Biarkan", s: 50, f: "Tidak berubah." },
                { t: "Hybrid system", s: 90, f: "Seimbang." },
            ],
            i: "Strategi ideal adalah mengembangkan sistem pertahanan berbasis profesional dengan opsi partisipasi sukarela atau cadangan untuk memperkuat kesiapsiagaan nasional.",
        },
    ],
};
