# Homelab

## Overview
Self-hosted Debian homelab with Docker Compose orchestration, Tailscale mesh VPN, Caddy reverse proxy, and 25+ services including local AI stack, document processing pipeline, media server, DNS filtering, and automated download pipelines.

## Category
Infrastructure, Linux, Networking, Self-Hosting, AI Systems, Security

## Status
Featured Portfolio Project (Active Infrastructure)

## Tech Stack

### Platform
Debian 13, Docker Engine 29 + Compose v2, UFW firewall

### Networking
- Tailscale mesh VPN for secure remote access (no ports exposed to internet)
- Caddy 2 as internal HTTP reverse proxy with subpath routing
- All admin UIs bound to localhost, served only through Caddy subpaths

### AI Services
- **Open WebUI** — local AI chat with TTS, web search, terminal integration
- **Bifrost** — LLM gateway routing to Cohere, Gemini, Anthropic, DeepSeek, OpenRouter, local models
- **llama.cpp** — local GPU-accelerated LLM
- **Kokoro TTS** — fast local text-to-speech
- **GitHub Copilot Server** — OpenAI-compatible Copilot endpoint
- **Firecrawl** — self-hosted web scraping for AI agent tools

### Media Stack
- **Jellyfin** — media server with hardware transcoding
- **Lidarr / Radarr / Sonarr / Bazarr** — music, movie, TV, and subtitle managers
- **Prowlarr** — central torrent indexer manager
- **qBittorrent** — torrent client routed through NordVPN via Gluetun
- **slskd + Soularr** — Soulseek P2P music integration

### Document Processing Pipeline
- **docling pipeline** — GPU-accelerated document parser supporting PDF, DOCX, PPTX, images, HTML, CSV, XLSX, MD. Uses docling on GPU for layout detection, OCR, table extraction, and formula recognition (LaTeX equations converted to $$ blocks).
- **Vision-Language Model** — Qwen3-VL-2B for automatic image/diagram descriptions when documents contain embedded images. Runs on CPU with zero VRAM usage.
- **Cohere Vision Fallback** — Can optionally use `cohere/command-a-vision` via Bifrost as a cloud-powered VLM alternative for faster image descriptions.
- **Open WebUI Integration** — Configured as Open WebUI's external document loader (`CONTENT_EXTRACTION_ENGINE=external`). Users can upload documents directly in chat and get parsed markdown with described images. Supports job queuing for sequential background processing.
- **VLM Model Selector** — Switch between local (Qwen3-VL-2B on CPU) and cloud (Cohere) VLM models via a dropdown in the web UI.

### Infrastructure
- **Pi-hole** — DNS filtering and ad blocking (170k+ blocklist domains)
- **SearXNG** — privacy-focused metasearch engine
- **Stirling-PDF** — PDF tools with login required
- **Homepage** — service dashboard with status monitoring
- **Stack Toggle** — FastAPI web UI to start/stop service stacks

## Architecture

**Host:** Debian 13 bare metal with Docker Compose orchestration  
**Remote Access:** Tailscale mesh VPN with Tailscale Serve for TLS  
**Routing:** Caddy 2 internal reverse proxy, subpath routing for all web UIs  
**Firewall:** UFW default-deny INPUT, explicit allow rules for LAN services  
**Storage:** Persistent bind mounts under /srv/homelab/data/

Each service runs in its own Docker Compose stack. All stacks share a common Docker network for inter-service communication. Configuration is version-controlled.

### GPU Environment
GTX 960 (2GB VRAM, Maxwell, CUDA 11.8 only). docling uses ~800 MiB VRAM for layout/OCR/table models. VLM runs on CPU to preserve VRAM for document parsing. Jellyfin transcoding uses Kabylake iGPU QuickSync instead.

## Key Features

1. **Document Processing Pipeline** — The homelab's standout feature is the full document-to-markdown pipeline. Upload PDFs, DOCX, PPTX, or images; docling extracts layout, text, tables, and LaTeX formulas on GPU. A vision-language model automatically describes embedded images and diagrams. The entire pipeline is integrated into Open WebUI as an external document loader, letting users process documents directly from chat. Supports image-to-PDF auto-conversion, VLM model switching (local CPU vs cloud API), and formula enrichment for academic documents.

2. **Local-First AI Stack** — Open WebUI + Bifrost + llama.cpp + Kokoro. Routes to 7+ model providers. No cloud dependency for core AI functionality.

3. **Media Automation Pipeline** — Lidarr searches torrents, Soulseek, and YouTube. Downloads via NordVPN. Jellyfin serves the final library with hardware transcoding. Fully automated: search → download → organize → play.

4. **Privacy & Security** — No public ports. Tailscale mesh VPN. Pi-hole DNS filtering. All admin UIs localhost-bound behind Caddy subpaths. UFW default-deny. Hardened SSH.

5. **Reproducible Infrastructure** — Each service in its own Compose stack. Persistent data in bind mounts. Git-controlled configs.

## Notable Challenges
- GPU VRAM balancing between docling and LLM inference (only 2GB total)
- Open WebUI config persistence (pinned image SHA, static secret key)
- Security audit with full remediation

## Links
- GitHub: https://github.com/HasNate618/homelab

---

*Demonstrates production-grade infrastructure skills, Linux administration, Docker orchestration at scale, and real-world security implementation.*

## Hardware
- **CPU:** Intel i5-6600K @ 4.5 GHz (overclocked)
- **RAM:** 16 GB DDR4
- **GPU:** NVIDIA GTX 960 (2GB VRAM, CUDA 11.8 only)
- **Storage:** 225GB NVMe SSD
