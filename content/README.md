# Content Management Guide

This directory contains all editable content for the NEBULA:FOG:PRIME 2026 website.

## File Structure

```
content/
├── README.md          # This guide
├── event.md           # Core event configuration (dates, links, meta)
├── protocols.md       # Challenge tracks / protocol cards
├── schedule.md        # Event timeline
├── about.md           # About page content & features
├── terminal.md        # Terminal sequences & commands
└── navigation.md      # Site navigation structure
```

## How to Edit Content

### For 2026 Event Updates:

1. **Update Event Details** → Edit `event.md`
   - Change date, venue, registration URL
   - Update social links
   - Modify hero section text

2. **Update Challenge Tracks** → Edit `protocols.md`
   - Modify protocol names and descriptions
   - Each protocol has an encrypted label and full description

3. **Update Schedule** → Edit `schedule.md`
   - Add/remove/modify timeline items
   - Each item has time, title, icon, and description

4. **Update About Content** → Edit `about.md`
   - Feature pillars, mission statement
   - Registration background options

5. **Update Terminal Commands** → Edit `terminal.md`
   - Boot sequence messages
   - Available commands and responses

## Content Format

Content files use a simple markdown format with YAML-like frontmatter for structured data.

### Example Protocol Entry:
```markdown
## Protocol 01: NEURAL LAYER

- **encrypted_label**: SOVEREIGN_BEHAVIOR_ANALYSIS
- **description**: |
    Your multi-line description here.
    Can span multiple lines.
```

### Example Schedule Entry:
```markdown
## 08:00 - Arrival & Neural Initialization
- **icon**: coffee
- **description**: Check-in, breakfast, and morning refreshments
```

## Updating the Live Site

After editing content files:

1. The content is referenced directly in HTML files
2. For major content changes, you may need to update the corresponding HTML
3. Push changes to deploy: `git add . && git commit -m "Update content" && git push`

## Icon Reference

Available icons for schedule items:
- coffee, brain, lightbulb, zap, pizza, award, music

## Notes

- Keep descriptions concise for mobile readability
- Test all external links before publishing
- Update meta descriptions in `event.md` for SEO
