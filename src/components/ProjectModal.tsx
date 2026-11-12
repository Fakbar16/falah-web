import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, FileText, ExternalLink, Link as LinkIcon, Check, Layers, Code2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onUpdateProjectUrl?: (id: string, newUrl: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onUpdateProjectUrl,
}) => {
  const [customUrl, setCustomUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (project) {
      setCustomUrl(project.url || '');
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const hasUrl = Boolean(customUrl && customUrl.trim() !== '');

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProjectUrl) {
      onUpdateProjectUrl(project.id, customUrl.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-mono text-red-500 font-bold">{project.tipe}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Tutup jendela rincian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-2">
              {project.judul}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.deskripsi}
            </p>
          </div>

          {/* Text-Format Notice or Live Link Banner */}
          {!hasUrl ? (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300 space-y-1">
                <div className="font-semibold text-white">Tersaji sebagai Teks (Belum Ada URL)</div>
                <p className="text-neutral-400">
                  Sesuai instruksi portofolio, karya ini disajikan dalam format teks karena tautan domain publik belum
                  ditentukan. Anda dapat memasukkan URL uji coba di bawah bila diinginkan.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ExternalLink className="w-4 h-4" />
                <span>Tautan aktif: <strong className="font-mono text-white">{customUrl}</strong></span>
              </div>
              <a
                href={customUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Buka URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Full Details & Engineering Notes */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-red-500" />
              <span>Dokumentasi & Arsitektur Teknis</span>
            </h4>
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {project.detailLengkap || project.deskripsi}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Teknologi & Pendekatan
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
              {project.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <span className="font-mono text-red-400">{tag}</span>
                  {i < project.tags.length - 1 && <span className="text-neutral-600" aria-hidden="true">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Optional Interactive URL Updater (Runs locally in browser) */}
          {onUpdateProjectUrl && (
            <form onSubmit={handleSaveUrl} className="pt-4 border-t border-neutral-800 space-y-3">
              <label className="block text-xs font-medium text-neutral-300">
                Hubungkan Tautan URL ke Karya Ini (Opsional)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://falah-project.example.com"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-lg text-xs text-white placeholder-neutral-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors shrink-0"
                >
                  Simpan Tautan
                </button>
              </div>
              {savedSuccess && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Tautan karya berhasil diperbarui secara lokal.</span>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
