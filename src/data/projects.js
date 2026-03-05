// Centralized project data for the Projects section.
// Categories: featured, ai-ml, full-stack, games, hardware, android

export const FILTER_TABS = [
  { id: "featured", label: "Featured" },
  { id: "ai-ml", label: "AI/ML" },
  { id: "full-stack", label: "Full Stack" },
  { id: "games", label: "Games" },
  { id: "hardware", label: "Hardware" },
  { id: "android", label: "Android" },
  { id: "all", label: "All" },
];

export const PROJECTS = [
  // ── Hackathon Winners ──
  {
    id: "auralis",
    title: "Auralis",
    description:
      "A virtual 3D healthcare assistant combining emotion detection and natural voice interaction for empathetic telemedicine.",
    categories: ["featured", "ai-ml", "full-stack"],
    isHackathonWinner: true,
    techStack: ["React", "Three.js", "OpenAI", "WebRTC", "Node.js"],
    links: [
      { label: "Live Demo", href: "https://stop-googling-symptoms.tech", hideOnMobile: true },
      { label: "Devpost", href: "https://devpost.com/software/docai-evq74t" },
      { label: "GitHub", href: "https://github.com/rickytang666/auralis" },
    ],
    media: [{ src: "/auralis_card.png", alt: "Auralis Project" }],
    badges: ["3D"],
  },
  {
    id: "lumen",
    title: "Lumen",
    description:
      "A calming companion that listens, understands, and responds with personalized mini-games.",
    categories: ["featured", "ai-ml", "games"],
    isHackathonWinner: true,
    techStack: ["React", "Gemini API", "Phaser.js", "Node.js"],
    links: [
      { label: "Live Demo", href: "https://llumen.netlify.app/", hideOnMobile: true },
      { label: "Devpost", href: "https://devpost.com/software/lumen-qsgcn4" },
      { label: "GitHub", href: "https://github.com/Dawgsrlife/lumen" },
    ],
    media: [{ src: "/lumen_card.png", alt: "Lumen Project" }],
    badges: ["Game Dev"],
  },
  {
    id: "eyecandy",
    title: "Eyecandy",
    description:
      "An AR shopping experience that turns any product photo into a virtual try-on.",
    categories: ["featured", "ai-ml", "full-stack"],
    isHackathonWinner: true,
    techStack: ["React", "AR.js", "TensorFlow", "Firebase"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/eye-candy" },
      { label: "GitHub", href: "https://github.com/Duck-luv-pie/eyecandy" },
    ],
    media: [{ src: "/eyecandy_card.jpg", alt: "Eyecandy Project" }],
    badges: ["AR"],
  },
  {
    id: "careerly",
    title: "Careerly",
    description:
      "Making career exploration fun and inclusive through an AI-powered virtual job fair.",
    categories: ["featured", "ai-ml", "games"],
    isHackathonWinner: true,
    techStack: ["Unity", "C#", "OpenAI", "Firebase"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/career-fair-xz0f67" },
      { label: "GitHub", href: "https://github.com/she11fish/careerly" },
    ],
    media: [{ src: "/careerly_card.jpg", alt: "Careerly Project" }],
    badges: ["Game Dev"],
  },
  // ── Android / Full-Stack ──
  {
    id: "saferoute",
    title: "SafeRoute",
    description:
      "A real-time hazard reporting app with crowdsourced data, drone integration, and safe routing.",
    categories: ["featured", "android", "full-stack"],
    isHackathonWinner: false,
    techStack: ["Kotlin", "Google Maps API", "Firebase", "Jetpack Compose"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/SafeRoute" },
    ],
    media: [{ src: "/saferoute_card.png", alt: "SafeRoute Project" }],
    badges: ["Android"],
  },
  {
    id: "animarker",
    title: "Animarker",
    description:
      "A crowdsourced wildlife tracker using computer vision to identify and map animal sightings worldwide.",
    categories: ["featured", "android", "ai-ml"],
    isHackathonWinner: false,
    techStack: ["Kotlin", "TensorFlow Lite", "Google Maps API", "Firebase"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/endangered-animal-app" },
      { label: "GitHub", href: "https://github.com/HasNate618/Animarker" },
    ],
    media: [{ src: "/animarker_card.png", alt: "Animarker Project" }],
    badges: ["Android"],
  },
  // ── Hardware ──
  {
    id: "flexfire-x",
    title: "FLEXFIRE-X",
    description:
      "A wrist mounted projectile launcher controlled using muscle signals for intuitive body-driven activation.",
    categories: ["featured", "hardware"],
    isHackathonWinner: false,
    techStack: ["Arduino", "EMG Sensor", "C++", "3D Printing"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/FLEXFIRE-X" },
    ],
    media: [{ src: "/flexfire-x_card.png", alt: "FLEXFIRE-X Project" }],
    badges: ["Hardware"],
  },
  {
    id: "rubber-band-turret",
    title: "Rubber Band Turret",
    description:
      "Bluetooth-controlled rubber band turret with smooth servo movement and wireless app control.",
    categories: ["hardware", "android"],
    isHackathonWinner: false,
    techStack: ["Arduino", "Bluetooth", "Servo Motors", "Kotlin"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Rubber-Band-Turret" },
    ],
    media: [{ src: "/turret_card.png", alt: "Rubber Band Turret Project" }],
    badges: ["Hardware"],
  },
  // ── Mobile Games (formerly "Apps" section) ──
  {
    id: "street-cleaner",
    title: "Street Cleaner",
    description: "Drag litter into the correct bin to win!",
    categories: ["featured", "games", "android"],
    isHackathonWinner: true,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.StreetCleaner",
      },
      { label: "Devpost", href: "https://devpost.com/software/street-cleaner" },
    ],
    media: [{ src: "/street_cleaner_icon.png", alt: "Street Cleaner Icon", imageContain: true }],
    badges: ["Game"],
    imageContain: true,
  },
  {
    id: "zenith-tower",
    title: "Zenith Tower",
    description: "Ascend the tower in a futuristic dungeon crawler.",
    categories: ["games", "android"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.ZenithTower",
      },
    ],
    media: [{ src: "/zenith_tower_icon.png", alt: "Zenith Tower Icon", imageContain: true }],
    badges: ["Game"],
    imageContain: true,
  },
  {
    id: "motaru",
    title: "Mōtaru",
    description: "Take down ninjas using quick reflexes!",
    categories: ["games", "android"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.Mtaru",
      },
    ],
    media: [{ src: "/motaru_icon.png", alt: "Mōtaru Icon", imageContain: true }],
    badges: ["Game"],
    imageContain: true,
  },
  {
    id: "tic-tac-toe-ultimate",
    title: "Tic Tac Toe Ultimate",
    description: "The Ultimate Tic Tac Toe experience.",
    categories: ["games", "android"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.TicTacToeUltimate",
      },
    ],
    media: [{ src: "/tttu_icon.png", alt: "Tic Tac Toe Ultimate Icon", imageContain: true }],
    badges: ["Game"],
    imageContain: true,
  },
  // ── Additional projects to reach ~20 ──
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "This very site — a cyberpunk-themed portfolio with a 3D mascot, Unity WebGL demo, and interactive navigation.",
    categories: ["featured", "full-stack"],
    isHackathonWinner: false,
    techStack: ["Next.js", "React", "Three.js", "Tailwind CSS", "Unity"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Portfolio" },
    ],
    media: [{ src: "/auralis_card.png", alt: "Portfolio Website" }],
    badges: ["Web"],
  },
];
