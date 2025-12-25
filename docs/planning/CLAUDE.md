# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NEBULA:FOG:PROTOCOL 2026 is a static hackathon website with an immersive cyberpunk aesthetic. It combines AI x Security themes with advanced interactive features including particle systems, 3D graphics, and an interactive terminal interface.

## Development

This is a static HTML/CSS/JS site with no build system. Development is done by directly editing the source files.

**Local Development:**
```bash
# Serve files locally (any static server works)
python3 -m http.server 8000
# or
npx serve .
```

**No package manager is used** - all libraries are loaded via CDN.

## Architecture

### File Structure
- `index.html` - Homepage with terminal interface
- `challenges.html` - 3D challenge matrix using Three.js
- `dashboard.html` - Live analytics dashboard using ECharts.js
- `register.html` - Registration form
- `about.html` - About/mission page
- `main.js` - Core JavaScript with `CyberpunkInterface` class

### Core JavaScript (`main.js`)

The `CyberpunkInterface` class handles all interactive features:
- Custom cursor system with click effects
- Canvas-based particle system with mouse interaction
- Interactive terminal with command parsing (help, challenges, register, etc.)
- Scroll animations and FAQ accordions
- Mobile navigation
- DOM element caching for performance

Key methods:
- `setupParticles()` / `animateParticles()` - Canvas particle rendering with connections
- `setupTerminal()` / `executeTerminalCommand()` - Terminal interface
- `setupScrollAnimations()` - Intersection Observer-based reveals

### CDN Libraries Used
- **Anime.js** - UI micro-animations
- **p5.js** - Generative graphics
- **ECharts.js** - Data visualizations (dashboard page)
- **Three.js** - 3D graphics (challenges page)
- **Matter.js** - Physics simulations
- **Font Awesome** - Icons

### Design System

CSS custom properties define the cyberpunk theme:
```css
--neon-primary: #00ffaa    /* Primary accent */
--neon-secondary: #ff0080  /* Secondary accent */
--neon-tertiary: #8000ff   /* Tertiary accent */
--bg-primary: #0a0a0a      /* Main background */
--bg-secondary: #1a1a1a    /* Secondary background */
```

Typography: JetBrains Mono (primary), Orbitron (headings), Inter, Space Grotesk

### Inline Styles

All CSS is embedded in `<style>` tags within each HTML file - there are no external CSS files. When modifying styles, edit the `<style>` section in the relevant HTML file.

## Key Implementation Notes

- Custom cursor is hidden on mobile (`cursor: none` with media query fallback)
- Accessibility: skip links, focus states, ARIA labels included
- Particle system uses requestAnimationFrame with mouse-reactive physics
- Terminal supports command history (arrow keys), tab completion, and suggestions
- Each page loads its own set of libraries - not all pages need all libraries
