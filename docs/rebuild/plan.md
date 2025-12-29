# NEBULA:FOG Hackathon Website - Implementation Plan

> Step-by-step guide to rebuild the complete hackathon website from scratch. Follow this plan sequentially for best results.

## Prerequisites

- Basic HTML/CSS/JS knowledge
- Code editor (VS Code recommended)
- Local server (Python or Node)
- Git for version control
- Modern browser for testing

## Phase 1: Project Setup (Day 1)

### 1.1 Initialize Repository
```bash
mkdir nebulafog-2026
cd nebulafog-2026
git init
```

### 1.2 Create File Structure
```
nebulafog-2026/
├── index.html           # Homepage
├── about.html           # Mission/story page
├── challenges.html      # Challenge tracks
├── schedule.html        # Event timeline
├── register.html        # Registration form
├── partners.html        # Sponsors page
├── code-of-conduct.html # Code of conduct
├── images/              # Image assets
├── CLAUDE.md            # AI assistant instructions
└── README.md            # Project documentation
```

### 1.3 Create Base HTML Template
All pages share this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>PAGE_TITLE - NEBULA:FOG:PROTOCOL 2026</title>

    <!-- Meta tags -->
    <meta name="description" content="AI x Security Hackathon. 120 builders. 8 hours.">
    <meta property="og:title" content="NEBULA:FOG:PROTOCOL 2026">
    <meta property="og:description" content="AI x Security Hackathon">
    <meta name="theme-color" content="#00ff9f">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css">

    <!-- GSAP -->
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <style>
        /* CSS GOES HERE - ALL INLINE */
    </style>
</head>
<body>
    <!-- Skip link for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Desktop Navigation -->
    <nav class="hud-nav" aria-label="Main navigation">
        <!-- Nav content -->
    </nav>

    <!-- Main Content -->
    <main id="main-content">
        <!-- Page content -->
    </main>

    <!-- Footer -->
    <footer class="footer">
        <!-- Footer content -->
    </footer>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" aria-label="Mobile navigation">
        <!-- Mobile nav -->
    </nav>

    <script>
        /* JAVASCRIPT GOES HERE - ALL INLINE */
    </script>
</body>
</html>
```

### 1.4 Design System CSS Variables
Add to every page's `<style>` section:

```css
:root {
    /* Colors */
    --color-bg: #030303;
    --color-bg-elevated: #0a0a0a;
    --color-primary: #00ff9f;
    --color-secondary: #ff0080;
    --color-accent: #0ff;
    --color-warning: #ff3d00;
    --color-text: #ffffff;
    --color-text-muted: #666666;
    --color-text-dim: #333333;

    /* Typography */
    --font-mono: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
    --font-display: 'Space Grotesk', system-ui, sans-serif;

    /* Animation */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Reset */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-mono);
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

::selection {
    background: var(--color-primary);
    color: var(--color-bg);
}
```

---

## Phase 2: Navigation Components (Day 1-2)

### 2.1 Desktop HUD Navigation
```css
.hud-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(180deg, rgba(3,3,3,0.9) 0%, transparent 100%);
}

.hud-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.hud-nav-links a {
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    transition: color 0.3s var(--ease-out-expo);
}

.hud-nav-links a:hover,
.hud-nav-links a.active {
    color: var(--color-primary);
}

@media (max-width: 768px) {
    .hud-nav { display: none; }
}
```

### 2.2 Mobile Bottom Navigation
```css
.mobile-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(3, 3, 3, 0.95);
    border-top: 1px solid var(--color-text-dim);
    padding: 0.5rem 0;
    padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
}

.mobile-nav ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
}

.mobile-nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: 0.65rem;
    padding: 0.5rem;
}

.mobile-nav a.active {
    color: var(--color-primary);
}

@media (max-width: 768px) {
    .mobile-nav { display: block; }
    main { padding-bottom: calc(80px + env(safe-area-inset-bottom)); }
}
```

### 2.3 Footer Component
```css
.footer {
    padding: 3rem 5vw;
    text-align: center;
    border-top: 1px solid var(--color-text-dim);
}

.footer-logo {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 1.5rem 0;
    flex-wrap: wrap;
}

.footer-links a {
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
}

@media (max-width: 768px) {
    .footer { padding-bottom: 5rem; }
    .footer-links { gap: 1rem; }
}
```

---

## Phase 3: Homepage - Hero Section (Day 2)

### 3.1 Breach Sequence Overlay
Creates terminal boot animation on first visit:

```html
<div class="breach-overlay" id="breach-overlay">
    <div class="breach-terminal">
        <div class="breach-line">> Initializing breach protocol...</div>
        <div class="breach-line">> Scanning network interfaces...</div>
        <div class="breach-line success">> [OK] Interface detected</div>
        <div class="breach-line">> Bypassing firewall...</div>
        <div class="breach-line success">> [OK] Firewall compromised</div>
        <div class="breach-line">> ACCESS GRANTED<span class="blink">_</span></div>
    </div>
</div>
```

```javascript
// Breach sequence animation
async function playBreachSequence() {
    const overlay = document.getElementById('breach-overlay');
    const lines = overlay.querySelectorAll('.breach-line');

    for (let i = 0; i < lines.length; i++) {
        await new Promise(r => setTimeout(r, 300));
        lines[i].style.opacity = '1';
        lines[i].style.transform = 'translateY(0)';
    }

    await new Promise(r => setTimeout(r, 800));
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
}

// Only play on first visit
if (!sessionStorage.getItem('breachComplete')) {
    playBreachSequence();
    sessionStorage.setItem('breachComplete', 'true');
} else {
    document.getElementById('breach-overlay').style.display = 'none';
}
```

### 3.2 Hero Section
```html
<section class="hero" id="hero">
    <div class="hero-content">
        <span class="hero-tag">INCOMING TRANSMISSION // MARCH 2026</span>
        <div class="hero-brand">NEBULA:FOG</div>
        <h1 class="hero-title">SINGULARITY:PROTOCOL</h1>

        <div class="hero-stats">
            <div class="hero-stat">
                <span class="hero-stat-value" id="trust-index">73.4</span>
                <span class="hero-stat-label">Agent Trust Index %</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value" id="days-countdown">77</span>
                <span class="hero-stat-label">Days to Protocol</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value">TBD</span>
                <span class="hero-stat-label">Operatives Registered</span>
            </div>
        </div>

        <div class="hero-cta">
            <a href="register.html" class="btn-primary">
                <span>[ INITIATE REGISTRATION ]</span>
                <span class="arrow">>></span>
            </a>
            <a href="#" class="hero-secondary-link">
                <i class="fab fa-youtube"></i>
                <span>Watch 2025 Highlights</span>
            </a>
        </div>
    </div>

    <div class="scroll-indicator">
        <span>Scroll to infiltrate</span>
        <div class="scroll-line"></div>
    </div>
</section>
```

```css
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10vh 5vw;
    position: relative;
}

.hero-content {
    text-align: center;
    max-width: 900px;
}

.hero-tag {
    font-size: 0.8rem;
    color: var(--color-primary);
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
    display: block;
}

.hero-brand {
    font-size: clamp(1rem, 3vw, 1.5rem);
    color: var(--color-text-muted);
    letter-spacing: 0.5em;
    margin-bottom: 0.5rem;
}

.hero-title {
    font-family: var(--font-mono);
    font-size: clamp(2rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 2rem;
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 3rem;
}

.hero-stat-value {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--color-primary);
    display: block;
}

.hero-stat-label {
    font-size: 0.7rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    transition: all 0.3s var(--ease-out-expo);
}

.btn-primary:hover {
    background: var(--color-primary);
    color: var(--color-bg);
}

@media (max-width: 768px) {
    .hero-title {
        font-size: clamp(1rem, 6vw, 2.5rem);
        letter-spacing: -0.02em;
    }
    .hero-stats {
        flex-direction: column;
        gap: 1.5rem;
    }
}
```

---

## Phase 4: Homepage - Mission Debrief (Day 3)

### 4.1 Section Structure
```html
<section class="mission-debrief" id="mission-debrief">
    <div class="debrief-header">
        <span class="debrief-tag">// MISSION DEBRIEF: 2025</span>
        <h2 class="debrief-title">LAST YEAR, 120 BUILDERS CHANGED AI SECURITY</h2>
        <p class="debrief-subtitle">Here's what happened when we let them loose.</p>
    </div>

    <div class="debrief-stats">
        <div class="debrief-stat">
            <span class="debrief-stat-value" data-value="120">0</span>
            <span class="debrief-stat-label">Hackers</span>
        </div>
        <div class="debrief-stat">
            <span class="debrief-stat-value" data-value="4">0</span>
            <span class="debrief-stat-label">Tracks</span>
        </div>
        <div class="debrief-stat">
            <span class="debrief-stat-value" data-value="24">0</span>
            <span class="debrief-stat-label">Projects</span>
        </div>
        <div class="debrief-stat">
            <span class="debrief-stat-value" data-value="8">0</span>
            <span class="debrief-stat-label">Hours</span>
        </div>
    </div>

    <div class="debrief-video">
        <a href="https://youtube.com/..." class="video-placeholder">
            <i class="fas fa-play-circle"></i>
            <span>Watch 2025 Highlights →</span>
        </a>
    </div>

    <div class="debrief-projects">
        <!-- Project cards here -->
    </div>
</section>
```

### 4.2 Animated Counter JavaScript
```javascript
function animateDebriefStats() {
    document.querySelectorAll('.debrief-stat-value').forEach(stat => {
        const target = parseInt(stat.dataset.value);
        const duration = 2000;
        const start = Date.now();

        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            stat.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                stat.textContent = target;
            }
        };
        animate();
    });
}

// Trigger on scroll
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
    trigger: '#mission-debrief',
    start: 'top 80%',
    onEnter: () => animateDebriefStats(),
    once: true
});
```

### 4.3 Project Showcase Cards
```html
<article class="project-card">
    <span class="project-track" data-track="SHADOW">SHADOW::VECTOR</span>
    <h3 class="project-name">Project Name</h3>
    <p class="project-desc">One-line description of what the project does.</p>
    <p class="project-team">Team: Name 1, Name 2, Name 3</p>
    <p class="project-quote">"Quote from the team about their experience."</p>
</article>
```

```css
.project-card {
    background: linear-gradient(135deg, rgba(0, 255, 159, 0.02) 0%, transparent 50%);
    border: 1px solid rgba(0, 255, 159, 0.1);
    padding: 2rem;
    transition: all 0.3s var(--ease-out-expo);
}

.project-card:hover {
    border-color: rgba(0, 255, 159, 0.3);
    transform: translateY(-5px);
}

.project-track {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    padding: 0.25rem 0.5rem;
    display: inline-block;
    margin-bottom: 0.75rem;
}

.project-track[data-track="SHADOW"] {
    color: #ff4444;
    background: rgba(255, 68, 68, 0.1);
}
.project-track[data-track="SENTINEL"] {
    color: #4488ff;
    background: rgba(68, 136, 255, 0.1);
}
.project-track[data-track="ZERO"] {
    color: #0ff;
    background: rgba(0, 255, 255, 0.1);
}
.project-track[data-track="ROGUE"] {
    color: #aa44ff;
    background: rgba(170, 68, 255, 0.1);
}
```

---

## Phase 5: Homepage - Protocol Cards (Day 3-4)

### 5.1 Protocol Card Structure
```html
<section class="protocols" id="protocols">
    <article class="protocol-card" data-index="01" data-classification="RED">
        <span class="protocol-index">01</span>
        <div class="protocol-content">
            <h2 class="protocol-title">SHADOW::VECTOR</h2>
            <p class="protocol-subtitle">Attack AI Systems</p>
            <p class="protocol-encrypted">[CLASSIFICATION: RED] OFFENSIVE PROTOCOL</p>
            <p class="protocol-tagline">"Break the chain of trust."</p>
            <p class="protocol-text">
                Full description of the track, what participants will build,
                and what skills are relevant.
            </p>
        </div>
    </article>
    <!-- Repeat for SENTINEL, ZERO, ROGUE -->
</section>
```

### 5.2 Decrypt Animation
```javascript
// Protocol cards decrypt on scroll
document.querySelectorAll('.protocol-card').forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, y: 100 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 40%',
                onEnter: () => card.classList.add('decrypted'),
                onLeaveBack: () => card.classList.remove('decrypted')
            }
        }
    );
});
```

---

## Phase 6: Homepage - Testimonials (Day 4)

### 6.1 Carousel Structure
```html
<section class="testimonials" id="testimonials">
    <div class="testimonials-header">
        <span class="testimonials-tag">// VOICES FROM THE FIELD</span>
        <h2 class="testimonials-title">What 2025 Operatives Are Saying</h2>
    </div>

    <div class="testimonial-carousel">
        <div class="testimonial-card">
            <p class="testimonial-quote">Quote text here...</p>
            <div class="testimonial-author">
                <div class="testimonial-avatar">MC</div>
                <div class="testimonial-info">
                    <span class="testimonial-name">Maya Chen</span>
                    <span class="testimonial-role">Stanford '25 • Shadow Team</span>
                </div>
            </div>
        </div>
        <!-- More cards -->
    </div>

    <div class="testimonial-dots">
        <span class="testimonial-dot active"></span>
        <span class="testimonial-dot"></span>
        <span class="testimonial-dot"></span>
    </div>
</section>
```

### 6.2 Carousel JavaScript
```javascript
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const dots = document.querySelectorAll('.testimonial-dot');
    const cards = document.querySelectorAll('.testimonial-card');

    if (!carousel || !dots.length) return;

    // Update dots on scroll
    carousel.addEventListener('scroll', () => {
        const cardWidth = cards[0].offsetWidth + 32; // width + gap
        const activeIndex = Math.round(carousel.scrollLeft / cardWidth);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    });

    // Click dot to scroll
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth + 32;
            carousel.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
        });
    });
}
```

---

## Phase 7: Homepage - Terminal (Day 4-5)

### 7.1 Terminal Structure
```html
<section class="command-section" id="command-section">
    <div class="command-prompt">
        <div class="command-header">
            <span class="command-dot red"></span>
            <span class="command-dot yellow"></span>
            <span class="command-dot green"></span>
        </div>
        <div class="command-output" id="command-output">
            <p class="success">> Connection established.</p>
            <p>> Type 'help' for available commands.</p>
        </div>
        <div class="command-input-line">
            <span class="command-prompt-symbol">$</span>
            <input type="text" class="command-input" id="command-input"
                   placeholder="Enter command..." autocomplete="off">
        </div>
    </div>
</section>
```

### 7.2 Terminal JavaScript
```javascript
function initCommandLine() {
    const input = document.getElementById('command-input');
    const output = document.getElementById('command-output');

    const commands = {
        help: () => `
            <p class="success">Available commands:</p>
            <p>  mission    - Display mission statement</p>
            <p>  challenges - View challenge tracks</p>
            <p>  schedule   - Show event timeline</p>
            <p>  register   - Initiate access protocol</p>
            <p>  status     - System status report</p>
            <p>  clear      - Clear terminal</p>
        `,
        mission: () => {
            setTimeout(() => window.location.href = 'about.html', 500);
            return '<p class="success">> Loading mission briefing...</p>';
        },
        challenges: () => `
            <p class="success">> CHALLENGE TRACKS // 2026</p>
            <p style="color:#ff4444">  01 SHADOW::VECTOR - Offensive</p>
            <p style="color:#4488ff">  02 SENTINEL::MESH - Defensive</p>
            <p style="color:#0ff">  03 ZERO::PROOF - Trust</p>
            <p style="color:#aa44ff">  04 ROGUE::AGENT - Open</p>
        `,
        register: () => {
            setTimeout(() => window.location.href = 'register.html', 500);
            return '<p class="success">> Initiating registration protocol...</p>';
        },
        schedule: () => {
            setTimeout(() => window.location.href = 'schedule.html', 500);
            return '<p class="success">> Loading timeline...</p>';
        },
        status: () => `
            <p class="success">> SYSTEM STATUS</p>
            <p>  Protocol: ACTIVE</p>
            <p>  Security Level: MAXIMUM</p>
            <p>  Registration: OPEN</p>
        `,
        clear: () => {
            output.innerHTML = '<p class="success">> Terminal cleared.</p>';
            return '';
        }
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            const response = commands[cmd]
                ? commands[cmd]()
                : `<p class="error">> Command not found: ${cmd}</p>`;

            if (response) {
                output.innerHTML += `<p>> ${input.value}</p>` + response;
            }
            output.scrollTop = output.scrollHeight;
            input.value = '';
        }
    });
}
```

---

## Phase 8: Additional Pages (Day 5-6)

### 8.1 About Page
- Anime.js-style story sections
- Animated statistics
- Track overview with visual cards
- Team/organizer section

### 8.2 Challenges Page
- Three.js 3D challenge matrix (optional)
- Detailed track descriptions
- Skill tags for each track
- Example project ideas

### 8.3 Schedule Page
- Timeline with GSAP scroll animations
- Phase cards (Check-in, Hacking, Demos, etc.)
- Time indicators

### 8.4 Register Page
- Form with validation
- Fear-reduction messaging
- FAQ section
- Social proof sidebar

### 8.5 Partners Page
- Partner logo grid
- Partnership tier levels
- Contact CTA

### 8.6 Code of Conduct
- Numbered sections
- Collapsible content
- Reporting information

---

## Phase 9: Interactive Features (Day 6-7)

### 9.1 Custom Cursor (Desktop Only)
```javascript
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        this.cursor.innerHTML = `
            <div class="cursor-dot"></div>
            <div class="cursor-ring"></div>
        `;
        document.body.appendChild(this.cursor);

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect on interactive elements
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.querySelector('.cursor-ring').classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.querySelector('.cursor-ring').classList.remove('hover');
            });
        });
    }
}

// Only on desktop
if (window.matchMedia('(min-width: 769px)').matches) {
    new CustomCursor();
    document.body.style.cursor = 'none';
}
```

### 9.2 Particle System
```javascript
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.min(100, window.innerWidth / 15);
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Draw
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 159, 0.5)';
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 159, ${0.2 * (1 - dist/150)})`;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Disable on mobile
if (window.matchMedia('(min-width: 769px)').matches) {
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;pointer-events:none;';
    document.body.appendChild(canvas);
    new ParticleSystem(canvas);
}
```

### 9.3 Sound System (Optional)
```javascript
class SoundSystem {
    constructor() {
        this.enabled = false;
        this.sounds = {
            hover: new Audio('data:audio/wav;base64,...'), // Inline base64 audio
            click: new Audio('data:audio/wav;base64,...'),
        };
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    play(name) {
        if (this.enabled && this.sounds[name]) {
            this.sounds[name].currentTime = 0;
            this.sounds[name].play().catch(() => {});
        }
    }
}
```

---

## Phase 10: Testing & Optimization (Day 7)

### 10.1 Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Mobile navigation displays correctly
- [ ] All links work
- [ ] Forms validate properly
- [ ] Animations respect reduced motion preference
- [ ] Terminal commands all work
- [ ] Scroll animations trigger correctly

### 10.2 Mobile Testing
- [ ] Test at 375px (iPhone SE)
- [ ] Test at 390px (iPhone 14)
- [ ] Test at 768px (iPad)
- [ ] Bottom nav is accessible
- [ ] Touch targets are 44px minimum
- [ ] No horizontal overflow

### 10.3 Performance Optimization
- [ ] Lighthouse score >85
- [ ] Images optimized (WebP, lazy loading)
- [ ] Fonts preloaded
- [ ] Scripts deferred
- [ ] No layout shift

### 10.4 Accessibility Testing
- [ ] Tab navigation works
- [ ] Skip links work
- [ ] Screen reader announces correctly
- [ ] Color contrast passes (4.5:1)
- [ ] Focus indicators visible

---

## Phase 11: Deployment (Day 7)

### 11.1 GitHub Pages Setup
```bash
# Create production branch
git checkout -b deploy

# Push to GitHub
git push -u origin deploy

# Enable GitHub Pages in repo settings
# Source: deploy branch, root folder
```

### 11.2 Custom Domain (Optional)
1. Add CNAME file with domain name
2. Configure DNS records
3. Enable HTTPS in GitHub settings

### 11.3 Final Checklist
- [ ] All pages deployed
- [ ] HTTPS working
- [ ] Meta tags correct
- [ ] Open Graph images working
- [ ] Analytics installed (if needed)
- [ ] Error pages configured

---

## Summary: Implementation Order

| Day | Phase | Deliverables |
|-----|-------|--------------|
| 1 | Setup | File structure, base template, design system |
| 1-2 | Navigation | Desktop nav, mobile nav, footer |
| 2 | Hero | Breach sequence, hero section |
| 3 | Debrief | Stats, video embed, project cards |
| 3-4 | Protocols | Challenge cards with decrypt animation |
| 4 | Testimonials | Carousel with dot navigation |
| 4-5 | Terminal | Interactive command line |
| 5-6 | Pages | About, challenges, schedule, register, partners, CoC |
| 6-7 | Features | Custom cursor, particles, sound (optional) |
| 7 | Testing | Mobile, accessibility, performance |
| 7 | Deploy | GitHub Pages, domain configuration |

---

## Maintenance Notes

### Updating Content
1. Edit the relevant HTML file directly
2. Test locally with `python3 -m http.server`
3. Commit and push to deploy branch

### Adding New Pages
1. Copy existing page as template
2. Update navigation in ALL pages
3. Match existing design patterns

### Updating Dependencies
All libraries are CDN-loaded. Update version numbers in `<script>` tags:
- GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/X.X.X/gsap.min.js`
- Font Awesome: `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@X.X.X/css/all.min.css`
