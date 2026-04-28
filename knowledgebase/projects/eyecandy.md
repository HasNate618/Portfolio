# Eyecandy

## Overview
An AR shopping experience that turns Shopify products into virtual try-on using augmented reality.

## Category
AR, AI, Shopping, Full-Stack

## Status
Hackathon Winner - Snap Spectacles AR Runner Up Prize (Hack the North 2025)

## Tech Stack
- Snap Spectacles
- Lens Studio
- Shopify API
- TypeScript
- Express/FastAPI backend
- Gemini API

## Description

Eyecandy reimagines online shopping by blending commerce and augmented reality. Users can look at a Shopify product image and instantly see themselves wearing it in AR.

### Key Features

1. **AR Try-On**
   - Instant virtual try-on of products
   - First-person and third-person camera toggles
   - Hands-free interaction via voice commands

2. **Product Pipeline**
   - Shopify Storefront API integration
   - OAuth connection to fetch products
   - Normalized data through backend

3. **3D Conversion**
   - Single-image 3D reconstruction
   - Background removal from product images
   - GLB mesh generation via Snap3D API
   - Mesh optimization (<15k triangles)

4. **AR Anchoring**
   - Upper Body Tracking 3D for attaching products
   - Face mesh for glasses
   - Torso joints for jackets and accessories
   - Voice ML for hands-free browsing

### Architecture

**Data Pipeline:**
1. Free Shopify development store with OAuth
2. Backend normalizes product data
3. Returns JSON with title, imageUrl, generated glbUrl

**2D → 3D Conversion:**
1. Segment product images to remove backgrounds
2. Run through single-view reconstruction model
3. Produce GLB meshes
4. Decimate and compress for real-time rendering

**AR Integration:**
1. Import meshes into Lens Studio
2. Anchor to body tracking points
3. Enable speech recognition
4. Add camera toggles

### Challenges

- **Data Access**: Initially tried scraping Shopify (unreliable, against ToS). Learned to use Storefront API
- **3D Quality**: Generating wearable meshes from single image was difficult
- **Performance**: Balancing mesh detail with Spectacles performance
- **Anchoring Fit**: Aligning accessories to body trackers required manual tuning

### What We Learned

- AR anchoring and body tracking
- Value of official APIs over scraping
- Single-image 3D reconstruction techniques
- Hands-free interaction design

## Why It Matters
- Demonstrates AR/VR development
- Shows e-commerce integration
- Evidence of rapid prototyping with emerging tech
- Strong example of spatial computing

## Links
- Devpost: https://devpost.com/software/eye-candy
- GitHub: https://github.com/Duck-luv-pie/eyecandy

## Media
- Project Card
- AR Demo

---

*This project is strong for AR/VR, e-commerce, and product prototyping roles. It shows ability to work with emerging hardware like Snap Spectacles.*
