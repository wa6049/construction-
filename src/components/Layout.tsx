import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Language } from '../types';
import ChatWidget from './ChatWidget.tsx';
import UpScaleFile from '../assets/UpScaleFile2.svg';

const ViegoLogo: React.FC<{ className?: string }> = ({ className = "h-24" }) => (
  <img src={UpScaleFile} alt="Viego Logo" className={className} />
);


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
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md py-5 pb-4 shadow-sm' : 'bg-transparent py-5 md:py-8'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="cursor-pointer z-[110]" onClick={() => handleNavClick('home')}>
            <ViegoLogo className="h-14 md:h-24" />
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id)} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${currentPage === item.id ? 'text-[#1a66a4]' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 z-[110]">
            <button 
              onClick={() => setLang(lang === 'hr' ? 'en' : 'hr')} 
              className="flex px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-200 dark:border-white/10 text-[10px] font-black tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all uppercase"
            >
              {lang === 'hr' ? 'English' : 'Hrvatski'}
            </button>
            
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="p-2 md:p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl"></div>
        <div className="relative h-full flex flex-col items-start justify-center p-12 space-y-10">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={`text-4xl font-black uppercase tracking-tighter transition-all text-left ${currentPage === item.id ? 'text-[#1a66a4]' : 'text-slate-400 dark:text-slate-600'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="w-32 h-[1px] bg-slate-100 dark:bg-slate-800 my-4"></div>
          <button 
            onClick={() => { setLang(lang === 'hr' ? 'en' : 'hr'); setIsMenuOpen(false); }} 
            className="px-10 py-5 rounded-2xl bg-[#1a66a4] text-white font-black text-sm tracking-widest uppercase shadow-xl"
          >
            {lang === 'hr' ? 'ENGLISH' : 'HRVATSKI'}
          </button>
        </div>
      </div>

      <main className="flex-grow pt-24 md:pt-36">{children}</main>

      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-16 md:py-20 text-left">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="space-y-6">
            <ViegoLogo className="h-10 md:h-24" />
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{t.footerLegal}<br/>OIB: 12345678901</p>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-[#1a66a4] uppercase text-xs tracking-[0.3em]">{t.navContact}</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-bold uppercase tracking-wider">
              <li>{t.footerAddress}</li>
              <li className="lowercase">info@viego.hr</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-[#1a66a4] uppercase text-xs tracking-[0.3em]">{t.footerFollow}</h4>
            <div className="flex gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-[#1a66a4] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#1a66a4] transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest gap-4 font-black">
          <p>&copy; 2025 Viego Gradnja. {t.footerRights}</p>
          <div className="flex gap-6">
            <button onClick={() => handleNavClick('privacy')} className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.navPrivacy}</button>
            <span>GDPR COMPLIANT</span>
          </div>
        </div>
      </footer>
      <ChatWidget lang={lang} theme={theme} />
    </div>
  );
};

export default Layout;