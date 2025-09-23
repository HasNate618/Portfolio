# Nathan Espejo - Interactive Portfolio

A cutting-edge, cyberpunk-themed portfolio website featuring interactive 3D elements, Unity WebGL game integration, and responsive design. Built with Next.js and modern web technologies.

## ✨ Features

### 🎮 Interactive 3D Experience
- **3D Robot Companion**: Interactive robot model with robotic speech patterns and personality
- **Unity WebGL Integration**: Drag-and-drop the robot into a portal to launch an integrated Unity game
- **Dynamic URL Management**: Game state tracking through URL parameters for seamless navigation

### 🎨 Cyberpunk Aesthetic
- **Glitch Effects**: Custom CSS animations with cyberpunk-style text distortions
- **Neon Color Scheme**: Purple and green neon accents throughout the interface
- **Responsive Design**: Optimized for both desktop and mobile devices

### 📱 Mobile Optimization
- **Adaptive Navigation**: Clean, simplified header for mobile devices
- **Content Hiding**: Strategic hiding of interactive elements on smaller screens
- **Touch-Friendly**: Optimized interactions for touch devices

### 🔧 Technical Highlights
- **Next.js 15**: Latest Next.js framework with App Router
- **React Three Fiber**: 3D graphics and animations
- **Three.js**: Advanced 3D model loading and manipulation
- **Tailwind CSS 4**: Modern styling with custom cyberpunk theme
- **Vercel Analytics**: Performance and user interaction tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HasNate618/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
portfolio/
├── public/
│   ├── models/                 # 3D model files
│   │   └── model.glb          # Robot 3D model
│   ├── unity/                 # Unity WebGL build
│   │   └── build/             # Unity game files
│   └── [images]               # Project screenshots and icons
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles with cyberpunk theme
│   │   ├── layout.js          # Root layout component
│   │   └── page.js            # Main portfolio page
│   └── components/
│       ├── ThreeModel.js      # 3D robot component
│       └── UnityEmbed.js      # Unity game integration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎯 Key Components

### ThreeModel.js
Interactive 3D robot companion that:
- Responds to user interactions with robotic speech
- Can be dragged and dropped into the Unity portal
- Features smooth animations and model loading

### UnityEmbed.js
Unity WebGL game integration that:
- Loads Unity game seamlessly within the portfolio
- Handles game state management
- Provides clean loading transitions

### Main Portfolio (page.js)
Central hub featuring:
- Typewriter animation for developer titles
- Project showcase with cyberpunk styling
- Dynamic navigation and responsive layout
- Portal system for Unity game integration

## 🎨 Customization

### Color Scheme
The cyberpunk theme uses CSS custom properties that can be easily modified in `globals.css`:
- Primary: Purple/violet tones
- Accent: Neon green highlights
- Background: Dark grays with transparency

### 3D Model
Replace the robot model by updating `public/models/model.glb` with your own GLTF/GLB file.

### Unity Game
Replace the Unity WebGL build in `public/unity/build/` with your own Unity export.

## 📱 Responsive Features

- **Desktop**: Full interactive experience with 3D models and Unity integration
- **Mobile**: Streamlined interface with hidden complex interactions
- **Tablet**: Balanced experience optimized for touch interactions

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js framework
3. Deploy with default settings

Alternatively, build and deploy to any static hosting provider:
```bash
npm run build
npm run start
```

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 15 with React 19
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Styling**: Tailwind CSS 4 with custom cyberpunk theme
- **Game Integration**: Unity WebGL
- **Analytics**: Vercel Analytics
- **Development**: ESLint, PostCSS

## 📈 Performance

- Optimized 3D model loading with compression
- Lazy loading for Unity WebGL content
- Responsive images and assets
- Minimal bundle size with code splitting

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for portfolio purposes. Feel free to use it as inspiration for your own portfolio!