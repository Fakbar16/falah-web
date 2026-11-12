import { ProfileData } from '../types';

export const INITIAL_PROFILE_DATA: ProfileData = {
  nama: 'Falah',
  fokus: 'Software Enginer',
  bio: 'hidup harus hidup',
  lokasi: 'Indonesia',
  statusKetersediaan: 'Terbuka untuk Kolaborasi & Proyek Baru',
  karya: [
    {
      id: 'karya-1',
      judul: 'falahwebsait',
      tipe: 'Website Personal',
      status: 'Fondasi Utama',
      deskripsi: 'Situs web personal dan platform representasi profil digital mandiri. Dirancang dengan antarmuka yang bersih, responsif, dan performa optimal untuk menyajikan portofolio rekayasa perangkat lunak.',
      detailLengkap: 'Proyek "falahwebsait" adalah wadah digital utama untuk mendokumentasikan karya, keahlian, dan pemikiran teknik perangkat lunak. Dibangun dengan pendekatan web modern tanpa dependensi berat, mengutamakan kecepatan akses dan tipografi yang terstruktur.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
      url: '', // Belum ada URL -> ditampilkan sebagai teks sesuai instruksi
    },
    {
      id: 'karya-2',
      judul: 'coba buat websait',
      tipe: 'Eksplorasi Antarmuka',
      status: 'Eksperimen Aktif',
      deskripsi: 'Eksperimen pengembangan tata letak web interaktif dan pengujian responsiveness. Berfokus pada arsitektur komponen yang bersih, alur interaksi pengguna yang natural, dan fluid design.',
      detailLengkap: 'Eksperimen langsung dalam merancang sistem desain antarmuka, menguji kontras warna aksen merah, menyusun grid dinamis, dan memastikan fleksibilitas pengalaman di layar ponsel maupun desktop lebar.',
      tags: ['Frontend', 'Responsive Design', 'Komponen Modular'],
      url: '', // Belum ada URL -> ditampilkan sebagai teks
    },
    {
      id: 'karya-3',
      judul: 'liat aja',
      tipe: 'Showcase Kreatif & Demo',
      status: 'Kompilasi Ide',
      deskripsi: 'Koleksi prototipe fungsional, demo logika pemrograman, dan visualisasi pemecahan masalah algoritma sederhana yang dapat dieksplorasi secara terbuka.',
      detailLengkap: 'Kumpulan catatan kode, prototipe ide cepat, dan demonstrasi kemampuan rekayasa perangkat lunak. Dirancang santai namun presisi untuk memperlihatkan bagaimana sebuah ide diubah menjadi kode nyata.',
      tags: ['Prototipe', 'Logika Kode', 'Eksperimen'],
      url: '', // Belum ada URL -> ditampilkan sebagai teks
    },
  ],
  tautanPublik: [
    {
      id: 'link-1',
      label: 'Email',
      url: 'mailto:falahakbarsaputraa16@gmail.com',
      displayUrl: 'falahakbarsaputraa16@gmail.com',
      keterangan: 'Saluran utama untuk korespondensi resmi dan penawaran kerja sama',
      iconName: 'mail',
    },
    {
      id: 'link-2',
      label: 'GitHub',
      url: 'https://github.com',
      displayUrl: 'github.com/falah',
      keterangan: 'Kumpulan repositori kode sumber, commit riwayat, dan proyek open source',
      iconName: 'github',
    },
    {
      id: 'link-3',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      displayUrl: 'linkedin.com/in/falah',
      keterangan: 'Profil jaringan profesional, rekam jejak karier, dan koneksi industri',
      iconName: 'linkedin',
    },
    {
      id: 'link-4',
      label: 'WhatsApp',
      url: 'https://wa.me/?text=Halo%20Falah%2C%20saya%20tertarik%20berdiskusi%20tentang%20proyek%20perangkat%20lunak.',
      displayUrl: 'Kirim Pesan WhatsApp',
      keterangan: 'Komunikasi langsung untuk percakapan cepat dan diskusi awal proyek',
      iconName: 'message-square',
    },
  ],
};
