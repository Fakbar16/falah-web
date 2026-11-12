import React, { useState } from 'react';
import { PublicLinkItem } from '../types';
import {
  Mail,
  Github,
  Linkedin,
  MessageSquare,
  Globe,
  ExternalLink,
  Copy,
  Check,
  Send,
  Plus,
} from 'lucide-react';

interface LinksSectionProps {
  links: PublicLinkItem[];
  emailAddress?: string;
  onEditLinks?: () => void;
}

export const LinksSection: React.FC<LinksSectionProps> = ({
  links,
  emailAddress = 'falahakbarsaputraa16@gmail.com',
  onEditLinks,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <Mail className="w-5 h-5 text-red-500" />;
      case 'github':
        return <Github className="w-5 h-5 text-red-500" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-red-500" />;
      case 'message-square':
        return <MessageSquare className="w-5 h-5 text-red-500" />;
      default:
        return <Globe className="w-5 h-5 text-red-500" />;
    }
  };

  const handleCopy = (text: string, id: string) => {
    const cleanText = text.replace('mailto:', '');
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const subject = encodeURIComponent(`Pesan dari Website Personal Falah — ${senderName || 'Pengunjung'}`);
    const body = encodeURIComponent(
      `Halo Falah,\n\nNama: ${senderName || 'Tidak disebutkan'}\nEmail: ${senderEmail || 'Tidak disebutkan'}\n\nPesan:\n${message}\n\n---\nDikirim via website personal Falah (Frontend Statis)`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setMessage('');
      setSenderName('');
      setSenderEmail('');
    }, 4000);
  };

  return (
    <section id="tautan" className="py-20 md:py-28 bg-neutral-900/40 border-t border-neutral-850 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-3">
            <span>Koneksi & Jaringan</span>
            <span aria-hidden="true">·</span>
            <span>Tautan Publik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Tautan Publik & Kontak
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Terhubung secara langsung melalui kanal publik resmi. Silakan hubungi saya untuk kolaborasi proyek,
            diskusi rekayasa perangkat lunak, atau sekadar bertukar sapa.
          </p>
        </div>

        {/* 2-Column Split: Public Links List (Left) + Direct Quick Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Link Cards */}
          <div className="lg:col-span-7 space-y-4">
            {links.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg group-hover:border-red-600/50 transition-colors shrink-0">
                    {getIcon(item.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white group-hover:text-red-400 transition-colors">
                        {item.label}
                      </h3>
                      <span className="text-xs text-neutral-400 font-mono">
                        {item.displayUrl || item.url.replace(/^https?:\/\//, '').replace('mailto:', '')}
                      </span>
                    </div>
                    {item.keterangan && (
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {item.keterangan}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.url, item.id)}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-850 rounded-lg transition-colors border border-neutral-800"
                    title={`Salin tautan ${item.label}`}
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={item.url}
                    target={item.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                  >
                    <span>Buka</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}

            {onEditLinks && (
              <button
                type="button"
                onClick={onEditLinks}
                className="w-full py-3 border border-dashed border-neutral-800 hover:border-red-600/50 rounded-xl text-xs font-medium text-neutral-400 hover:text-white flex items-center justify-center gap-2 transition-colors bg-neutral-950/40"
              >
                <Plus className="w-4 h-4 text-red-500" />
                <span>Sesuaikan atau Tambah Tautan Publik</span>
              </button>
            )}
          </div>

          {/* Right Column: Direct Quick Contact Composer (Client-side mailto generator) */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-white mb-2">Kirim Pesan Langsung</h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Tuliskan pesan Anda dan kirimkan secara langsung ke alamat email resmi{' '}
              <span className="text-neutral-200 font-mono">{emailAddress}</span>.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Misal: Budi / Tim Rekrutmen"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Email Anda (Opsional)
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="nama@domain.com"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Isi Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pesan, tawaran proyek, atau topik diskusi..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg text-sm text-white placeholder-neutral-500 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-lg transition-all shadow-md shadow-red-950/40"
              >
                <Send className="w-4 h-4" />
                <span>Buka di Aplikasi Email</span>
              </button>

              {sentSuccess && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-neutral-200 text-xs rounded-lg text-center animate-fade-in">
                  Aplikasi email telah dibuka dengan pesan Anda. Terima kasih!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
