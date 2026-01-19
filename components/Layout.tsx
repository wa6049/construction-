
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Language } from '../types';
import ChatWidget from './ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  currentPage: string;
  setCurrentPage: (p: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, theme, setTheme, currentPage, setCurrentPage }) => {
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'projects', label: t.navProjects },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 shadow-xl border-b border-black/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer z-[110]" onClick={() => handleNavClick('home')}>
            <div className="w-8 h-8 accent-gradient rounded flex items-center justify-center text-white shadow-lg">N</div>
            <span>NOR DIN</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleNavClick(item.id)} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentPage === item.id ? 'text-amber-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>{item.label}</button>
            ))}
          </div>

          <div className="flex items-center gap-3 z-[110]">
            <button onClick={() => setLang(lang === 'hr' ? 'en' : 'hr')} className="hidden sm:flex px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-black tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all uppercase">
              {lang === 'hr' ? 'English' : 'Hrvatski'}
            </button>
            
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-x-1' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? '-rotate-45 translate-x-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-10">
          {navItems.map((item, i) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className={`text-4xl font-black uppercase tracking-tighter transition-all ${currentPage === item.id ? 'text-amber-500 scale-110' : 'text-slate-400 dark:text-slate-600'}`}>
              {item.label}
            </button>
          ))}
          <div className="pt-12 flex flex-col items-center gap-6">
            <button onClick={() => { setLang(lang === 'hr' ? 'en' : 'hr'); setIsMenuOpen(false); }} className="px-10 py-4 rounded-[2rem] accent-gradient text-white font-black text-sm tracking-widest shadow-2xl">
              {lang === 'hr' ? 'SWITCH TO ENGLISH' : 'PREBACI NA HRVATSKI'}
            </button>
            <p className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">Zagreb • 2025</p>
          </div>
        </div>
      </div>

      <main className="flex-grow pt-24 md:pt-32">{children}</main>

      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-black/5 py-16 md:py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tighter">NOR DIN</div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Lideri u modernom inženjerstvu. Transformiramo vizije u landmarke Zagreba.</p>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-amber-500">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-bold uppercase tracking-wider">
              <li><button onClick={() => handleNavClick('privacy')} className="hover:text-amber-500 transition-colors">{t.navPrivacy}</button></li>
              <li>GDPR • {lang === 'hr' ? 'Pravila' : 'Terms'}</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-amber-500">Office</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-bold uppercase tracking-wider">
              <li>Ilica 100, Zagreb</li>
              <li>+385 1 234 5678</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black gap-6">
          <p>&copy; 2025 Nor Din. {t.footerRights}</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-amber-500">LinkedIn</a>
            <a href="#" className="hover:text-amber-500">Instagram</a>
          </div>
        </div>
      </footer>
      <ChatWidget lang={lang} />
    </div>
  );
};

export default Layout;
