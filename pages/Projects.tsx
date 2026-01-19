
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

  const categories = [
    { id: 'All', label: t.filterAll },
    { id: 'Residential', label: t.filterRes },
    { id: 'Commercial', label: t.filterCom },
    { id: 'Renovation', label: t.filterRen }
  ];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-6 pb-20">
      <div className="max-w-3xl mb-16 pt-10">
        <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">{t.projectsTitle}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
          {t.projectsSub}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-16 items-center">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border ${filter === cat.id ? 'accent-gradient text-white border-transparent shadow-lg' : 'bg-slate-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-500 hover:text-amber-500'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="group relative overflow-hidden rounded-[3rem] aspect-[16/10] cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-12 w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-white">{project.title}</h3>
              <div className="flex items-center gap-3 text-white font-bold">{t.projectDetails} <span className="text-amber-500">→</span></div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>
          <div className="relative glass-card max-w-6xl w-full bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">
            <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
              <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-20 overflow-y-auto">
              <h3 className="text-5xl font-black mb-8 leading-tight">{selectedProject.title}</h3>
              <div className="grid grid-cols-2 gap-10 mb-12 py-8 border-y border-black/5 dark:border-white/5">
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-widest">LOKACIJA / LOCATION</h4>
                  <p className="font-bold text-xl">{selectedProject.location}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12">{selectedProject.description}</p>
              <button onClick={() => { setSelectedProject(null); setCurrentPage('contact'); }} className="w-full accent-gradient text-white font-bold py-6 rounded-3xl text-xl shadow-2xl">{lang === 'hr' ? 'Zatraži info' : 'Request Info'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
