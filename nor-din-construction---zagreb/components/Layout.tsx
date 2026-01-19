
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Language } from '../types';

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
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [tempConsent, setTempConsent] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const consent = localStorage.getItem('nordin_cookies_v2');
    if (consent) {
      setCookieConsent(true);
      setTempConsent(JSON.parse(consent));
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveConsent = (preferences = tempConsent) => {
    localStorage.setItem('nordin_cookies_v2', JSON.stringify(preferences));
    setCookieConsent(true);
    setShowCookieSettings(false);
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'projects', label: t.navProjects },
    { id: 'contact', label: t.navContact },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-900 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 shadow-xl border-b border-black/5 dark:border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 accent-gradient rounded flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/20">N</div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">NOR DIN</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-semibold tracking-wide transition-colors uppercase ${currentPage === item.id ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            {/* Lang Toggle */}
            <button 
              onClick={() => setLang(lang === 'hr' ? 'en' : 'hr')}
              className="px-3 py-1 rounded-full border border-black/10 dark:border-white/20 text-xs font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all uppercase"
            >
              {lang === 'hr' ? 'EN' : 'HR'}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 md:pt-32">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900/50 border-t border-black/5 dark:border-white/5 py-12 mt-20 transition-colors">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-xl font-bold mb-4">NOR DIN</div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Vrhunska gradnja i inženjering u srcu Zagreba. Tradicija, kvaliteta i inovacija prema EU standardima.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-widest text-amber-500">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-amber-500 transition-colors">{t.navPrivacy}</button></li>
              <li>GDPR / GDPR (EU 2016/679)</li>
              <li><button onClick={() => { setCookieConsent(false); setShowCookieSettings(true); }} className="hover:text-amber-500 transition-colors">Manage Cookies</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-widest text-amber-500">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>Ilica 100, 10000 Zagreb</li>
              <li>+385 1 234 5678</li>
              <li>info@nordin-zagreb.hr</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>&copy; 2025 Nor Din Construction. {t.footerRights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      {/* Enhanced Cookie Consent Banner */}
      {!cookieConsent && (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-6 animate-bounce-in">
          <div className="max-w-4xl mx-auto glass-card p-8 rounded-3xl shadow-2xl border-amber-500/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-grow">
                <h4 className="text-xl font-bold mb-2">Cookie Preferences</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.cookieTitle} This website uses cookies to provide technical functionality, analyze traffic, and support marketing activities in accordance with EU regulations.
                </p>
                {showCookieSettings && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                      <input type="checkbox" checked disabled className="rounded border-amber-500 text-amber-500 focus:ring-amber-500" />
                      Strictly Necessary
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tempConsent.analytics} 
                        onChange={e => setTempConsent({...tempConsent, analytics: e.target.checked})}
                        className="rounded border-amber-500 text-amber-500 focus:ring-amber-500" 
                      />
                      Analytics
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tempConsent.marketing} 
                        onChange={e => setTempConsent({...tempConsent, marketing: e.target.checked})}
                        className="rounded border-amber-500 text-amber-500 focus:ring-amber-500" 
                      />
                      Marketing
                    </label>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                {!showCookieSettings && (
                  <button 
                    onClick={() => setShowCookieSettings(true)}
                    className="px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Settings
                  </button>
                )}
                <button 
                  onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
                  className="px-6 py-3 rounded-xl accent-gradient text-white text-sm font-bold shadow-xl shadow-amber-500/20"
                >
                  Accept All
                </button>
                {showCookieSettings && (
                  <button 
                    onClick={() => saveConsent()}
                    className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-sm font-bold shadow-xl transition-transform hover:scale-105"
                  >
                    Save Selection
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
