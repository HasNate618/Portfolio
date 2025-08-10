# Nathan Espejo - Portfolio

A modern, responsive portfolio website showcasing my projects, mobile games, and technical expertise. Built with Next.js 15 and optimized for performance and mobile experience.

🌐 **Live Site**: [Portfolio Website](https://nathan-espejo.vercel.app/)

## ✨ Features

- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **Interactive Navigation**: Floating navigation bar with smooth scrolling to sections
- **Typewriter Animation**: Dynamic title rotation with mobile/desktop variants
- **Project Showcase**: Grid layout featuring web development and hardware projects
- **Mobile Games Gallery**: Dedicated section for published Android games with Google Play Store links
- **Resume Download**: Convenient download buttons for both desktop and mobile users
- **Modern UI**: VS Code-inspired dark theme with Tailwind CSS styling
- **Performance Optimized**: Next.js Image components with automatic optimization
- **Deployment Ready**: ESLint compliant and optimized for Vercel hosting

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Styling**: Tailwind CSS with custom responsive design
- **Language**: JavaScript (ES6+)
- **Images**: Next.js Image optimization
- **Deployment**: Vercel with automatic GitHub integration
- **Version Control**: Git/GitHub

## 📱 Sections

### Projects
- **Lumen**: Award-winning hackathon project for social connection
- **Careerly**: AI-powered virtual job fair platform
- **SafeRoute**: Real-time hazard reporting Android app
- **Animarker**: Wildlife tracking with computer vision
- **FLEXFIRE-X**: Cyberpunk-inspired wearable projectile launcher
- **Rubber Band Turret**: Bluetooth-controlled hardware project

### Mobile Games
- **Street Cleaner**: 🥇 Hackathon-winning environmental game
- **Zenith Tower**: Futuristic dungeon crawler
- **Mōtaru**: Fast-paced ninja action game
- **Tic Tac Toe Ultimate**: Enhanced classic game experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HasNate618/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio

### Development

- The main page component is located in `src/app/page.js`
- Global styles are in `src/app/globals.css`
- Static assets (images, resume) are in the `public/` directory
- The page auto-updates as you edit files during development

## 📦 Project Structure

```
portfolio/
├── src/
│   └── app/
│       ├── page.js          # Main portfolio component
│       ├── layout.js        # Root layout with metadata
│       └── globals.css      # Global styles and Tailwind imports
├── public/                  # Static assets
│   ├── *.png               # Project images and app icons
│   ├── *.jpg               # Project screenshots
│   └── resume.pdf          # Downloadable resume
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design Features

- **Color Scheme**: Dark theme with blue accents (`#3b82f6`)
- **Typography**: System fonts with proper spacing and hierarchy
- **Animations**: Smooth hover effects and typewriter animations
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Icons**: Emoji and Unicode symbols for visual elements
- **Images**: Optimized with Next.js Image component for performance

## 🔧 Build & Deployment

### Local Build
```bash
npm run build
npm run start
```

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Next.js and configures build settings
3. Each push to the main branch triggers automatic deployment
4. Build includes ESLint validation and image optimization

### Build Optimization
- **ESLint**: Enforces code quality and Next.js best practices
- **Image Optimization**: Automatic WebP conversion and responsive sizing
- **Bundle Analysis**: Tree shaking and code splitting for optimal loading
- **Performance**: Lighthouse score optimization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

- **Portfolio**: [Live Website](https://nathan-espejo.vercel.app/)
- **GitHub**: [@HasNate618](https://github.com/HasNate618)
- **LinkedIn**: [Nathan Espejo](https://linkedin.com/in/nathan-espejo)
- **Email**: Available in resume download

---

Built with ❤️ using Next.js and deployed on Vercel
