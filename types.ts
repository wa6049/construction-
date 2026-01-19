
export type Language = 'hr' | 'en';

export interface Translation {
  // Nav
  navHome: string;
  navAbout: string;
  navProjects: string;
  navContact: string;
  navPrivacy: string;
  
  // Hero
  heroTitle: string;
  heroSub: string;
  heroCTA: string;
  heroProjects: string;
  
  // Stats
  statsTitle: string;
  statsProjects: string;
  statsYears: string;
  statsAccidents: string;
  
  // Services
  servicesTitle: string;
  servicesHigh: string;
  servicesHighDesc: string;
  servicesRenov: string;
  servicesRenovDesc: string;
  servicesBIM: string;
  servicesBIMDesc: string;
  servicesMore: string;
  
  // Process
  processTitle: string;
  processSub: string;
  step1: string;
  step1Desc: string;
  step2: string;
  step2Desc: string;
  step3: string;
  step3Desc: string;
  step4: string;
  step4Desc: string;
  
  // About
  aboutTitle: string;
  aboutQuote: string;
  aboutText: string;
  aboutSustainable: string;
  aboutSustainableDesc: string;
  aboutInno: string;
  aboutInnoDesc: string;
  aboutCTA: string;
  leadershipTitle: string;
  leadEngineer: string;
  leadArch: string;
  leadManager: string;
  
  // Projects
  projectsTitle: string;
  projectsSub: string;
  filterAll: string;
  filterRes: string;
  filterCom: string;
  filterRen: string;
  projectDetails: string;
  
  // Contact
  contactTitle: string;
  contactVisit: string;
  contactCall: string;
  contactEmail: string;
  contactHours: string;
  contactAvail: string;
  contactName: string;
  contactEmailLabel: string;
  contactMessage: string;
  contactSend: string;
  contactSuccess: string;
  contactSuccessSub: string;
  contactGDPR: string;
  
  // Privacy
  privacyTitle: string;
  privacyEU: string;
  privacySection1: string;
  privacySection1Text: string;
  privacySection2: string;
  privacySection2Text: string;
  privacySection3: string;
  privacySection3Text: string;
  
  // Footer & Cookies
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
