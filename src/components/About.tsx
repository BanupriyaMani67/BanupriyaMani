import { GraduationCap, Award, Briefcase, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AboutProps {
  onOpenResume: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const p = PORTFOLIO_DATA.personal;
  const edu = PORTFOLIO_DATA.education;

  return (
    <section id="about" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
            Background & Profile
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            About Banupriya Mani
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Bridging analytical data science foundations with production full stack software development and AI engineering.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0c0e17] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Professional Summary</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {p.summary}
              </p>
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-400">
                <span className="text-slate-300">Target Role: Full Stack / AI Software Engineer Intern</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">Location: {p.location}</span>
                <span aria-hidden="true">·</span>
                <span className="text-purple-300">{edu.timeline}</span>
              </div>
            </div>

            {/* Areas of Interest Grid */}
            <div className="p-6 rounded-2xl bg-[#0c0e17] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Core Areas of Interest</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {p.areasOfInterest.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-200">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Metrics & Fast Facts */}
          <div className="lg:col-span-5 space-y-4">
            {/* Academic Standout Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 via-[#0e101c] to-[#0c0e17] border border-purple-500/20 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-purple-300">Undergraduate Degree</span>
                  <h4 className="text-base font-bold text-white mt-1">BCA – Data Science</h4>
                  <p className="text-xs text-slate-400">{edu.institution}, Bangalore</p>
                </div>
                <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-300">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Cumulative GPA:</span>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-emerald-400">{edu.cgpa}</span>
                  <span className="text-xs text-slate-400"> / {edu.scale}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Active in hands-on system building, combining Java and Python backend foundations with React frontends and predictive data models.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {p.stats.map((st) => (
                <div
                  key={st.label}
                  className="p-4 rounded-xl bg-[#0c0e17] border border-white/[0.08] space-y-1"
                >
                  <div className="text-2xl font-bold font-mono text-white tracking-tight">
                    {st.value}
                  </div>
                  <div className="text-xs font-medium text-slate-300">{st.label}</div>
                  <div className="text-[11px] text-slate-500">{st.note}</div>
                </div>
              ))}
            </div>

            {/* Resume Callout */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">Full Resume Available</span>
                <p className="text-slate-500 text-[11px]">Download as PDF or inspect online</p>
              </div>
              <button
                onClick={onOpenResume}
                className="text-xs text-purple-300 hover:text-purple-200 font-medium flex items-center gap-1"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
