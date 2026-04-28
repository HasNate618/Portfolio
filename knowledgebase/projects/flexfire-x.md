# FLEXFIRE-X

## Overview
A wearable, servo-powered arm attachment that extends and fires a spring-loaded projectile using EMG muscle signals—built to mimic the immersive cyberware experience of Cyberpunk 2077.

## Category
Hardware, Embedded Systems, CAD, 3D Printing

## Status
Featured Portfolio Project

## Tech Stack
- Arduino Nano RP2040 Connect
- EMG Sensor
- SG90 Servo Motor
- Continuous Servo
- C++
- Blender (3D design)
- 3D Printing (PLA)

## Description

FLEXFIRE-X is a bio-integrated device that mounts on the user's forearm and responds to intuitive muscle movements, inspired by the Projectile Launch System from Cyberpunk 2077.

### How It Works

**Gesture Control:**
- Wrist rotation (palm down) → Barrel extends
- Forearm flexion → Projectile fires

**EMG Signal Detection:**
- Electrodes placed over the flexor carpi radialis muscle
- Muscle signals filtered via moving average for stable results
- Three flexion states:
  - Low Flexion (<50) → Barrel stays retracted
  - Medium Flexion (>50) → Barrel extends
  - High Flexion (>500) → Projectile is launched

### 3D Design

- Nine 3D printed components designed in Blender
- Printed in PLA
- Custom designed rack and pinion gear system
- Mounting bracket for forearm attachment

### Launching Mechanism

1. Rocket inserted into barrel with fins aligning to internal grooves
2. Spring compresses as rocket is pushed in
3. Servo rotates locking rod, holding rocket under tension
4. Servo rotates back, disengaging lock
5. Spring decompresses, launching projectile forward

### Components

| Component | Purpose |
|---|---|
| Arduino Nano RP2040 Connect | Main microcontroller |
| EMG Sensor | Muscle signal detection |
| SG90 Servo Motor | Projectile launch trigger |
| Continuous Servo | Barrel extension/retraction |
| Pen Springs | Launches the projectile |
| 5V Red Laser | Aim assistance |
| 9V Batteries | On-body power management |

### Challenges

- Designing barrel with notches that hold rubber bands securely while allowing easy release
- Smooth servo interpolation (servos rotate "instantly" to target position by default)
- Balancing mechanical design with electronics integration
- Power management for on-body operation

### Accomplishments

- First time designing a functional mechanism
- Learned servo programming and smooth interpolation
- Successful EMG signal integration with mechanical actuation
- Created a sci-fi inspired device that actually works

## Why It Matters
- Strong hardware and prototyping evidence
- Demonstrates EMG sensor integration
- Shows mechanical design and 3D printing skills
- Evidence of building sci-fi concepts into reality

## Links
- GitHub: https://github.com/HasNate618/FLEXFIRE-X
- Video Demo: https://youtube.com/shorts/VqzTay1VbeE

## Media
- Demo Render GIF
- Demo Photo
- Exploded View
- Launcher GIF

---

*This project is excellent evidence for hardware roles, mechatronics, or any position requiring physical prototyping skills. It demonstrates the full pipeline from concept to functional prototype.*
