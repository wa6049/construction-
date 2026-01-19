
import React, { useState } from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface PageProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

const Contact: React.FC<PageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
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
          <h2 className="text-6xl font-black mb-10 tracking-tight text-slate-900 dark:text-white leading-tight">{t.contactTitle}</h2>
          
          <div className="space-y-12 mb-16">
            <div className="group">
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Posjetite Nas</h4>
              <p className="text-3xl font-black text-slate-900 dark:text-white">Ilica 100, 10000 Zagreb</p>
              <p className="text-slate-500 mt-3 text-lg">Hrvatska • Pon - Pet: 08:00 - 16:00</p>
            </div>
            
            <div className="group">
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Nazovite Nas</h4>
              <p className="text-3xl font-black text-slate-900 dark:text-white hover:text-amber-500 transition-colors cursor-pointer">+385 1 234 5678</p>
              <p className="text-slate-500 mt-3 text-lg">Dostupni smo za hitne upite 24/7</p>
            </div>

            <div className="group">
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Email Upiti</h4>
              <p className="text-3xl font-black text-slate-900 dark:text-white hover:text-amber-500 transition-colors cursor-pointer">info@nordin-zagreb.hr</p>
            </div>
          </div>

          <div className="rounded-[3rem] overflow-hidden h-80 grayscale opacity-70 border border-black/5 dark:border-white/10 shadow-2xl hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.789049911!2d15.966!3d45.815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d692c902139d%3A0x60dec2cc20379c67!2sIlica%2C%20Zagreb!5e0!3m2!1sen!2shr!4v1700000000000" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy"
              title="Nor Din Location"
            ></iframe>
          </div>
        </div>

        <div className="glass-card p-12 md:p-16 rounded-[4rem] border-amber-500/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] bg-white/90 dark:bg-slate-950/50">
          {submitted ? (
            <div className="text-center py-24 animate-bounce-in">
              <div className="text-7xl mb-10">🚀</div>
              <h3 className="text-4xl font-black mb-6 text-slate-900 dark:text-white">{lang === 'hr' ? 'Hvala vam!' : 'Message Sent!'}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
                {lang === 'hr' ? 'Vaša poruka je uspješno poslana. Naš inženjer će vas kontaktirati u najkraćem mogućem roku.' : 'Our engineers will review your inquiry and get back to you within 24 hours.'}
              </p>
              <div className="mt-12 h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full accent-gradient animate-[progress_4s_linear_forwards]"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{t.contactName}</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-amber-500 transition-all text-slate-900 dark:text-slate-200 shadow-inner text-lg"
                  placeholder="Ivan Horvat"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{t.contactEmail}</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-amber-500 transition-all text-slate-900 dark:text-slate-200 shadow-inner text-lg"
                  placeholder="ivan.h@nordin.hr"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{t.contactMessage}</label>
                <textarea 
                  rows={6}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[1.5rem] px-8 py-6 focus:outline-none focus:border-amber-500 transition-all text-slate-900 dark:text-slate-200 shadow-inner text-lg resize-none"
                  placeholder={lang === 'hr' ? 'Opišite vaš projekt (lokacija, tip objekta, rokovi)...' : 'Describe your project details...'}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full accent-gradient text-white font-black py-6 rounded-[1.5rem] text-xl hover:scale-[1.02] transition-transform shadow-2xl shadow-amber-500/30 active:scale-95"
              >
                {t.contactSend}
              </button>
              <p className="text-sm text-slate-500 text-center px-4 leading-relaxed">
                {lang === 'hr' 
                  ? 'Slanjem ovog obrasca prihvaćate našu politiku privatnosti i obradu osobnih podataka u skladu s GDPR-om.' 
                  : 'By submitting this form you agree to our privacy policy and GDPR-compliant data processing.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
