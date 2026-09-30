import { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onDownloadResume: () => void;
  onOpenGuide: () => void;
}

export default function Navbar({ onOpenResume, onDownloadResume, onOpenGuide }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090e]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-6 links) - Zone 3 (1-2 actions) */}
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-purple-300 transition-colors flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-purple-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenGuide}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 whitespace-nowrap"
              title="Deployment & Local Setup Guide"
            >
              Deploy Guide
            </button>
            <button
              onClick={onOpenResume}
              className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              Resume
            </button>
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-md shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-200 whitespace-nowrap"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="p-2 text-xs font-medium text-slate-200 bg-white/[0.06] border border-white/10 rounded-lg"
              title="View Resume"
            >
              <FileText className="w-4 h-4 text-purple-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0b12]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 px-3 py-2.5 text-xs font-medium text-slate-200 bg-white/[0.06] border border-white/10 rounded-lg flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                View Resume
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadResume();
                }}
                className="flex-1 px-3 py-2.5 text-xs font-medium text-slate-200 bg-white/[0.06] border border-white/10 rounded-lg flex items-center justify-center gap-1.5"
              >
                PDF Download
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGuide();
              }}
              className="w-full px-3 py-2 text-xs text-slate-400 border border-white/10 rounded-lg"
            >
              GitHub & Vercel Deployment Guide
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
