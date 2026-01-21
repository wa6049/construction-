
export type Language = 'hr' | 'en';

export interface Translation {
  // Nav
  navHome: string;
  navAbout: string;
  navContact: string;
  navPrivacy: string;
  
  // Hero
  heroTagline: string;
  heroTitle: string;
  heroSub: string;
  heroCTA: string;
  heroAbout: string;
  
  // Home - About Summary
  homeAboutTitle: string;
  homeAboutText: string;
  homeAboutGoal: string;
  homeAboutLearnMore: string;

  // Services
  servicesTitle: string;
  gletanje: string;
  gletanjeDesc: string;
  brusenje: string;
  brusenjeDesc: string;
  farbanje: string;
  farbanjeDesc: string;
  bandaziranje: string;
  bandaziranjeDesc: string;
  gradnja: string;
  gradnjaDesc: string;
  collaboration: string;
  collaborationDesc: string;

  // Process
  processTitle: string;
  step1: string;
  step1Desc: string;
  step2: string;
  step2Desc: string;
  step3: string;
  step3Desc: string;
  step4: string;
  step4Desc: string;

  // Why Us
  whyTitle: string;
  why1: string;
  why2: string;
  why3: string;
  why4: string;
  why5: string;

  // Contact
  contactTitle: string;
  contactSub: string;
  contactName: string;
  contactEmail: string;
  contactMsg: string;
  contactSend: string;
  contactVisit: string;
  contactHours: string;
  contactCall: string;
  contactAvail: string;
  contactEmailUpiti: string;
  contactSuccess: string;
  contactSuccessSub: string;
  contactGDPR: string;
  
  // About Page
  aboutTitle: string;
  aboutText: string;
  aboutTarget: string;
  aboutGoal: string;
  aboutPhilosophy: string;
  aboutEquipmentTitle: string;
  aboutEquipmentText: string;
  aboutCollaborate: string;

  // Privacy
  privacyTitle: string;
  privacyEU: string;
  privacySection1: string;
  privacySection1Text: string;
  privacySection2: string;
  privacySection2Text: string;
  privacySection3: string;
  privacySection3Text: string;
  privacyPrint: string;
  
  // Footer
  footerLegal: string;
  footerAddress: string;
  footerRights: string;
  footerFollow: string;
  
  // AI
  aiTitle: string;
  aiPlaceholder: string;
  aiAdvisorPlaceholder: string;
  aiIntro: string;
  aiStatus: string;
}
