# Content Management Guide

This directory contains all editable content for the NEBULA:FOG:PROTOCOL website.
Content is synced from [nebulafog-prime](https://github.com/basicScandal/nebulafog-prime).

## File Structure

```
content/
├── README.md          # This guide
├── home.md            # Homepage content & navigation
├── event.md           # Core event configuration (dates, links, meta)
├── about.md           # About page content & features
├── challenges.md      # Challenge tracks info
├── schedule.md        # Event timeline
├── sponsors.md        # Partnership information
├── register.md        # Registration page content
├── terminal.md        # Terminal boot sequence & commands
└── navigation.md      # Site navigation structure
```

## Event Details (January 25, 2025)

- **Date**: January 25, 2025
- **Venue**: Future House, 1405 Minnesota St, San Francisco, CA 94107
- **Time**: 8:00 AM - 9:30 PM
- **After-Party**: 9:30 PM onwards featuring Synthetix

## Key URLs

| Purpose | URL |
|---------|-----|
| Registration | https://partiful.com/e/HdFLRv5PQgspHg8SwL1z |
| Signal Group | https://signal.group/#CjQKIJNB4GqSEUM8UsNftK9gSWMS21bFZS4z6N5G_KhV2uHTEhBLOjyVsc13mvsb4FyQpMRZ |
| Challenge Ideas | https://ideas.nebulafog.ai |
| Partnership | https://partners.nebulafog.ai |
| Afterparty Music | https://synthetix.bandcamp.com/album/ominous-data |

## Challenge Tracks

1. **Offensive Security** - Leverage AI for penetration testing and vulnerability discovery
2. **Defensive Security** - Build automated threat detection and response systems
3. **Privacy & Trust** - Enhance data protection and model security

## How to Edit Content

1. **Update Event Details** → Edit `event.md`
2. **Update Challenge Tracks** → Edit `challenges.md` or `protocols.md`
3. **Update Schedule** → Edit `schedule.md`
4. **Update About Content** → Edit `about.md`
5. **Update Terminal Commands** → Edit `terminal.md`

## Syncing from Source

This content was extracted from the React components in [nebulafog-prime](https://github.com/basicScandal/nebulafog-prime):

- `src/pages/Home.tsx` → `home.md`
- `src/pages/About.tsx` → `about.md`
- `src/pages/Challenges.tsx` → `challenges.md`
- `src/pages/Schedule.tsx` → `schedule.md`
- `src/pages/Sponsors.tsx` → `sponsors.md`
- `src/pages/Register.tsx` → `register.md`
- `src/components/Terminal.tsx` → `terminal.md`
