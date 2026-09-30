import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Download, 
  Eye, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Sparkles, 
  Code2, 
  Database,
  UploadCloud,
  Check
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onDownloadResume: () => void;
}

export default function Hero({ onOpenResume, onDownloadResume }: HeroProps) {
  const p = PORTFOLIO_DATA.personal;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize photo source: check localStorage first, otherwise fallback to project asset
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    try {
      const cached = localStorage.getItem('banupriya_profile_image') || localStorage.getItem('banupriya_profile_photo');
      if (cached && cached.startsWith('data:image')) {
        return cached;
      }
    } catch {
      // Ignore
    }
    return p.profileImage;
  });

  const [hasValidImage, setHasValidImage] = useState<boolean>(() => {
    try {
      const cached = localStorage.getItem('banupriya_profile_image') || localStorage.getItem('banupriya_profile_photo');
      return !!(cached && cached.startsWith('data:image'));
    } catch {
      return false;
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Background sync: If photo is in localStorage, ensure server public/Banupriyamani.p.jpeg has it
  useEffect(() => {
    try {
      const cached = localStorage.getItem('banupriya_profile_image') || localStorage.getItem('banupriya_profile_photo');
      if (cached && cached.startsWith('data:image')) {
        fetch('/api/save-profile-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: cached }),
        }).catch(() => {});
      }
    } catch {
      // Ignore
    }
  }, []);

  // Listen for paste anywhere on window
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            processAndSavePhoto(file);
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processAndSavePhoto = (file: File) => {
    setIsSaving(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      if (!base64) {
        setIsSaving(false);
        return;
      }

      // 1. Immediately render photo in UI with zero delay
      setPhotoSrc(base64);
      setHasValidImage(true);

      // 2. Persist in browser storage for instant reload
      try {
        localStorage.setItem('banupriya_profile_image', base64);
      } catch {
        // Ignore storage quotas
      }

      // 3. Persist on server disk (public/Banupriyamani.p.jpeg and public/profile.jpg)
      try {
        const res = await fetch('/api/save-profile-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        if (res.ok) {
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 3000);
        }
      } catch (err) {
        console.warn('Server save background note:', err);
      } finally {
        setIsSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processAndSavePhoto(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndSavePhoto(file);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-purple-600/18 via-indigo-600/12 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[320px] h-[320px] bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Hidden file input for one-click selection if needed */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Metadata Header */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Tech Internships
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3 h-3 text-slate-400" />
                {p.location}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">BCA Data Science '27</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  {p.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-200 tracking-tight">
                Full Stack Developer & AI/ML Engineer
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Pursuing <span className="text-white font-medium">BCA in Data Science</span> at{' '}
              <span className="text-white font-medium">MVJ Degree College, Bangalore</span> (CGPA: 8.78/10.0).
              Passionate about building production-grade full stack applications using{' '}
              <span className="text-purple-300 font-medium">Java</span>,{' '}
              <span className="text-purple-300 font-medium">Python</span>,{' '}
              <span className="text-blue-300 font-medium">React</span>, and{' '}
              <span className="text-blue-300 font-medium">FastAPI</span> alongside applied AI models.
            </p>

            {/* Core Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-lg shadow-purple-950/40 hover:shadow-purple-900/60 transition-all duration-200 flex items-center gap-2 group whitespace-nowrap"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onDownloadResume}
                className="px-5 py-2.5 text-sm font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-purple-400/40 rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                title="Preview formatted resume in modal"
              >
                <Eye className="w-4 h-4 text-slate-400" />
                <span>Preview</span>
              </button>

              <a
                href="#contact"
                className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors whitespace-nowrap"
              >
                Contact Me
              </a>
            </div>

            {/* Social & Contact Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-center lg:justify-start gap-5">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>{p.githubDisplay}</span>
              </a>

              <a
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>{p.linkedinDisplay}</span>
              </a>

              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                title="Direct Email"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">{p.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => {
                if (!hasValidImage && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              className="relative w-full max-w-[360px] group cursor-pointer"
              title={hasValidImage ? "Banupriya Mani" : "Click or drop Banupriyamani.p.jpeg to set photo"}
            >
              {/* Outer decorative ambient halo */}
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-600/35 via-indigo-600/25 to-blue-600/30 rounded-3xl blur-xl opacity-80 transition duration-700 pointer-events-none" />

              {/* Main Professional Frame Container */}
              <div className="relative bg-[#0d0f18] border border-purple-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                {/* Image Container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10 shadow-inner flex items-center justify-center">
                  {/* Photo is rendered if valid photo exists */}
                  <img
                    src={photoSrc}
                    alt="Banupriya Mani"
                    className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                      hasValidImage ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
                    }`}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    onLoad={() => setHasValidImage(true)}
                    onError={() => {
                      if (!photoSrc.startsWith('data:image')) {
                        setHasValidImage(false);
                      }
                    }}
                  />

                  {/* Fallback Upload Placeholder: only visible when no photo has been provided yet */}
                  {!hasValidImage && (
                    <div className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-white">Click or Drop Photo Here</p>
                        <p className="text-[11px] text-slate-400">
                          Select <span className="text-purple-300 font-mono">Banupriyamani.p.jpeg</span> to display immediately and save permanently
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Saving status indicator */}
                  {isSaving && (
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center text-xs text-purple-300 font-medium">
                      Saving photo to project assets...
                    </div>
                  )}

                  {/* Saved success flash */}
                  {savedSuccess && (
                    <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3" />
                      <span>Saved</span>
                    </div>
                  )}

                  {/* Corner indicator */}
                  <div className="absolute top-3 left-3 bg-[#0d0f18]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-200 flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Banupriya Mani</span>
                  </div>
                </div>

                {/* Card Sub-content */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Undergraduate Standing</span>
                    <span className="text-emerald-400 font-semibold font-mono">CGPA 8.78 / 10.0</span>
                  </div>

                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-[87.8%]" />
                  </div>

                  {/* Tech Pillars */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-white/[0.06]">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-1.5 text-purple-300 font-medium">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Full Stack</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Java, React, Next, FastAPI</p>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-1.5 text-blue-300 font-medium">
                        <Database className="w-3.5 h-3.5" />
                        <span>AI & Data</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">TensorFlow, Scikit, NLP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
