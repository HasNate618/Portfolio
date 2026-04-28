# Glyph

## Overview
Leader-key command overlay for Windows with discoverable actions, per-app bindings, and custom themes.

## Category
Developer Tools, Desktop Software, Productivity

## Status
Featured Portfolio Project

## Tech Stack
- C#, .NET
- WPF (Windows Presentation Foundation)
- YAML (configuration)
- WinGet (distribution)

## Description

Glyph is a productivity tool that brings Vim-style leader key functionality to Windows applications. It provides a discoverable command overlay that adapts to the currently active application.

### Key Features

1. **Leader-Key Activation**
   - Press leader key to open command overlay
   - Context-aware based on active application
   - Non-intrusive popup interface

2. **Per-App Bindings**
   - Different command sets for different applications
   - Automatic context detection
   - Customizable per-application configurations

3. **Discoverable Actions**
   - Visual overlay shows available commands
   - No need to memorize complex shortcuts
   - Contextual help system

4. **Custom Themes**
   - User-customizable appearance
   - YAML-based configuration
   - Extensible theme system

### Architecture

- **Frontend**: WPF overlay window
- **Backend**: Windows API hooks for application detection
- **Config**: YAML files for bindings and themes
- **Distribution**: WinGet package manager

### Use Cases

- Developers wanting Vim-style navigation in any app
- Power users looking to reduce mouse dependency
- Users with repetitive workflows across multiple applications
- Accessibility tool for keyboard-centric navigation

## Why It Matters
- Demonstrates Windows desktop development
- Shows understanding of productivity tooling
- Evidence of developer empathy (building tools for developers)
- Practical utility tool with real-world use

## Links
- GitHub: https://github.com/HasNate618/Glyph

## Media
- Logo
- App Keymap
- App Overlay
- Settings Panel

---

*This project is great for developer tooling, desktop application, and productivity software roles. It shows deep understanding of developer workflows.*
