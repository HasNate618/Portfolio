# VitalSign

## Overview
Real-time web app translating ASL gestures and facial expressions into emotion-aware speech for natural communication.

## Category
AI, Full-Stack, Accessibility, Computer Vision

## Status
Featured Portfolio Project

## Tech Stack
- Next.js 15, React 19
- MediaPipe (hand tracking, gesture recognition)
- Google Gemini API (text refinement)
- ElevenLabs (emotion-aware TTS)
- face-api.js (emotion detection)
- Vercel (deployment)

## Description

VitalSign is an AI-powered bridge between sign language and speech that doesn't just translate what you say, but how you feel. It helps Deaf and non-verbal users communicate more naturally in situations where interpreters aren't available.

### Inspiration

Many accessibility tools focus on word translation and miss emotional context. VitalSign preserves both meaning and emotion, helping Deaf and non-verbal users communicate more naturally.

### What It Does

1. **Real-time ASL Translation**
   - Users sign in front of webcam
   - System detects gestures using MediaPipe
   - Converts to text in real-time

2. **Emotion Detection**
   - face-api.js analyzes facial expressions
   - Detects emotional state alongside signs
   - Provides context for more natural communication

3. **AI Text Refinement**
   - Cohere AI refines detected gestures into natural sentences
   - Fixes grammar and adds context
   - Makes communication more fluid

4. **Emotion-Aware Speech**
   - ElevenLabs converts text to speech
   - Adjusts voice tone based on detected emotions
   - Preserves emotional nuance in spoken output

5. **Web-Based Solution**
   - No special hardware required
   - Just a browser and webcam
   - Accessible from any device

### Architecture

- **Frontend**: Next.js with React, real-time video processing
- **Computer Vision**: MediaPipe for hand tracking, face-api.js for emotions
- **AI Layer**: Gemini for text refinement, ElevenLabs for voice
- **Deployment**: Vercel for global access

### Challenges

- **Real-time Performance**: Processing video, gesture recognition, emotion detection, and API calls simultaneously
- **Gesture Accuracy**: Ensuring recognition across different lighting and camera angles
- **API Integration**: Managing multiple APIs with proper error handling and fallbacks
- **Latency vs Quality**: Balancing speed with translation accuracy

### Accomplishments

- Complete end-to-end pipeline in 24 hours
- Emotion-aware synthesis adjusting voice tone
- Web-based solution requiring no special hardware
- Real-time performance suitable for live conversations
- Intuitive UI with voice selection and volume controls

### What We Learned

- Combining multiple AI technologies (CV, NLP, TTS) into cohesive solution
- Structuring Next.js API routes for secure third-party integration
- Accessibility considerations beyond basic functionality
- Real-time video processing challenges
- Managing multiple async operations in React

## Why It Matters
- Strong accessibility focus
- Demonstrates multi-modal AI integration
- Shows empathy-driven design
- Evidence of rapid prototyping skills
- Practical solution for real communication barriers

## Links
- Live Demo: https://www.sure-heres-a-list-of-funny-domain-names-you-can-get-using.tech/
- Devpost: https://devpost.com/software/vital-sign
- GitHub: https://github.com/liamma06/VitalSign

## Media
- Title Card
- Demo Screenshot

---

*This project is exceptional for accessibility, AI, and social impact roles. It demonstrates the ability to create technology that genuinely helps people communicate.*
