const scenarios = [
    {
        id: 1,
        title: "Krisis Keuangan Asia 1997–1998 (Indonesia)",
        region: "Indonesia",
        type: "financial-crisis",

        description:
            "Perekonomian mengalami tekanan hebat akibat krisis nilai tukar yang dipicu oleh capital flight besar-besaran. Nilai tukar rupiah terdepresiasi tajam, sektor perbankan mengalami krisis likuiditas, dan kepercayaan investor runtuh. Banyak perusahaan swasta dengan utang luar negeri dalam dolar mengalami gagal bayar. Inflasi melonjak akibat kenaikan harga impor, sementara daya beli masyarakat turun drastis. Pemerintah menghadapi dilema antara menstabilkan nilai tukar, menjaga sistem keuangan, dan mempertahankan pertumbuhan ekonomi.",

        ideal: {
            interest: 22,
            tax: 28,
            spending: 55,
        },

        hints: [
            "Dalam kondisi krisis nilai tukar, kebijakan moneter yang terlalu longgar akan mempercepat depresiasi dan memperburuk capital outflow.",
            "Namun, menaikkan suku bunga secara agresif juga berisiko memperdalam kontraksi sektor riil dan mempercepat kebangkrutan korporasi.",
            "Pendekatan yang lebih bijak adalah menyeimbangkan stabilisasi nilai tukar dengan kebijakan fiskal yang menjaga jaring pengaman sosial.",
            "Seorang ekonom akan mempertimbangkan bahwa kepercayaan pasar seringkali lebih penting daripada sekadar angka kebijakan itu sendiri.",
        ],
    },

    {
        id: 2,
        title: "Krisis Keuangan Global 2008 (Amerika Serikat & Dunia)",
        region: "Global",
        type: "financial-collapse",

        description:
            "Krisis dipicu oleh runtuhnya pasar subprime mortgage di Amerika Serikat yang menyebar ke sistem keuangan global. Lembaga keuangan besar mengalami kerugian masif, likuiditas pasar mengering, dan kepercayaan antar bank runtuh. Kredit macet meningkat, investasi menurun tajam, dan ekonomi global memasuki resesi. Pemerintah dan bank sentral dihadapkan pada keputusan sulit antara melakukan bailout, menurunkan suku bunga secara drastis, atau menjaga stabilitas fiskal.",

        ideal: {
            interest: 5,
            tax: 25,
            spending: 80,
        },

        hints: [
            "Dalam krisis sistemik, prioritas utama adalah mencegah runtuhnya sistem keuangan, bahkan jika itu berarti intervensi besar oleh pemerintah.",
            "Penurunan suku bunga yang agresif seringkali diperlukan untuk mengembalikan likuiditas dan mendorong kredit.",
            "Stimulus fiskal dapat menjadi alat penting untuk menggantikan permintaan yang hilang dari sektor swasta.",
            "Namun, seorang profesor ekonomi akan mengingatkan bahwa bailout tanpa reformasi struktural hanya menunda krisis berikutnya.",
        ],
    },

    {
        id: 3,
        title: "Krisis Utang Yunani (Eurozone Debt Crisis)",
        region: "Eropa",
        type: "debt-crisis",

        description:
            "Pemerintah Yunani menghadapi krisis utang yang serius akibat defisit fiskal kronis dan akumulasi utang publik yang tidak berkelanjutan. Kepercayaan investor menurun, yield obligasi melonjak, dan negara tersebut terancam gagal bayar. Sebagai bagian dari zona euro, Yunani tidak memiliki fleksibilitas kebijakan moneter sendiri, sehingga penyesuaian harus dilakukan melalui kebijakan fiskal yang ketat. Dampaknya adalah kontraksi ekonomi yang dalam dan tingkat pengangguran yang tinggi.",

        ideal: {
            interest: 10,
            tax: 50,
            spending: 30,
        },

        hints: [
            "Dalam krisis utang, kredibilitas fiskal menjadi faktor utama dalam memulihkan kepercayaan pasar.",
            "Peningkatan pajak dan pengurangan belanja seringkali tidak populer, tetapi diperlukan untuk stabilisasi jangka panjang.",
            "Namun, pengetatan fiskal yang terlalu cepat dapat memperdalam resesi dan menciptakan efek kontraktif yang berkepanjangan.",
            "Seorang ekonom akan mempertimbangkan trade-off antara austerity dan pertumbuhan ekonomi.",
        ],
    },

    {
        id: 4,
        title: "Pandemi COVID-19 (Global Economic Shock)",
        region: "Global",
        type: "supply-demand-shock",

        description:
            "Pandemi global menyebabkan gangguan besar pada sisi penawaran dan permintaan secara bersamaan. Aktivitas ekonomi terhenti akibat pembatasan mobilitas, rantai pasok terganggu, dan konsumsi menurun drastis. Banyak sektor seperti pariwisata, transportasi, dan UMKM mengalami kontraksi tajam. Pemerintah harus bertindak cepat untuk menjaga daya beli masyarakat sekaligus memastikan kelangsungan dunia usaha.",

        ideal: {
            interest: 7,
            tax: 20,
            spending: 95,
        },

        hints: [
            "Dalam krisis non-ekonomi seperti pandemi, kebijakan fiskal sering menjadi instrumen utama untuk menjaga stabilitas ekonomi.",
            "Penurunan suku bunga membantu, tetapi tidak cukup jika aktivitas ekonomi terhenti secara fisik.",
            "Stimulus besar diperlukan untuk menjaga konsumsi dan mencegah gelombang PHK massal.",
            "Seorang profesor ekonomi akan menekankan pentingnya kebijakan yang cepat, besar, dan tepat sasaran.",
        ],
    },

    {
        id: 5,
        title: "Lonjakan Inflasi Global 2022 (Post-Pandemic Shock)",
        region: "Global",
        type: "inflation-crisis",

        description:
            "Setelah pemulihan pasca pandemi, dunia menghadapi lonjakan inflasi akibat kombinasi stimulus besar, gangguan rantai pasok, dan kenaikan harga energi global. Bank sentral di berbagai negara mulai menaikkan suku bunga secara agresif untuk mengendalikan inflasi. Namun, kebijakan ini berisiko memperlambat pertumbuhan ekonomi dan meningkatkan kemungkinan resesi.",

        ideal: {
            interest: 25,
            tax: 35,
            spending: 45,
        },

        hints: [
            "Inflasi yang tinggi membutuhkan respons moneter yang tegas untuk menjaga kredibilitas bank sentral.",
            "Namun, kenaikan suku bunga yang terlalu cepat dapat memicu hard landing.",
            "Kebijakan fiskal sebaiknya tidak kontradiktif terhadap kebijakan moneter.",
            "Seorang ekonom akan berhati-hati dalam menjaga keseimbangan antara stabilitas harga dan pertumbuhan ekonomi.",
        ],
    },
    {
        id: 6,
        title: "Stagflasi 1970-an (Amerika Serikat & Global)",
        region: "Global",
        type: "stagflation",

        description:
            "Ekonomi mengalami fenomena langka berupa stagnasi pertumbuhan ekonomi yang disertai inflasi tinggi (stagflasi). Krisis ini dipicu oleh lonjakan harga minyak akibat embargo OPEC, yang meningkatkan biaya produksi secara drastis. Di sisi lain, pertumbuhan ekonomi melambat dan pengangguran meningkat. Kebijakan ekonomi menjadi sangat kompleks karena instrumen untuk mengatasi inflasi justru berpotensi memperburuk pengangguran, dan sebaliknya.",

        ideal: {
            interest: 27,
            tax: 32,
            spending: 40,
        },

        hints: [
            "Stagflasi menantang paradigma tradisional karena inflasi dan pengangguran meningkat secara bersamaan.",
            "Kebijakan moneter yang ketat diperlukan untuk mengendalikan inflasi, meskipun berisiko meningkatkan pengangguran dalam jangka pendek.",
            "Stimulus fiskal harus sangat hati-hati agar tidak memperparah tekanan inflasi.",
            "Seorang profesor ekonomi akan menekankan pentingnya ekspektasi inflasi dalam menentukan keberhasilan kebijakan.",
        ],
    },

    {
        id: 7,
        title: "Krisis Properti China (Evergrande Crisis)",
        region: "China",
        type: "property-crisis",

        description:
            "Sektor properti di China mengalami tekanan besar akibat utang berlebih dari perusahaan pengembang besar seperti Evergrande. Penurunan harga properti dan melemahnya permintaan menyebabkan risiko sistemik terhadap sektor keuangan dan pertumbuhan ekonomi. Mengingat sektor properti menyumbang porsi besar terhadap PDB, krisis ini berpotensi menyebar ke sektor lain termasuk perbankan dan konsumsi domestik.",

        ideal: {
            interest: 10,
            tax: 30,
            spending: 90,
        },

        hints: [
            "Dalam krisis sektor properti, stabilitas sistem keuangan menjadi prioritas utama.",
            "Penurunan suku bunga dapat membantu mendorong permintaan, tetapi harus diimbangi dengan pengawasan risiko kredit.",
            "Stimulus fiskal dapat diarahkan untuk mendukung sektor konstruksi dan konsumsi domestik.",
            "Seorang ekonom akan mempertimbangkan risiko moral hazard jika bailout dilakukan secara berlebihan.",
        ],
    },

    {
        id: 8,
        title: "Krisis Energi Eropa 2022",
        region: "Eropa",
        type: "energy-crisis",

        description:
            "Gangguan pasokan energi akibat konflik geopolitik menyebabkan lonjakan harga energi di Eropa. Biaya produksi meningkat tajam, inflasi melonjak, dan banyak industri menghadapi tekanan berat. Rumah tangga mengalami penurunan daya beli akibat kenaikan harga listrik dan gas. Pemerintah harus menyeimbangkan antara menjaga stabilitas harga, melindungi konsumen, dan memastikan keberlanjutan fiskal.",

        ideal: {
            interest: 20,
            tax: 28,
            spending: 85,
        },

        hints: [
            "Krisis energi seringkali memicu inflasi berbasis biaya (cost-push inflation).",
            "Kebijakan fiskal dapat digunakan untuk memberikan subsidi atau bantuan langsung kepada masyarakat.",
            "Namun, subsidi energi yang terlalu besar dapat membebani anggaran negara secara signifikan.",
            "Seorang profesor ekonomi akan mempertimbangkan transisi energi jangka panjang sebagai solusi struktural.",
        ],
    },

    {
        id: 9,
        title: "Krisis Mata Uang Turki (Turkish Lira Crisis)",
        region: "Turki",
        type: "currency-crisis",

        description:
            "Nilai tukar Lira Turki mengalami depresiasi tajam akibat kebijakan moneter yang tidak konvensional dan tekanan inflasi tinggi. Kepercayaan investor menurun, inflasi melonjak, dan masyarakat mulai kehilangan daya beli. Kebijakan suku bunga yang rendah di tengah inflasi tinggi memperburuk situasi dan meningkatkan volatilitas pasar keuangan.",

        ideal: {
            interest: 30,
            tax: 35,
            spending: 50,
        },

        hints: [
            "Dalam krisis mata uang, kredibilitas bank sentral menjadi faktor yang sangat krusial.",
            "Suku bunga yang terlalu rendah di tengah inflasi tinggi dapat mempercepat depresiasi mata uang.",
            "Pengetatan moneter seringkali diperlukan untuk memulihkan kepercayaan pasar.",
            "Seorang ekonom akan menekankan pentingnya independensi kebijakan moneter.",
        ],
    },

    {
        id: 10,
        title: "Krisis Pangan Global (Food Security Crisis)",
        region: "Global",
        type: "food-crisis",

        description:
            "Gangguan rantai pasok global, perubahan iklim, dan konflik geopolitik menyebabkan lonjakan harga pangan di berbagai negara. Negara berkembang paling terdampak karena tingginya proporsi pengeluaran untuk makanan dalam konsumsi rumah tangga. Inflasi pangan meningkat, risiko kerawanan pangan meningkat, dan stabilitas sosial mulai terancam.",

        ideal: {
            interest: 12,
            tax: 25,
            spending: 90,
        },

        hints: [
            "Krisis pangan memiliki implikasi sosial dan politik yang sangat besar, tidak hanya ekonomi.",
            "Kebijakan fiskal dapat digunakan untuk subsidi pangan atau bantuan sosial langsung.",
            "Kebijakan moneter tetap perlu menjaga stabilitas harga secara umum.",
            "Seorang profesor ekonomi akan melihat pentingnya ketahanan pangan sebagai bagian dari kebijakan jangka panjang.",
        ],
    },
    {
        id: 11,
        title: "Krisis Argentina Berulang (Sovereign Default Cycle)",
        region: "Argentina",
        type: "debt-inflation-crisis",

        description:
            "Argentina mengalami siklus krisis ekonomi berulang yang ditandai dengan defisit fiskal tinggi, inflasi kronis, dan ketergantungan pada pembiayaan utang. Ketika kepercayaan investor menurun, nilai tukar peso terdepresiasi tajam dan inflasi melonjak. Pemerintah sering dihadapkan pada pilihan sulit antara mencetak uang, menaikkan pajak, atau melakukan penghematan fiskal yang tidak populer. Krisis ini mencerminkan masalah struktural dalam pengelolaan fiskal dan kredibilitas kebijakan ekonomi.",

        ideal: {
            interest: 35,
            tax: 45,
            spending: 40,
        },

        hints: [
            "Dalam ekonomi dengan inflasi kronis, ekspektasi masyarakat menjadi faktor dominan dalam menentukan efektivitas kebijakan.",
            "Pendanaan defisit melalui pencetakan uang akan memperburuk inflasi dan mempercepat depresiasi mata uang.",
            "Konsolidasi fiskal diperlukan, tetapi harus dilakukan secara kredibel dan bertahap.",
            "Seorang profesor ekonomi akan menekankan pentingnya disiplin fiskal jangka panjang dan reformasi institusi.",
        ],
    },

    {
        id: 12,
        title: "Krisis Perbankan Silicon Valley Bank 2023",
        region: "Amerika Serikat",
        type: "banking-crisis",

        description:
            "Kegagalan Silicon Valley Bank dipicu oleh mismatch antara aset jangka panjang dan kewajiban jangka pendek, diperparah oleh kenaikan suku bunga yang cepat. Nilai portofolio obligasi menurun, sementara deposan menarik dana secara besar-besaran. Krisis ini menimbulkan kekhawatiran terhadap stabilitas sektor perbankan, terutama bank menengah dengan struktur aset serupa. Pemerintah dan bank sentral harus bertindak cepat untuk mencegah contagion effect ke sistem keuangan yang lebih luas.",

        ideal: {
            interest: 12,
            tax: 30,
            spending: 60,
        },

        hints: [
            "Krisis perbankan seringkali berkaitan dengan masalah likuiditas, bukan hanya solvabilitas.",
            "Kebijakan moneter yang terlalu ketat dapat mempercepat tekanan pada sektor keuangan.",
            "Intervensi pemerintah diperlukan untuk menjaga kepercayaan deposan dan mencegah bank run.",
            "Seorang ekonom akan mempertimbangkan pentingnya regulasi perbankan dalam mencegah krisis serupa.",
        ],
    },

    {
        id: 13,
        title: "Lost Decade Jepang (Deflasi & Stagnasi)",
        region: "Jepang",
        type: "deflation-crisis",

        description:
            "Setelah pecahnya bubble aset pada awal 1990-an, Jepang mengalami periode panjang stagnasi ekonomi yang dikenal sebagai 'Lost Decade'. Harga aset turun, sektor perbankan melemah, dan ekonomi terjebak dalam deflasi berkepanjangan. Konsumsi dan investasi melemah karena ekspektasi harga yang terus menurun. Kebijakan ekonomi menjadi sulit karena suku bunga sudah sangat rendah, bahkan mendekati nol.",

        ideal: {
            interest: 2,
            tax: 20,
            spending: 85,
        },

        hints: [
            "Dalam kondisi deflasi, masalah utama adalah lemahnya permintaan agregat dan ekspektasi harga yang turun.",
            "Kebijakan moneter konvensional menjadi kurang efektif ketika suku bunga mendekati nol (liquidity trap).",
            "Stimulus fiskal dapat membantu, tetapi harus cukup besar untuk mengubah ekspektasi.",
            "Seorang profesor ekonomi akan mempertimbangkan kebijakan tidak konvensional seperti quantitative easing.",
        ],
    },

    {
        id: 14,
        title: "Krisis Ekonomi Venezuela (Hyperinflation)",
        region: "Venezuela",
        type: "hyperinflation",

        description:
            "Venezuela mengalami hiperinflasi ekstrem akibat kombinasi kebijakan fiskal yang tidak berkelanjutan, ketergantungan pada ekspor minyak, dan pencetakan uang yang berlebihan. Nilai mata uang anjlok, harga barang melonjak secara eksponensial, dan sistem ekonomi hampir kolaps. Masyarakat kehilangan kepercayaan terhadap mata uang domestik dan beralih ke dolar atau barter.",

        ideal: {
            interest: 40,
            tax: 30,
            spending: 35,
        },

        hints: [
            "Hiperinflasi merupakan konsekuensi dari hilangnya kepercayaan terhadap mata uang dan kebijakan pemerintah.",
            "Pengetatan moneter yang drastis diperlukan untuk menghentikan spiral inflasi.",
            "Namun, kebijakan tersebut harus disertai reformasi fiskal yang kredibel.",
            "Seorang ekonom akan menekankan pentingnya stabilisasi institusional dan disiplin kebijakan.",
        ],
    },

    {
        id: 15,
        title: "Krisis Pengangguran Pemuda (Youth Unemployment Crisis - Eropa Selatan)",
        region: "Eropa Selatan",
        type: "labor-market-crisis",

        description:
            "Beberapa negara di Eropa Selatan menghadapi tingkat pengangguran pemuda yang sangat tinggi, terutama pasca krisis utang Eurozone. Pertumbuhan ekonomi yang lambat, rigiditas pasar tenaga kerja, dan kurangnya investasi menyebabkan generasi muda kesulitan memasuki dunia kerja. Krisis ini tidak hanya berdampak ekonomi, tetapi juga sosial dan politik dalam jangka panjang.",

        ideal: {
            interest: 8,
            tax: 25,
            spending: 80,
        },

        hints: [
            "Pengangguran struktural memerlukan solusi jangka panjang, bukan hanya stimulus jangka pendek.",
            "Kebijakan fiskal dapat diarahkan untuk investasi pada pendidikan, pelatihan, dan penciptaan lapangan kerja.",
            "Kebijakan moneter dapat mendukung pertumbuhan, tetapi tidak cukup untuk menyelesaikan masalah struktural.",
            "Seorang profesor ekonomi akan menekankan reformasi pasar tenaga kerja dan peningkatan produktivitas.",
        ],
    },

    {
        id: 16,
        title: "Krisis Subprime Mortgage Awal (US Housing Bubble 2006)",
        region: "Amerika Serikat",
        type: "asset-bubble",

        description:
            "Pasar properti mengalami overheating akibat kredit murah dan standar pinjaman yang longgar. Harga rumah meningkat tidak wajar, sementara risiko kredit diabaikan. Ketika suku bunga mulai naik, banyak debitur gagal bayar, memicu runtuhnya harga properti dan krisis keuangan yang lebih luas.",

        ideal: {
            interest: 18,
            tax: 30,
            spending: 50,
        },

        hints: [
            "Bubble aset sering kali dipicu oleh kebijakan moneter yang terlalu longgar.",
            "Pengetatan bertahap dapat membantu mendinginkan pasar tanpa memicu crash.",
            "Seorang ekonom akan memperhatikan stabilitas sistem keuangan, bukan hanya pertumbuhan jangka pendek.",
        ],
    },

    {
        id: 17,
        title: "Krisis Supply Chain Global",
        region: "Global",
        type: "supply-shock",

        description:
            "Gangguan logistik global menyebabkan kelangkaan barang, kenaikan biaya produksi, dan tekanan inflasi. Sektor manufaktur dan perdagangan internasional terganggu, sementara permintaan tetap tinggi.",

        ideal: {
            interest: 15,
            tax: 28,
            spending: 70,
        },

        hints: [
            "Supply shock tidak bisa diselesaikan hanya dengan kebijakan moneter.",
            "Kebijakan fiskal dapat membantu memperbaiki infrastruktur dan distribusi.",
            "Seorang profesor ekonomi akan menghindari overreaction terhadap inflasi sementara.",
        ],
    },

    {
        id: 18,
        title: "Krisis Startup & Tech Bubble",
        region: "Global",
        type: "innovation-bubble",

        description:
            "Valuasi startup melonjak akibat likuiditas berlebih dan ekspektasi pertumbuhan tinggi. Ketika suku bunga naik, investor mulai menarik dana dan banyak perusahaan teknologi mengalami koreksi tajam.",

        ideal: {
            interest: 20,
            tax: 30,
            spending: 55,
        },

        hints: [
            "Likuiditas berlebih sering menciptakan distorsi di sektor teknologi.",
            "Normalisasi suku bunga diperlukan untuk mengembalikan keseimbangan pasar.",
            "Seorang ekonom akan menghindari shock policy yang terlalu tiba-tiba.",
        ],
    },

    {
        id: 19,
        title: "Krisis Ketimpangan Ekonomi",
        region: "Global",
        type: "inequality-crisis",

        description:
            "Ketimpangan pendapatan yang tinggi menyebabkan melemahnya konsumsi masyarakat kelas bawah dan ketegangan sosial. Pertumbuhan ekonomi menjadi tidak inklusif.",

        ideal: {
            interest: 10,
            tax: 45,
            spending: 85,
        },

        hints: [
            "Redistribusi melalui pajak dan belanja sosial dapat meningkatkan konsumsi agregat.",
            "Namun, pajak terlalu tinggi dapat menghambat investasi.",
            "Seorang profesor ekonomi akan mencari keseimbangan antara efisiensi dan keadilan.",
        ],
    },

    {
        id: 20,
        title: "Krisis Industri Manufaktur",
        region: "Global",
        type: "industrial-decline",

        description:
            "Sektor manufaktur mengalami penurunan akibat globalisasi, otomatisasi, dan lemahnya daya saing domestik. Pengangguran meningkat di sektor industri.",

        ideal: {
            interest: 12,
            tax: 25,
            spending: 80,
        },

        hints: [
            "Stimulus fiskal dapat diarahkan untuk revitalisasi industri.",
            "Suku bunga rendah dapat mendorong investasi.",
            "Seorang ekonom akan fokus pada produktivitas jangka panjang.",
        ],
    },

    {
        id: 21,
        title: "Krisis Urban Housing (Kenaikan Harga Properti Kota)",
        region: "Global",
        type: "housing-affordability",

        description:
            "Harga properti di kota besar meningkat pesat, membuat masyarakat kesulitan memiliki rumah. Hal ini berdampak pada konsumsi dan kesejahteraan jangka panjang.",

        ideal: {
            interest: 14,
            tax: 35,
            spending: 75,
        },

        hints: [
            "Kebijakan fiskal dapat digunakan untuk subsidi perumahan.",
            "Suku bunga mempengaruhi kemampuan kredit masyarakat.",
            "Seorang profesor ekonomi akan mempertimbangkan sisi supply perumahan.",
        ],
    },

    {
        id: 22,
        title: "Krisis Perubahan Iklim (Economic Impact)",
        region: "Global",
        type: "climate-crisis",

        description:
            "Dampak perubahan iklim menyebabkan kerusakan infrastruktur, penurunan produksi pertanian, dan biaya ekonomi yang tinggi. Pemerintah harus berinvestasi dalam adaptasi dan mitigasi.",

        ideal: {
            interest: 10,
            tax: 40,
            spending: 90,
        },

        hints: [
            "Investasi jangka panjang sangat penting dalam menghadapi perubahan iklim.",
            "Pajak dapat digunakan sebagai instrumen untuk mengubah perilaku ekonomi.",
            "Seorang ekonom akan mempertimbangkan keberlanjutan jangka panjang.",
        ],
    },
];

export default scenarios;
