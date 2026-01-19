
import React, { useState } from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface PageProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

const Contact: React.FC<PageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCurrentPage('home');
    }, 4000);
  };

  return (
    <div className="container mx-auto px-6 pb-20">
      <div className="grid lg:grid-cols-2 gap-20 items-start pt-10">
        <div className="reveal visible">
          <h2 className="text-6xl font-black mb-10 leading-tight">{t.contactTitle}</h2>
          
          <div className="space-y-12 mb-16">
            <div className="group">
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">{t.contactVisit}</h4>
              <p className="text-3xl font-black">Ilica 100, 10000 Zagreb</p>
              <p className="text-slate-500 mt-3 text-lg">{t.contactHours}</p>
            </div>
            
            <div className="group">
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">{t.contactCall}</h4>
              <p className="text-3xl font-black">+385 1 234 5678</p>
              <p className="text-slate-500 mt-3 text-lg">{t.contactAvail}</p>
            </div>

            <div className="group">
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">{t.contactEmail}</h4>
              <p className="text-3xl font-black">info@nordin-zagreb.hr</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-12 md:p-16 rounded-[4rem] border-amber-500/20 bg-white/90 dark:bg-slate-950/50 shadow-2xl">
          {submitted ? (
            <div className="text-center py-24 animate-bounce-in">
              <div className="w-20 h-20 mx-auto mb-10 accent-gradient rounded-3xl flex items-center justify-center text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-4xl font-black mb-6">{t.contactSuccess}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">{t.contactSuccessSub}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{t.contactName}</label>
                <input type="text" required className="w-full bg-slate-50 dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-amber-500 text-lg shadow-inner" placeholder="Ivan Horvat" />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{t.contactEmailLabel}</label>
                <input type="email" required className="w-full bg-slate-50 dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-amber-500 text-lg shadow-inner" placeholder="ivan.h@nordin.hr" />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{t.contactMessage}</label>
                <textarea rows={6} required className="w-full bg-slate-50 dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[1.5rem] px-8 py-6 focus:outline-none focus:border-amber-500 text-lg shadow-inner resize-none" placeholder="..."></textarea>
              </div>
              <button type="submit" className="w-full accent-gradient text-white font-black py-6 rounded-[1.5rem] text-xl shadow-2xl transition-transform active:scale-95">{t.contactSend}</button>
              <p className="text-xs text-slate-500 text-center px-4 leading-relaxed">{t.contactGDPR}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
