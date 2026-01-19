
import React, { useState } from 'react';
import { translations } from '../translations';
import { Language, Project } from '../types';
import { PROJECTS_DATA } from '../constants';

interface PageProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

const Projects: React.FC<PageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation'];
  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-6 pb-20">
      <div className="max-w-3xl mb-16 pt-10">
        <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">{t.projectsTitle}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
          {t.projectsSub} Od modernih vila do poslovnih kompleksa, svaki naš projekt je priča za sebe.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-16 items-center">
        <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mr-4">Filter:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border ${filter === cat ? 'accent-gradient text-white border-transparent shadow-lg shadow-amber-500/20' : 'bg-slate-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {filteredProjects.map((project, idx) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="group relative overflow-hidden rounded-[3rem] aspect-[16/10] cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-2 dark:shadow-none"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
            
            <div className="absolute bottom-0 left-0 p-12 w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <div className="text-amber-500 font-bold text-sm uppercase tracking-[0.3em] mb-3 drop-shadow-lg">{project.category}</div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-white drop-shadow-lg">{project.title}</h3>
              <p className="text-white/80 text-lg line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.description}
              </p>
              <div className="mt-8 flex items-center gap-3 text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                {lang === 'hr' ? 'Detalji projekta' : 'View Project'} <span className="text-amber-500">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>
          <div className="relative glass-card max-w-6xl w-full bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row max-h-[90vh]">
            <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
              <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 left-6 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors lg:hidden"
              >✕</button>
            </div>
            <div className="lg:w-1/2 p-10 lg:p-20 overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-amber-500 font-bold uppercase text-sm tracking-[0.4em] mb-4">{selectedProject.category}</div>
                  <h3 className="text-5xl font-black text-slate-900 dark:text-white leading-tight">{selectedProject.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="hidden lg:flex w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl items-center justify-center hover:bg-amber-500 hover:text-white transition-all font-bold text-xl active:scale-90"
                >✕</button>
              </div>
              
              <div className="grid grid-cols-2 gap-10 mb-12 py-8 border-y border-black/5 dark:border-white/5">
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-widest">Lokacija</h4>
                  <p className="font-bold text-xl text-slate-900 dark:text-white">{selectedProject.location}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-widest">Dovršeno</h4>
                  <p className="font-bold text-xl text-slate-900 dark:text-white">2024</p>
                </div>
              </div>

              <div className="space-y-8 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                <p>{selectedProject.description}</p>
                <p>
                  Ovaj projekt predstavlja našu predanost održivoj arhitekturi i vrhunskom inženjerstvu. Nor Din d.o.o. osigurao je najviše standarde kvalitete uz primjenu pametnih rješenja za energetsku učinkovitost.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                    <span className="text-2xl">🔋</span>
                    <span className="font-bold text-slate-900 dark:text-white">Klasa A++</span>
                  </div>
                  <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                    <span className="text-2xl">🏢</span>
                    <span className="font-bold text-slate-900 dark:text-white">BIM Tech</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setCurrentPage('contact');
                }}
                className="w-full mt-12 accent-gradient text-white font-bold py-6 rounded-3xl shadow-2xl shadow-amber-500/30 hover:scale-[1.02] transition-transform active:scale-95 text-xl"
              >
                {lang === 'hr' ? 'Zatraži sličan projekt' : 'Inquire Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
