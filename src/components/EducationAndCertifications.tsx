import { GraduationCap, Award, ShieldCheck, Sparkles, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function EducationAndCertifications() {
  const edu = PORTFOLIO_DATA.education;
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="education" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
            Academics & Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Education & Certifications
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Formal computer application foundation coupled with industry simulations and cybersecurity credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span>Formal Education</span>
            </h3>

            <div className="p-6 rounded-2xl bg-[#0c0e17] border border-white/[0.08] hover:border-purple-500/30 transition-colors space-y-5 shadow-lg shadow-black/20">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-purple-300 font-medium">
                  <span>Undergraduate Degree</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {edu.timeline}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {edu.degree}
                </h4>
                <div className="text-sm font-semibold text-purple-300">
                  Specialization: {edu.specialization}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.institution}, {edu.location}</span>
                </div>
              </div>

              {/* CGPA Score Display */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                    Cumulative Grade Point
                  </span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {edu.cgpa}
                  </span>
                  <span className="text-xs text-slate-400"> / {edu.scale} CGPA</span>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>Status:</span>
                  <span className="block text-slate-200 font-medium">{edu.status}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <span className="text-xs font-semibold text-slate-300">Academic Focus:</span>
                {edu.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Column (7 cols) */}
          <div id="certifications" className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              <span>Industry Certifications (2026)</span>
            </h3>

            <div className="space-y-4">
              {certs.map((cert) => (
                <div
                  key={cert.title}
                  className="p-5 rounded-2xl bg-[#0c0e17] border border-white/[0.08] hover:border-blue-500/30 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-blue-300 font-medium">{cert.issuer}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cert.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{cert.category}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-200 transition-colors">
                      {cert.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Resume-backed Distinctions */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Key Distinctions</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-[#08090e] border border-white/[0.04]">
                  <span className="font-semibold text-white block mb-0.5">Top-Tier CGPA (8.78/10)</span>
                  <span className="text-slate-400 text-[11px]">Consistent academic rigor in Data Science algorithms & mathematics.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#08090e] border border-white/[0.04]">
                  <span className="font-semibold text-white block mb-0.5">Dual Engineering Competence</span>
                  <span className="text-slate-400 text-[11px]">Seamless crossover between enterprise backends (Java/Spring Boot) & applied AI.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
