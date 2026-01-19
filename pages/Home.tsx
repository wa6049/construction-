
import React, { useState, useEffect, useRef } from 'react';
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
      title: lang === 'hr' ? 'Visokogradnja' : 'Civil Engineering', 
      icon: (
        <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ), 
      desc: lang === 'hr' ? 'Izgradnja stambenih i poslovnih objekata po sistemu ključ u ruke.' : 'Construction of residential and commercial buildings on a turnkey basis.' 
    },
    { 
      title: lang === 'hr' ? 'Renovacije' : 'Renovations', 
      icon: (
        <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ), 
      desc: lang === 'hr' ? 'Vraćanje starog sjaja povijesnim zgradama Zagreba uz moderne standarde.' : 'Restoring historical Zagreb buildings with modern energy standards.' 
    },
    { 
      title: lang === 'hr' ? 'Projektiranje' : 'BIM Planning', 
      icon: (
        <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A2 2 0 013 15.487V6.513a2 2 0 011.553-1.943L9 2l5.447 2.57a2 2 0 011.553 1.943v8.974a2 2 0 01-1.553 1.943L9 20z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20v-8m10.553-3.487l-6 3M15.553 6.513l-6 3" />
        </svg>
      ), 
      desc: lang === 'hr' ? 'Precizno digitalno modeliranje svakog detalja prije prve lopate.' : 'Precise digital modeling of every detail before the first spade hits the ground.' 
    },
  ];

  return (
    <div className="container mx-auto px-6 overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center relative">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-full lg:w-1/2 h-2/3 lg:h-full opacity-20 lg:opacity-100 pointer-events-none z-0">
          <div className="w-full h-full relative overflow-hidden rounded-3xl lg:rounded-l-[100px] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
              alt="Construction Site Zagreb" 
              className="w-full h-full object-cover grayscale dark:grayscale-0 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-slate-950 via-transparent to-transparent hidden lg:block"></div>
          </div>
        </div>
        
        <div className="max-w-4xl relative z-10 reveal" ref={addToReveals}>
          <div className="inline-block px-4 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
            Lideri u gradnji - Zagreb 2025
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight text-slate-900 dark:text-white">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="accent-gradient px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-amber-500/30 text-white hover:scale-105 transition-transform active:scale-95"
            >
              {t.heroCTA}
            </button>
            <button 
              onClick={() => setCurrentPage('projects')}
              className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 px-10 py-5 rounded-2xl font-bold text-lg border border-black/10 dark:border-white/10 transition-colors text-slate-900 dark:text-white active:scale-95"
            >
              {lang === 'hr' ? 'Naši projekti' : 'View Projects'}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 reveal" ref={addToReveals}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">{lang === 'hr' ? 'Što radimo' : 'Our Services'}</h2>
          <div className="w-20 h-1.5 accent-gradient mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl hover:-translate-y-2 transition-all duration-500 group border-b-4 border-b-transparent hover:border-b-amber-500 shadow-xl dark:shadow-none bg-white/80 dark:bg-slate-900/40">
              <div className="mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</p>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="mt-6 text-amber-500 font-bold flex items-center gap-2 hover:gap-4 transition-all"
              >
                {lang === 'hr' ? 'Saznaj više' : 'Learn more'} <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 reveal" ref={addToReveals}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">{lang === 'hr' ? 'Naša reputacija' : 'Our Reputation'}</h2>
          <p className="text-slate-600 dark:text-slate-400">Povjerenje izgrađeno na stotinama uspješnih kvadrata u Zagrebu.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[
            { name: 'Ivan Perić', role: 'Vlasnik vile Maksimir', text: 'Nor Din je premašio sva očekivanja. Njihova preciznost i poštivanje rokova su rijetkost u ovoj industriji. Preporučujem svakome tko traži vrhunsku kvalitetu.' },
            { name: 'Ana Radić', role: 'CEO Tech d.o.o.', text: 'Profesionalizam na najvišoj razini. Od projektiranja do zadnjeg šarafa, sve je bilo besprijekorno. Naš poslovni centar sada je landmark Novog Zagreba.' }
          ].map((item, i) => (
            <div key={i} className="glass-card p-12 rounded-[2.5rem] relative bg-white/70 dark:bg-slate-900/40 shadow-xl">
              <span className="absolute top-6 right-10 text-8xl text-amber-500/10 font-serif pointer-events-none italic opacity-20 group-hover:opacity-40 transition-opacity">"</span>
              <p className="text-xl italic mb-8 relative z-10 text-slate-700 dark:text-slate-300 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl accent-gradient flex items-center justify-center font-bold text-white text-xl shadow-lg">{item.name[0]}</div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">{item.name}</div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 reveal" ref={addToReveals}>
        <div className="accent-gradient rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">{lang === 'hr' ? 'Spremni za vaš novi projekt?' : 'Ready to start your project?'}</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90 relative z-10">Kontaktirajte nas danas za besplatnu procjenu i stručni savjet o gradnji.</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-amber-600 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-colors shadow-2xl active:scale-95 relative z-10"
          >
            {lang === 'hr' ? 'Pošaljite upit' : 'Get in Touch'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
