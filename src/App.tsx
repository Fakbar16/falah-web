import React, { useState, useEffect } from 'react';
import { ProfileData, ProjectItem } from './types';
import { INITIAL_PROFILE_DATA } from './data/defaultData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { LinksSection } from './components/LinksSection';
import { ProjectModal } from './components/ProjectModal';
import { EditProfileModal } from './components/EditProfileModal';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_KEY = 'falah_personal_portfolio_data_v1';

export default function App() {
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal membaca data dari localStorage:', e);
    }
    return INITIAL_PROFILE_DATA;
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync document title with current name & focus
  useEffect(() => {
    document.title = `${profileData.nama} — ${profileData.fokus}`;
  }, [profileData.nama, profileData.fokus]);

  // Save changes to localStorage
  const handleSaveProfile = (newData: ProfileData) => {
    setProfileData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Gagal menyimpan data:', e);
    }
  };

  // Reset to original default data
  const handleResetProfile = () => {
    setProfileData(INITIAL_PROFILE_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Gagal menghapus data di localStorage:', e);
    }
  };

  // Update a single project's URL (e.g. from the project modal)
  const handleUpdateProjectUrl = (id: string, newUrl: string) => {
    const updatedKarya = profileData.karya.map((item) =>
      item.id === id ? { ...item, url: newUrl } : item
    );
    const updatedData: ProfileData = {
      ...profileData,
      karya: updatedKarya,
    };
    handleSaveProfile(updatedData);

    if (selectedProject && selectedProject.id === id) {
      setSelectedProject({ ...selectedProject, url: newUrl });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Fixed Navigation Bar (3-zone Top Bar Contract) */}
      <Navbar
        name={profileData.nama}
        onOpenContact={() => {
          const el = document.getElementById('tautan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 1: Pembuka (Hero) */}
        <HeroSection
          nama={profileData.nama}
          fokus={profileData.fokus}
          bio={profileData.bio}
          statusKetersediaan={profileData.statusKetersediaan}
          onEditProfile={() => setIsEditModalOpen(true)}
        />

        {/* Section 2: Tentang Saya */}
        <AboutSection
          nama={profileData.nama}
          fokus={profileData.fokus}
          bio={profileData.bio}
        />

        {/* Section 3: Karya (Projects) */}
        <ProjectsSection
          karyaList={profileData.karya}
          onSelectProject={(project) => setSelectedProject(project)}
          onAddNewWork={() => setIsEditModalOpen(true)}
        />

        {/* Section 4: Tautan Publik & Kontak */}
        <LinksSection
          links={profileData.tautanPublik}
          emailAddress={
            profileData.tautanPublik.find((l) => l.iconName === 'mail')?.url.replace('mailto:', '') ||
            'falahakbarsaputraa16@gmail.com'
          }
          onEditLinks={() => setIsEditModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        name={profileData.nama}
        focus={profileData.fokus}
        bio={profileData.bio}
      />

      {/* Modal: Detail Karya (Text & Documentation Viewer) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onUpdateProjectUrl={handleUpdateProjectUrl}
      />

      {/* Modal: Edit Data Diri Langsung */}
      <EditProfileModal
        currentData={profileData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />
    </div>
  );
}
