/* ==========================================================================
   Shared Type Definitions — Firma Hukum
   ========================================================================== */

/** Navigation link item */
export interface NavItem {
  label: string;
  href: string;
}

/** Practice area / legal service */
export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  keyServices: string[];
}

/** Team member / lawyer */
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  imagePlaceholder: string;
  linkedIn: string;
}

/** Statistic item */
export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

/** Contact information */
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  businessHours: string;
}

/** Social media link */
export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

/** Site configuration */
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

/** Timeline event (for About page) */
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

/** Core value item */
export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}
