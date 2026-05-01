# Homelab

## Overview
Self-hosted Debian homelab with Docker Compose orchestration, Tailscale mesh VPN, Caddy reverse proxy, and 25+ services including local AI stack, media server, document processing, DNS filtering, and automated download pipelines.

## Category
Infrastructure, Linux, Networking, Self-Hosting, AI Systems, Security

## Status
Featured Portfolio Project (Active Infrastructure)

## Hardware
- **CPU:** Intel i5-6600K @ 4.5 GHz (overclocked from 3.5GHz)
- **RAM:** 16 GB DDR4 (discovered one stick was unseated — ran on 8GB for weeks)
- **GPU:** NVIDIA GeForce GTX 960 (2GB VRAM, Maxwell, CUDA 11.8 only — cannot run CUDA 12.x)
- **Storage:** 225GB NVMe SSD
- **NIC:** Killer E2200 Gigabit Ethernet (required driver reload fix after BIOS changes)

## Tech Stack

### Platform
- Debian 13 (trixie), Docker Engine 29 + Compose v2, UFW firewall

### Networking
- Tailscale mesh VPN for secure remote access (no ports exposed to internet)
- Tailscale Serve for TLS with real Let's Encrypt certificates
- Caddy 2 as internal HTTP reverse proxy (subpath routing)
- All admin UIs bound to localhost, served only through Caddy subpaths

### AI Services
- **Open WebUI** — local AI chat with TTS (Kokoro), web search (SearXNG), terminal integration
- **Bifrost** — LLM gateway routing to Cohere, Gemini, Anthropic, DeepSeek, OpenRouter, local models
- **llama.cpp** — local GPU-accelerated LLM (Prism fork, CUDA 11.8, ~58 tok/s)
- **Kokoro TTS** — fast local text-to-speech, OpenAI-compatible API
- **GitHub Copilot Server** — OpenAI-compatible Copilot endpoint
- **Firecrawl** — self-hosted web scraping stack for AI agent tools

### Media Stack
- **Jellyfin** — media server with hardware transcoding via iGPU QuickSync
- **Lidarr / Radarr / Sonarr** — music, movie, and TV collection managers
- **Prowlarr** — central torrent indexer manager
- **qBittorrent** — torrent client routed through NordVPN via Gluetun
- **slskd + Soularr** — Soulseek P2P music integration with Lidarr
- **Bazarr** — automatic subtitle downloader

### Document Processing
- **docling pipeline** — GPU-accelerated PDF/DOCX/PPTX/image parsing to markdown
- **Qwen3-VL-2B** — local vision-language model for image descriptions (CPU, 0 VRAM)
- Integrated as external document loader in Open WebUI

### Infrastructure
- **Pi-hole** — DNS filtering and ad blocking for entire LAN (170k+ blocklist domains)
- **SearXNG** — privacy-focused metasearch engine
- **Stirling-PDF** — PDF tools with login required
- **Homepage** — service dashboard with status monitoring
- **Stack Toggle** — FastAPI web UI to start/stop service stacks via Docker socket

## Architecture

**Host:** Debian 13 bare metal with Docker Compose orchestration  
**Remote Access:** Tailscale mesh VPN with Tailscale Serve for TLS  
**Routing:** Caddy 2 internal reverse proxy, subpath routing for all web UIs  
**Firewall:** UFW default-deny INPUT, explicit allow rules for LAN services  
**Storage:** Persistent bind mounts under /srv/homelab/data/

Each service runs in its own Docker Compose stack. All stacks share a common Docker network for inter-service communication. Configuration is version-controlled.

### GPU Constraints
The GTX 960 (2GB VRAM, Maxwell) is limited to CUDA 11.8. docling uses ~800 MiB VRAM for layout/OCR/table extraction. llama.cpp GPU model stopped to avoid OOM — only 2GB total VRAM. Qwen3-VL runs on CPU. Jellyfin transcoding uses Kabylake iGPU QuickSync instead.

### Security
- UFW firewall: default-deny INPUT, explicit LAN allow rules
- All admin web UIs bound to 127.0.0.1, accessible only via Caddy subpaths
- Open WebUI signups disabled, Stirling-PDF login required
- SSH hardened: key-only, no root login, no X11 forwarding
- Secrets and .env files locked to owner-only (chmod 600)
- Automatic security patches via unattended-upgrades

## Key Features

1. **Local-First AI Stack** — Open WebUI + Bifrost + llama.cpp + Kokoro. No cloud dependency for core functionality. Routes to 7+ model providers.

2. **Media Automation Pipeline** — Lidarr searches torrents, Soulseek, and YouTube. Downloads via NordVPN. Jellyfin serves the final library with hardware transcoding. Fully automated: search → download → organize → play.

3. **Document Processing** — Upload any document format, docling extracts layout/text/tables/LaTeX formulas on GPU, VLM describes images. Integrated into Open WebUI as external document loader.

4. **Privacy & Security** — No public ports. Tailscale mesh VPN with Let's Encrypt TLS. Pi-hole DNS filtering. All admin UIs localhost-bound. UFW default-deny.

5. **Reproducible Infrastructure** — Each service in its own Compose stack. Persistent data in bind mounts. Git-controlled configs.

## Notable Challenges
- **NIC driver bug**: Killer E2200 stuck at 10 Mbps after BIOS overclocking — fixed by reloading alx driver, automated via systemd oneshot service at boot
- **GPU VRAM balancing**: Only 2GB VRAM total, carefully split between docling and LLM inference — stopped GPU text model to prevent CUDA OOM
- **Open WebUI config persistence**: Pinned image SHA and set static secret key to prevent session loss on restart
- **Security audit**: Full remediation — UFW deployment, localhost binding for all admin UIs, SSH hardening, secrets lockdown

## Links
- GitHub: https://github.com/HasNate618/homelab

---

*Demonstrates production-grade infrastructure skills, Linux administration, Docker orchestration at scale, and real-world security implementation.*
