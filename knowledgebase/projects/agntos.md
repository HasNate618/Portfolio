# AgntOS

## Overview
AgntOS is my flagship AI project — an agent-native operating system built on NixOS where a large language model is the central nervous system of the machine, not a sidecar. It's an AI systems project that reimagines what an OS looks like when AI is treated as a first-class citizen: managing state, interpreting intent, mediating the user's relationship with the computer, and evolving the system itself. The OS learns and mutates through three AI-driven loops: system mutations (propose → apply → nixos-rebuild), memory mutations (agent learns → stores → next session knows more), and self mutations (agent writes skills → gains new capabilities). Built from scratch in Rust, it demonstrates deep AI systems engineering, agent safety, and human-in-the-loop autonomous system management.

## Category
AI Systems, Agentic AI, AI-Native Infrastructure, Operating Systems

## Status
Flagship Portfolio Project — Highest Priority AI/ML Project

## Tech Stack
- Rust (agntctl CLI, agntd daemon, agnt-common shared types)
- Nix/NixOS (declarative system configuration, flakes)
- KDE Plasma 6 (Wayland-native desktop environment)
- QEMU (development VM)
- SQLite FTS5 (conversation history search)
- Tokio (async runtime)
- Serde (compile-time checked serialization)
- Systemd (agent daemon as user service)
- clap (CLI argument parsing)

## Architecture

AgntOS has three core components:

1. **agntd** - LLM-powered agent daemon. Systemd user service that accepts prompts via REPL or Unix socket. Assembles system prompt from memory + system snapshot + tool definitions. Dispatches tool calls. Persists conversations to SQLite FTS5.

2. **agntctl** - Stable OS control CLI with 10 tools: inspect, propose, apply, rollback, audit, memory, read_file, write_file, edit_file, run_bash. All agent tool calls run agntctl as a subprocess. Also usable directly by users.

3. **agnt-common** - Shared types between agntctl and agntd: AuditEntry, ConfigProposal, CoreMemory, ModelsConfig. Serialized as JSON across the subprocess boundary.

### The /etc/agntos/ Protocol

The agent manages exactly one directory tree that NixOS imports:

```
/etc/agntos/
  packages/          Per-package Nix modules
  services/          Per-service enable/disable modules
  options/           Arbitrary NixOS option overrides
  proposals/         Staged config proposals (JSON)
  memory/            MEMORY.md + USER.md + sessions.db (SQLite FTS5)
  audit.jsonl        Append-only action log
  models.toml        LLM endpoint configuration
```

The agent never touches arbitrary user configuration — clean contract, no side effects.

### Propose → Apply → Audit → Undo Pipeline

Every system mutation goes through a validated pipeline:
1. **Propose**: LLM generates intent, validated by nix-instantiate --parse, staged as JSON
2. **Confirm**: user approves before any files change
3. **Apply**: files written, old files snapshotted, nixos-rebuild runs
4. **Audit**: action recorded with the user's original prompt (the "why")
5. **Undo**: surgical revert reverses file operations, warns on irreversibles

## Key Design Decisions

- **Rust** over Python (too slow for CLI latency) or Go (lacks type safety for audit/config schemas). Rust's type system ensures serde roundtrips are compile-time checked and file path traversal is blocked at the type level.
- **KDE Plasma 6** for Kirigami-native GUI, Wayland-native security boundaries, KRunner-extensible agent actions, and DBus-addressable system tray/notifications.
- **No plugin system / MCP**. Pi-inspired read/write/edit/bash primitives replace dozens of specialized tools. Need an API? run_bash + curl. New file format? run_bash + jq/yq/python3.
- **Single memory system**. Two markdown files (MEMORY.md at 2,200 chars, USER.md at 1,375 chars) curated directly by the agent. Stores preferences and intent, not inspectable system state. No background extraction pipeline — the agent with full in-context judgment is the best arbiter of what matters.
- **Bash for introspection**. One tool (run_bash) replaces dozens of brittle JSON wrappers for systemctl, journalctl, dmesg, ps, df. Six Nix-specific tools exist because they require structured data that bash cannot easily represent.

## Memory & Provenance

### Core Memory
- MEMORY.md (2,200 char cap): System facts, conventions, constraints
- USER.md (1,375 char cap): User preferences, workflow patterns, intent
- Both loaded as frozen snapshot into every LLM call — always in context
- Agent consolidates when memory exceeds 80% capacity

### What Belongs in Memory
- "User prefers Helix over Neovim" — stored
- "User hates Flatpaks" — stored
- "GPU is QEMU Bochs" — not stored (re-inspectable)
- "8GB RAM" — not stored (re-inspectable)

### Provenance
Every apply stores the user's original prompt in the audit entry. The agent retrieves it using `audit search --query`. The system prompt teaches the agent to use audit search when asked "why was X done?".

## Modes
- **REPL**: agntd — interactive development, debugging
- **Socket**: agntd --socket /run/agntd/agent.sock — systemd service, GUI frontends
- **Keyword**: built-in fallback when no models.toml configured

## Why It Matters
- Demonstrates radical rethinking of what an OS can be when AI is treated as a first-class citizen
- Strong evidence of AI systems engineering in Rust, Nix, and Linux infrastructure
- Shows deep understanding of agent safety, audit trails, and reversible system mutations
- Flagship AI project that ties together agentic AI, operating systems, and declarative infrastructure
- 55+ tests passing, 14/14 eval checks passing
- Built entirely from scratch — no forking, no pre-existing agent OS codebase

## Use Cases
- AI-native desktop computing
- Self-evolving AI agent environments
- Agent safety research and audit trail systems
- Declarative system configuration at scale
- Human-in-the-loop autonomous system management

## Links
- GitHub: https://github.com/HasNate618/AgntOS

## Media
- AgntOS Banner
- AgntOS Dev VM Running KDE Plasma

---

*This is my flagship AI project and the strongest demonstration of my ability to design and build complex AI systems from the ground up. It represents months of work in Rust, NixOS, and AI-native systems architecture.*
