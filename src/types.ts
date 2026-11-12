export interface ProjectItem {
  id: string;
  judul: string;
  tipe: string;
  status: string;
  deskripsi: string;
  detailLengkap?: string;
  tags: string[];
  url?: string;
}

export interface PublicLinkItem {
  id: string;
  label: string;
  url: string;
  displayUrl?: string;
  keterangan?: string;
  iconName: 'mail' | 'github' | 'linkedin' | 'globe' | 'message-square' | 'external-link';
}

export interface ProfileData {
  nama: string;
  fokus: string;
  bio: string;
  lokasi: string;
  statusKetersediaan: string;
  karya: ProjectItem[];
  tautanPublik: PublicLinkItem[];
}
