import { SiteConfig, SymposiumEvent, ScheduleEpisode } from '../types/symposium';

export const SITE_CONFIG: SiteConfig = {
  college: "Department of Electronics and Instrumentation Engineering",
  dateLabel: "31 Oct 2026",
  startISO: "2026-10-31T09:00:00+05:30",
  venue: "SRM Valliammai Engineering College",
  address: "Kattankulathur, Chengalpattu, Tamil Nadu, India",
  mapLink: "https://www.google.com/maps/search/?api=1&query=SRM+Valliammai+Engineering+College",
  registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26/viewform",
  food: "Lunch and refreshments will be provided",
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
      name: "Sanjay S",
      role: "President",
      image: "/assets/office-bearers/sanjay.jpg"
    },
    {
      name: "Balamuragan R",
      role: "Vice President",
      image: "/assets/office-bearers/balamurugan.jpg"
    },
    {
      name: "Pooja S",
      role: "Secretary",
      image: "/assets/office-bearers/pooja.jpeg"
    },
    {
      name: "Vishmithaa B",
      role: "Joint Secretary",
      image: "/assets/office-bearers/vishmathaa.png"
    },
    {
      name: "Dharun Supreeth N",
      role: "Treasurer",
      image: "/assets/office-bearers/dharun_supreeth.jpg"
    },
    {
      name: "Vignesh S",
      role: "Overall Coordinator",
      image: "/assets/office-bearers/vignesh.png"
    },
    {
      name: "Srikanth K",
      role: "Overall Coordinator",
      image: "/assets/office-bearers/srikanth.jpg"
    },
    {
      name: "Melvin D",
      role: "Overall Coordinator",
      image: "/assets/office-bearers/melvin.png?v=1"
    },
    {
      name: "Lavanya S",
      role: "Overall Coordinator",
      image: "/assets/office-bearers/lavanya.png"
    },
    {
      name: "Tanish S",
      role: "Overall Coordinator",
      image: "/assets/office-bearers/tanish.jpg"
    },
    {
      name: "Samithra P",
      role: "Overall Coordinator",
      image: "/assets/office-bearers/samithra.png"
    },
    {
      name: "Prithviraj N",
      role: "Overall Coordinator",
      image: "/assets/office-bearers/prithviraj.jpeg"
    }
  ],
  email: "orkestrim2k26@gmail.com"
};

export const OFFICIAL_EVENTS: SymposiumEvent[] = [
  {
    id: "paper-spark",
    name: "Paper Fusion",
    episode: "Episode 01",
    tagline: "Present breakthrough research papers and defend innovative technical paradigms.",
    genre: "Paper Presentation • Research • Defense",
    category: "presentation",
    rating: "U/A 16+",
    duration: "90m",
    badge: "#1 IN RESEARCH",
    matchScore: 98,
    date: "31 Oct 2026",
    time: "Morning Session",
    venue: "Dept of EIE, 10th floor, New Building",
    teamSize: "2 to 4 Members",
    fee: "Rs.200/head",
    description: "Paper theory spaarks the budding researchers to gather insight on their ideas pitched - on any category - from faculties",
    rules: [
      "Round 1: THE HYPOTHESIS : Teams should submit abstract on or before 26th Oct. Abstract submission must adhere to standard IEEE 2-column format (max 6 pages). The best team moves forward.",
      "Round 2: THE NOBEL MOMENT : Shortlisted teams will present their full paper to our faculties and winners are announced."
    ],
    highlight: `Submitted papers must be related to one or more of the following technical domains:
Internet of Things(IoT)
Embedded Systems
Instrumentation and Control Systems
Robotics and Automation
Artificial Intelligence and Machine Learning
Sensors and Transducers
Industrial Automation`,
    coordinator: {
      name: "Sreeja RK",
      phone: "+91 9345886898",
      name2: "Rajeswari K",
      phone2: "+91 9597796458",
      name3: "Petchiammal R",
      phone3: "+91 9025719247"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSeQG6PxKDYumsjixpVvhQE0lpmgzOW3f3rx4R9oy5meCyXvcw/viewform"
  },
  {
    id: "brainiacs-battle",
    name: "CASHFLIX",
    episode: "Episode 02",
    tagline: "High-intensity technical quiz testing algorithmic speed, core concepts, and trivia mastery.",
    genre: "Tech Quiz • Rapid Fire • Trivia",
    category: "strategy",
    rating: "U/A 16+",
    duration: "75m",
    badge: "#2 IN STRATEGY",
    matchScore: 96,
    date: "31 Oct 2026",
    time: "Morning Session",
    venue: "Dept of EIE, 10th floor, New Building",
    teamSize: "2-3 Members",
    fee: "Rs.200/head",
    description: "Train your brain to battle out the wrong and confusing options to crack the right ones via MCQ's, planning and capturing the hint to unlock the final vault!",
    rules: [
      "Round 1: DIGITAL VAULT : Enter the vault and crack a series of technical MCQ's through an online quiz platform. Accuracy and speed will determine who advanced to the next stage of the heist. ",
      "Round 2: THE MASTER PLAN : Put your Electronics and Instrumentation knowledge to the test in a written technical quiz. Analyze, think strategically and answer your way closer to the treasure.",
      "Round 3: THE FINAL CLUE: Put your technical knowledge to the test with three intriguing clues describing a mystery component or concept. Listen carefully, connect the hints and identify the correct answer. Only the sharpest minds will crack the clues and unlock the final vault!.",
    ],
    coordinator: {
      name: "A. Vijay",
      phone: "+91 6382358039",
      name2: "S. Sangamithra",
      phone2: "+91 9345674866"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-Brainiac/viewform"
  },
  {
    id: "techno-connect",
    name: "Beyond Limits",
    episode: "Episode 03",
    tagline: "Connect cryptic visual clues, decode hidden tech brands, algorithms, and technical paradigms.",
    genre: "Connection • Deduction • Visual Logic",
    category: "strategy",
    rating: "U/A 16+",
    duration: "75m",
    badge: "#3 IN DEDUCTION",
    matchScore: 95,
    date: "31 Oct 2026",
    time: "Afternoon Session",
    venue: "Dept of EIE, 10th floor, New Building",
    teamSize: "2-3 Members",
    fee: "Rs.200/head",
    description: "An exhilarating visual connection battle inspired by classic lateral puzzle showdowns. Identify underlying software design patterns, famous founders, obscure tech acquisitions, programming keywords, and logos pieced together from seemingly unrelated imagery.",
    rules: [
      "Teams consist of 2 members.",
      "Round 1: Pen and paper prelims consisting of 25 connection slides.",
      "Round 2: Stage finals with 4 teams tackling tiered visual connection boards with clue-based point multipliers.",
      "Early answers receive higher bonus points; wrong guesses on buzzer deduct points.",
      "No external consultation or digital devices permitted."
    ],
    coordinator: {
      name: "Durai Murugan M",
      phone: "+91 9342589541",
      name2: "VishnuVignesh V",
      phone2: "+91 9344486984"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-TechnoConnect/viewform"
  },
  {
    id: "techno-ads",
    name: "BrandBlitz",
    episode: "Episode 04",
    tagline: "Market futuristic prototypes and craft the ultimate technical sales pitch.",
    genre: "Creative Pitch • Marketing • Ad-Mad",
    category: "nontech",
    rating: "U/A 16+",
    duration: "90m",
    badge: "#4 IN CREATIVITY",
    matchScore: 94,
    date: "31 Oct 2026",
    time: "Afternoon Session",
    venue: "Dept of EIE, 10th floor, New Building",
    teamSize: "3 to 5 Members",
    fee: "Rs.200/head",
    description: "Techno Ads merges theatrical comedy, engineering insight, and advertising brilliance. Teams are assigned unconventional futuristic gadgets or software ideas and must construct a compelling 3-minute live commercial advertisement that captivates both judges and audience.",
    rules: [
      "Teams of 3 to 5 members.",
      "Topic/product will be assigned on the spot with 10 minutes preparation time.",
      "Performance time: 3 to 4 minutes on stage.",
      "Judging criteria: Creativity, humor, technical coherence, teamwork, and audience engagement.",
      "Vulgarity, derogatory language, or offensive references strictly prohibited and cause immediate ejection."
    ],
    coordinator: {
      name: "Kishore G",
      phone: "+91 9345825699",
      name2: "Balaji N",
      phone2: "+91 9626510436"
    },
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScOrkestrim2K26-TechnoAds/viewform"
  },
  {
    id: "techno-treasure",
    name: "The Voyage X",
    episode: "Episode 05",
    tagline: "Crack algorithmic ciphers and race across campus to unearth the hidden payload.",
    genre: "Campus Hunt • Cryptic Clues • Adventure",
    category: "nontech",
    rating: "U/A 16+",
    duration: "90m",
    badge: "#5 IN ADVENTURE",
    matchScore: 97,
    date: "31 Oct 2026",
    time: "Afternoon Session",
    venue: "Dept of EIE, 10th floor, New Building",
    teamSize: "3 to 4 Members",
    fee: "Rs.200/head",
    description: "Turn on the detective cap and get a few instructions from Sherlock Holmes because here we hide treasures across campus in tricky places for a clue to riddles and enjoy the treasure.",
    rules: [
      "Teams must have 3 to 4 members who stay together throughout the hunt.",
      "Round 1: Puzzle or connecting images are given to the team to crack it and next team sails forward.",
      "Round 2: 5-6 treasures are hidden in different places across campus like in a balloon, under a a desk, in a book, etc. Riddles locates clues and treasures are collected. The team that collects all treasures grabs the 1st spot.",
    ],
    coordinator: {
      name: "Sriram R",
      phone: "+91 9884424123",
      name2: "Vignesh S",
      phone2: "+91 8148920928"
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
    desc: "Grand festive vegetarian lunch served by the Hospitality Committee. Networking lounge open to all registered delegates."
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


