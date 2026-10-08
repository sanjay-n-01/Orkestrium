export type CategoryFilter = 'all' | 'tech' | 'presentation' | 'strategy' | 'nontech';

export type AttendeePersona = 'hacker' | 'presenter' | 'quizzer' | 'quester' | 'all';

export interface Coordinator {
  name: string;
  phone: string;
}

export interface Organizer {
  name: string;
  phone: string;
  role?: string;
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

export interface PersonaProfile {
  id: AttendeePersona;
  name: string;
  avatar: string;
  description: string;
  matchScores: Record<string, number>;
}
