import { SiteConfig, SymposiumEvent, ScheduleEpisode, PersonaProfile } from '../types/symposium';

export const SITE_CONFIG: SiteConfig = {
  college: "Department of Computer Science & Engineering",
  dateLabel: "24 Oct 2026",
  startISO: "2026-10-24T09:00:00+05:30",
  venue: "Main Campus Auditorium & Tech Arenas",
  address: "University Campus, Tech Boulevard, Knowledge City",
  mapLink: "https://maps.google.com/?q=College+of+Engineering",
  registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26/viewform",
  food: "Breakfast & full-course lunch banquet provided by the Hospitality Committee (Veg & Non-Veg options available), plus high-energy beverages and refreshments during intermissions.",
  busRoute: [
    "Campus Route 04 from Central Railway Station (every 15 mins)",
    "Express Shuttle from Metro Junction Platform 2"
  ],
  trainRoute: [
    "Central Station (Suburban Line 2) to Tech Campus Halt",
    "Metro Line 1 (Green Line) to University Station"
  ],
  organizers: [
    {
      name: "Sanjay N",
      phone: "+91 98765 43210",
      role: "Lead Student Coordinator"
    },
    {
      name: "Ananya Sharma",
      phone: "+91 98765 43211",
      role: "Technical Operations Head"
    },
    {
      name: "Karthik Raja",
      phone: "+91 98765 43212",
      role: "Event & Arena Manager"
    },
    {
      name: "Pooja Patel",
      phone: "+91 98765 43213",
      role: "Hospitality & Delegate Desk"
    }
  ],
  email: "orkestrim2k26@gmail.com"
};

export const OFFICIAL_EVENTS: SymposiumEvent[] = [
  {
    id: "paper-spark",
    name: "Paper Spark",
    episode: "Episode 01",
    tagline: "Present breakthrough research papers and defend innovative technical paradigms.",
    genre: "Paper Presentation • Research • Defense",
    category: "presentation",
    rating: "U/A 13+",
    duration: "90m",
    badge: "#1 IN RESEARCH",
    matchScore: 98,
    date: "24 Oct 2026",
    time: "10:00 AM — 11:30 AM",
    venue: "Seminar Hall 1",
    teamSize: "1 to 3 Members",
    fee: "Free Entry / Included with Delegate Pass",
    description: "Paper Spark offers budding researchers and engineers the premier platform to pitch cutting-edge developments across Artificial Intelligence, Distributed Systems, IoT, Cybersecurity, and Next-Gen Computing. Present your findings to an esteemed panel of faculty and industry veterans.",
    rules: [
      "Maximum of 3 participants per team.",
      "Abstract submission must adhere to standard IEEE 2-column format (max 6 pages).",
      "Each team will be given 8 minutes for presentation followed by 2 minutes of Q&A with the jury.",
      "Bring 2 hard copies of the full paper and a backup copy of your slide deck on a verified USB drive.",
      "Plagiarism strictly prohibited; submissions above 15% similarity will be disqualified immediately."
    ],
    coordinator: {
      name: "Rahul Verma",
      phone: "+91 98765 43220"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-PaperSpark/viewform"
  },
  {
    id: "brainiacs-battle",
    name: "Brainiac's Battle",
    episode: "Episode 02",
    tagline: "High-intensity technical quiz testing algorithmic speed, core concepts, and trivia mastery.",
    genre: "Tech Quiz • Rapid Fire • Trivia",
    category: "strategy",
    rating: "ALL AGES",
    duration: "75m",
    badge: "#2 IN STRATEGY",
    matchScore: 96,
    date: "24 Oct 2026",
    time: "11:45 AM — 01:00 PM",
    venue: "Tech Studio Lab",
    teamSize: "2 Members",
    fee: "Free Entry / Included with Delegate Pass",
    description: "Step into the arena where milliseconds determine victory. Brainiac's Battle tests your fundamental comprehension of algorithms, computer architecture, tech history, programming puzzles, and industry breakthroughs across rapid buzzer rounds.",
    rules: [
      "Teams must comprise exactly 2 members.",
      "Round 1: 30 written rapid-fire MCQs and code output predictions (20 mins). Top 6 teams qualify for the stage buzzer round.",
      "Round 2: Audio-visual tech trivia, rapid-fire buzzer face-off, and wager question rounds.",
      "Use of mobile phones or smartwatches during the arena run results in immediate disqualification.",
      "Quizmaster's ruling is final and binding in all rounds."
    ],
    coordinator: {
      name: "Devika Nair",
      phone: "+91 98765 43221"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-Brainiac/viewform"
  },
  {
    id: "techno-connect",
    name: "Techno Connect",
    episode: "Episode 03",
    tagline: "Connect cryptic visual clues, decode hidden tech brands, algorithms, and technical paradigms.",
    genre: "Connection • Deduction • Visual Logic",
    category: "strategy",
    rating: "ALL AGES",
    duration: "75m",
    badge: "#3 IN DEDUCTION",
    matchScore: 95,
    date: "24 Oct 2026",
    time: "11:45 AM — 01:00 PM",
    venue: "Audio-Visual Hall",
    teamSize: "2 Members",
    fee: "Free Entry / Included with Delegate Pass",
    description: "An exhilarating visual connection battle inspired by classic lateral puzzle showdowns. Identify underlying software design patterns, famous founders, obscure tech acquisitions, programming keywords, and logos pieced together from seemingly unrelated imagery.",
    rules: [
      "Teams consist of 2 members.",
      "Round 1: Pen and paper prelims consisting of 25 connection slides.",
      "Round 2: Stage finals with 4 teams tackling tiered visual connection boards with clue-based point multipliers.",
      "Early answers receive higher bonus points; wrong guesses on buzzer deduct points.",
      "No external consultation or digital devices permitted."
    ],
    coordinator: {
      name: "Arjun Krishnan",
      phone: "+91 98765 43222"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-TechnoConnect/viewform"
  },
  {
    id: "techno-ads",
    name: "Techno Ads",
    episode: "Episode 04",
    tagline: "Market futuristic prototypes and craft the ultimate technical sales pitch.",
    genre: "Creative Pitch • Marketing • Ad-Mad",
    category: "nontech",
    rating: "ALL AGES",
    duration: "90m",
    badge: "#4 IN CREATIVITY",
    matchScore: 94,
    date: "24 Oct 2026",
    time: "02:00 PM — 03:30 PM",
    venue: "Open Amphitheatre / Stage 2",
    teamSize: "3 to 5 Members",
    fee: "Free Entry / Included with Delegate Pass",
    description: "Techno Ads merges theatrical comedy, engineering insight, and advertising brilliance. Teams are assigned unconventional futuristic gadgets or software ideas and must construct a compelling 3-minute live commercial advertisement that captivates both judges and audience.",
    rules: [
      "Teams of 3 to 5 members.",
      "Topic/product will be assigned on the spot with 10 minutes preparation time.",
      "Performance time: 3 to 4 minutes on stage.",
      "Judging criteria: Creativity, humor, technical coherence, teamwork, and audience engagement.",
      "Vulgarity, derogatory language, or offensive references strictly prohibited and cause immediate ejection."
    ],
    coordinator: {
      name: "Sneha Mukherjee",
      phone: "+91 98765 43223"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-TechnoAds/viewform"
  },
  {
    id: "techno-treasure",
    name: "Techno Treasure",
    episode: "Episode 05",
    tagline: "Crack algorithmic ciphers and race across campus to unearth the hidden payload.",
    genre: "Campus Hunt • Cryptic Clues • Adventure",
    category: "nontech",
    rating: "U/A 16+",
    duration: "90m",
    badge: "#5 IN ADVENTURE",
    matchScore: 97,
    date: "24 Oct 2026",
    time: "02:00 PM — 03:30 PM",
    venue: "Campus Grounds & Tech Quadrant",
    teamSize: "3 to 4 Members",
    fee: "Free Entry / Included with Delegate Pass",
    description: "The symposium's ultimate physical-digital hybrid challenge! Crack base64 strings, Caesar ciphers, QR coordinates, and algorithmic riddles hidden in physical drop points across the university campus. The fastest squad to recover the final master decryption key claims the champion's bounty.",
    rules: [
      "Teams must have 3 to 4 members who stay together throughout the hunt.",
      "Teams will receive clue 1 at the central registration lawn upon briefing.",
      "Each stage requires solving a logic puzzle to unlock the GPS coordinate or building marker for the next clue checkpoint.",
      "Tampering with clues or checkpoints will lead to instant team disqualification.",
      "The first squad to bring all collected checkpoint seals and decipher the final payload wins."
    ],
    coordinator: {
      name: "Vikramaditya S",
      phone: "+91 98765 43224"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-Treasure/viewform"
  }
];

export const SCHEDULE_EPISODES: ScheduleEpisode[] = [
  {
    epNum: 1,
    slot: "morning",
    time: "08:30 AM — 09:30 AM",
    title: "Check-in, Registration & Breakfast",
    duration: "60m",
    venue: "Registration Pavilion",
    desc: "Stream into the venue, collect your physical symposium entry credentials, registration kits, and enjoy hot South Indian breakfast & refreshments."
  },
  {
    epNum: 2,
    slot: "morning",
    time: "09:30 AM — 10:00 AM",
    title: "Opening Ceremony & Keynote Address",
    duration: "30m",
    venue: "Main Auditorium",
    desc: "Inaugural lamp lighting by the Department of Computer Science & Engineering, welcome address, keynote speech, and tournament guidelines briefing."
  },
  {
    epNum: 3,
    slot: "morning",
    time: "10:00 AM — 11:30 AM",
    title: "The Main Arena: Paper Spark (Research Presentation)",
    duration: "90m",
    venue: "Seminar Hall 1",
    desc: "Defense of peer-reviewed research papers and innovative technical presentations before the esteemed faculty and industry judge jury."
  },
  {
    epNum: 4,
    slot: "morning",
    time: "11:45 AM — 01:00 PM",
    title: "Brain Battles: Brainiac's Battle & Techno Connect",
    duration: "75m",
    venue: "Tech Studio Lab & Audio-Visual Hall",
    desc: "Simultaneous rapid-fire technical quiz prelims and deductive image connection challenges testing algorithmic lateral thinking."
  },
  {
    epNum: 5,
    slot: "afternoon",
    time: "01:00 PM — 02:00 PM",
    title: "Hospitality Feast & Lunch Intermission",
    duration: "60m",
    venue: "Dining Pavilion",
    desc: "Grand festive lunch served by the Hospitality Committee with Veg & Non-Veg pavilions. Networking lounge open to all registered delegates."
  },
  {
    epNum: 6,
    slot: "afternoon",
    time: "02:00 PM — 03:30 PM",
    title: "The Final Heist: Techno Ads & Techno Treasure",
    duration: "90m",
    venue: "Open Amphitheatre & Campus Grounds",
    desc: "High-voltage ad-mad marketing pitches and multi-checkpoint cryptic cipher treasure chase across the campus perimeter."
  },
  {
    epNum: 7,
    slot: "afternoon",
    time: "03:45 PM — 04:30 PM",
    title: "Season Finale: Grand Valedictory Ceremony & Awards",
    duration: "45m",
    venue: "Main Auditorium",
    desc: "Crowning of the symposium champions, cash prize awards distribution, memento presentations, and symposium closing remarks."
  }
];

export const PERSONA_PROFILES: PersonaProfile[] = [
  {
    id: "hacker",
    name: "The Coder",
    avatar: "👨‍💻",
    description: "Matches: Brainiac's Battle, Techno Connect",
    matchScores: {
      "brainiacs-battle": 99,
      "techno-connect": 98,
      "paper-spark": 95,
      "techno-treasure": 91,
      "techno-ads": 88
    }
  },
  {
    id: "presenter",
    name: "The Presenter",
    avatar: "📊",
    description: "Matches: Paper Spark, Techno Ads",
    matchScores: {
      "paper-spark": 99,
      "techno-ads": 98,
      "brainiacs-battle": 94,
      "techno-connect": 90,
      "techno-treasure": 87
    }
  },
  {
    id: "quizzer",
    name: "The Strategist",
    avatar: "🧠",
    description: "Matches: Brainiac's Battle, Techno Connect",
    matchScores: {
      "brainiacs-battle": 99,
      "techno-connect": 98,
      "paper-spark": 93,
      "techno-treasure": 91,
      "techno-ads": 89
    }
  },
  {
    id: "quester",
    name: "The Adventurer",
    avatar: "🕵️",
    description: "Matches: Techno Treasure, Techno Connect",
    matchScores: {
      "techno-treasure": 99,
      "techno-connect": 95,
      "brainiacs-battle": 92,
      "techno-ads": 90,
      "paper-spark": 86
    }
  },
  {
    id: "all",
    name: "All-Access Binger",
    avatar: "🍿",
    description: "Full 5-Arena All-Access Pass",
    matchScores: {
      "paper-spark": 98,
      "techno-treasure": 97,
      "brainiacs-battle": 96,
      "techno-connect": 95,
      "techno-ads": 94
    }
  }
];
