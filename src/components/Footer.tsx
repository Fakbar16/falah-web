import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  name: string;
  focus: string;
  bio: string;
}

export const Footer: React.FC<FooterProps> = ({ name, focus, bio }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <a href="#beranda" className="text-xl font-bold tracking-tight text-white hover:text-red-500 transition-colors">
              {name}<span className="text-red-600">.</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
              <span>{focus}</span>
              <span aria-hidden="true">·</span>
              <span className="italic text-red-400">"{bio}"</span>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-xs text-neutral-400">
            <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
            <a href="#tentang" className="hover:text-white transition-colors">Tentang Saya</a>
            <a href="#karya" className="hover:text-white transition-colors">Karya</a>
            <a href="#tautan" className="hover:text-white transition-colors">Tautan Publik</a>
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white transition-colors border border-neutral-800"
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} {name}. Semua hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <span>Dibuat dengan React & Vite</span>
            <span aria-hidden="true">·</span>
            <span>Frontend Statis</span>
            <span aria-hidden="true">·</span>
            <span className="text-red-500 font-medium">Aksen Merah</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
