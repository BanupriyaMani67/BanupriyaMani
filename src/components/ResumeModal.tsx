import { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink,
  FileCheck
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
}

export default function ResumeModal({ isOpen, onClose, onDownloadPdf }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const p = PORTFOLIO_DATA.personal;
  const edu = PORTFOLIO_DATA.education;

  if (!isOpen) return null;

  const copyFullResumeText = () => {
    const text = `
BANUPRIYA MANI
${p.email} | ${p.linkedinDisplay} | ${p.githubDisplay}
${p.location}

PROFESSIONAL SUMMARY
${p.summary}

TECHNICAL SKILLS
${PORTFOLIO_DATA.skills.map((s) => `${s.category}: ${s.skills.map((sk) => sk.name).join(', ')}`).join('\n')}

PROJECTS
${PORTFOLIO_DATA.projects.map((pr) => `${pr.title} | ${pr.githubUrl}\nTech Stack: ${pr.techStack.join(', ')}\n${pr.keyHighlights.map((h) => `• ${h}`).join('\n')}`).join('\n\n')}

EDUCATION
${edu.degree} – ${edu.specialization} (${edu.timeline})
${edu.institution}, ${edu.location} | CGPA: ${edu.cgpa} / ${edu.scale}

CERTIFICATIONS
${PORTFOLIO_DATA.certifications.map((c) => `• ${c.title} — ${c.issuer}, ${c.year}`).join('\n')}

AREAS OF INTEREST
${p.areasOfInterest.join(' • ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f111a] border border-white/10 rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#090a10]/80 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-white">
              Resume Preview – {p.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyFullResumeText}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
              title="Copy ATS Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied ATS Text' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-lg transition-colors items-center gap-1.5"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onDownloadPdf}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Close Resume Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Body: Replicating standard clean resume */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-[#0a0b12] text-slate-200 font-sans space-y-6 print:bg-white print:text-black">
          {/* Header */}
          <div className="text-center space-y-1.5 pb-4 border-b border-white/10">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              {p.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-300">
              <a href={`mailto:${p.email}`} className="text-purple-300 hover:underline">
                {p.email}
              </a>
              <span className="text-slate-600">|</span>
              <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">
                {p.linkedinDisplay}
              </a>
              <span className="text-slate-600">|</span>
              <a href={p.github} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">
                {p.githubDisplay}
              </a>
            </div>
            <div className="text-xs text-slate-400">{p.location}</div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-white/10 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {p.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-white/10 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1 text-xs text-slate-300">
              <div>
                <span className="font-semibold text-white">Programming Languages: </span>
                <span>Java, Python, SQL, JavaScript</span>
              </div>
              <div>
                <span className="font-semibold text-white">Frontend: </span>
                <span>HTML5, CSS3, React.js, Next.js, TypeScript</span>
              </div>
              <div>
                <span className="font-semibold text-white">Backend: </span>
                <span>Spring Boot, FastAPI, Flask, REST APIs</span>
              </div>
              <div>
                <span className="font-semibold text-white">Databases: </span>
                <span>MySQL, PostgreSQL, MongoDB, SQLite, Firebase (NoSQL), Redis</span>
              </div>
              <div>
                <span className="font-semibold text-white">Cloud & Tools: </span>
                <span>AWS, Git, GitHub, Docker, Postman, VS Code, Buildozer</span>
              </div>
              <div>
                <span className="font-semibold text-white">AI & Data: </span>
                <span>Generative AI, Prompt Engineering, Machine Learning, Data Analytics, TensorFlow, Scikit-learn, NLP, Pandas, NumPy</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-white/10 pb-1">
              Projects
            </h2>

            {PORTFOLIO_DATA.projects.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{proj.title}</span>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-normal inline-flex items-center gap-0.5"
                    >
                      <span>| {proj.githubUrl.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Tech Stack: </span>
                  <span className="italic">{proj.techStack.join(', ')}</span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300">
                  {proj.keyHighlights.map((hl, i) => (
                    <li key={i} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-white/10 pb-1">
              Education
            </h2>
            <div className="flex flex-wrap items-baseline justify-between text-xs">
              <span className="font-bold text-white">
                {edu.degree} – {edu.specialization}
              </span>
              <span className="text-slate-400">{edu.timeline}</span>
            </div>
            <div className="text-xs text-slate-300">
              <span>{edu.institution}, {edu.location}</span>
              <span className="text-slate-600"> | </span>
              <span className="font-semibold text-emerald-400">CGPA: {edu.cgpa} / {edu.scale}</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-white/10 pb-1">
              Certifications
            </h2>
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300">
              {PORTFOLIO_DATA.certifications.map((c, i) => (
                <li key={i}>
                  <span className="font-semibold text-white">{c.title}</span>
                  <span className="text-slate-400"> — {c.issuer}, {c.year}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas of Interest */}
          <div className="space-y-1.5 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-white/10 pb-1">
              Areas of Interest
            </h2>
            <div className="text-xs text-slate-300">
              {p.areasOfInterest.join('  •  ')}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#090a10]/80 backdrop-blur-sm flex items-center justify-between text-xs text-slate-400">
          <span>Source: Official Resume of Banupriya Mani</span>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
