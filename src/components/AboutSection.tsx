import React from 'react';
import { Compass, Cpu, CheckCircle2, HeartHandshake, Layers, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  nama: string;
  fokus: string;
  bio: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ nama, fokus, bio }) => {
  const principles = [
    {
      title: 'Prinsip "Hidup Harus Hidup"',
      deskripsi:
        'Filosofi ini menuntut setiap baris kode dan arsitektur yang dibangun tidak sekadar berjalan pasif, melainkan memberikan dampak nyata, fungsional, dan memberi energi positif bagi penggunanya.',
      icon: Sparkles,
    },
    {
      title: 'Kualitas & Presisi Rekayasa',
      deskripsi:
        'Sebagai Software Enginer, fokus utama saya adalah membangun aplikasi web yang ringan, terstruktur rapi, berkinerja tinggi, dan mudah dirawat dalam jangka panjang.',
      icon: Cpu,
    },
    {
      title: 'Pengalaman & Aksesibilitas',
      deskripsi:
        'Setiap antarmuka dirancang dengan kontras warna yang tegas, hierarki tipografi yang nyaman dibaca, serta responsif di segala ukuran layar perangkat.',
      icon: Compass,
    },
    {
      title: 'Eksplorasi Tanpa Henti',
      deskripsi:
        'Teknologi terus berkembang. Kesiapan untuk mencoba hal baru, bereksperimen dengan prototipe, dan menyempurnakan solusi adalah inti dari keseharian saya.',
      icon: Layers,
    },
  ];

  const skills = [
    'React & Ekosistem Modern',
    'Vite Build Tools',
    'TypeScript',
    'Tailwind CSS & Fluid Design',
    'Frontend Statis Berkecepatan Tinggi',
    'Desain Antarmuka Responsif',
    'Optimasi Performa Web',
    'Struktur Kode Bersih & Modular',
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 bg-neutral-900/40 border-t border-b border-neutral-850 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-3">
            <span>Mengenal Lebih Dekat</span>
            <span aria-hidden="true">·</span>
            <span>Profil & Nilai</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Tentang Saya
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Perjalanan dan komitmen saya sebagai seorang <span className="text-neutral-200 font-medium">{fokus}</span> yang
            menjadikan kesederhanaan, ketangguhan sistem, dan dedikasi sebagai pilar utama.
          </p>
        </div>

        {/* 2-Column Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 leading-relaxed">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span>Misi Rekayasa & Dedikasi</span>
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                Nama saya <strong className="text-white font-semibold">{nama}</strong>. Saya berfokus di bidang{' '}
                <strong className="text-red-400 font-semibold">{fokus}</strong>. Bagi saya, pemrograman bukan sekadar
                mengetikkan baris instruksi logika, melainkan seni memecahkan masalah nyata dan menghadirkan kemudahan
                bagi sesama.
              </p>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Prinsip singkat yang selalu saya pegang teguh adalah{' '}
                <span className="text-red-500 font-bold italic">"{bio}"</span>. Hidup tidak boleh dijalani dengan
                hampa atau setengah hati; hidup harus dirayakan dengan aksi nyata, karya yang terus bergerak, dan
                semangat yang tak padam dalam menghadapi setiap kerumitan teknis.
              </p>
            </div>

            {/* Quick Skills List */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Fokus Kompetensi Teknis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-300">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Principles Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {principles.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-500 shrink-0 mt-0.5">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1.5">{item.title}</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">{item.deskripsi}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quote Card */}
            <div className="p-5 rounded-xl border border-red-900/50 bg-gradient-to-br from-red-950/40 to-neutral-950 flex items-center gap-4">
              <HeartHandshake className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <div className="text-xs text-neutral-400">Pernyataan Komitmen</div>
                <div className="text-sm font-medium text-neutral-200">
                  Selalu mengutamakan integritas, kejelasan kode, dan kolaborasi profesional.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
