# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

NEBULA:FOG:PROTOCOL 2026 is a static hackathon website with a cyberpunk aesthetic for an AI x Security event. No build system - pure HTML/CSS/JS loaded via CDN.

## Development

```bash
# Serve locally
python3 -m http.server 8000
```

## Architecture

### File Structure
- `index.html` - Homepage with hero, terminal interface, protocol cards
- `about.html` - Mission/about page with feature grid
- `challenges.html` - Protocol/challenge tracks with skill tags
- `schedule.html` - Event timeline with GSAP animations
- `register.html` - Registration form with validation
- `content/` - Markdown content files for easy editing
- `docs/planning/` - Planning documents and specs

### Design System

CSS Custom Properties (consistent across all pages):
```css
--color-bg: #030303;
--color-bg-elevated: #0a0a0a;
--color-primary: #00ff9f;
--color-secondary: #ff0080;
--color-accent: #0ff;
--color-text: #ffffff;
--color-text-muted: #666666;
--color-text-dim: #333333;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
--font-display: 'Space Grotesk', system-ui, sans-serif;
```

### CDN Libraries
- **GSAP 3.12.5** - Animations with ScrollTrigger
- **Font Awesome 6.5.1** - Icons
- Google Fonts - JetBrains Mono, Space Grotesk

### Key Patterns

1. **Inline CSS** - All styles embedded in `<style>` tags within each HTML file
2. **GSAP Animations** - Page elements animate on load and scroll
3. **Page Visibility API** - Pause animations when tab not visible
4. **Mobile-first** - Desktop nav hidden on mobile, bottom nav shows instead
5. **Accessibility** - ARIA labels, reduced motion support, semantic HTML

## Content Editing

Update content via markdown files in `/content/`:
- `event.md` - Event dates, links, meta info
- `protocols.md` - Challenge tracks
- `schedule.md` - Timeline items
- `about.md` - Features and stats
- `terminal.md` - Boot sequence and commands
- `navigation.md` - Site navigation structure

## Key Implementation Notes

- All pages share the same design system (colors, fonts, components)
- Navigation is consistent: desktop HUD nav + mobile bottom nav
- Footer is consistent across all pages
- GSAP scripts use `defer` attribute for performance
- No external CSS files - everything inline
