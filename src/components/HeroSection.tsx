import React from 'react';
import { ArrowDown, ExternalLink, Code2, Sparkles, Terminal } from 'lucide-react';

interface HeroSectionProps {
  nama: string;
  fokus: string;
  bio: string;
  statusKetersediaan: string;
  onEditProfile: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  nama,
  fokus,
  bio,
  statusKetersediaan,
  onEditProfile,
}) => {
  return (
    <section id="beranda" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background red accent glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-red-600/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Quiet Kicker with unboxed typographic separator */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-4">
              <span>Portofolio Personal</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">{fokus}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Halo, Saya <span className="text-red-500">{nama}</span>
            </h1>

            {/* Subheading: Focus */}
            <div className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-neutral-200 mb-6">
              <span className="text-neutral-400 font-normal">Fokus:</span>
              <span className="text-white border-b-2 border-red-600/60 pb-0.5">{fokus}</span>
            </div>

            {/* Bio Callout Box with red hairline accent */}
            <div className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 mb-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-600" />
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-1">
                Filosofi Hidup
              </div>
              <p className="text-xl sm:text-2xl font-medium italic text-neutral-100">
                "{bio}"
              </p>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Motto hidup yang memandu setiap langkah rekayasa perangkat lunak: terus bergerak,
                memecahkan tantangan dengan dedikasi nyata, dan menciptakan solusi bermakna.
              </p>
            </div>

            {/* CTAs & Navigation Actions */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#karya"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-950/40"
              >
                <span>Lihat Karya Saya</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#tautan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors"
              >
                <span>Tautan & Kontak</span>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </a>

              <button
                type="button"
                onClick={onEditProfile}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-medium text-neutral-400 hover:text-white border border-neutral-800/80 hover:border-red-600/40 rounded-lg transition-colors bg-neutral-950/60"
                title="Sesuaikan data diri langsung di browser"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>Sesuaikan Data Diri</span>
              </button>
            </div>

            {/* Status strip metadata (unboxed, separated by middot) */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span className="text-neutral-300 font-medium">Status:</span>
              <span>{statusKetersediaan}</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300">Aksen: Merah</span>
              <span aria-hidden="true">·</span>
              <span>Satu Halaman Statis</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-[380px]">
              {/* Decorative Red Frame Layer */}
              <div
                className="absolute -inset-1.5 rounded-2xl bg-gradient-to-b from-red-600/40 to-neutral-900/10 blur-sm"
                aria-hidden="true"
              />

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <img
                  src="/src/assets/images/avatar_falah_engineer_1794455814320.jpg"
                  alt={`Potret ${nama} — ${fokus}`}
                  className="w-full aspect-square object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />

                {/* Resilient CSS Fallback Container */}
                <div
                  style={{ display: 'none' }}
                  className="w-full aspect-square bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex-col items-center justify-center p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center mb-4">
                    <Code2 className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{nama}</h3>
                  <p className="text-xs text-neutral-400">{fokus}</p>
                </div>

                {/* Subdued Bottom Overlay Info */}
                <div className="p-4 bg-neutral-950/90 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <span>{nama}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                    </div>
                    <div className="text-xs text-neutral-400">{fokus}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-red-400">"{bio}"</span>
                  </div>
                </div>
              </div>

              {/* Small floating badge with developer icon */}
              <div className="absolute -bottom-4 -left-4 bg-neutral-900/95 border border-neutral-700/80 rounded-lg px-3.5 py-2 shadow-xl flex items-center gap-2.5 backdrop-blur-md">
                <Terminal className="w-4 h-4 text-red-500" />
                <span className="text-xs font-medium text-neutral-200">Personal Portfolio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Metric Strip below the split */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Peran Utama</div>
            <div className="text-base font-semibold text-white">{fokus}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Filosofi Inti</div>
            <div className="text-base font-semibold text-red-500 italic">"{bio}"</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Arsitektur Web</div>
            <div className="text-base font-semibold text-white">Frontend Statis</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Aksen Visual</div>
            <div className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
              <span>Merah Bold</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
