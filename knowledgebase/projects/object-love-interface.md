# Object-Love-Interface (OLI)

## Overview
Multi-device IoT system that gives objects personality and voice so you can interact with them in an immersive, real-life setting.

## Category
Hardware, AI, IoT

## Status
Hackathon Winner - Best Useless Hack (CTRL+HACK+DEL 2.0)

## Tech Stack
- Python, Node.js, Express
- Raspberry Pi 3B
- ESP32
- Gemini API (personality generation)
- ElevenLabs (voice synthesis)
- M5 Stack (speaker)
- RODE Wireless Mic
- Servo motors
- 3D printed arm

## Description

OLI scans any object of your choice and creates a unique personality. This persona is projected into a physical "dinner date" model, allowing you to chat with them in an immersive, real-life setting.

### Inspiration

We wanted to create something with a physical form that gives AI interaction a soul or something people can place sentimental value on. We decided on creating a machine for people with social anxiety to practice dating.

### System Architecture

**Voice & Display (Raspberry Pi 3B):**
- Gemini API creates persona from image taken by Logitech camera
- ElevenLabs generates realistic voice
- RODE Wireless mic system for enhanced voice input
- M5 Stack as speaker

**Movement System (ESP32):**
- Controlled by Raspberry Pi through UART (USB Serial)
- Connected to servo for mechanical movement
- Optionally RGB backlit display
- Custom 3D printed arm attached to SenseCap Indicator D1 for dynamic screen movement

**Power:**
- Raspberry Pi and ESP32 powered by 5V portable power supply
- Connected to power bank
- Servo powered independently

### Key Features

1. **Object Scanning**
   - Camera captures image of chosen object
   - Gemini API generates unique personality based on object

2. **Voice Interaction**
   - Realistic voice synthesis via ElevenLabs
   - Natural conversation flow
   - Wireless microphone for clear input

3. **Physical Movement**
   - Servo-controlled arm makes the screen dynamic
   - 3D printed mechanical components
   - Creates sense of liveliness

4. **Immersive Experience**
   - Complete dinner date simulation
   - Physical object with personality
   - Interactive conversation

### Challenges

- **Backend Integration**: Routing ElevenLabs voice to M5 module over WiFi
- **Design Balance**: Reducing buttons while maintaining intuitive UX
- **Hardware Coordination**: Synchronizing multiple devices (Pi, ESP32, servos, displays)

### Accomplishments

- Fully interactive, voice-driven romantic simulation
- Dynamic "interest scoring" system that evolves during conversation
- Smooth synchronization between AI responses and servo movement
- Custom 3D printed arm designed within time limit

## Why It Matters
- Demonstrates multi-device IoT integration
- Shows AI personality generation
- Evidence of rapid hardware prototyping
- Creative application of technology for social good

## Links
- Devpost: https://devpost.com/software/object-love-interface
- GitHub: https://github.com/HasNate618/Object-Love-Interface

## Media
- Device Open
- Product Shot

---

*This project showcases IoT integration, AI personality generation, and creative hardware design. It's great for demonstrating ability to connect multiple technologies into a cohesive experience.*
