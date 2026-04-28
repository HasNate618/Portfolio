# CareBridge

## Overview
AI healthcare platform connecting rural patients and providers with intelligent check-ins and risk tracking.

## Category
AI, Full-Stack, Healthcare

## Status
Hackathon Winner - Overall 3rd Place (Spark Hackathon)

## Tech Stack
- React 19, TypeScript, Vite
- FastAPI
- Supabase (database + auth)
- Cohere API (conversational AI)
- ElevenLabs (voice)
- Tailwind CSS
- Zustand (state management)

## Description

CareBridge AI is a healthcare coordination platform designed for rural communities, inspired by real consequences of broken care coordination.

### Inspiration

A winter storm that cut off access to a regional hospital exposed ongoing problems: missed referrals, fragmented communication, and lack of systematic follow-up escalating into preventable emergencies. We wanted to build a solution that actively closes the loop on care.

### What It Does

**For Patients:**
- AI-powered care companion for health check-ins and symptom reporting
- Conversational interactions that generate structured health summaries
- Low-friction, private way to report concerns without travel
- Ongoing engagement supporting follow-up rather than one-off interactions

**For Providers:**
- Unified dashboard showing all patients and their current status
- Chronological patient timeline tracking symptoms, alerts, and interactions
- Risk signals surfaced from patient conversations to flag potential escalation
- Clear visibility into patient history for continuity of care

### Architecture

- **Frontend**: React with TypeScript, Tailwind CSS, Zustand state management
- **Backend**: FastAPI serving REST endpoints
- **Database**: Supabase with Row Level Security and role-based access control
- **AI Layer**: Cohere for conversational analysis, ElevenLabs for voice
- **Risk Assessment**: Keyword-based and AI-assisted risk assessment

### Challenges Overcome

- **Trust and Privacy**: Designing for small communities where privacy concerns prevent engagement
- **Data Modeling**: Turning unstructured conversations into clean, chronological timelines
- **Scope Management**: Focusing on one core coordination failure within time limits
- **UI Layout**: Handling dynamic timelines without breaking layout

### Accomplishments

- Built fully functional end-to-end prototype within 38 hours
- Created provider dashboard visualizing patient history and risk
- Successfully integrated AI-generated summaries into clinical workflow
- Designed system working for both patients and providers
- Aligned solution tightly with real-world rural healthcare constraints

## Why It Matters
- Strong example of AI for social good
- Demonstrates understanding of healthcare workflows
- Shows ability to design for underserved communities
- Evidence of rapid prototyping and team collaboration

## Links
- Devpost: https://devpost.com/software/care-bridge-ai
- GitHub: https://github.com/liamma06/Spark

## Media
- Provider Dashboard
- Financials View
- Pitch Slide

---

*This project is particularly strong for healthcare, social impact, and accessibility-focused applications. It shows empathy-driven design and practical AI implementation.*
