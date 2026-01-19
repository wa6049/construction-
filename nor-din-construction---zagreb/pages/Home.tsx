
import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';
import { Language } from '../types';
import { geminiService } from '../services/geminiService';

interface PageProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

const Home: React.FC<PageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
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

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    const result = await geminiService.getConstructionAdvice(aiQuery, lang);
    setAiResponse(result || '');
    setIsAiLoading(false);
  };

  const services = [
    { title: lang === 'hr' ? 'Visokogradnja' : 'Civil Engineering', icon: '🏢', desc: lang === 'hr' ? 'Izgradnja stambenih i poslovnih objekata po sistemu ključ u ruke.' : 'Construction of residential and commercial buildings on a turnkey basis.' },
    { title: lang === 'hr' ? 'Renovacije' : 'Renovations', icon: '🛠️', desc: lang === 'hr' ? 'Vraćanje starog sjaja povijesnim zgradama Zagreba uz moderne standarde.' : 'Restoring historical Zagreb buildings with modern energy standards.' },
    { title: lang === 'hr' ? 'Projektiranje' : 'BIM Planning', icon: '📐', desc: lang === 'hr' ? 'Precizno digitalno modeliranje svakog detalja prije prve lopate.' : 'Precise digital modeling of every detail before the first spade hits the ground.' },
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
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
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

      {/* AI Advisor Feature */}
      <section className="py-16 reveal" ref={addToReveals}>
        <div className="glass-card p-8 md:p-16 rounded-[3rem] border-amber-500/20 relative overflow-hidden bg-white/90 dark:bg-slate-900/60 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-6 flex items-center gap-4 text-slate-900 dark:text-white">
                <span className="p-3 bg-amber-500/10 rounded-2xl">🏗️</span>
                {t.aiAdvisorTitle}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-xl">
                Dobijte stručne odgovore o građevinskim normama, materijalima i optimizaciji troškova za vaše projekte u Hrvatskoj. Nor Din AI savjetnik koristi najnovije podatke o tržištu.
              </p>
              
              <form onSubmit={handleAiConsult} className="flex flex-col gap-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder={t.aiAdvisorPlaceholder}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-black/10 dark:border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-amber-500 transition-colors text-slate-900 dark:text-slate-200 shadow-inner text-lg"
                  />
                  <button 
                    type="submit"
                    disabled={isAiLoading}
                    className="absolute right-4 top-4 bottom-4 px-10 accent-gradient rounded-xl font-bold text-white disabled:opacity-50 shadow-lg active:scale-95 transition-transform"
                  >
                    {isAiLoading ? '...' : (lang === 'hr' ? 'Pitaj' : 'Ask AI')}
                  </button>
                </div>
              </form>

              {aiResponse && (
                <div className="mt-8 p-10 bg-amber-500/5 border border-amber-500/20 rounded-3xl animate-fade-in text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap shadow-sm">
                  <div className="font-bold text-amber-500 text-sm uppercase mb-6 tracking-[0.2em] border-b border-amber-500/10 pb-4">Inženjerska Analiza Nor Din-a:</div>
                  <div className="prose dark:prose-invert max-w-none">{aiResponse}</div>
                </div>
              )}
            </div>
            
            <div className="lg:w-2/5 hidden lg:block">
              <div className="relative group">
                <div className="absolute inset-0 accent-gradient blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=2070&auto=format&fit=crop" 
                  alt="Architecture Planning" 
                  className="rounded-[3rem] shadow-2xl relative z-10 border border-black/5 dark:border-white/10 group-hover:scale-[1.02] transition-transform duration-500" 
                />
              </div>
            </div>
          </div>
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
              <span className="absolute top-6 right-10 text-8xl text-amber-500/10 font-serif pointer-events-none">"</span>
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
