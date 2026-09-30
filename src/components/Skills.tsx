import { useState, useMemo } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  BrainCircuit, 
  Search, 
  Check, 
  Sparkles,
  Terminal,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, typeof Code2> = {
    'programming-languages': Code2,
    frontend: Layout,
    backend: Server,
    databases: Database,
    'cloud-tools': Cloud,
    'ai-data': BrainCircuit,
  };

  const filteredSkillGroups = useMemo(() => {
    return PORTFOLIO_DATA.skills
      .filter((group) => {
        if (selectedCategory !== 'all' && group.id !== selectedCategory) {
          return false;
        }
        return true;
      })
      .map((group) => {
        if (!searchQuery.trim()) return group;
        const query = searchQuery.toLowerCase().trim();
        const filteredSkills = group.skills.filter(
          (skill) =>
            skill.name.toLowerCase().includes(query) ||
            skill.level?.toLowerCase().includes(query) ||
            group.category.toLowerCase().includes(query)
        );
        return {
          ...group,
          skills: filteredSkills,
        };
      })
      .filter((group) => group.skills.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalSkillCount = useMemo(() => {
    return PORTFOLIO_DATA.skills.reduce((acc, curr) => acc + curr.skills.length, 0);
  }, []);

  return (
    <section id="skills" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
              Technical Stack & Tooling
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Technical Skills
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Strictly vetted against practical system development and verified coursework in BCA Data Science.
            </p>
          </div>

          {/* Search Filter for Recruiters */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g., Python, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#0c0e17] border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Segmented interactive controls - allowed by constitution) */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-[#0c0e17] border border-white/[0.06] rounded-xl">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
            }`}
          >
            All Skills ({totalSkillCount})
          </button>

          {PORTFOLIO_DATA.skills.map((group) => {
            const Icon = categoryIcons[group.id] || Code2;
            const isSelected = selectedCategory === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedCategory(group.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{group.category}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkillGroups.map((group) => {
            const Icon = categoryIcons[group.id] || Code2;
            return (
              <div
                key={group.id}
                className="p-5 rounded-2xl bg-[#0c0e17] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-tight">
                          {group.category}
                        </h3>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {group.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills List in this Category */}
                  <div className="space-y-2.5 pt-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              skill.highlight ? 'bg-purple-400' : 'bg-slate-600'
                            }`}
                          />
                          <span className="text-xs font-medium text-slate-200">
                            {skill.name}
                          </span>
                        </div>
                        {skill.level && (
                          <span className="text-[11px] text-slate-400 font-normal">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Count info */}
                <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-400">
                  <span>{group.skills.length} competencies</span>
                  <span className="text-purple-300 font-mono">100% verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredSkillGroups.length === 0 && (
          <div className="text-center py-12 p-8 rounded-2xl bg-[#0c0e17] border border-white/[0.08]">
            <Terminal className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-200">No skill matches "{searchQuery}"</h4>
            <p className="text-xs text-slate-400 mt-1">
              Skills displayed are strictly sourced from Banupriya Mani's verified resume.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-3 py-1.5 text-xs text-purple-300 hover:text-purple-200 underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
