import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { ExternalLink, FileText, ArrowRight, Layers, Eye, Plus, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  karyaList: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onAddNewWork?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  karyaList,
  onSelectProject,
  onAddNewWork,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredKarya = filterType === 'all'
    ? karyaList
    : karyaList.filter((item) => item.status.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <section id="karya" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-3">
              <span>Portofolio & Rekayasa</span>
              <span aria-hidden="true">·</span>
              <span>Karya Pilihan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Daftar Karya
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Kompilasi proyek dan eksplorasi rekayasa perangkat lunak Falah. Sesuai preferensi, karya
              tanpa URL disajikan secara eksplisit sebagai teks terstruktur lengkap dengan dokumentasi.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons with click handlers) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterType === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Semua ({karyaList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('fondasi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterType === 'fondasi'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Fondasi
            </button>
            <button
              type="button"
              onClick={() => setFilterType('eksperimen')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterType === 'eksperimen'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Eksperimen
            </button>
          </div>
        </div>

        {/* Informative notice card about text-based display rule */}
        <div className="mb-10 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
          <FileText className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-white">Penyajian Format Teks:</strong> Karya yang belum memiliki tautan URL publik
            aktif (seperti <span className="font-mono text-red-400">falahwebsait</span>, <span className="font-mono text-red-400">coba buat websait</span>, dan <span className="font-mono text-red-400">liat aja</span>)
            ditampilkan secara mendalam dalam bentuk teks deskriptif, lingkup teknis, dan rancangan fitur.
          </div>
        </div>

        {/* Bento Grid of Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKarya.map((project, idx) => {
            const hasUrl = Boolean(project.url && project.url.trim() !== '');

            return (
              <div
                key={project.id}
                className="group relative bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-black/40"
              >
                {/* Subtle top red glow on hover */}
                <div
                  className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />

                <div>
                  {/* Unboxed Metadata with Typographic Separator */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-300 font-medium">{project.tipe}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-400">{project.status}</span>
                    </div>
                    <span className="font-mono text-[11px] text-red-400">0{idx + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors font-mono">
                    {project.judul}
                  </h3>

                  {/* Format Indicator (Text vs Live URL) */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                    {hasUrl ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>Tautan Tersedia</span>
                      </span>
                    ) : (
                      <span className="text-neutral-400 flex items-center gap-1 font-mono text-[11px]">
                        <FileText className="w-3 h-3 text-red-500" />
                        <span>Format Teks (Tanpa URL)</span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {project.deskripsi}
                  </p>

                  {/* Tags (rendered as clean unboxed text with middot) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-6">
                    {project.tags.map((tag, tagIdx) => (
                      <React.Fragment key={tag}>
                        <span className="text-neutral-300">{tag}</span>
                        {tagIdx < project.tags.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-red-400 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-red-500" />
                    <span>Baca Rincian Teks</span>
                  </button>

                  {hasUrl ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                    >
                      <span>Buka Tautan</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                      title="Lihat dokumentasi teks"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Quick Action */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-950/60 border border-red-800/40 rounded-xl text-red-500">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Ingin Menambahkan Karya Lain?</h4>
              <p className="text-xs text-neutral-400">
                Data portofolio dapat disesuaikan kapan saja secara mandiri langsung di browser Anda.
              </p>
            </div>
          </div>

          {onAddNewWork && (
            <button
              type="button"
              onClick={onAddNewWork}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md shadow-red-950/30 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah / Sesuaikan Karya</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
