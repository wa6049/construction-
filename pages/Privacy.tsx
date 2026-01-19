
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
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-6">{t.privacyTitle}</h2>
        <p className="text-slate-500 dark:text-slate-400">Compliance with Regulation (EU) 2016/679 (GDPR)</p>
      </div>
      
      <div className="glass-card p-10 md:p-16 rounded-3xl space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed shadow-lg dark:shadow-none bg-white/50 dark:bg-slate-900/50">
        <section>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">1. Data Controller</h3>
          <p>
            Nor Din d.o.o., registered in Zagreb, Croatia (Ilica 100), is the controller of your personal data processed through this website. You can contact our Data Protection Officer at <strong>privacy@nordin-zagreb.hr</strong>.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">2. Purpose and Legal Basis for Processing</h3>
          <p>
            We process personal data for the following purposes based on the corresponding legal grounds:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-3">
            <li><strong>Communication via Contact Form:</strong> Processing your name and email to respond to inquiries (Legal basis: Performance of a contract or steps prior to entering into a contract - Art. 6(1)(b) GDPR).</li>
            <li><strong>Website Optimization:</strong> Using anonymous technical data to improve user experience (Legal basis: Legitimate interest - Art. 6(1)(f) GDPR).</li>
            <li><strong>Marketing:</strong> Sending newsletters or offers (Legal basis: Your explicit consent - Art. 6(1)(a) GDPR).</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">3. Data Subject Rights</h3>
          <p>Under GDPR, you have the following rights regarding your personal data:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <li className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5"><strong>Right to Access:</strong> Request a copy of your personal data.</li>
            <li className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5"><strong>Right to Erasure:</strong> "Right to be forgotten" under specific conditions.</li>
            <li className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5"><strong>Right to Rectification:</strong> Correction of inaccurate data.</li>
            <li className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5"><strong>Right to Portability:</strong> Transfer your data to another controller.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">4. Data Retention</h3>
          <p>
            We retain your data only as long as necessary for the purpose it was collected. Contact form data is kept for 12 months unless a business relationship is established. Technical logs are kept for 90 days.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">5. Cookie Policy</h3>
          <p>
            We use cookies to ensure technical functionality. Non-essential cookies (Analytics, Marketing) are only activated with your explicit consent via our management banner. You can change your preferences at any time in the website footer.
          </p>
        </section>

        <section className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            Last updated: May 20, 2025.
          </p>
          <button onClick={() => window.print()} className="text-amber-500 font-bold hover:underline">Print / Save as PDF</button>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
