/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EducationAndCertifications from './components/EducationAndCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import DeploymentGuideModal from './components/DeploymentGuideModal';
import { generateResumePdf } from './utils/generateResumePdf';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const handleDownloadResume = () => {
    try {
      generateResumePdf();
      setDownloadSuccessToast(true);
      setTimeout(() => setDownloadSuccessToast(false), 3500);
    } catch (err) {
      console.error('Failed to generate resume PDF:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-[#f1f3f9] selection:bg-purple-600/30 selection:text-purple-200">
      {/* Navigation */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onDownloadResume={handleDownloadResume}
        onOpenGuide={() => setGuideModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        <Hero
          onOpenResume={() => setResumeModalOpen(true)}
          onDownloadResume={handleDownloadResume}
        />
        <About onOpenResume={() => setResumeModalOpen(true)} />
        <Skills />
        <Projects />
        <EducationAndCertifications />
        <Contact
          onDownloadResume={handleDownloadResume}
          onOpenResume={() => setResumeModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenGuide={() => setGuideModalOpen(true)}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onDownloadPdf={handleDownloadResume}
      />

      <DeploymentGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />

      {/* Toast Notification for Resume Download */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e111d] border border-purple-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="text-xs">
            <span className="font-semibold block">Resume Downloaded</span>
            <span className="text-slate-400">Banupriya_Mani_Resume.pdf generated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
}
