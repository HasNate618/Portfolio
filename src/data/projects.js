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
    id: "local-ai-platform",
    title: "Local AI Platform",
    description:
      "Fully dockerized local-first AI platform with secure remote access, model routing, MCP tools, and course-specific knowledge bases for grounded study and development workflows.",
    categories: ["featured", "ai-ml"],
    isHackathonWinner: false,
    techStack: [
      "Docker",
      "Linux",
      "Tailscale",
      "Open WebUI",
      "Bifrost",
      "SearXNG",
      "Crawl4AI",
      "ComfyUI",
      "MCP Servers",
      "llama.cpp",
    ],
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7446904789528907776/?originTrackingId=aay5ezDGpg8h3gQTTeC4lQ%3D%3D",
      },
    ],
    media: [
      { src: "/localai-pipeline.png", alt: "Local AI Platform System Pipeline" },
      { src: "/localai-parsing-pipeline.png", alt: "Local AI Parsing Pipeline" },
      { src: "/localai-chat-sequence.png", alt: "Local AI Chat Sequence Diagram" },
    ],
  },
  {
    id: "carebridge",
    title: "CareBridge",
    description:
      "AI healthcare platform connecting rural patients and providers with intelligent check-ins and risk tracking.",
    categories: [ "ai-ml", "full-stack"],
    isHackathonWinner: true,
    techStack: ["React", "TypeScript", "FastAPI", "Supabase", "Cohere API", "ElevenLabs", "Vite", "Three.js"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/care-bridge-ai" },
      { label: "GitHub", href: "https://github.com/liamma06/Spark" },
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
    techStack: ["React", "Three.js", "Gemini API", "Node.js", "face-api.js", "Python"],
    links: [
      { label: "Live Demo", href: "https://stop-googling-symptoms.tech", hideOnMobile: true },
      { label: "Devpost", href: "https://devpost.com/software/docai-evq74t" },
      { label: "GitHub", href: "https://github.com/rickytang666/auralis" },
    ],
    media: [
      { src: "/auralis_card.png", alt: "Auralis Project Overview" },
      { src: "/auralis-characters.jpg", alt: "Auralis 3D Characters" },
      { src: "/auralis-chat.jpg", alt: "Auralis Chat Interface" },
      { src: "/auralis-summary.jpg", alt: "Auralis Summary View" },
      { src: "/auralis-report.jpg", alt: "Auralis Health Report" },
    ],
  },
  {
    id: "whackaml",
    title: "Whack-A-ML",
    description:
      "Reinforcement learning agent training a robotic arm to strike targets in Unity using PPO and curriculum learning.",
    categories: ["featured", "ai-ml", "games"],
    isHackathonWinner: false,
    techStack: ["Pytorch", "Unity", "C#", "PPO"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Whack-A-ML" },
    ],
    media: [{ src: "/whackaml-training.jpg", alt: "Whack-A-ML Training" }],
  },
  {
    id: "flexfire-x",
    title: "FLEXFIRE-X",
    description:
      "A wrist-mounted projectile launcher controlled by EMG muscle signals for intuitive, body-driven activation.",
    categories: ["featured", "hardware"],
    isHackathonWinner: false,
    techStack: ["Arduino", "EMG Sensor", "C++", "CAD", "3D Printing"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/FLEXFIRE-X" },
    ],
    media: [
      { src: "/flexfire-demorender.gif", alt: "FLEXFIRE-X Demo Render" },
      { src: "/flexfire-demo.png", alt: "FLEXFIRE-X Demo" },
      { src: "/flexfire-exploded.png", alt: "FLEXFIRE-X Exploded View" },
      { src: "/flexfire-launcher.gif", alt: "FLEXFIRE-X Launcher" },
    ],
  },
  {
    id: "cyberdeck",
    title: "Cyberdeck (WIP)",
    description:
      "Custom handheld Linux cyberdeck built around a Raspberry Pi 3B with a terminal-first boot flow, modular hardware, and a custom 3D-printed case.",
    categories: ["featured", "hardware"],
    isHackathonWinner: false,
    techStack: ["Raspberry Pi", "Linux", "Bash", "PlatformIO", "Blender"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/cyberdeck" },
    ],
    media: [
      { src: "/cyberdeck-wip1.jpg", alt: "Cyberdeck Work-in-Progress Build" },
      { src: "/cyberdeck-cad.png", alt: "Cyberdeck CAD Render" },
    ],
  },
  {
    id: "oli",
    title: "Object-Love-Interface",
    description:
      "Multi-device IoT system that gives objects personality and voice so you can finally get a date with your ramen bowl.",
    categories: ["featured", "hardware", "ai-ml"],
    isHackathonWinner: true,
    techStack: ["Python", "Node.js", "Raspberry Pi", "ESP32", "Gemini API", "ElevenLabs"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/object-love-interface" },
      { label: "GitHub", href: "https://github.com/HasNate618/Object-Love-Interface" },
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
    categories: ["ai-ml", "games"],
    isHackathonWinner: true,
    techStack: ["React", "Unity3D", "Gemini API", "Phaser.js", "Node.js"],
    links: [
      { label: "Live Demo", href: "https://llumen.netlify.app/", hideOnMobile: true },
      { label: "Devpost", href: "https://devpost.com/software/lumen-qsgcn4" },
      { label: "GitHub", href: "https://github.com/Dawgsrlife/lumen" },
    ],
    media: [
      { src: "/lumen_card.png", alt: "Lumen Project" },
      { src: "/lumen-game1.png", alt: "Lumen Mini Game" },
      { src: "/lumen-analytics.png", alt: "Lumen Analytics" },
      { src: "/lumen-game2.png", alt: "Lumen Mini Game 2" },
    ],
  },
  {
    id: "eyecandy",
    title: "Eyecandy",
    description:
      "An AR shopping experience that turns any shopify product into a virtual try-on using augmented reality.",
    categories: ["featured", "ai-ml", "games"],
    isHackathonWinner: true,
    techStack: ["Snap Spectacles", "Lens Studio", "Shopify API"],
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
    media: [
      { src: "/glyph-logo.png", alt: "Glyph Logo", imageContain: true },
      { src: "/glyph-keymaps.png", alt: "Glyph App Keymap" },
      { src: "/glyph-overlay.png", alt: "Glyph App Overlay" },
      { src: "/glyph-settings.png", alt: "Glyph Settings" },
    ],
    imageContain: true,
  },
  {
    id: "careerly",
    title: "Careerly",
    description:
      "Making career exploration fun and inclusive through an AI-powered virtual job fair built in Unity.",
    categories: ["ai-ml", "games"],
    isHackathonWinner: true,
    techStack: ["Unity", "C#", "Cohere API"],
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
  {
    id: "dataquest26",
    title: "Gaming & Mental Health Analyzer",
    description:
      "ML system that predicts mental wellbeing risks across sleep, productivity, social isolation, dysregulation, and emotional problems based on gaming habits.",
    categories: ["featured", "ai-ml"],
    isHackathonWinner: false,
    techStack: ["scikit-learn", "Jupyter Notebook", "Python", "Kaggle", "pandas"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Dataquest26" },
    ],
    media: [
      { src: "/webapp-results.png", alt: "Gaming & Mental Health Results Dashboard" },
      { src: "/model-training.png", alt: "Model Training & Performance Metrics" },
      { src: "/model-comparison.png", alt: "ML Model Comparison" },
    ],
  },
  {
    id: "agenticarmy",
    title: "AgenticArmy",
    description:
      "Human-in-the-loop multi-agent coding workflow with a VS Code extension and FastAPI backend for planning, coordination, conflict analysis, and QA.",
    categories: ["featured", "ai-ml", "full-stack"],
    isHackathonWinner: false,
    techStack: ["TypeScript", "JavaScript", "Python", "FastAPI", "VS Code Extension"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/agenticarmy?ref_content=my-projects-tab&ref_feature=my_projects" },
      { label: "GitHub", href: "https://github.com/HasNate618/genai-genesis-2026" },
    ],
    media: [
      { src: "/agenticarmy-titlecard.png", alt: "AgenticArmy Title Card" },
      { src: "/agenticarmy-overview.png", alt: "AgenticArmy Workflow Overview" },
      { src: "/agenticarmy-agents.png", alt: "AgenticArmy Multi-Agent View" },
    ],
  },
  // ── VR / Games / Hardware ──
  {
    id: "vrhtn",
    title: "VR ODM Gear Sim",
    description:
      "VR simulation of Attack on Titan's ODM Gear with custom Arduino glove controller and Google Cardboard.",
    categories: ["games", "hardware"],
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
    categories: ["games", "hardware"],
    isHackathonWinner: false,
    techStack: ["Unity", "C#", "Arduino", "C++"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/wasteland" },
      { label: "GitHub", href: "https://github.com/HasNate618/Wasteland" },
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
    categories: ["android", "full-stack"],
    isHackathonWinner: false,
    techStack: ["Kotlin", "Google Maps API", "Android Studio"],
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
    categories: ["android", "ai-ml"],
    isHackathonWinner: false,
    techStack: ["Kotlin", "TensorFlow", "Google Maps API", "MySQL", "Android Studio"],
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
    id: "rubber-band-turret",
    title: "Rubber Band Turret",
    description:
      "Bluetooth-controlled rubber band turret with smooth servo movement and wireless Android app control.",
    categories: ["hardware", "android"],
    isHackathonWinner: false,
    techStack: ["Arduino", "C++", "Servo Motors", "Unity"],
    links: [
      { label: "GitHub", href: "https://github.com/HasNate618/Rubber-Band-Turret" },
    ],
    media: [
      { src: "/turret.jpg", alt: "Rubber Band Turret Build" },
      { src: "/turret_card.png", alt: "Rubber Band Turret" },
    ],
  },
  // ── Tools / Desktop ──
  {
    id: "mealplan",
    title: "UWO Mealplan Calc",
    description:
      "Chrome extension for students to track meal plan spending and project remaining balances with budget recommendations.",
    categories: ["full-stack"],
    isHackathonWinner: false,
    techStack: ["JavaScript", "Chrome Extension API", "HTML", "CSS"],
    links: [
      { label: "Chrome Web Store", href: "https://chromewebstore.google.com/detail/uwo-mealplan-calc/ligfhpfnfnmkmoloelfpcjpeajifkmpo" },
      { label: "GitHub", href: "https://github.com/HasNate618/UWO-Mealplan-Calculator" },
    ],
    media: [
      { src: "/mealplan-settings.png", alt: "Mealplan Settings View" },
      { src: "/mealplan-projections.png", alt: "Mealplan Projections" },
    ],
  },
  {
    id: "stupidspotify",
    title: "Stupid Spotify",
    description:
      "Cursed Spotify clone featuring real OAuth playback, AI roasts, face CAPTCHA, 3D skull, and Comic Sans.",
    categories: ["ai-ml", "full-stack"],
    isHackathonWinner: true,
    techStack: ["Next.js", "React", "Spotify API", "Cohere API", "Three.js", "face-api.js", "Python"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/stupid-spotify" },
      { label: "GitHub", href: "https://github.com/HasNate618/stupid-spotify" },
    ],
    media: [
      { src: "/stupidspotify-dashboard.jpg", alt: "Stupid Spotify Dashboard" },
      { src: "/stupidspotify-captcha.jpg", alt: "Stupid Spotify Face CAPTCHA" },
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
    techStack: ["React", "MediaPipe", "Gemini API", "ElevenLabs", "face-api.js"],
    links: [
      { label: "Live Demo", href: "https://www.sure-heres-a-list-of-funny-domain-names-you-can-get-using.tech/", hideOnMobile: true },
      { label: "Devpost", href: "https://devpost.com/software/vital-sign" },
      { label: "GitHub", href: "https://github.com/liamma06/VitalSign" },
    ],
    media: [
      { src: "/vitalsign-titlecard.jpg", alt: "VitalSign Title Card" },
      { src: "/vitalsign-demo.png", alt: "VitalSign Demo" },
    ],
  },
  {
    id: "nowandthen",
    title: "NowAndThen",
    description:
      "Geotagged memory map app for leaving comments, photos, and videos tied to locations with AI personality summaries.",
    categories: ["full-stack", "ai-ml"],
    isHackathonWinner: false,
    techStack: ["React Native", "Expo Go", "MongoDB", "Google Maps API"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/now-then" },
      { label: "GitHub", href: "https://github.com/vichekaoeun/uofthacks13" },
    ],
    media: [
      { src: "/nowandthen1.jpg", alt: "NowAndThen Map View" },
      { src: "/nowandthen2.jpg", alt: "NowAndThen Memory Feed" },
    ],
  },
  // ── Mobile Games ──
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
      { label: "GitHub", href: "https://github.com/HasNate618/Street-Cleaner-Game" },
    ],
    media: [
      { src: "/streetcleaner-guide.png", alt: "Street Cleaner How To Play" },
      { src: "/streetcleaner-demo.png", alt: "Street Cleaner Gameplay" },
      { src: "/streetcleaner-results.png", alt: "Street Cleaner Results Screen" },
    ],
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
    media: [
      { src: "/zenithtower-wipdemo.jpg", alt: "Zenith Tower Gameplay" },
    ],
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
    media: [
      { src: "/motaru-customization.png", alt: "Mōtaru Character Customization" },
      { src: "/motaru-game.png", alt: "Mōtaru Gameplay" },
      { src: "/motaru-game2.png", alt: "Mōtaru Second Level" },
    ],
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
    media: [
      { src: "/tictactoe-game.png", alt: "Tic Tac Toe Ultimate Gameplay" },
      { src: "/tictactoe-end.png", alt: "Tic Tac Toe Ultimate Win Screen" },
    ],
  },
];
