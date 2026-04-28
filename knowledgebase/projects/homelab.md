# Homelab

## Overview
Self-hosted Debian homelab with Docker Compose orchestration, Tailscale mesh VPN, Caddy reverse proxy, and 15+ services including local AI stack, media server, DNS filtering, and automated download pipelines.

## Category
Infrastructure, Linux, Networking, Self-Hosting, AI Systems

## Status
Featured Portfolio Project (Active Infrastructure)

## Tech Stack
- Debian 13 (trixie)
- Docker Engine 29 + Docker Compose v2
- Tailscale (mesh VPN, secure remote access)
- Caddy 2 (HTTP reverse proxy)
- Open WebUI (local AI chat interface)
- Bifrost (LLM gateway)
- SearXNG (metasearch engine)
- Jellyfin (media server)
- Pi-hole (DNS/ad blocking)
- Lidarr / Radarr / Prowlarr (*Arr stack for media management)
- qBittorrent (torrent client with Gluetun/NordVPN)
- slskd + Soularr (Soulseek P2P integration)
- Stirling-PDF (PDF tools)
- Homepage (dashboard)

## Description

A production-grade self-hosted infrastructure running on bare metal Debian, serving as both a personal cloud and local AI platform. This is not a toy setup—it runs real services with proper networking, security, and automation.

### Architecture

**Host:** Debian 13 (trixie) bare metal  
**Runtime:** Docker Engine 29 + Docker Compose v2  
**Remote Access:** Tailscale mesh VPN (tailnet: tail3b22c4.ts.net)  
**TLS:** Tailscale Serve with Let's Encrypt certificates  
**Routing:** Caddy 2 as internal HTTP reverse proxy  
**Storage:** Persistent bind mounts under /srv/homelab/data/

### Service Stack

#### AI Services
- **Open WebUI** — Local AI chat interface with secure access
- **Bifrost** — LLM gateway for model routing
- **GitHub Copilot Server** — OpenAI-compatible Copilot API endpoint

#### Media Stack
- **Jellyfin** — Media server with hardware transcoding
- **Lidarr** — Music collection manager (torrent + Soulseek + YouTube)
- **Radarr** — Movie collection manager
- **Prowlarr** — Central indexer manager
- **qBittorrent** — Torrent client routed through NordVPN via Gluetun
- **slskd** — Soulseek P2P client
- **Soularr** — Bridge between Lidarr and Soulseek
- **Tubifarry** — YouTube downloader plugin for Lidarr

#### Network Services
- **Pi-hole** — DNS filtering and ad blocking
- **SearXNG** — Privacy-focused metasearch engine

#### Orchestration
- **Homepage** — Service dashboard with status monitoring
- **Caddy** — Central reverse proxy with subpath routing

### Networking Design

**External Access:**
- Tailscale provides secure mesh VPN access from anywhere
- Tailscale Serve handles TLS termination with real Let's Encrypt certs
- No ports exposed to the public internet

**Internal Routing:**
- Caddy runs HTTP-only behind Tailscale Serve
- Subpath routing: /jellyfin, /pihole, /searxng, /bifrost, etc.
- Direct port access for services needing it (8081, 8096, 8443)
- Shared `proxy` Docker network across all stacks

**Port Mapping:**
- Caddy publishes: 80, 8081, 8096, 8443 (direct HTTP)
- Plus: 2080, 28081, 28096, 28443 (for Tailscale Serve)
- Tailscale Serve proxies external: 443, 8082, 8445 → Caddy

### Key Features

1. **Local-First AI Stack**
   - Open WebUI for private AI conversations
   - Bifrost for model routing and management
   - No cloud dependency for core AI functionality

2. **Media Automation Pipeline**
   - Lidarr searches across torrent, Soulseek, and YouTube
   - Prowlarr manages indexers centrally
   - qBittorrent downloads via VPN
   - slskd handles P2P music sharing
   - Jellyfin serves the final library
   - Fully automated: search → download → organize → play

3. **Privacy & Security**
   - Tailscale mesh VPN (no open ports)
   - Let's Encrypt TLS via Tailscale Serve
   - Pi-hole DNS filtering for entire network
   - SearXNG for private web search
   - No data leaves home network unless explicitly configured

4. **Reproducible Infrastructure**
   - Each service in its own Docker Compose stack
   - Persistent data in bind mounts
   - Configuration version controlled
   - Single commands to start/stop entire infrastructure

5. **Real-World Maintenance**
   - Active troubleshooting and debugging
   - Service integration (Lidarr + Tubifarry + slskd)
   - Path mapping and permission management
   - VPN routing and port configuration

### Directory Layout

```
/srv/homelab/
  compose/
    infra/          # Caddy reverse proxy
    open-webui/     # AI chat interface
    bifrost/        # LLM gateway
    searxng/        # Search engine
    jellyfin/       # Media server
    pihole/         # DNS filtering
    lidarr/         # Music manager
    radarr/         # Movie manager
    prowlarr/       # Indexer manager
    qbittorrent/    # Torrent client
    soularr/        # Soulseek bridge
    homepage/       # Dashboard
  data/             # Persistent storage
  backups/          # Backup location
  scripts/          # Automation scripts
```

### Challenges Overcome

- **TLS Termination**: Moved from Caddy internal CA to Tailscale Serve for trusted certs
- **VPN Routing**: Configured Gluetun for NordVPN integration with qBittorrent
- **Service Integration**: Connected Lidarr to multiple download sources (torrent, Soulseek, YouTube)
- **Port Conflicts**: Carefully mapped ports to avoid conflicts between services
- **Path Mapping**: Configured remote path mappings for container-to-container file flows
- **Host Header Validation**: Disabled qBittorrent validation for reverse proxy compatibility

## Why It Matters
- Demonstrates production-grade infrastructure skills
- Shows deep Linux system administration knowledge
- Evidence of Docker orchestration at scale
- Real-world networking and security implementation
- Self-hosted AI stack showing local-first philosophy
- Media automation pipeline demonstrating systems thinking
- Active maintenance proving operational experience

## Links
- GitHub: https://github.com/HasNate618/homelab

---

*This project is the strongest evidence of infrastructure and Linux expertise. It demonstrates the ability to design, deploy, and maintain complex self-hosted systems with real services and users.*
