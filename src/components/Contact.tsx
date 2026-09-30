import { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  Download, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactProps {
  onDownloadResume: () => void;
  onOpenResume: () => void;
}

export default function Contact({ onDownloadResume, onOpenResume }: ContactProps) {
  const p = PORTFOLIO_DATA.personal;
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSent, setFormSent] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare direct mailto URL
    const mailtoUrl = `mailto:${p.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 border-t border-white/[0.06] relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
            Let's Collaborate
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Currently open to internships, full-stack software development roles, and AI engineering opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#0c0e17] border border-white/[0.08] flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${p.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                  >
                    {p.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(p.email, 'email')}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Copy Email"
              >
                {copiedItem === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-2xl bg-[#0c0e17] border border-white/[0.08] flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                    LinkedIn Profile
                  </span>
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-blue-300 transition-colors"
                  >
                    {p.linkedinDisplay}
                  </a>
                </div>
              </div>

              <a
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Visit LinkedIn"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="p-5 rounded-2xl bg-[#0c0e17] border border-white/[0.08] flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-700/20 text-slate-300 border border-white/10">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                    GitHub Repositories
                  </span>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                  >
                    {p.githubDisplay}
                  </a>
                </div>
              </div>

              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Visit GitHub"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Location & Resume Quick Buttons */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{p.location}</span>
              </div>
              <button
                onClick={onDownloadResume}
                className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>PDF Resume</span>
              </button>
            </div>
          </div>

          {/* Quick Message Dispatch Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0e17] border border-white/[0.08] space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span>Send a Direct Message</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your details to quickly email Banupriya Mani regarding opportunities or project inquiries.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#08090e] border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#08090e] border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Full Stack Developer Internship Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#08090e] border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#08090e] border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message via Email Client</span>
                </button>

                {formSent && (
                  <p className="text-xs text-emerald-400 pt-1">
                    Your email client has been launched with the message drafted!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
