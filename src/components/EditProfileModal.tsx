import React, { useState } from 'react';
import { ProfileData, ProjectItem, PublicLinkItem } from '../types';
import { X, Save, RotateCcw, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface EditProfileModalProps {
  currentData: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: ProfileData) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  currentData,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileData>(currentData);
  const [activeTab, setActiveTab] = useState<'profil' | 'karya' | 'tautan'>('profil');
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProject = (index: number, field: keyof ProjectItem, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.karya];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, karya: updated };
    });
  };

  const handleAddProject = () => {
    const newProject: ProjectItem = {
      id: `karya-${Date.now()}`,
      judul: 'Proyek Baru',
      tipe: 'Eksperimen Web',
      status: 'Dalam Pengerjaan',
      deskripsi: 'Deskripsi singkat karya atau eksperimen teknik perangkat lunak.',
      detailLengkap: 'Dokumentasi detail mengenai arsitektur dan fungsionalitas proyek.',
      tags: ['Frontend', 'Eksperimen'],
      url: '',
    };
    setFormData((prev) => ({ ...prev, karya: [...prev.karya, newProject] }));
  };

  const handleDeleteProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      karya: prev.karya.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateLink = (index: number, field: keyof PublicLinkItem, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.tautanPublik];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, tautanPublik: updated };
    });
  };

  const handleAddLink = () => {
    const newLink: PublicLinkItem = {
      id: `link-${Date.now()}`,
      label: 'Tautan Baru',
      url: 'https://',
      displayUrl: 'domain.com/profil',
      keterangan: 'Deskripsi tautan publik',
      iconName: 'globe',
    };
    setFormData((prev) => ({
      ...prev,
      tautanPublik: [...prev.tautanPublik, newLink],
    }));
  };

  const handleDeleteLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tautanPublik: prev.tautanPublik.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowSavedNotification(true);
    setTimeout(() => {
      setShowSavedNotification(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Sesuaikan Data Diri</span>
              <span className="text-xs font-mono text-red-500 font-normal">(Kustomisasi Instan)</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Ubah data nama, fokus, bio filosofi, karya, atau tautan publik secara langsung di browser.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="px-6 pt-3 border-b border-neutral-800 flex gap-4 bg-neutral-950/40 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('profil')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'profil'
                ? 'border-red-600 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Profil Utama
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('karya')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'karya'
                ? 'border-red-600 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Karya ({formData.karya.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tautan')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'tautan'
                ? 'border-red-600 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Tautan Publik ({formData.tautanPublik.length})
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'profil' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Nama Lengkap / Panggilan
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => handleTextChange('nama', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-lg text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Fokus Keahlian
                </label>
                <input
                  type="text"
                  required
                  value={formData.fokus}
                  onChange={(e) => handleTextChange('fokus', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-lg text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Bio / Filosofi Hidup
                </label>
                <input
                  type="text"
                  required
                  value={formData.bio}
                  onChange={(e) => handleTextChange('bio', e.target.value)}
                  placeholder="Misal: hidup harus hidup"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-lg text-sm text-white outline-none font-medium text-red-400"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Data default: "hidup harus hidup".
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Status Ketersediaan
                </label>
                <input
                  type="text"
                  value={formData.statusKetersediaan}
                  onChange={(e) => handleTextChange('statusKetersediaan', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-lg text-sm text-white outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'karya' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Karya tanpa URL otomatis disajikan sebagai teks.
                </span>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Karya</span>
                </button>
              </div>

              {formData.karya.map((item, index) => (
                <div key={item.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-neutral-500">#{index + 1}</span>
                    <input
                      type="text"
                      value={item.judul}
                      onChange={(e) => handleUpdateProject(index, 'judul', e.target.value)}
                      placeholder="Judul karya (misal: falahwebsait)"
                      className="flex-1 px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded text-sm text-white font-mono font-bold"
                    />
                    {formData.karya.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(index)}
                        className="p-1.5 text-neutral-500 hover:text-red-500 rounded"
                        title="Hapus karya ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={item.tipe}
                      onChange={(e) => handleUpdateProject(index, 'tipe', e.target.value)}
                      placeholder="Tipe (misal: Website Personal)"
                      className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300"
                    />
                    <input
                      type="text"
                      value={item.url || ''}
                      onChange={(e) => handleUpdateProject(index, 'url', e.target.value)}
                      placeholder="URL Tautan (Kosongkan bila belum ada URL)"
                      className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 placeholder-neutral-600"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={item.deskripsi}
                    onChange={(e) => handleUpdateProject(index, 'deskripsi', e.target.value)}
                    placeholder="Deskripsi karya..."
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 resize-none"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tautan' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Kelola tautan publik resmi Anda.
                </span>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Tautan</span>
                </button>
              </div>

              {formData.tautanPublik.map((link, index) => (
                <div key={link.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleUpdateLink(index, 'label', e.target.value)}
                      placeholder="Label (misal: Email / GitHub)"
                      className="w-1/3 px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white font-semibold"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateLink(index, 'url', e.target.value)}
                      placeholder="URL (misal: mailto:... atau https://...)"
                      className="flex-1 px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 font-mono"
                    />
                    {formData.tautanPublik.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteLink(index)}
                        className="p-1.5 text-neutral-500 hover:text-red-500 rounded"
                        title="Hapus tautan ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={link.keterangan || ''}
                    onChange={(e) => handleUpdateLink(index, 'keterangan', e.target.value)}
                    placeholder="Keterangan singkat..."
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-400"
                  />
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Kembalikan semua data ke pengaturan awal Falah?')) {
                onReset();
                onClose();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Pulihkan Data Asli</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md shadow-red-950/40"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>

        {showSavedNotification && (
          <div className="absolute inset-x-0 bottom-16 mx-auto w-max px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>Data profil berhasil diperbarui!</span>
          </div>
        )}
      </div>
    </div>
  );
};
