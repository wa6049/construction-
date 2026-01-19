
export type Language = 'hr' | 'en';

export interface Translation {
  navHome: string;
  navAbout: string;
  navProjects: string;
  navContact: string;
  navPrivacy: string;
  heroTitle: string;
  heroSub: string;
  heroCTA: string;
  aboutTitle: string;
  aboutText: string;
  projectsTitle: string;
  projectsSub: string;
  contactTitle: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSend: string;
  privacyTitle: string;
  footerRights: string;
  cookieTitle: string;
  cookieAccept: string;
  aiAdvisorTitle: string;
  aiAdvisorPlaceholder: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
}
