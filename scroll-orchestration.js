// NEBULA:FOG:PRIME 2026 - GSAP Scroll Orchestration
// Full-page continuous data flow animation system

class ScrollOrchestrator {
    constructor() {
        this.isInitialized = false;
        this.scrollProgress = 0;
        this.particles = null;

        // Wait for DOM and GSAP to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.initSimpleMode();
            return;
        }

        // Wait for loading screen to hide
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            setTimeout(() => this.initScrollAnimations(), 1800);
        } else {
            this.initScrollAnimations();
        }
    }

    initSimpleMode() {
        // Simple fallback for reduced motion - just show all elements
        gsap.set('.hero-badge, .hero-subtitle, .hero-description, .hero-cta, .terminal-container, .status-card, .protocol-card, .workshop-card, .cta-section, .footer', {
            opacity: 1,
            transform: 'none'
        });
        console.log('ScrollOrchestrator: Reduced motion mode active');
    }

    initScrollAnimations() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Split hero title into characters
        this.splitHeroTitle();

        // Create master timeline
        this.createScrollProgressIndicator();
        this.createHeroAnimations();
        this.createTerminalPinZone();
        this.createStatusCardsStream();
        this.createProtocolCards3D();
        this.createWorkshopFlow();
        this.createCTAEmergence();
        this.createFooterReveal();
        this.createParticleScrollSync();
        this.createDataStreamEffect();

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();

        this.isInitialized = true;
        console.log('ScrollOrchestrator: Full-page orchestration initialized');
    }

    // ========== TEXT SPLITTING ==========
    splitHeroTitle() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        const dataText = heroTitle.getAttribute('data-text');

        // Clear and rebuild with spans
        heroTitle.innerHTML = '';
        heroTitle.setAttribute('data-text', dataText || text);

        // Split each character
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = char === ' ' ? 'char space' : 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--char-index', index);
            heroTitle.appendChild(span);
        });

        this.heroChars = heroTitle.querySelectorAll('.char');
    }

    // ========== SCROLL PROGRESS INDICATOR ==========
    createScrollProgressIndicator() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        gsap.to(progressBar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });
    }

    // ========== HERO ANIMATIONS (ON LOAD - not scroll triggered) ==========
    createHeroAnimations() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Hero animations play ON LOAD (after loading screen hides)
        // This is a time-based intro animation, NOT scroll-triggered
        const heroTL = gsap.timeline({
            delay: 0.3 // Small delay after loading screen
        });

        // Badge drops in
        heroTL.to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, 0);

        // Characters animate in with stagger
        if (this.heroChars && this.heroChars.length > 0) {
            heroTL.to(this.heroChars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: {
                    each: 0.04,
                    from: 'start'
                },
                duration: 0.6,
                ease: 'power3.out'
            }, 0.2);
        }

        // Subtitle glitches in
        heroTL.to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
                document.querySelector('.hero-subtitle')?.classList.add('glitch-subtle');
            }
        }, 0.6);

        // Description fades in
        heroTL.to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, 0.8);

        // CTA buttons appear
        heroTL.to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        }, 1.0);

        // Terminal scales up
        heroTL.to('.terminal-container', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)'
        }, 1.1);

        // ADD: Scroll-based parallax for hero AFTER it's revealed
        this.createHeroParallax();
    }

    // Parallax effect on hero as user scrolls past it
    createHeroParallax() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        gsap.to(heroContent, {
            y: 150,
            opacity: 0.3,
            scale: 0.95,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // ========== TERMINAL PIN ZONE (25-35%) ==========
    createTerminalPinZone() {
        const terminal = document.querySelector('.terminal-container');
        if (!terminal) return;

        // Create a pin trigger for the terminal section
        ScrollTrigger.create({
            trigger: '.hero',
            start: 'bottom center',
            end: '+=30%',
            pin: false, // Don't pin the entire hero, just create visual effect
            onUpdate: (self) => {
                // Intensify terminal glow based on scroll progress
                const progress = self.progress;
                const glowIntensity = 0.2 + (progress * 0.6);
                terminal.style.boxShadow = `
                    0 0 0 1px var(--border-color),
                    0 0 ${30 + progress * 30}px rgba(0, 255, 170, ${glowIntensity}),
                    0 20px 50px rgba(0, 0, 0, 0.5)
                `;
            }
        });
    }

    // ========== STATUS CARDS STREAM (35-45%) ==========
    createStatusCardsStream() {
        const statusCards = document.querySelectorAll('.status-card');
        if (statusCards.length === 0) return;

        statusCards.forEach((card, index) => {
            const isOdd = index % 2 === 0;
            const xStart = isOdd ? -100 : 100;

            gsap.fromTo(card,
                {
                    opacity: 0,
                    x: xStart,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'top 50%',
                        scrub: 1,
                        // markers: true
                    }
                }
            );

            // Add counter animation for status values
            const valueEl = card.querySelector('.status-value');
            if (valueEl) {
                const finalValue = valueEl.textContent;
                const numericMatch = finalValue.match(/[\d,]+/);

                if (numericMatch) {
                    const numericValue = parseInt(numericMatch[0].replace(/,/g, ''));
                    const prefix = finalValue.split(numericMatch[0])[0] || '';
                    const suffix = finalValue.split(numericMatch[0])[1] || '';

                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 70%',
                        onEnter: () => {
                            gsap.fromTo({ val: 0 },
                                { val: 0 },
                                {
                                    val: numericValue,
                                    duration: 1.5,
                                    ease: 'power2.out',
                                    onUpdate: function() {
                                        valueEl.textContent = prefix + Math.floor(this.targets()[0].val).toLocaleString() + suffix;
                                    }
                                }
                            );
                        },
                        once: true
                    });
                }
            }
        });
    }

    // ========== PROTOCOL CARDS 3D ASSEMBLY (45-60%) ==========
    createProtocolCards3D() {
        const protocolCards = document.querySelectorAll('.protocol-card');
        if (protocolCards.length === 0) return;

        // Set initial 3D transforms with random rotations
        protocolCards.forEach((card, index) => {
            const rotateY = (Math.random() - 0.5) * 60; // -30 to 30
            const rotateX = (Math.random() - 0.5) * 40; // -20 to 20
            const zOffset = -200 - (Math.random() * 100);

            gsap.set(card, {
                opacity: 0,
                z: zOffset,
                rotateY: rotateY,
                rotateX: rotateX,
                transformOrigin: 'center center'
            });

            // Animate to final position
            gsap.to(card, {
                opacity: 1,
                z: 0,
                rotateY: 0,
                rotateX: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'top 40%',
                    scrub: 1.5
                }
            });
        });

        // Add collective glow pulse when all cards are visible
        ScrollTrigger.create({
            trigger: '.protocol-cards',
            start: 'center center',
            onEnter: () => {
                protocolCards.forEach((card, index) => {
                    gsap.to(card, {
                        boxShadow: '0 20px 40px rgba(0, 255, 170, 0.4), inset 0 0 30px rgba(0, 255, 170, 0.1)',
                        duration: 0.5,
                        delay: index * 0.1,
                        yoyo: true,
                        repeat: 1
                    });
                });
            },
            once: true
        });
    }

    // ========== WORKSHOP CARDS FLOW (60-75%) ==========
    createWorkshopFlow() {
        const workshopSection = document.querySelector('.workshop-section');
        const workshopTitle = workshopSection?.querySelector('.workshop-title');
        const workshopCards = document.querySelectorAll('.workshop-card');

        if (!workshopSection) return;

        // Animate section title
        if (workshopTitle) {
            gsap.fromTo(workshopTitle,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: workshopSection,
                        start: 'top 80%',
                        end: 'top 60%',
                        scrub: 1
                    }
                }
            );
        }

        // Workshop cards flow upward like data packets
        workshopCards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 95%',
                        end: 'top 60%',
                        scrub: 1
                    }
                }
            );

            // Add subtle floating animation after reveal
            ScrollTrigger.create({
                trigger: card,
                start: 'top 50%',
                onEnter: () => {
                    gsap.to(card, {
                        y: -5,
                        duration: 2,
                        ease: 'sine.inOut',
                        yoyo: true,
                        repeat: -1
                    });
                },
                once: true
            });
        });
    }

    // ========== CTA EMERGENCE (85-95%) ==========
    createCTAEmergence() {
        const ctaSection = document.querySelector('.cta-section');
        if (!ctaSection) return;

        const ctaTL = gsap.timeline({
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 80%',
                end: 'center center',
                scrub: 1
            }
        });

        // Section fades in
        ctaTL.to(ctaSection, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, 0);

        // Title scales up
        ctaTL.to('.cta-section .cta-title', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.5)'
        }, 0.2);

        // Text appears
        ctaTL.to('.cta-section .cta-text', {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, 0.4);

        // Buttons emerge
        ctaTL.to('.cta-section .cta-buttons', {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, 0.6);

        // Particle burst effect on CTA visibility
        ScrollTrigger.create({
            trigger: ctaSection,
            start: 'center center',
            onEnter: () => this.triggerParticleBurst(),
            once: true
        });
    }

    // ========== FOOTER REVEAL (95-100%) ==========
    createFooterReveal() {
        const footer = document.querySelector('.footer');
        if (!footer) return;

        gsap.fromTo(footer,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 95%',
                    end: 'top 70%',
                    scrub: 1
                }
            }
        );
    }

    // ========== PARTICLE SCROLL SYNC ==========
    createParticleScrollSync() {
        // Sync particle behavior with scroll position
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                this.scrollProgress = self.progress;
                this.updateParticleSystem(self.progress);
            }
        });
    }

    updateParticleSystem(progress) {
        // Access the global cyberpunk interface if available
        if (window.cyberpunkInterface && window.cyberpunkInterface.particles) {
            const particles = window.cyberpunkInterface.particles;

            // Modify particle behavior based on scroll progress
            particles.forEach(particle => {
                // Increase particle speed in middle of page
                const speedMultiplier = 1 + Math.sin(progress * Math.PI) * 0.5;
                particle.vx *= speedMultiplier > 1 ? 1.001 : 0.999;
                particle.vy *= speedMultiplier > 1 ? 1.001 : 0.999;

                // Change opacity based on scroll
                if (progress > 0.5) {
                    particle.opacity = Math.max(0.1, particle.opacity * 0.999);
                }
            });
        }
    }

    triggerParticleBurst() {
        // Create a visual particle burst effect
        if (window.cyberpunkInterface && window.cyberpunkInterface.particles) {
            const particles = window.cyberpunkInterface.particles;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            particles.forEach(particle => {
                const dx = particle.x - centerX;
                const dy = particle.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = 10 / (distance + 1);

                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
            });
        }
    }

    // ========== DATA STREAM EFFECT ==========
    createDataStreamEffect() {
        const dataStreamLine = document.querySelector('.data-stream-line');
        if (!dataStreamLine) return;

        // Pulse the data stream line based on scroll
        gsap.to(dataStreamLine, {
            opacity: 0.3,
            scrollTrigger: {
                trigger: 'body',
                start: '20% top',
                end: '80% top',
                scrub: true,
                onUpdate: (self) => {
                    // Pulse effect in middle of scroll
                    const pulseIntensity = Math.sin(self.progress * Math.PI);
                    dataStreamLine.style.opacity = pulseIntensity * 0.2;
                }
            }
        });
    }

    // ========== UTILITY METHODS ==========
    refresh() {
        ScrollTrigger.refresh();
    }

    destroy() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}

// Initialize on page load
window.scrollOrchestrator = new ScrollOrchestrator();

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.scrollOrchestrator && window.scrollOrchestrator.isInitialized) {
            window.scrollOrchestrator.refresh();
        }
    }, 250);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollOrchestrator;
}
