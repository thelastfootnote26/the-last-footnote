
const backgrounds = {
  library: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600",
  classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600",
  corridor: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600",
  newspaper: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600",
  rain: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600",
  desk: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600",
  archive: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600"
};

let stats = {
  evidence: 0,
  logic: 0,
  trust: 0,
  suspicion: 0,
  affection: 0,
  mistakes: 0,
  secret: 0
};

let clues = [];
let current = 0;
let answered = false;
let gameFinished = false;

const story = [
  {
    chapter: 1,
    location: "SMA ARUNIKA",
    title: "The Beginning",
    bg: "corridor",
    text: `Hari Senin selalu terasa sama.

Suara sepatu di koridor, obrolan siswa, dan bel sekolah yang berbunyi terlalu keras.

Namun pagi itu wali kelas memberikan tugas berbeda.

"Untuk penilaian Bahasa Indonesia, kalian akan membuat artikel ilmiah populer. Topiknya bebas, selama berdasarkan informasi dan fakta."

Kamu tertarik mengambil topik sejarah sekolah.

Siapa sangka tugas sederhana itu akan membawamu pada sebuah misteri.`,
    choices: [
      {
        text: "Mencari sejarah lama sekolah.",
        effect: {logic:1}
      },
      {
        text: "Meneliti kebiasaan siswa.",
        effect: {trust:1}
      },
      {
        text: "Mencari kantin terlebih dahulu.",
        effect: {affection:1}
      }
    ]
  },
  {
    chapter: 1,
    location: "RUANG KELAS",
    title: "The Assignment",
    bg: "classroom",
    speaker: "Mira",
    text: `"Kamu serius mau mengambil sejarah sekolah?"

Mira menarik kursi di sebelahmu.

"Kalau mau membuat artikel yang bagus, kita harus punya sumber yang jelas. Jangan asal menulis dari cerita orang."

Ia membuka buku catatannya.

"Artikel ilmiah populer tetap berdasarkan fakta, meskipun bahasanya dibuat mudah dipahami."`,
    choices: [
      {
        text: "Apa saja yang harus disiapkan?",
        effect: {logic:1}
      },
      {
        text: "Mau membantuku mencari sumber?",
        effect: {trust:1}
      },
      {
        text: "Kita cari makanan dulu.",
        effect: {affection:1}
      }
    ]
  },
  {
    chapter: 1,
    location: "PERPUSTAKAAN",
    title: "The Forgotten Article",
    bg: "library",
    text: `Saat mencari buku sejarah, kamu menemukan map cokelat di rak paling bawah.

Di dalamnya terdapat artikel koran lama.

Judulnya membuatmu berhenti membaca.

"Seorang Siswi Menghilang Tanpa Jejak: Kasus Alena, 2021."

Namun arsip resmi sekolah menyatakan tidak pernah ada siswi bernama Alena.`,
    choices: [
      {
        text: "Ambil artikel dan periksa tanggalnya.",
        effect: {evidence:1,logic:1},
        clue: ["Artikel Koran Lama","Artikel mengenai hilangnya siswi bernama Alena."]
      },
      {
        text: "Cari buku sejarah lainnya.",
        effect: {logic:1}
      },
      {
        text: "Foto artikel untuk dibaca nanti.",
        effect: {evidence:1},
        clue: ["Foto Artikel","Salinan digital artikel lama."]
      }
    ]
  },
  {
    chapter: 1,
    location: "PERPUSTAKAAN",
    title: "The First Question",
    bg: "library",
    speaker: "Arka",
    text: `"Kamu sedang membaca apa?"

Seseorang berdiri di samping meja.

Namanya Arka. Salah satu siswa yang dikenal jarang berbicara.

Matanya berhenti pada artikel di tanganmu.

"Jangan terlalu percaya pada koran lama. Tidak semua tulisan yang dicetak berarti benar."

Ia menarik kursi.

"Kalau ingin menggunakannya sebagai sumber, periksa dulu siapa penulisnya."`,
    choices: [
      {
        text: "Kamu tahu sesuatu tentang Alena?",
        effect: {trust:1,affection:1}
      },
      {
        text: "Aku hanya mencari bahan artikel.",
        effect: {trust:1}
      },
      {
        text: "Kenapa kamu terlihat terganggu?",
        effect: {suspicion:1}
      }
    ]
  },
  {
    chapter: 1,
    location: "PERPUSTAKAAN",
    title: "The Credibility Test",
    bg: "library",
    type: "question",
    question: "Sumber A mencantumkan nama penulis, tanggal penerbitan, dan narasumber. Sumber B berasal dari akun anonim tanpa bukti. Mana yang lebih layak dijadikan rujukan awal?",
    options: [
      "Sumber A, karena informasinya dapat diperiksa.",
      "Sumber B, karena lebih mengejutkan.",
      "Keduanya pasti benar."
    ],
    correct: 0,
    explanation: "Sumber A lebih layak karena identitas dan informasinya dapat diverifikasi.",
    effect: {logic:2,evidence:1}
  }
];

story.push(
  {
    chapter: 1,
    location: "ARSIP SEKOLAH",
    title: "A Missing Name",
    bg: "archive",
    text: `Kamu membuka arsip digital sekolah.

Daftar siswa tahun 2021 tersusun rapi.

Tidak ada nama Alena.

Namun, pada halaman terakhir terdapat nomor dokumen yang sengaja dicoret dengan tinta hitam.

Kamu mencatat nomor itu.`,
    choices: [
      {
        text: "Catat nomor dokumen.",
        effect: {evidence:2,secret:1},
        clue: ["Nomor Dokumen","Nomor arsip yang dihapus dari daftar resmi."]
      },
      {
        text: "Tanyakan kepada petugas.",
        effect: {trust:1}
      },
      {
        text: "Abaikan dahulu.",
        effect: {suspicion:1}
      }
    ]
  },
  {
    chapter: 1,
    location: "KORIDOR",
    title: "The First Warning",
    bg: "rain",
    text: `Ponselmu bergetar.

Sebuah pesan masuk dari nomor tidak dikenal.

"Berhenti mencari nama itu."

Pesan kedua masuk.

"Artikel yang kamu temukan bukan satu-satunya."`,
    choices: [
      {
        text: "Balas: Siapa ini?",
        effect: {suspicion:1}
      },
      {
        text: "Simpan tangkapan layar.",
        effect: {evidence:1},
        clue: ["Pesan Misterius","Nomor tak dikenal memperingatkanmu."]
      },
      {
        text: "Tunjukkan kepada Arka.",
        effect: {trust:1,affection:1}
      }
    ]
  },
  {
    chapter: 1,
    location: "KAMAR NARA",
    title: "End of Chapter One",
    bg: "desk",
    text: `Malam itu kamu membuka kembali foto artikel.

Di bagian paling bawah ada kalimat kecil.

"Untuk siapa pun yang membaca ini: jangan percaya pada kesimpulan pertama."

Kamu mulai menyadari bahwa tugas sekolahmu mungkin menjadi sesuatu yang jauh lebih rumit.`,
    choices: [
      {text:"Tutup buku dan istirahat."}
    ]
  },

  // CHAPTER 2
  {
    chapter: 2,
    location: "PERPUSTAKAAN",
    title: "The Second Source",
    bg: "library",
    text: `Keesokan harinya kamu kembali ke perpustakaan.

Kali ini kamu membawa daftar pertanyaan.

Jika artikel lama itu benar, pasti ada sumber lain yang dapat mendukung isinya.

Kamu memutuskan mencari berita pembanding.`,
    choices: [
      {text:"Cari arsip koran tahun 2021.",effect:{evidence:1,logic:1}},
      {text:"Cari catatan kegiatan sekolah.",effect:{evidence:1}},
      {text:"Minta Mira membantu.",effect:{trust:1}}
    ]
  },
  {
    chapter: 2,
    location: "RUANG ARSIP",
    title: "Two Different Accounts",
    bg: "archive",
    type: "question",
    question: "Artikel pertama menyatakan kegiatan penelitian dilaksanakan tanggal 12 Mei. Artikel kedua menyebutkan kegiatan dibatalkan. Apa tindakan paling tepat?",
    options: [
      "Memeriksa dokumen dan mewawancarai sumber terkait.",
      "Memilih informasi yang paling menarik.",
      "Menggabungkan keduanya tanpa pemeriksaan."
    ],
    correct: 0,
    explanation: "Informasi yang bertentangan harus diperiksa melalui sumber lain.",
    effect: {logic:2,evidence:1}
  },
  {
    chapter: 2,
    location: "RUANG JURNALISTIK",
    title: "The Headline",
    bg: "newspaper",
    type: "question",
    question: "Judul artikel ilmiah populer tentang pengelolaan sampah yang paling tepat adalah ...",
    options: [
      "Pengaruh Kebiasaan Memilah Sampah terhadap Kebersihan Sekolah",
      "SEKOLAH KITA PALING KOTOR!",
      "Sampah Adalah Hal yang Menyebalkan."
    ],
    correct: 0,
    explanation: "Judul pertama jelas, informatif, dan sesuai topik.",
    effect: {logic:2}
  },
  {
    chapter: 2,
    location: "KORIDOR",
    title: "The Interview",
    bg: "corridor",
    speaker: "Mira",
    text: `"Aku menemukan seseorang yang pernah menjadi anggota jurnalistik sekolah tahun 2021."

Mira menunjukkan sebuah nama.

"Namanya Pak Damar. Kita bisa mencoba mewawancarainya."

Namun, kita harus menyiapkan pertanyaan yang tidak menggiring jawaban.`,
    choices: [
      {text:"Tanyakan kegiatan jurnalistik tahun 2021.",effect:{logic:1,trust:1}},
      {text:"Tanyakan mengapa beliau menyembunyikan sesuatu.",effect:{suspicion:1}},
      {text:"Minta Mira menyiapkan pertanyaan.",effect:{trust:1}}
    ]
  },
  {
    chapter: 2,
    location: "RUANG GURU",
    title: "The Interview Notes",
    bg: "classroom",
    type: "question",
    question: "Pertanyaan wawancara yang paling netral adalah ...",
    options: [
      "Bisakah Bapak menceritakan kegiatan jurnalistik sekolah tahun 2021?",
      "Mengapa Bapak menghapus bukti Alena?",
      "Bapak pasti tahu sekolah berbohong, bukan?"
    ],
    correct: 0,
    explanation: "Pertanyaan pertama tidak menggiring narasumber.",
    effect: {logic:2,evidence:1}
  },
  {
    chapter: 2,
    location: "RUANG GURU",
    title: "An Old Memory",
    bg: "classroom",
    speaker: "Pak Damar",
    text: `"Saya memang mengenal beberapa anggota jurnalistik saat itu."

Pak Damar menghela napas.

"Namun, saya tidak ingat seorang siswi bernama Alena."

Sebelum wawancara berakhir, beliau berkata:

"Kalau ingin mencari dokumen lama, periksa ruang penyimpanan majalah sekolah."`,
    choices: [
      {
        text:"Catat jawaban narasumber.",
        effect:{evidence:2},
        clue:["Wawancara Pak Damar","Mantan pembina jurnalistik tidak mengingat Alena."]
      },
      {text:"Tanyakan lokasi ruang majalah.",effect:{evidence:1}},
      {text:"Akhiri wawancara dengan sopan.",effect:{trust:1}}
    ]
  },
  {
    chapter: 2,
    location: "KAMAR NARA",
    title: "A Contradiction",
    bg: "desk",
    text: `Pak Damar mengatakan tidak mengenal Alena.

Namun, artikel lama menyebutkan bahwa Alena adalah ketua tim jurnalistik.

Dua informasi tersebut tidak mungkin menjadi gambaran lengkap.

Seseorang pasti melewatkan sesuatu.`,
    choices: [
      {text:"Periksa artikel lama.",effect:{logic:1}},
      {
        text:"Cari majalah sekolah.",
        effect:{evidence:1,secret:1},
        clue:["Petunjuk Ruang Majalah","Pak Damar menyarankan pemeriksaan ruang majalah."]
      },
      {text:"Istirahat dahulu.",effect:{affection:1}}
    ]
  },

  // CHAPTER 3
  {
    chapter: 3,
    location: "RUANG JURNALISTIK",
    title: "Facts and Opinions",
    bg: "newspaper",
    speaker: "Arka",
    text: `"Kamu mengumpulkan banyak informasi, tetapi belum semuanya bisa disebut fakta."

Arka duduk di seberang meja.

"Artikel ilmiah populer tidak boleh dibangun hanya dari dugaan."

Ia mengambil catatanmu.

"Coba bedakan mana informasi yang dapat dibuktikan dan mana yang hanya penilaian pribadi."`,
    choices: [
      {text:"Baik, kita periksa satu per satu.",effect:{trust:1,logic:1}},
      {text:"Aku sudah tahu caranya.",effect:{suspicion:1}},
      {text:"Bisa ajari aku?",effect:{affection:1,trust:1}}
    ]
  },
  {
    chapter: 3,
    location: "MEJA REDAKSI",
    title: "Fact or Opinion",
    bg: "desk",
    type: "question",
    question: "Kalimat manakah yang merupakan fakta?",
    options: [
      "Perpustakaan sekolah memiliki 12 rak buku.",
      "Perpustakaan sekolah adalah tempat paling nyaman.",
      "Semua siswa pasti menyukai perpustakaan."
    ],
    correct: 0,
    explanation: "Jumlah rak dapat diperiksa dan dibuktikan.",
    effect: {logic:2}
  },
  {
    chapter: 3,
    location: "MEJA REDAKSI",
    title: "The Main Idea",
    bg: "newspaper",
    type: "question",
    question: "Membaca rutin dapat menambah kosakata, memperluas wawasan, dan meningkatkan kemampuan memahami informasi. Apa gagasan pokoknya?",
    options: [
      "Membaca rutin memberikan berbagai manfaat.",
      "Kosakata hanya diperoleh dari buku.",
      "Semua orang harus membaca setiap hari."
    ],
    correct: 0,
    explanation: "Paragraf membahas manfaat membaca secara rutin.",
    effect: {logic:2}
  },
  {
    chapter: 3,
    location: "RUANG KOMPUTER",
    title: "The Missing Structure",
    bg: "classroom",
    type: "question",
    question: "Bagian artikel yang berisi pembahasan utama, penjelasan, data, dan uraian disebut ...",
    options: [
      "Isi atau pembahasan",
      "Judul",
      "Identitas penulis"
    ],
    correct: 0,
    explanation: "Bagian isi mengembangkan topik dengan penjelasan dan data pendukung.",
    effect: {logic:2}
  },
  {
    chapter: 3,
    location: "RUANG KOMPUTER",
    title: "The Sentence",
    bg: "desk",
    type: "question",
    question: "Pilih kalimat yang paling efektif.",
    options: [
      "Para siswa melakukan penelitian terhadap lingkungan sekolah.",
      "Para siswa-siswa melakukan penelitian.",
      "Penelitian dilakukan oleh para siswa-siswa semuanya."
    ],
    correct: 0,
    explanation: "Kalimat pertama tidak menggunakan bentuk jamak secara berlebihan.",
    effect: {logic:2}
  },
  {
    chapter: 3,
    location: "PERPUSTAKAAN",
    title: "A Deleted Paragraph",
    bg: "library",
    text: `Di balik majalah lama kamu menemukan sebuah halaman yang hampir terlepas.

Tulisan tangannya berbeda.

Ada satu paragraf yang dicoret.

Kamu masih bisa membaca:

"Kesimpulan penelitian tersebut tidak sesuai dengan data yang dikumpulkan."

Di bagian bawah terdapat inisial A.`,
    choices: [
      {
        text:"Simpan halaman itu.",
        effect:{evidence:2,secret:1},
        clue:["Paragraf yang Dihapus","Catatan berinisial A menyebut kesimpulan penelitian tidak sesuai dengan data."]
      },
      {text:"Foto tulisan tersebut.",effect:{evidence:1}},
      {text:"Tunjukkan kepada Arka.",effect:{trust:1,affection:1}}
    ]
  },
  {
    chapter: 3,
    location: "RUANG KOMPUTER",
    title: "Connecting the Sentences",
    bg: "classroom",
    type: "question",
    question: "Pilih konjungsi yang tepat: 'Data menunjukkan peningkatan jumlah pembaca, ... kegiatan literasi perlu dikembangkan.'",
    options: ["sehingga","meskipun","tetapi"],
    correct: 0,
    explanation: "'Sehingga' menyatakan hubungan akibat atau hasil.",
    effect: {logic:2}
  },
  {
    chapter: 3,
    location: "KORIDOR",
    title: "A Quiet Conversation",
    bg: "rain",
    speaker: "Arka",
    text: `"Kamu selalu terlihat serius saat membaca sesuatu."

Arka berjalan di sampingmu.

"Aku dulu juga suka menulis."

Kamu menoleh.

"Dulu?"

Ia tidak langsung menjawab.

"Sudah lama."`,
    choices: [
      {text:"Apa yang membuatmu berhenti menulis?",effect:{trust:1,affection:1}},
      {text:"Kita fokus pada kasus ini.",effect:{logic:1}},
      {text:"Ayo menulis bersama lagi.",effect:{affection:1}}
    ]
  }
);

/* =====================================
   CHAPTER 4 & 5
   ===================================== */

story.push(
  {
    chapter: 4,
    location: "RUANG MAJALAH",
    title: "The Deleted Name",
    bg: "archive",
    text: `Ruang penyimpanan majalah sekolah berdebu.

Di dalam lemari paling belakang, kamu menemukan daftar anggota jurnalistik tahun 2021.

Nama Alena tercatat di urutan ketiga.

Namun, seseorang menempelkan kertas putih di atas namanya.

Di bawah kertas itu terdapat sebuah tanda tangan.`,
    choices: [
      {
        text: "Foto daftar anggota.",
        effect: {evidence:2,secret:1},
        clue: ["Daftar Anggota Jurnalistik","Nama Alena pernah tercatat secara resmi."]
      },
      {text:"Periksa tanda tangan.",effect:{logic:1}},
      {text:"Cari dokumen lainnya.",effect:{evidence:1}}
    ]
  },
  {
    chapter: 4,
    location: "RUANG MAJALAH",
    title: "The Technical Term",
    bg: "archive",
    type: "question",
    question: "Dalam artikel penelitian, istilah objektif paling tepat berarti ...",
    options: [
      "Berdasarkan fakta dan tidak dipengaruhi pendapat pribadi.",
      "Ditulis berdasarkan perasaan penulis.",
      "Memuat penilaian yang paling disukai pembaca."
    ],
    correct: 0,
    explanation: "Objektif berarti berdasarkan fakta, data, dan pertimbangan yang tidak memihak.",
    effect: {logic:2}
  },
  {
    chapter: 4,
    location: "RUANG JURNALISTIK",
    title: "Direct Quotation",
    bg: "newspaper",
    type: "question",
    question: "Manakah contoh kutipan langsung yang benar?",
    options: [
      "Pak Damar berkata, 'Saya mengenal anggota jurnalistik saat itu.'",
      "Pak Damar berkata bahwa ia mengenal anggota jurnalistik.",
      "Menurut Pak Damar, katanya anggota jurnalistik."
    ],
    correct: 0,
    explanation: "Kutipan langsung mempertahankan ucapan narasumber dan menggunakan tanda petik.",
    effect: {logic:2}
  },
  {
    chapter: 4,
    location: "KORIDOR SEKOLAH",
    title: "The Argument",
    bg: "rain",
    speaker: "Arka",
    text: `"Kamu harus berhenti."

Suara Arka terdengar lebih keras daripada biasanya.

"Ada informasi yang belum kamu ketahui. Jangan asal menyimpulkan."

Kamu menatapnya.

"Kalau begitu, katakan apa yang kamu tahu."

Arka terdiam cukup lama.

"Aku tidak bisa."`,
    choices: [
      {text:"Aku tetap akan mencari kebenaran.",effect:{evidence:1,trust:-1}},
      {text:"Aku akan mendengarkan penjelasanmu.",effect:{trust:2,affection:1}},
      {text:"Kamu menyembunyikan sesuatu, kan?",effect:{suspicion:2}}
    ]
  },
  {
    chapter: 4,
    location: "KAMAR NARA",
    title: "Paraphrasing",
    bg: "desk",
    type: "question",
    question: "Kalimat sumber: 'Penelitian menunjukkan bahwa membaca dapat meningkatkan pemahaman informasi.' Manakah parafrasa yang tepat?",
    options: [
      "Hasil penelitian memperlihatkan bahwa kebiasaan membaca membantu seseorang memahami informasi.",
      "Penelitian membaca menunjukkan pemahaman informasi membaca penelitian.",
      "Membaca pasti membuat semua orang menjadi pintar."
    ],
    correct: 0,
    explanation: "Parafrasa menyampaikan kembali gagasan dengan susunan kata berbeda tanpa mengubah makna.",
    effect: {logic:2}
  },
  {
    chapter: 4,
    location: "ARSIP SEKOLAH",
    title: "The Last Document",
    bg: "archive",
    text: `Sebuah dokumen akhirnya ditemukan.

Dokumen itu berisi laporan penelitian siswa tahun 2021.

Di bagian kesimpulan tertulis bahwa seluruh data telah diverifikasi.

Namun pada lampiran terdapat angka yang berbeda dengan laporan utama.

Seseorang telah mengubah hasil penelitian tersebut.

Dan nama penulisnya adalah Alena.`,
    choices: [
      {
        text:"Bandingkan data pada lampiran.",
        effect:{evidence:2,secret:1},
        clue:["Laporan Penelitian","Data lampiran berbeda dari kesimpulan laporan utama."]
      },
      {text:"Simpan dokumen sebagai bukti.",effect:{evidence:1}},
      {text:"Periksa siapa yang menandatangani laporan.",effect:{logic:1,secret:1}}
    ]
  },

  // CHAPTER 5
  {
    chapter: 5,
    location: "RUANG JURNALISTIK",
    title: "The Final Draft",
    bg: "newspaper",
    text: `Semua catatan kini tersusun di atas meja.

Kamu memiliki artikel lama, catatan wawancara, daftar anggota jurnalistik, dan laporan penelitian.

Namun sebelum mengungkapkan semuanya, kamu harus menyusun artikel dengan benar.

Sebuah tulisan ilmiah populer harus memiliki informasi yang dapat dipertanggungjawabkan.

Kali ini satu kesalahan bisa mengubah hidup seseorang.`,
    choices: [
      {text:"Mulai menyusun artikel.",effect:{logic:1}},
      {text:"Periksa semua bukti sekali lagi.",effect:{evidence:1}},
      {text:"Minta Arka membaca draf.",effect:{trust:1,affection:1}}
    ]
  },
  {
    chapter: 5,
    location: "RUANG REDAKSI",
    title: "The Conclusion",
    bg: "desk",
    type: "question",
    question: "Apa kesimpulan paling tepat jika data penelitian bertentangan dengan laporan utamanya?",
    options: [
      "Kesimpulan perlu ditinjau ulang berdasarkan pemeriksaan data.",
      "Kesimpulan tetap benar karena sudah diterbitkan.",
      "Data yang berbeda harus diabaikan."
    ],
    correct: 0,
    explanation: "Kesimpulan harus sesuai dengan data yang valid dan dapat diperiksa.",
    effect: {logic:2}
  },
  {
    chapter: 5,
    location: "RUANG REDAKSI",
    title: "The Final Choice",
    bg: "newspaper",
    text: `Kamu menatap layar komputer.

Draf artikel telah selesai.

Di hadapanmu terdapat beberapa pilihan.

Kebenaran dapat diterbitkan, disimpan, atau bahkan disembunyikan.

Kamu tahu bahwa setiap pilihan memiliki konsekuensi.

Arka berdiri di dekat jendela.

"Apa pun keputusanmu, pastikan kamu tahu alasan di baliknya."

Kursor berkedip di atas tombol TERBITKAN.`,
    choices: [
      {
        text:"Terbitkan seluruh hasil penyelidikan dengan bukti lengkap.",
        effect:{logic:2,trust:1},
        ending:"truth"
      },
      {
        text:"Terbitkan artikel, tetapi lindungi identitas seseorang.",
        effect:{affection:2,trust:2},
        ending:"romance"
      },
      {
        text:"Ungkapkan petunjuk yang belum diketahui sekolah.",
        effect:{secret:3,evidence:1},
        ending:"secret"
      },
      {
        text:"Terbitkan artikel berdasarkan dugaan menarik.",
        effect:{suspicion:3,mistakes:2},
        ending:"bad"
      },
      {
        text:"Simpan artikel dan cari saksi yang hilang.",
        effect:{evidence:1,logic:1},
        ending:"mystery"
      }
    ]
  }
);

/* =====================================
   GAME ENGINE
   ===================================== */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

function newGame() {
  stats = {
    evidence:0,
    logic:0,
    trust:0,
    suspicion:0,
    affection:0,
    mistakes:0,
    secret:0
  };

  clues = [];
  current = 0;
  gameFinished = false;

  saveGame();
  showScreen("game");
  renderScene();
}

function saveGame() {
  localStorage.setItem("lastFootnoteSave",JSON.stringify({
    stats,
    clues,
    current
  }));
}

function continueGame() {
  const saved = localStorage.getItem("lastFootnoteSave");

  if (!saved) {
    alert("Belum ada permainan tersimpan!");
    return;
  }

  try {
    const data = JSON.parse(saved);
    stats = {...stats,...data.stats};
    clues = data.clues || [];
    current = Math.max(0,Math.min(data.current,story.length-1));
    gameFinished = false;

    showScreen("game");
    renderScene();
  } catch(error) {
    alert("Data penyimpanan tidak dapat dibaca.");
  }
}

function applyEffect(effect = {}) {
  Object.keys(effect).forEach(key => {
    if (typeof stats[key] === "number") {
      stats[key] += effect[key];
      stats[key] = Math.max(0,stats[key]);
    }
  });
}

function addClue(clue) {
  if (!clue) return;

  if (!clues.some(item => item.title === clue[0])) {
    clues.push({
      title:clue[0],
      description:clue[1]
    });
  }
}

function renderScene() {
  const data = story[current];

  if (!data) {
    calculateEnding();
    return;
  }

  answered = false;

  document.getElementById("chapter-label").textContent =
    "CHAPTER 0" + data.chapter;

  document.getElementById("progress-text").textContent =
    "Chapter " + data.chapter + " / 5";

  document.getElementById("location").textContent =
    data.location;

  document.getElementById("scene-title").textContent =
    data.title;

  document.getElementById("scene").style.backgroundImage =
    `url("${backgrounds[data.bg]}")`;

  document.getElementById("speaker").textContent =
    data.speaker || "";

  document.getElementById("story-text").textContent =
    data.type === "question" ? data.question : data.text;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  document.getElementById("next-btn").style.display = "none";

  if (data.type === "question") {
    data.options.forEach((option,index) => {
      const button = document.createElement("button");
      button.className = "choice-btn";
      button.textContent = option;
      button.onclick = () => answerQuestion(index);
      choices.appendChild(button);
    });
  } else {
    data.choices.forEach(choice => {
      const button = document.createElement("button");
      button.className = "choice-btn";
      button.textContent = choice.text;
      button.onclick = () => chooseOption(choice);
      choices.appendChild(button);
    });
  }
}

function chooseOption(choice) {
  if (answered) return;
  answered = true;

  applyEffect(choice.effect);
  addClue(choice.clue);

  if (choice.ending) {
    calculateEnding(choice.ending);
    return;
  }

  document.getElementById("choices").innerHTML = "";
  document.getElementById("next-btn").style.display = "inline-block";

  saveGame();
}

function answerQuestion(index) {
  if (answered) return;
  answered = true;

  const data = story[current];
  const correct = index === data.correct;

  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach((button,i) => {
    button.disabled = true;

    if (i === data.correct) {
      button.style.borderColor = "#8ca77d";
    } else if (i === index) {
      button.style.borderColor = "#a45e54";
    }
  });

  if (correct) {
    applyEffect(data.effect);
  } else {
    stats.mistakes++;
    stats.suspicion++;
  }

  const explanation = document.createElement("div");
  explanation.className = "choice-btn";

  const result = document.createElement("strong");
  result.textContent = correct ? "Jawaban benar!" : "Belum tepat.";

  const detail = document.createElement("p");
  detail.textContent = data.explanation;

  explanation.append(result,detail);
  document.getElementById("choices").appendChild(explanation);

  document.getElementById("next-btn").style.display = "inline-block";

  saveGame();
}

function nextScene() {
  if (gameFinished) return;

  current++;
  saveGame();

  if (current >= story.length) {
    calculateEnding();
  } else {
    renderScene();
  }
}

/* =====================================
   NOTEBOOK / CLUE SYSTEM
   ===================================== */

function openNotebook() {
  const list = document.getElementById("clue-list");
  list.innerHTML = "";

  if (clues.length === 0) {
    list.textContent = "Belum ada petunjuk ditemukan.";
  }

  clues.forEach(clue => {
    const item = document.createElement("div");
    item.className = "clue";

    const title = document.createElement("h4");
    title.textContent = clue.title;

    const description = document.createElement("p");
    description.textContent = clue.description;

    item.append(title,description);
    list.appendChild(item);
  });

  document.getElementById("draft-text").textContent =
    clues.length >= 4
      ? "Sejumlah dokumen menunjukkan adanya ketidaksesuaian antara arsip dan laporan penelitian tahun 2021. Informasi ini masih memerlukan verifikasi lebih lanjut."
      : "Bukti yang ditemukan belum cukup untuk membuat kesimpulan.";

  showScreen("notebook");
}

function closeNotebook() {
  showScreen("game");
}

/* =====================================
   FIVE ENDINGS
   ===================================== */

const endings = {
  truth: {
    title:"THE TRUTH BETWEEN US",
    description:`Artikel akhirnya diterbitkan.

Bukti-bukti menunjukkan bahwa laporan penelitian tahun 2021 telah diubah.

Nama Alena dihapus dari arsip sekolah setelah ia mempertanyakan keabsahan data penelitian tersebut.

Sekolah akhirnya membuka penyelidikan resmi.

Arka berdiri di sampingmu.

"Akhirnya, seseorang menuliskan apa yang sebenarnya terjadi."

Untuk pertama kalinya, sebuah tulisan berhasil mengubah sesuatu.`
  },

  romance: {
    title:"THE UNFINISHED ARTICLE",
    description:`Kamu memilih menerbitkan sebagian informasi.

Identitas beberapa orang tetap dirahasiakan.

Arka membaca artikelmu dalam diam.

"Kamu tidak harus menyelesaikan semuanya hari ini."

Ia meletakkan sebuah map di meja.

"Kita masih punya banyak waktu."

Misteri belum berakhir, tetapi kali ini kamu tidak sendirian.`
  },

  mystery: {
    title:"THE LAST WITNESS",
    description:`Kamu memilih menunda penerbitan.

Ada satu saksi yang belum ditemukan.

Tanpa keterangannya, kesimpulanmu masih memiliki celah.

Beberapa minggu kemudian, sebuah surat tiba.

Tidak ada nama pengirim.

Hanya satu kalimat:

"Aku melihat apa yang terjadi pada hari itu."

Ternyata penyelidikanmu baru saja memasuki bagian yang paling sulit.`
  },

  bad: {
    title:"A LIE WORTH KEEPING",
    description:`Artikelmu menjadi pembicaraan seluruh sekolah.

Namun beberapa informasi yang kamu terbitkan ternyata tidak terverifikasi.

Seorang siswa dituduh sebagai penyebab hilangnya dokumen penelitian.

Kamu mendapatkan perhatian, tetapi kehilangan sesuatu yang lebih penting: kepercayaan.

Tidak semua tulisan layak diterbitkan hanya karena menarik untuk dibaca.`
  },

  secret: {
    title:"THE MISSING FOOTNOTE",
    description:`Di balik seluruh dokumen, kamu menemukan satu nama.

Nama yang tidak pernah muncul dalam arsip resmi.

Nama itu ternyata tercantum pada dokumen penelitian asli, tetapi dihapus dari setiap salinan yang diterbitkan.

Kamu menatap tanda tangan tersebut.

Lalu membuka halaman terakhir artikel lama.

Ada sebuah catatan kecil:

"Jika kau menemukan namaku, berarti mereka gagal menghapus semuanya."

Di bawah tulisan itu terdapat inisial yang sama dengan nama seseorang yang masih bersekolah di SMA Arunika.

Dan orang itu masih berada di dekatmu.`
  }
};

function calculateEnding(forcedEnding) {
  if (gameFinished) return;
  gameFinished = true;

  let result = forcedEnding;

  if (!result) {
    if (stats.mistakes >= 3) {
      result = "bad";
    } else if (
      stats.secret >= 3 &&
      stats.evidence >= 7 &&
      stats.logic >= 7
    ) {
      result = "secret";
    } else if (
      stats.evidence >= 7 &&
      stats.logic >= 7
    ) {
      result = "truth";
    } else if (
      stats.trust >= 5 &&
      stats.affection >= 3
    ) {
      result = "romance";
    } else {
      result = "mystery";
    }
  }

  const ending = endings[result] || endings.mystery;

  document.getElementById("ending-title").textContent =
    ending.title;

  document.getElementById("ending-description").textContent =
    ending.description;

  localStorage.removeItem("lastFootnoteSave");

  showScreen("ending");
}

/* =====================================
   MENU & START
   ===================================== */

function openMenu() {
  showScreen("menu");
}

function showCredits() {
  showScreen("credits");
}

showScreen("menu");

