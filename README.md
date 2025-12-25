# NEBULA:FOG:PRIME 2026

A cyberpunk-themed hackathon website for the AI x Security event. Built with pure HTML/CSS/JS for maximum performance and zero build dependencies.

## Quick Start

```bash
# Serve locally (any static server works)
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`

## Project Structure

```
nebulafog-2026/
├── index.html          # Homepage with hero, terminal, protocols
├── about.html          # Mission/about page
├── challenges.html     # Protocol/challenge tracks
├── schedule.html       # Event timeline
├── register.html       # Registration form
├── content/            # Markdown content files for easy editing
│   ├── about.md
│   ├── event.md
│   ├── protocols.md
│   ├── schedule.md
│   ├── terminal.md
│   └── navigation.md
├── assets/
│   └── images/         # Image assets
├── docs/
│   └── planning/       # Planning documents & specs
└── README.md
```

## Design System

### Colors
- Primary: `#00ff9f` (Neon Green)
- Secondary: `#ff0080` (Neon Pink)
- Accent: `#0ff` (Cyan)
- Background: `#030303`
- Text: `#ffffff`, `#666666`, `#333333`

### Typography
- Monospace: JetBrains Mono
- Display: Space Grotesk

### Key Features
- Fully responsive (mobile-first)
- GSAP animations with ScrollTrigger
- Page Visibility API for performance
- Accessible (ARIA labels, skip links, reduced motion support)
- No build step - edit and deploy

## Content Editing

Edit the markdown files in `/content/` to update page content without touching HTML. The content files use simple markdown tables for structured data.

## Deployment

Static files can be deployed to any host:
- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages
- Any static file server

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Copyright 2026 NEBULA:FOG:PRIME. All rights reserved.
