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
    id: "carebridge",
    title: "CareBridge",
    description:
      "AI healthcare platform connecting rural patients and providers with intelligent check-ins and risk tracking.",
    categories: ["featured", "ai-ml", "full-stack"],
    isHackathonWinner: true,
    techStack: ["React", "TypeScript", "FastAPI", "Supabase", "Cohere", "ElevenLabs", "Vite"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/carebridge-ai" },
    ],
    media: [
      { src: "/carebridge-dashboard.jpg", alt: "CareBridge Provider Dashboard" },
      { src: "/carebridge-financials.png", alt: "CareBridge Financials View" },
      { src: "/carebridge-slide.png", alt: "CareBridge Pitch Slide" },
    ],
  },
  {
    id: "auralis",
    title: "Auralis",
    description:
      "Virtual 3D healthcare assistant with emotion detection and natural voice interaction for telemedicine.",
    categories: ["featured", "ai-ml", "full-stack"],
    isHackathonWinner: true,
    techStack: ["React", "Three.js", "OpenAI", "WebRTC", "Node.js"],
    links: [
      { label: "Live Demo", href: "https://stop-googling-symptoms.tech", hideOnMobile: true },
      { label: "Devpost", href: "https://devpost.com/software/docai-evq74t" },
      { label: "GitHub", href: "https://github.com/rickytang666/auralis" },
    ],
    media: [
      { src: "/auralis_card.png", alt: "Auralis Project Overview" },
      { src: "/auralis-characters.jpg", alt: "Auralis 3D Characters" },
      { src: "/auralis-chat.jpg", alt: "Auralis Chat Interface" },
      { src: "/auralis-report.jpg", alt: "Auralis Health Report" },
      { src: "/auralis-summary.jpg", alt: "Auralis Summary View" },
    ],
  },
  {
    id: "stupidspotify",
    title: "Stupid Spotify",
    description:
      "Cursed Spotify clone featuring real OAuth playback, AI roasts, face CAPTCHA, 3D skull, and Comic Sans.",
    categories: ["featured", "full-stack", "games"],
    isHackathonWinner: true,
    techStack: ["Next.js", "React", "Spotify API", "Cohere AI", "Three.js", "face-api.js", "Python"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/stupid-spotify" },
    ],
    media: [
      { src: "/stupidspotify-dashboard.jpg", alt: "Stupid Spotify Dashboard" },
      { src: "/stupidspotify-captcha.jpg", alt: "Stupid Spotify Face CAPTCHA" },
    ],
  },
  {
    id: "oli",
    title: "Object-Love-Interface",
    description:
      "Multi-device IoT system that gives objects personality and voice—talk to your ramen bowl with Raspberry Pi and ESP32.",
    categories: ["featured", "hardware", "ai-ml"],
    isHackathonWinner: true,
    techStack: ["Python", "Node.js", "Raspberry Pi", "ESP32", "Gemini API", "ElevenLabs", "OpenCV"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/object-love-interface" },
    ],
    media: [
      { src: "/oli-open.jpg", alt: "OLI Device Open" },
      { src: "/oli-product.jpg", alt: "OLI Product Shot" },
    ],
  },
  {
    id: "lumen",
    title: "Lumen",
    description:
      "A calming companion that listens, understands, and responds with personalized mini-games tailored to your emotional state.",
    categories: ["featured", "ai-ml", "games"],
    isHackathonWinner: true,
    techStack: ["React", "Gemini API", "Phaser.js", "Node.js"],
    links: [
      { label: "Live Demo", href: "https://llumen.netlify.app/", hideOnMobile: true },
      { label: "Devpost", href: "https://devpost.com/software/lumen-qsgcn4" },
      { label: "GitHub", href: "https://github.com/Dawgsrlife/lumen" },
    ],
    media: [
      { src: "/lumen_card.png", alt: "Lumen Project" },
      { src: "/lumen-analytics.png", alt: "Lumen Analytics" },
      { src: "/lumen-game1.png", alt: "Lumen Mini Game" },
      { src: "/lumen-game2.png", alt: "Lumen Mini Game 2" },
    ],
  },
  {
    id: "eyecandy",
    title: "Eyecandy",
    description:
      "An AR shopping experience that turns any product photo into a virtual try-on using augmented reality.",
    categories: ["featured", "ai-ml", "full-stack"],
    isHackathonWinner: true,
    techStack: ["React", "AR.js", "TensorFlow", "Firebase"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/eye-candy" },
      { label: "GitHub", href: "https://github.com/Duck-luv-pie/eyecandy" },
    ],
    media: [
      { src: "/eyecandy_card.jpg", alt: "Eyecandy Project" },
      { src: "/eyecandy-demo.png", alt: "Eyecandy AR Demo" },
    ],
  },
  {
    id: "careerly",
    title: "Careerly",
    description:
      "Making career exploration fun and inclusive through an AI-powered virtual job fair built in Unity.",
    categories: ["featured", "ai-ml", "games"],
    isHackathonWinner: true,
    techStack: ["Unity", "C#", "OpenAI", "Firebase"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/career-fair-xz0f67" },
      { label: "GitHub", href: "https://github.com/she11fish/careerly" },
    ],
    media: [
      { src: "/careerly_card.jpg", alt: "Careerly Project" },
      { src: "/careerly-demo.jpg", alt: "Careerly Demo" },
      { src: "/careerly-professional.jpg", alt: "Careerly Professional View" },
    ],
  },
  // ── VR / Games / Hardware ──
  {
    id: "vrhtn",
    title: "VR ODM Gear Sim",
    description:
      "VR simulation of Attack on Titan's ODM Gear with custom Arduino glove controller and Google Cardboard.",
    categories: ["featured", "games", "hardware"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Google Cardboard SDK", "Arduino", "Blender"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/vr-omni-directional-movement-gear" },
    ],
    media: [
      { src: "/vrhtn-game.jpg", alt: "VR ODM Gear Gameplay" },
      { src: "/vrhtn-glove.jpg", alt: "Arduino Glove Controller" },
    ],
  },
  {
    id: "wasteland",
    title: "Wasteland",
    description:
      "Horror game with wearable glove controller using accelerometer, flex sensors, and heart rate input.",
    categories: ["featured", "games", "hardware"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Arduino", "C++", "Python", "Bluetooth"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/wasteland" },
    ],
    media: [
      { src: "/wasteland-game.jpg", alt: "Wasteland Gameplay" },
      { src: "/wasteland-hardware.jpg", alt: "Wasteland Wearable Glove" },
    ],
  },
  // ── Android / Full-Stack ──
  {
    id: "saferoute",
    title: "SafeRoute",
    description:
      "A real-time hazard reporting app with crowdsourced data, drone integration, and safe routing for Android.",
    categories: ["featured", "android", "full-stack"],
    isHackathonWinner: false,
    techStack: ["Kotlin", "Google Maps API", "Firebase", "Jetpack Compose"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/SafeRoute" },
    ],
    media: [
      { src: "/saferoute_card.png", alt: "SafeRoute Project" },
      { src: "/saferoute-user-flow.jpg", alt: "SafeRoute User Flow" },
    ],
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
    media: [
      { src: "/animarker_card.png", alt: "Animarker Overview" },
      { src: "/animarker-map.jpg", alt: "Animarker Map View" },
      { src: "/animarker-upload.jpg", alt: "Animarker Upload Screen" },
    ],
  },
  // ── Hardware ──
  {
    id: "flexfire-x",
    title: "FLEXFIRE-X",
    description:
      "A wrist-mounted projectile launcher controlled by EMG muscle signals for intuitive, body-driven activation.",
    categories: ["featured", "hardware"],
    isHackathonWinner: false,
    techStack: ["Arduino", "EMG Sensor", "C++", "3D Printing"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/FLEXFIRE-X" },
    ],
    media: [{ src: "/flexfire-x_card.png", alt: "FLEXFIRE-X Project" }],
  },
  {
    id: "rubber-band-turret",
    title: "Rubber Band Turret",
    description:
      "Bluetooth-controlled rubber band turret with smooth servo movement and wireless Android app control.",
    categories: ["hardware", "android"],
    isHackathonWinner: false,
    techStack: ["Arduino", "Bluetooth", "Servo Motors", "Kotlin"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Rubber-Band-Turret" },
    ],
    media: [
      { src: "/turret_card.png", alt: "Rubber Band Turret" },
      { src: "/turret.jpg", alt: "Rubber Band Turret Build" },
    ],
  },
  // ── Tools / Desktop ──
  {
    id: "glyph",
    title: "Glyph",
    description:
      "Leader-key command overlay for Windows with discoverable actions, per-app bindings, and custom themes.",
    categories: ["featured", "full-stack"],
    isHackathonWinner: false,
    techStack: ["C#", ".NET", "WPF", "YAML", "WinGet"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Glyph" },
    ],
    media: [{ src: "/glyph-logo.png", alt: "Glyph Logo", imageContain: true }],
    imageContain: true,
  },
  {
    id: "mealplan",
    title: "UWO Mealplan Calc",
    description:
      "Chrome extension for students to track meal plan spending and project remaining balances with budget recommendations.",
    categories: ["full-stack"],
    isHackathonWinner: false,
    techStack: ["JavaScript", "Chrome Extension API", "HTML", "CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/UWO-Mealplan-Calc" },
    ],
    media: [
      { src: "/mealplan-settings.png", alt: "Mealplan Settings View" },
      { src: "/mealplan-projections.png", alt: "Mealplan Projections" },
    ],
  },
  // ── AI/ML ──
  {
    id: "vitalsign",
    title: "VitalSign",
    description:
      "Real-time web app translating ASL gestures and facial expressions into emotion-aware speech for natural communication.",
    categories: ["featured", "ai-ml", "full-stack"],
    isHackathonWinner: false,
    techStack: ["Next.js", "React", "MediaPipe", "Cohere AI", "ElevenLabs", "face-api.js"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/vital-sign" },
    ],
    media: [
      { src: "/vitalsign-titlecard.jpg", alt: "VitalSign Title Card" },
      { src: "/vitalsign-demo.png", alt: "VitalSign Demo" },
    ],
  },
  {
    id: "whackaml",
    title: "Whack-A-ML",
    description:
      "Reinforcement learning agent training a robotic arm to strike targets in Unity using PPO and curriculum learning.",
    categories: ["ai-ml", "games"],
    isHackathonWinner: false,
    techStack: ["Unity", "ML-Agents", "C#", "PPO", "TensorBoard"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Whack-A-ML" },
    ],
    media: [{ src: "/whackaml-training.jpg", alt: "Whack-A-ML Training" }],
  },
  // ── Mobile Games ──
  {
    id: "nowandthen",
    title: "NowAndThen",
    description:
      "Geotagged memory map app for leaving comments, photos, and videos tied to locations with AI personality summaries.",
    categories: ["android", "full-stack", "ai-ml"],
    isHackathonWinner: false,
    techStack: ["React Native", "Node.js", "Express.js", "MongoDB", "Google Maps API"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/nowandthen" },
    ],
    media: [
      { src: "/nowandthen1.jpg", alt: "NowAndThen Map View" },
      { src: "/nowandthen2.jpg", alt: "NowAndThen Memory Feed" },
    ],
  },
  {
    id: "street-cleaner",
    title: "Street Cleaner",
    description: "Drag litter into the correct bin before time runs out! Award-winning mobile game.",
    categories: ["featured", "games", "android"],
    isHackathonWinner: true,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.StreetCleaner" },
      { label: "Devpost", href: "https://devpost.com/software/street-cleaner" },
    ],
    media: [{ src: "/street_cleaner_icon.png", alt: "Street Cleaner Icon", imageContain: true }],
    imageContain: true,
  },
  {
    id: "zenith-tower",
    title: "Zenith Tower",
    description: "Ascend an endless futuristic dungeon tower in this fast-paced mobile crawler.",
    categories: ["games", "android"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.ZenithTower" },
    ],
    media: [{ src: "/zenith_tower_icon.png", alt: "Zenith Tower Icon", imageContain: true }],
    imageContain: true,
  },
  {
    id: "motaru",
    title: "Mōtaru",
    description: "Take down ninjas using quick reflexes in this action mobile game.",
    categories: ["games", "android"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.Mtaru" },
    ],
    media: [{ src: "/motaru_icon.png", alt: "Mōtaru Icon", imageContain: true }],
    imageContain: true,
  },
  {
    id: "tic-tac-toe-ultimate",
    title: "Tic Tac Toe Ultimate",
    description: "The Ultimate Tic Tac Toe experience on Android.",
    categories: ["games", "android"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Google Play"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.NathanEspejo.TicTacToeUltimate" },
    ],
    media: [{ src: "/tttu_icon.png", alt: "Tic Tac Toe Ultimate Icon", imageContain: true }],
    imageContain: true,
  },
];

