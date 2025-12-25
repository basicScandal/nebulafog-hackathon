# Content Management System

This document explains how to edit all website content in one place using the centralized content management system.

## Overview

All text content for the NEBULA:FOG:PRIME 2026 website is now centralized in **`content.json`**. This makes it easy to update text across the entire site by editing a single file.

## How It Works

1. **`content.json`** - Contains all text content organized by page and section
2. **`content-loader.js`** - JavaScript module that loads content from JSON and populates HTML
3. **HTML files** - Include the content loader script which dynamically updates the page content

## Editing Content

### Quick Start

To edit any text on the website:

1. Open **`content.json`** in your text editor
2. Find the section you want to edit (organized by page)
3. Make your changes
4. Save the file
5. Refresh your browser - changes appear immediately!

### Content Structure

The `content.json` file is organized hierarchically:

```json
{
  "common": {
    // Shared across all pages (navigation, footer)
  },
  "home": {
    // Homepage content
  },
  "challenges": {
    // Challenges page content
  },
  "dashboard": {
    // Dashboard page content
  },
  "register": {
    // Registration page content
  },
  "about": {
    // About/Mission page content
  }
}
```

### Common Examples

#### Edit Navigation Links

```json
"common": {
  "navigation": {
    "logo": "NEBULA:FOG:PRIME",
    "links": [
      { "label": "Home", "href": "index.html" },
      { "label": "Mission", "href": "about.html" }
    ]
  }
}
```

#### Edit Hero Section

```json
"home": {
  "hero": {
    "badge": "📅 Coming 2026",
    "title": "NEBULA:FOG:PRIME",
    "subtitle": "The Singularity Protocol",
    "description": "Your description here..."
  }
}
```

#### Edit Event Details

```json
"about": {
  "eventDetails": [
    {
      "title": "Date & Duration",
      "content": "February 15-17, 2026",
      "subtitle": "48 hours of intensive hacking",
      "items": [
        "Opening Ceremony: Feb 15, 09:00 UTC"
      ]
    }
  ]
}
```

#### Edit Team Members

```json
"about": {
  "team": [
    {
      "avatar": "👨‍💻",
      "name": "Dr. Alex Chen",
      "role": "Lead Organizer",
      "bio": "AI Security Researcher..."
    }
  ]
}
```

#### Edit Challenge Categories

```json
"challenges": {
  "categories": [
    {
      "id": "ai",
      "icon": "🤖",
      "title": "AI Security Matrix",
      "difficulty": "hard",
      "description": "Your description...",
      "challenges": [
        { "name": "Challenge Name", "points": 1000 }
      ]
    }
  ]
}
```

## Content Sections by Page

### Homepage (`home`)

- **hero** - Main hero section with title, subtitle, description, CTA buttons
- **statusCards** - Stats cards (Builders, Build Time, Entry Fee, Prize Pool)
- **protocolCards** - Four main protocol cards
- **workshops** - Workshop listing
- **cta** - Call-to-action section at the bottom

### Challenges Page (`challenges`)

- **header** - Page title and subtitle
- **filters** - Challenge filter buttons
- **categories** - All challenge categories with details
- **stats** - Statistics cards (Prize Pool, Participants, etc.)

### Dashboard Page (`dashboard`)

- **header** - Page title, subtitle, live indicator
- **stats** - Dashboard statistics cards
- **charts** - Chart titles and icons

### Register Page (`register`)

- **header** - Form title and subtitle
- **form** - Form configuration (labels, placeholders, options)
- **benefits** - Registration benefits list

### About Page (`about`)

- **header** - Page title and subtitle
- **mission** - Mission statement and highlights
- **eventDetails** - Event information cards
- **challengeCategories** - Challenge category descriptions
- **timeline** - Event timeline
- **team** - Team member profiles
- **cta** - Call-to-action section

### Common (`common`)

- **navigation** - Site navigation menu
- **footer** - Footer content and social links
- **loading** - Loading screen text

## Progressive Enhancement

The content system uses progressive enhancement:

- **HTML contains fallback content** - If JavaScript fails, users still see the original HTML content
- **JavaScript enhances the experience** - When loaded, the content loader replaces HTML with JSON content
- **SEO-friendly** - Search engines can still index the hardcoded HTML content

## Tips for Editing

1. **Use a JSON-aware editor** - VSCode, Sublime Text, or any editor with JSON syntax highlighting
2. **Validate your JSON** - Use a JSON validator to check for syntax errors before saving
3. **Keep formatting consistent** - Follow the existing structure and indentation
4. **Test locally** - Run a local server (`python3 -m http.server 8000`) to test changes
5. **Check the browser console** - Look for any JavaScript errors if content doesn't load

## Common Issues

### Content Not Updating

1. **Hard refresh** - Press Ctrl+Shift+R (or Cmd+Shift+R on Mac) to clear cache
2. **Check console** - Open browser DevTools and check for JavaScript errors
3. **Validate JSON** - Ensure your JSON is valid (no trailing commas, missing quotes, etc.)

### JSON Syntax Errors

Common mistakes:
- Missing commas between array items
- Trailing comma after last item
- Unescaped quotes in strings (use `\"` for quotes inside strings)
- Missing closing brackets `}` or `]`

### Testing Locally

```bash
# Start a local web server
python3 -m http.server 8000

# Or use npx
npx serve .

# Then visit: http://localhost:8000
```

## Advanced Usage

### Adding New Content Sections

To add new content sections:

1. Add the content to `content.json` under the appropriate page
2. Add a loader method in `content-loader.js` (optional if using existing patterns)
3. Update HTML to have the container elements with appropriate selectors

### Customizing the Loader

The `content-loader.js` file can be customized to:
- Add new loading methods for custom sections
- Change how content is populated
- Add data transformations before display

## File Locations

```
/home/user/nebulafog-hackathon/
├── content.json          # All website content
├── content-loader.js     # Content loading system
├── index.html            # Homepage
├── challenges.html       # Challenges page
├── dashboard.html        # Dashboard page
├── register.html         # Registration page
├── about.html            # About page
└── CONTENT.md           # This documentation
```

## Questions?

If you need to add new content types or customize the loading behavior, refer to the comments in `content-loader.js` or modify the loader methods as needed.

---

**Happy Editing! 🚀**
