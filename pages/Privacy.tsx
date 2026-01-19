
import React from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface PageProps {
  lang: Language;
}

const Privacy: React.FC<PageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="container mx-auto px-6 max-w-4xl pb-20">
      <div className="text-center mb-16 pt-10">
        <h2 className="text-5xl font-black mb-6">{t.privacyTitle}</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-xs">{t.privacyEU}</p>
      </div>
      
      <div className="glass-card p-10 md:p-16 rounded-[3rem] space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-900/50 shadow-2xl">
        <section>
          <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tight">{t.privacySection1}</h3>
          <p>{t.privacySection1Text}</p>
        </section>

        <section>
          <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tight">{t.privacySection2}</h3>
          <p>{t.privacySection2Text}</p>
        </section>

        <section>
          <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tight">{t.privacySection3}</h3>
          <p>{t.privacySection3Text}</p>
        </section>

        <section className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-400">2025 • NOR DIN CONSTRUCTION ZAGREB</p>
          <button onClick={() => window.print()} className="text-amber-500 font-black hover:underline uppercase text-xs tracking-widest">Print / Save PDF</button>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
