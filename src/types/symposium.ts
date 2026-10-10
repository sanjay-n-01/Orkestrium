export type CategoryFilter = 'all' | 'tech' | 'nontech';

export interface Coordinator {
  name: string;
  phone: string;
  name2?: string;
  phone2?: string;
  name3?: string;
  phone3?: string;
  name4?: string;
  phone4?: string;
}

export interface Organizer {
  name: string;
  phone?: string;
  role?: string;
  image?: string;
}

export interface SymposiumEvent {
  id: string;
  name: string;
  image?: string;
  episode: string;
  tagline: string;
  genre: string;
  category: 'tech' | 'presentation' | 'strategy' | 'nontech';
  rating: string;
  duration: string;
  badge: string;
  matchScore: number;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  fee: string;
  description: string;
  rules: string[];
  highlight?: string;
  coordinator: Coordinator;
  formLink?: string;
}

export interface ScheduleEpisode {
  epNum: number;
  slot: 'morning' | 'afternoon';
  time: string;
  title: string;
  duration: string;
  venue: string;
  desc: string;
}

export interface SiteConfig {
  college: string;
  dateLabel: string;
  startISO: string;
  venue: string;
  address: string;
  mapLink: string;
  registrationLink: string;
  food: string;
  busRoute: string[];
  trainRoute: string[];
  organizers: Organizer[];
  email: string;
}
