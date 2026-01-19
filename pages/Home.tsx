
import React, { useEffect, useRef } from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface PageProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

const Home: React.FC<PageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];
  const revealsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToReveals = (el: HTMLDivElement | null) => {
    if (el && !revealsRef.current.includes(el)) {
      revealsRef.current.push(el);
    }
  };

  const services = [
    { 
      title: t.servicesHigh, 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ), 
      desc: t.servicesHighDesc 
    },
    { 
      title: t.servicesRenov, 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ), 
      desc: t.servicesRenovDesc 
    },
    { 
      title: t.servicesBIM, 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A2 2 0 013 15.487V6.513a2 2 0 011.553-1.943L9 2l5.447 2.57a2 2 0 011.553 1.943v8.974a2 2 0 01-1.553 1.943L9 20z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20v-8m10.553-3.487l-6 3M15.553 6.513l-6 3" />
        </svg>
      ), 
      desc: t.servicesBIMDesc 
    },
  ];

  const stats = [
    { value: '150+', label: t.statsProjects },
    { value: '25+', label: t.statsYears },
    { value: '12k', label: 'm²' },
    { value: '0', label: t.statsAccidents },
  ];

  const processSteps = [
    { step: '01', title: t.step1, desc: t.step1Desc },
    { step: '02', title: t.step2, desc: t.step2Desc },
    { step: '03', title: t.step3, desc: t.step3Desc },
    { step: '04', title: t.step4, desc: t.step4Desc },
  ];

  return (
    <div className="container mx-auto px-6 overflow-hidden">
      <section className="min-h-[70vh] md:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center relative py-12 lg:py-0">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-full lg:w-1/2 h-full opacity-10 lg:opacity-100 pointer-events-none z-0">
          <div className="w-full h-full relative overflow-hidden rounded-[2rem] lg:rounded-none lg:rounded-l-[100px] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
              alt="Zagreb Construction" 
              className="w-full h-full object-cover lg:grayscale lg:dark:grayscale-0"
            />
          </div>
        </div>
        
        <div className="max-w-4xl relative z-10 reveal" ref={addToReveals}>
          <div className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
            Lideri u gradnji - Zagreb 2025
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white text-balance">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 mb-8 md:mb-10 max-w-2xl leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setCurrentPage('contact')} className="accent-gradient px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg text-white hover:scale-105 transition-transform">{t.heroCTA}</button>
            <button onClick={() => setCurrentPage('projects')} className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg border border-black/10 dark:border-white/10 transition-colors">{t.heroProjects}</button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 reveal" ref={addToReveals}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-600">{stat.value}</div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-amber-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 reveal" ref={addToReveals}>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">{t.servicesTitle}</h2>
          <div className="w-16 md:w-20 h-1.5 accent-gradient mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div key={i} className="glass-card p-8 md:p-10 rounded-3xl hover:-translate-y-2 transition-all duration-500 group border-b-4 border-b-transparent hover:border-b-amber-500 bg-white/80 dark:bg-slate-900/40">
              <div className="mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</p>
              <button onClick={() => setCurrentPage('contact')} className="mt-6 text-amber-500 font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all">{t.servicesMore} <span>→</span></button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 reveal" ref={addToReveals}>
        <div className="glass-card p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="max-w-xl mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-black mb-4">{t.processTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{t.processSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/5 z-0"></div>
            {processSteps.map((step, i) => (
              <div key={i} className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center text-white font-black text-xl shadow-lg">{step.step}</div>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
