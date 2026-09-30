import { useState } from 'react';
import { X, Terminal, GitBranch, Globe, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeploymentGuideModal({ isOpen, onClose }: DeploymentGuideModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0d0f18] border border-white/10 rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#090a10]/80 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-white">
              Local Setup & Deployment Guide
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm">
          {/* Step 1: Run Locally */}
          <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>1. How to Run Locally</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Clone the project to your computer and install the Node.js dependencies using npm:
            </p>

            <div className="relative bg-[#08090e] rounded-lg p-3 border border-white/5 font-mono text-xs text-purple-200 space-y-1">
              <div># 1. Clone repository & open folder</div>
              <div>git clone https://github.com/BanupriyaMani67/portfolio.git</div>
              <div>cd portfolio</div>
              <div className="pt-1"># 2. Install dependencies</div>
              <div>npm install</div>
              <div className="pt-1"># 3. Start local development server</div>
              <div>npm run dev</div>

              <button
                onClick={() =>
                  copyCommand(
                    'git clone https://github.com/BanupriyaMani67/portfolio.git\ncd portfolio\nnpm install\nnpm run dev',
                    1
                  )
                }
                className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white bg-white/5 rounded"
                title="Copy Commands"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Open <span className="text-purple-300 font-mono">http://localhost:3000</span> (or Vite port) in your browser.
            </p>
          </div>

          {/* Step 2: Push to GitHub */}
          <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-white font-semibold">
              <GitBranch className="w-4 h-4 text-blue-400" />
              <span>2. Push to Your GitHub Account</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Create a new repository named <span className="text-white font-mono">portfolio</span> on your GitHub account (<span className="text-blue-300 font-mono">BanupriyaMani67</span>) and push your files:
            </p>

            <div className="relative bg-[#08090e] rounded-lg p-3 border border-white/5 font-mono text-xs text-blue-200 space-y-1">
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "Initial commit: Banupriya Mani Portfolio Website"</div>
              <div>git branch -M main</div>
              <div>git remote add origin https://github.com/BanupriyaMani67/portfolio.git</div>
              <div>git push -u origin main</div>

              <button
                onClick={() =>
                  copyCommand(
                    'git init\ngit add .\ngit commit -m "Initial commit: Banupriya Mani Portfolio Website"\ngit branch -M main\ngit remote add origin https://github.com/BanupriyaMani67/portfolio.git\ngit push -u origin main',
                    2
                  )
                }
                className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white bg-white/5 rounded"
                title="Copy Commands"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3: Deploy Online on Vercel */}
          <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>3. Deploy Live Online with Vercel (Free & Instant)</span>
            </div>
            <ol className="list-decimal list-outside pl-4 space-y-1.5 text-xs text-slate-400">
              <li>
                Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">vercel.com</a> and sign in with your GitHub account (<span className="text-slate-200">BanupriyaMani67</span>).
              </li>
              <li>
                Click <span className="text-white font-medium">"Add New Project"</span> and select your <span className="text-purple-300 font-mono">portfolio</span> repository.
              </li>
              <li>
                Vercel automatically detects <span className="text-white font-medium">Vite</span>. Keep the default build settings (<span className="font-mono">npm run build</span> and output directory <span className="font-mono">dist</span>).
              </li>
              <li>
                Click <span className="text-emerald-400 font-semibold">"Deploy"</span>. In under 1 minute, your portfolio will be live at a custom URL like <span className="text-purple-300 font-mono">banupriyamani.vercel.app</span>!
              </li>
            </ol>
          </div>

          {/* Step 4: Customization & Photo */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 space-y-2">
            <span className="font-semibold text-purple-300 block">Personal Profile Photo (Banupriyamani.p.jpeg):</span>
            <p className="text-slate-400 leading-relaxed">
              Your exact photo is configured at <span className="text-white font-mono">/Banupriyamani.p.jpeg</span>. Simply keep <span className="text-purple-300 font-mono">Banupriyamani.p.jpeg</span> inside the <span className="text-white font-mono">public/</span> folder of your repository. When deployed to Vercel or run locally, Vite automatically serves it everywhere your profile photo is displayed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#090a10]/80 backdrop-blur-sm flex items-center justify-between text-xs text-slate-400">
          <span>Ready for production deployment</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
