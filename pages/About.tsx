
import React from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface PageProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

const About: React.FC<PageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];

  return (
    <div className="container mx-auto px-6 max-w-6xl pb-20">
      <div className="text-center mb-16 pt-10">
        <h2 className="text-6xl font-black mb-8 leading-tight">{t.aboutTitle}</h2>
        <div className="w-24 h-2 accent-gradient mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
        <div className="relative">
          <div className="absolute -inset-6 accent-gradient rounded-[3rem] blur-3xl opacity-10 dark:opacity-20 animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
            alt="Nor Din Team" 
            className="rounded-[3rem] relative z-10 shadow-2xl border border-black/5 dark:border-white/10"
          />
        </div>
        <div className="space-y-8">
          <p className="text-2xl text-slate-900 dark:text-slate-100 leading-relaxed font-bold italic border-l-8 border-amber-500 pl-8">
            "{t.aboutQuote}"
          </p>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.aboutText}
          </p>
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <div className="text-amber-500 font-bold mb-3 uppercase tracking-widest text-sm">{t.aboutSustainable}</div>
              <p className="text-slate-600 dark:text-slate-400">{t.aboutSustainableDesc}</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <div className="text-amber-500 font-bold mb-3 uppercase tracking-widest text-sm">{t.aboutInno}</div>
              <p className="text-slate-600 dark:text-slate-400">{t.aboutInnoDesc}</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="mt-10 accent-gradient text-white font-bold px-12 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            {t.aboutCTA}
          </button>
        </div>
      </div>

      <div className="glass-card p-12 md:p-20 rounded-[4rem] mb-20 shadow-2xl bg-white/70 dark:bg-slate-900/40">
        <h3 className="text-4xl font-black mb-16 text-center">{t.leadershipTitle}</h3>
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { name: 'Ivan Barić', role: t.leadEngineer, img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' },
            { name: 'Ana Kovač', role: t.leadArch, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
            { name: 'Marko Jurić', role: t.leadManager, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' }
          ].map((person, i) => (
            <div key={i} className="text-center group">
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-[3rem] overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 border-4 border-white dark:border-slate-800 group-hover:border-amber-500 shadow-2xl">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-2xl">{person.name}</h4>
              <p className="text-slate-500 uppercase tracking-widest mt-2 font-bold text-sm">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
