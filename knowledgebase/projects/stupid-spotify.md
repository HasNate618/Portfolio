# Stupid Spotify

## Overview
A cursed Spotify clone with an intentional terrible early 2000s aesthetic. Features an AI chatbot that gaslights you about your music choices and plays random songs instead of the ones you click.

## Category
AI, Full-Stack, Web, Creative/Fun

## Status
Hackathon Winner (Stupid Hackathon @ Western)

## Tech Stack
- Next.js 16.0.3
- React 18.3.1
- TypeScript
- Spotify Web API + Web Playback SDK
- Cohere AI (command-r-08-2024)
- Python + BeautifulSoup4
- Three.js + @react-three/fiber
- face-api.js + react-webcam
- Tailwind CSS 4

## Description

"What if Spotify was built by a time traveler from 2003 who only knew Comic Sans and lies?"

Built in 5 chaotic hours for a hackathon where stupidity was the judging criteria.

### Features

1. **Real Spotify Playback**
   - Actual Spotify integration using OAuth 2.0
   - Web Playback SDK
   - Click random song button → plays ACTUAL music from cringe playlist
   - Full playback controls
   - Requires Spotify Premium

2. **AI Chatbot That Gaslights You**
   - Powered by Cohere AI
   - Temperature set to 1.2 for MAXIMUM UNHINGED ENERGY
   - 18 different skibidi toilet jokes programmed in
   - Will tell you your music taste is "mid" and "not bussin fr fr"

3. **Stupid Face Matching CAPTCHA**
   - Uses webcam and face detection (face-api.js)
   - Match your face to stupid meme images
   - Can't proceed without matching
   - Dumbest security ever

4. **Spinning 3D Skull Background**
   - Implemented with Three.js
   - Rotating 3D skull model
   - Neon pink glow

5. **Billboard Hot 100 (But Make It Stupid)**
   - Scraped real Billboard chart data with Python
   - Click a song → plays DIFFERENT random song
   - Missing data replaced with "Lil Yeet" and "DJ Skibidi"

6. **Early 2000s Aesthetic**
   - Comic Sans MS everywhere
   - Neon lime green, hot pink, cyan colors
   - 3D borders on everything
   - Slanted buttons with CSS transforms
   - Marquee scrolling text
   - Random floating sticker images
   - Eye-hurting background patterns

### Build Process (5 Hours of Chaos)

**Hour 1**: Set up Next.js, scraped Billboard data, made ugliest UI possible
**Hour 2**: Added Cohere AI chatbot, programmed gaslighting responses
**Hour 3**: Implemented 3D skull with Three.js
**Hour 4**: Built complete OAuth 2.0 flow, Web Playback SDK integration
**Hour 5**: Made everything stupider with CSS transforms, face CAPTCHA, neon glows

### Challenges

- Three.js breaking with React 19 (downgraded to 18)
- OAuth localhost vs 127.0.0.1 cookie issues
- Token persistence with httpOnly cookies
- CSS chaos management

## Why It Matters
- Demonstrates rapid prototyping under pressure
- Shows OAuth and API integration skills
- Evidence of creative problem-solving
- Full-stack capabilities under extreme time constraints

## Links
- Devpost: https://devpost.com/software/stupid-spotify
- GitHub: https://github.com/HasNate618/stupid-spotify
- Live Demo: stupid-spotify-sigma.vercel.app

## Media
- Dashboard Screenshot
- Face CAPTCHA Screenshot

---

*This project is great for demonstrating rapid prototyping, API integration, and creative development. It shows ability to ship complete full-stack applications in hours.*
