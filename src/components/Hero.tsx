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
  Camera,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onDownloadResume: () => void;
}

export default function Hero({ onOpenResume, onDownloadResume }: HeroProps) {
  const p = PORTFOLIO_DATA.personal;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Maintain photo state: checks localStorage first, then default /Banupriyamani.p.jpeg
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('banupriya_profile_photo');
      if (saved) return saved;
    }
    return p.profileImage; // "/Banupriyamani.p.jpeg"
  });

  const [imageError, setImageError] = useState(false);
  const [uploadToast, setUploadToast] = useState(false);

  useEffect(() => {
    // Test if photoSrc loads or fails
    const img = new Image();
    img.src = photoSrc;
    img.onload = () => setImageError(false);
    img.onerror = () => {
      // If /Banupriyamani.p.jpeg is not yet written to server disk, prompt seamless attach
      if (!photoSrc.startsWith('data:')) {
        setImageError(true);
      }
    };
  }, [photoSrc]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target?.result as string;
        setPhotoSrc(base64Data);
        setImageError(false);
        try {
          localStorage.setItem('banupriya_profile_photo', base64Data);
        } catch {
          // localStorage capacity handling
        }
        setUploadToast(true);
        setTimeout(() => setUploadToast(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-purple-600/18 via-indigo-600/12 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[320px] h-[320px] bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
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

          {/* Right Column: Exact Uploaded Portrait with Elegant Frame & Subtle Glow */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px]">
              {/* Outer decorative ambient halo */}
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-600/35 via-indigo-600/25 to-blue-600/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-700" />

              {/* Main Professional Frame Container */}
              <div className="relative bg-[#0d0f18] border border-purple-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl transition-all">
                {/* Image Container with precise aspect framing, keeping 100% natural features and skin tone */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10 group">
                  {!imageError ? (
                    <img
                      src={photoSrc}
                      alt="Banupriya Mani"
                      className="w-full h-full object-cover object-top transform transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    /* Seamless Fallback with Instant 1-Click File Connector */
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 hover:bg-slate-800/80 transition-colors"
                      title="Click to load Banupriyamani.p.jpeg"
                    >
                      <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/30 text-purple-400 mb-3 animate-bounce">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-white block">
                        Select Banupriyamani.p.jpeg
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                        Click to display your uploaded photo in full quality.
                      </p>
                      <span className="mt-2 text-[10px] text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                        100% Natural Resolution
                      </span>
                    </div>
                  )}

                  {/* Corner indicator */}
                  <div className="absolute top-3 left-3 bg-[#0d0f18]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-200 flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Banupriya Mani</span>
                  </div>

                  {/* Discrete Change/Sync Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 bg-[#0d0f18]/80 hover:bg-[#0d0f18] backdrop-blur-md border border-white/15 p-2 rounded-lg text-slate-300 hover:text-white transition-all shadow-md"
                    title="Load or update Banupriyamani.p.jpeg"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
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

      {/* Upload Confirmation Toast */}
      {uploadToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0d0f18] border border-purple-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <div className="text-xs">
            <span className="font-semibold block">Photo Loaded Successfully</span>
            <span className="text-slate-400">Banupriya Mani's exact uploaded photo is active.</span>
          </div>
        </div>
      )}
    </section>
  );
}
