# NEBULA:FOG:PRIME 2026

A cyberpunk-themed hackathon website for the AI x Security event. Built with pure HTML/CSS/JS for maximum performance and zero build dependencies.

**Live Site:** [basicscandal.github.io/nebulafog-2026](https://basicscandal.github.io/nebulafog-2026)

## Features

### Immersive Experience
- **Breach Sequence** - Terminal-style boot animation on first load
- **Custom Cursor** - Neon-glow cursor with trail effects (desktop)
- **Particle System** - Interactive WebGL/Canvas particles
- **Sound Design** - Optional hover, click, and interaction sounds

### Homepage Storytelling
- **Hero Section** - Animated title reveal with live event stats
- **2025 Mission Debrief** - Retrospective with animated counters and project showcases
- **Protocol Cards** - Challenge tracks with decrypt-on-scroll animation
- **Testimonials** - Swipeable carousel of participant quotes
- **Interactive Terminal** - Functional command-line interface

### Pages
| Page | Description |
|------|-------------|
| Home | Main landing with narrative flow |
| Mission | Story page with anime.js animations |
| Challenges | 3D challenge matrix (Three.js) |
| Schedule | Animated event timeline |
| Register | Form with validation |
| Partners | Sponsor showcase |
| Protocol | Code of conduct |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/basicScandal/nebulafog-hackathon.git
cd nebulafog-hackathon

# Serve locally (any static server works)
python3 -m http.server 8000
# or
npx serve .

# Open in browser
open http://localhost:8000
```

## Tech Stack

**Zero Build Dependencies** - Edit and deploy directly.

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Inline styles, custom properties, animations |
| Vanilla JS | Interactive features, no framework |
| GSAP 3.12 | Animations, ScrollTrigger |
| Three.js | 3D challenge matrix |
| Anime.js | Story page animations |

## Design System

### Colors
```css
--color-primary: #00ff9f;    /* Neon green */
--color-secondary: #ff0080;  /* Neon pink */
--color-accent: #0ff;        /* Cyan */
--color-bg: #030303;         /* Dark background */
```

### Typography
- **Monospace:** JetBrains Mono
- **Display:** Space Grotesk

### Challenge Track Colors
| Track | Color |
|-------|-------|
| SHADOW::VECTOR | Red `#ff4444` |
| SENTINEL::MESH | Blue `#4488ff` |
| ZERO::PROOF | Cyan `#0ff` |
| ROGUE::AGENT | Purple `#aa44ff` |

## Project Structure

```
nebulafog-web/
├── index.html           # Homepage (main entry)
├── about.html           # Mission/story page
├── challenges.html      # Challenge tracks
├── schedule.html        # Event timeline
├── register.html        # Registration form
├── partners.html        # Sponsors page
├── code-of-conduct.html # Code of conduct
├── content/             # Markdown content (reference)
├── images/              # Image assets
├── docs/planning/       # Planning documents
├── CLAUDE.md            # AI assistant instructions
└── README.md            # This file
```

## Terminal Commands

The homepage includes an interactive terminal. Available commands:

| Command | Action |
|---------|--------|
| `help` | List available commands |
| `mission` | Go to Mission page |
| `challenges` | Show challenge tracks |
| `schedule` | Go to Schedule page |
| `register` | Go to Registration |
| `partners` | Go to Partners page |
| `status` | System status report |
| `clear` | Clear terminal |

## Mobile Support

- Responsive design with 768px breakpoint
- Bottom tab navigation on mobile
- Swipeable testimonial carousel
- Touch-optimized interactions
- Particles disabled for performance

## Accessibility

- Skip navigation links
- ARIA labels on interactive elements
- `prefers-reduced-motion` support
- Keyboard navigable
- Semantic HTML structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari/Chrome

## Deployment

Static files - deploy anywhere:

```bash
# GitHub Pages (via deploy remote)
git push deploy main

# Or any static host
# - Cloudflare Pages
# - Vercel
# - Netlify
```

## Development

See [CLAUDE.md](./CLAUDE.md) for detailed development documentation including:
- Architecture overview
- JavaScript class documentation
- Content update guides
- Animation modification
- Troubleshooting

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Test on mobile and desktop
4. Create PR with description
5. After merge, push to deploy

## License

Copyright 2026 NEBULA:FOG:PROTOCOL. All rights reserved.
