# Architecture Overview

## Current Architecture (As-Is)

```
nebulafog-hackathon/
│
├── index.html                    (1,756 lines)
│   ├── <style> ...               (500+ lines of CSS)
│   ├── <body> ...                (800+ lines of HTML)
│   └── <script> ...              (400+ lines of JS)
│
├── challenges.html               (1,618 lines)
│   ├── <style> ...               (500+ lines - DUPLICATED)
│   ├── <body> ...                (700+ lines)
│   └── <script> ...              (400+ lines)
│
├── dashboard.html                (1,323 lines)
│   ├── <style> ...               (500+ lines - DUPLICATED)
│   ├── <body> ...                (500+ lines)
│   └── <script> ...              (300+ lines)
│
├── register.html                 (1,035 lines)
│   ├── <style> ...               (500+ lines - DUPLICATED)
│   ├── <body> ...                (400+ lines)
│   └── <script> ...              (100+ lines)
│
├── about.html                    (1,062 lines)
│   ├── <style> ...               (500+ lines - DUPLICATED)
│   ├── <body> ...                (400+ lines)
│   └── <script> ...              (150+ lines)
│
├── main.js                       (Shared utilities)
├── content-loader.js             (Content management)
└── content.json                  (Centralized content)
```

### Problems:
❌ **2,500+ lines of duplicated CSS** across 5 files
❌ **1,000+ lines of duplicated HTML** (nav, footer, overlays)
❌ **1,500+ lines of inline JavaScript** (hard to maintain)
❌ **Large HTML files** (1,000-1,700 lines each)
❌ **Global changes require editing 5 files**

---

## Proposed Architecture (To-Be)

```
nebulafog-hackathon/
│
├── css/
│   ├── base/
│   │   ├── reset.css             (CSS reset)
│   │   ├── variables.css         (:root custom properties)
│   │   └── typography.css        (Font imports & styles)
│   │
│   ├── components/
│   │   ├── navigation.css        (Nav styles)
│   │   ├── footer.css            (Footer styles)
│   │   ├── buttons.css           (Button components)
│   │   ├── cards.css             (Card components)
│   │   ├── forms.css             (Form elements)
│   │   ├── terminal.css          (Terminal UI)
│   │   └── overlays.css          (Cyberpunk effects)
│   │
│   ├── layout/
│   │   └── grid.css              (Layout utilities)
│   │
│   ├── pages/
│   │   ├── home.css              (Homepage specific)
│   │   ├── challenges.css        (Challenges specific)
│   │   ├── dashboard.css         (Dashboard specific)
│   │   ├── register.css          (Register specific)
│   │   └── about.css             (About specific)
│   │
│   └── main.css                  (Imports all CSS files)
│
├── js/
│   ├── core/
│   │   ├── cursor.js             (Custom cursor system)
│   │   ├── particles.js          (Particle canvas)
│   │   └── animations.js         (Scroll animations)
│   │
│   ├── components/
│   │   ├── terminal.js           (Terminal interface)
│   │   ├── charts.js             (Chart utilities)
│   │   ├── navigation.js         (Nav interactions)
│   │   └── forms.js              (Form validation)
│   │
│   ├── pages/
│   │   ├── home.js               (Homepage logic)
│   │   ├── challenges.js         (Challenge matrix 3D)
│   │   ├── dashboard.js          (Dashboard charts)
│   │   ├── register.js           (Registration handler)
│   │   └── about.js              (About animations)
│   │
│   ├── utils/
│   │   └── helpers.js            (Common utilities)
│   │
│   ├── main.js                   (Core interface - refactored)
│   └── content-loader.js         (Content management - existing)
│
├── components/
│   ├── header.html               (Reusable navigation)
│   ├── footer.html               (Reusable footer)
│   ├── overlays.html             (Cyberpunk overlays)
│   ├── loading-screen.html       (Loading screen)
│   └── background.html           (Background canvas)
│
├── content/
│   └── content.json              (All text content)
│
├── index.html                    (~400 lines)
│   ├── <link href="css/main.css">
│   ├── <body>
│   │   ├── <!-- include: header.html -->
│   │   ├── <!-- include: overlays.html -->
│   │   ├── <main> ... (page content only)
│   │   ├── <!-- include: footer.html -->
│   │   └── <script type="module" src="js/pages/home.js">
│   └── (no inline styles or scripts)
│
├── challenges.html               (~500 lines)
├── dashboard.html                (~450 lines)
├── register.html                 (~400 lines)
├── about.html                    (~450 lines)
│
├── CLAUDE.md                     (Project instructions)
├── CONTENT.md                    (Content editing guide)
├── REFACTORING_PLAN.md          (This document)
└── README.md                     (Project overview)
```

### Benefits:
✅ **Zero CSS duplication** (single source of truth)
✅ **Zero HTML duplication** (reusable components)
✅ **Modular JavaScript** (organized, testable)
✅ **Small HTML files** (400-500 lines each)
✅ **Global changes edit 1 file** (component updates)
✅ **Better caching** (CSS/JS cached separately)
✅ **Easier maintenance** (clear file organization)

---

## File Size Comparison

### Current
```
index.html          1,756 lines  (80 KB)
challenges.html     1,618 lines  (75 KB)
dashboard.html      1,323 lines  (60 KB)
register.html       1,035 lines  (48 KB)
about.html          1,062 lines  (50 KB)
-------------------------------------------
Total HTML:         6,794 lines  (313 KB)
Inline CSS:         2,500 lines  (duplicated)
Inline JS:          1,500 lines  (embedded)
```

### Proposed
```
index.html          ~400 lines   (15 KB) ↓ 82%
challenges.html     ~500 lines   (20 KB) ↓ 73%
dashboard.html      ~450 lines   (18 KB) ↓ 70%
register.html       ~400 lines   (15 KB) ↓ 69%
about.html          ~450 lines   (18 KB) ↓ 66%
-------------------------------------------
Total HTML:         2,200 lines  (86 KB) ↓ 73%
External CSS:       2,500 lines  (50 KB, cached)
External JS:        2,500 lines  (60 KB, cached)

Components:
  header.html       ~40 lines
  footer.html       ~50 lines
  overlays.html     ~30 lines
  loading.html      ~20 lines
```

### Performance Impact
- **First Load**: Similar (downloads CSS/JS separately)
- **Subsequent Loads**: Faster (CSS/JS cached)
- **Update Impact**: Much faster (cache only invalidated for changed files)
- **Development Speed**: 5x faster (edit 1 file vs 5)

---

## Code Organization Patterns

### CSS Organization (ITCSS)
```
1. Settings      → variables.css       (CSS custom properties)
2. Generic       → reset.css           (CSS reset)
3. Elements      → typography.css      (Base HTML elements)
4. Objects       → grid.css            (Layout patterns)
5. Components    → *.css in components/ (UI components)
6. Pages         → *.css in pages/      (Page-specific)
7. Utilities     → (inline if needed)   (Helper classes)
```

### JavaScript Organization (Modular)
```
Core         → Shared utilities (cursor, particles, animations)
Components   → Reusable UI (terminal, charts, forms)
Pages        → Page-specific logic (home, challenges, etc.)
Utils        → Helper functions (dom manipulation, etc.)
```

### Component Structure
```html
<!-- header.html -->
<nav class="nav-container" role="navigation">
    <div class="nav">
        <a href="index.html" class="nav-logo">NEBULA:FOG:PRIME</a>
        <ul class="nav-links" data-content="navigation.links"></ul>
    </div>
</nav>
```

---

## Migration Path

### Phase 1: Extract CSS (Week 1)
```
Day 1-2: Create directory structure, extract base CSS
Day 3-4: Extract component CSS
Day 5-6: Extract page CSS
Day 7:   Testing and refinement

Result: All CSS external, HTML files 30% smaller
```

### Phase 2: Componentize HTML (Week 2)
```
Day 1-2: Set up component system
Day 3-5: Extract header, footer, overlays
Day 6-7: Testing and refinement

Result: HTML files 50% smaller, reusable components
```

### Phase 3: Modularize JS (Week 3)
```
Day 1-2: Create JS structure
Day 3-5: Extract modules (cursor, particles, terminal)
Day 6-7: Extract page-specific JS, testing

Result: All JS external and modular
```

---

## Component System Options

### Option 1: JavaScript Includes (Recommended)
```javascript
// components.js
async function loadComponent(selector, url) {
    const response = await fetch(url);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;
}

// Usage in HTML
<div data-component="header"></div>
<script>loadComponent('[data-component="header"]', 'components/header.html');</script>
```

**Pros**: Simple, no server config, works anywhere
**Cons**: FOUC possible (mitigate with CSS)

### Option 2: Server-Side Includes (SSI)
```html
<!--#include virtual="components/header.html" -->
```

**Pros**: No JavaScript needed, faster
**Cons**: Requires server support (.shtml files or nginx/apache config)

### Option 3: Build-time Templates (Alternative)
```bash
# Using 11ty or similar
npx @11ty/eleventy
```

**Pros**: Static output, fastest
**Cons**: Build step required, more complex

**Recommendation**: Option 1 (JavaScript) - simplest for this project

---

## Naming Conventions

### CSS (BEM)
```css
/* Block */
.nav-container { }

/* Element */
.nav-container__logo { }
.nav-container__links { }

/* Modifier */
.nav-container--fixed { }
.nav-item--active { }
```

### JavaScript (camelCase/PascalCase)
```javascript
// Classes (PascalCase)
class CyberpunkInterface { }
class TerminalHandler { }

// Functions (camelCase)
function loadComponent() { }
function initParticles() { }

// Constants (UPPER_SNAKE_CASE)
const MAX_PARTICLES = 100;
```

### Files (kebab-case)
```
css/components/navigation.css
js/core/particle-system.js
components/loading-screen.html
```

---

## Testing Strategy

### Visual Testing
```bash
# Before refactoring
Take screenshots of all pages (desktop + mobile)

# After each phase
Compare screenshots using visual diff tool
Verify no regressions
```

### Functional Testing
```javascript
// Test checklist
✓ Custom cursor works
✓ Particle system animates
✓ Terminal accepts commands
✓ Navigation is interactive
✓ Forms validate correctly
✓ Content loads from JSON
✓ All links work
✓ Responsive layouts work
```

### Performance Testing
```bash
# Lighthouse audit
lighthouse https://localhost:8000 --view

# Check metrics
✓ First Contentful Paint < 1.5s
✓ Largest Contentful Paint < 2.5s
✓ Total Blocking Time < 200ms
✓ Cumulative Layout Shift < 0.1
```

---

## Deployment Considerations

### Static Hosting (Recommended)
- **GitHub Pages**: Free, automatic deploy
- **Netlify**: Free tier, CDN, forms support
- **Vercel**: Free tier, edge network
- **Cloudflare Pages**: Free tier, fast CDN

### File Structure for Deployment
```
dist/               (if using build system)
├── css/
├── js/
├── components/
├── content/
├── index.html
└── ...

# Or just deploy root directory as-is
```

### Caching Headers
```nginx
# nginx example
location ~* \.(css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

---

## Future Enhancements

### After Refactoring
- [ ] Add TypeScript for better type safety
- [ ] Implement service worker for offline support
- [ ] Add lazy loading for images
- [ ] Optimize font loading (FOUT prevention)
- [ ] Add E2E tests with Playwright
- [ ] Implement analytics
- [ ] Add search functionality
- [ ] Create dark/light mode toggle

### Nice-to-Haves
- [ ] PWA support
- [ ] WebGL enhancements
- [ ] Real-time features (WebSocket)
- [ ] Internationalization (i18n)
- [ ] CMS integration

---

## Success Criteria

### Code Quality
- [x] ✅ Content centralized (completed)
- [ ] All CSS in external files
- [ ] All JS in modules
- [ ] No code duplication
- [ ] Consistent naming conventions

### Maintainability
- [ ] Edit 1 file for global changes
- [ ] Clear file organization
- [ ] Component documentation
- [ ] Easy onboarding for new developers

### Performance
- [ ] HTML files < 50 KB each
- [ ] Lighthouse score > 90
- [ ] First load < 3s
- [ ] Subsequent loads < 1s

### Developer Experience
- [ ] Easy to find code
- [ ] Fast iteration (< 5 min for changes)
- [ ] Clear documentation
- [ ] Simple deployment

---

**Ready to start? Follow the REFACTORING_PLAN.md for detailed steps!** 🚀
