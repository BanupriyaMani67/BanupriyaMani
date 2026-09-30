import { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  ShieldCheck, 
  Bot, 
  Cpu, 
  Layers, 
  CheckCircle, 
  ChevronRight,
  Sparkles,
  Smartphone,
  Globe,
  X
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

export default function Projects() {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
            Engineering Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Production-grade systems showcasing end-to-end full stack architecture, machine learning integration, and mobile deployment.
          </p>
        </div>

        {/* Projects Showcase Cards */}
        <div className="space-y-12">
          {PORTFOLIO_DATA.projects.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={project.id}
                className="rounded-2xl bg-[#0c0e17] border border-white/[0.08] hover:border-purple-500/30 overflow-hidden transition-all duration-300 shadow-xl shadow-black/30"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Asset Container (5 cols) */}
                  <div className={`lg:col-span-5 relative bg-slate-950 overflow-hidden group min-h-[260px] lg:min-h-full ${isReversed ? 'lg:order-2' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0c0e17]/80" />
                    
                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 bg-[#08090e]/85 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md text-xs font-medium text-slate-200 flex items-center gap-1.5">
                      {project.category === 'Mobile & AI' ? (
                        <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                      ) : (
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                      )}
                      <span>{project.badge}</span>
                    </div>
                  </div>

                  {/* Narrative & Engineering Details (7 cols) */}
                  <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="space-y-4">
                      {/* Unboxed category metadata (Zero-Pill Discipline) */}
                      <div className="flex items-center gap-2 text-xs text-purple-300 font-medium">
                        <span>{project.category}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400">Production Tested</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {project.tagline}
                      </p>

                      {/* Resume Bullet Points */}
                      <div className="space-y-2.5 pt-2">
                        {project.keyHighlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Listing (Clean unboxed inline metadata with separators) */}
                      <div className="pt-3 border-t border-white/[0.06]">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">
                          Technologies Deployed:
                        </span>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-300 font-mono">
                          {project.techStack.map((tech, tIdx) => (
                            <span key={tech} className="inline-flex items-center">
                              <span className="hover:text-purple-300 transition-colors">{tech}</span>
                              {tIdx < project.techStack.length - 1 && (
                                <span className="text-slate-600 ml-2">/</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 rounded-lg transition-colors flex items-center gap-2 group whitespace-nowrap"
                        >
                          <Github className="w-4 h-4 text-slate-300 group-hover:text-white" />
                          <span>View on GitHub</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>

                        <button
                          onClick={() => setActiveProjectModal(project)}
                          className="px-3.5 py-2 text-xs font-medium text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-1.5"
                        >
                          <span>System Architecture</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] text-slate-500 font-mono">
                        Source: Resume Verifiable
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Deep Dive Architecture Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0d0f18] border border-white/10 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                  Technical Architecture
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeProjectModal.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {activeProjectModal.subtitle}
                </p>
              </div>

              {/* Architecture Breakdown points */}
              <div className="space-y-4">
                {activeProjectModal.architecturePoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                      <span className="text-purple-400 font-mono text-xs">0{idx + 1}.</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-5">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Verified Resume Bullets */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Verified Implementation Points
                </h4>
                <div className="space-y-2">
                  {activeProjectModal.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons inside modal */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Code on GitHub</span>
                </a>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
