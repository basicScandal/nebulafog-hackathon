/**
 * Content Loader
 * Centralized content management system for NEBULA:FOG:PRIME 2026
 *
 * This module loads content from content.json and populates HTML elements
 * across all pages of the website.
 */

class ContentLoader {
    constructor() {
        this.content = null;
        this.currentPage = this.detectCurrentPage();
    }

    /**
     * Detect the current page based on URL
     */
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);

        if (page === '' || page === 'index.html') return 'home';
        if (page === 'challenges.html') return 'challenges';
        if (page === 'dashboard.html') return 'dashboard';
        if (page === 'register.html') return 'register';
        if (page === 'about.html') return 'about';

        return 'home'; // Default
    }

    /**
     * Load content from content.json
     */
    async loadContent() {
        try {
            const response = await fetch('content.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.content = await response.json();
            return this.content;
        } catch (error) {
            console.error('Failed to load content:', error);
            // Fallback to showing hardcoded content if JSON fails
            return null;
        }
    }

    /**
     * Initialize content loading for the current page
     */
    async init() {
        await this.loadContent();

        if (!this.content) {
            console.warn('Content not loaded, using hardcoded HTML content');
            return;
        }

        // Load common elements (navigation, footer)
        this.loadNavigation();
        this.loadFooter();
        this.loadLoadingScreen();

        // Load page-specific content
        switch(this.currentPage) {
            case 'home':
                this.loadHomePage();
                break;
            case 'challenges':
                this.loadChallengesPage();
                break;
            case 'dashboard':
                this.loadDashboardPage();
                break;
            case 'register':
                this.loadRegisterPage();
                break;
            case 'about':
                this.loadAboutPage();
                break;
        }
    }

    /**
     * Load navigation content
     */
    loadNavigation() {
        const nav = this.content.common.navigation;

        // Update logo
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.textContent = nav.logo;
        }

        // Update navigation links
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && nav.links) {
            navLinks.innerHTML = nav.links.map(link => `
                <li><a href="${link.href}" class="nav-item" aria-label="${link.label}">${link.label}</a></li>
            `).join('');

            // Set active link based on current page
            this.setActiveNavLink();
        }
    }

    /**
     * Set active navigation link based on current page
     */
    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (currentPath.includes(href) || (href === 'index.html' && currentPath.endsWith('/'))) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Load footer content
     */
    loadFooter() {
        const footer = this.content.common.footer;

        // Update footer logo
        const footerLogo = document.querySelector('.footer-logo');
        if (footerLogo) {
            footerLogo.textContent = footer.logo;
        }

        // Update copyright
        const footerText = document.querySelector('.footer-text');
        if (footerText) {
            footerText.innerHTML = footer.copyright;
        }

        // Update social links
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks && footer.socialLinks) {
            socialLinks.innerHTML = footer.socialLinks.map(link => `
                <a href="${link.href}" class="social-link" aria-label="${link.name}" target="_blank" rel="noopener">
                    <i class="${link.icon}"></i>
                </a>
            `).join('');
        }
    }

    /**
     * Load loading screen content
     */
    loadLoadingScreen() {
        const loading = this.content.common.loading;

        const loadingLogo = document.querySelector('.loading-logo');
        if (loadingLogo) {
            loadingLogo.textContent = loading.logo;
        }

        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = loading.text;
        }
    }

    /**
     * Load home page content
     */
    loadHomePage() {
        const home = this.content.home;

        // Hero section
        this.loadHeroSection(home.hero);

        // Status cards
        this.loadStatusCards(home.statusCards);

        // Protocol cards
        this.loadProtocolCards(home.protocolCards);

        // Workshops
        this.loadWorkshops(home.workshops);

        // CTA section
        this.loadCTASection(home.cta);
    }

    /**
     * Load hero section
     */
    loadHeroSection(hero) {
        // Badge
        const badge = document.querySelector('.hero-badge');
        if (badge) badge.textContent = hero.badge;

        // Title
        const title = document.querySelector('.hero-title');
        if (title) {
            title.textContent = hero.title;
            title.setAttribute('data-text', hero.title);
        }

        // Subtitle
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) subtitle.textContent = hero.subtitle;

        // Description
        const description = document.querySelector('.hero-description');
        if (description) description.textContent = hero.description;

        // CTA buttons
        const ctaContainer = document.querySelector('.hero-cta');
        if (ctaContainer && hero.cta) {
            ctaContainer.innerHTML = hero.cta.map(btn => `
                <a href="${btn.href}" class="btn ${btn.primary ? '' : 'btn-secondary'}">${btn.text}</a>
            `).join('');
        }
    }

    /**
     * Load status cards
     */
    loadStatusCards(cards) {
        const statusSection = document.querySelector('.status-section');
        if (!statusSection || !cards) return;

        statusSection.innerHTML = cards.map(card => `
            <div class="status-card" data-animate>
                <div class="status-icon"><i class="${card.icon}"></i></div>
                <div class="status-title">${card.title}</div>
                <div class="status-value">${card.value}</div>
                <div class="status-description">${card.description}</div>
            </div>
        `).join('');
    }

    /**
     * Load protocol cards
     */
    loadProtocolCards(cards) {
        const protocolSection = document.querySelector('.protocol-cards');
        if (!protocolSection || !cards) return;

        protocolSection.innerHTML = cards.map(card => `
            <div class="protocol-card" data-href="${card.href}" role="button" tabindex="0" aria-label="${card.title}">
                <div class="card-icon"><i class="${card.icon}"></i></div>
                <h3 class="card-title">${card.title}</h3>
                <p class="card-description">${card.description}</p>
                <ul class="card-features">
                    ${card.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    /**
     * Load workshops
     */
    loadWorkshops(workshops) {
        const workshopGrid = document.querySelector('.workshop-grid');
        if (!workshopGrid || !workshops) return;

        workshopGrid.innerHTML = workshops.map(workshop => `
            <div class="workshop-card" data-animate>
                <div class="workshop-icon"><i class="${workshop.icon}"></i></div>
                <h3 class="workshop-title">${workshop.title}</h3>
                <p class="workshop-description">${workshop.description}</p>
            </div>
        `).join('');
    }

    /**
     * Load CTA section
     */
    loadCTASection(cta) {
        const ctaTitle = document.querySelector('.cta-section .cta-title');
        if (ctaTitle) ctaTitle.textContent = cta.title;

        const ctaText = document.querySelector('.cta-section .cta-text');
        if (ctaText) ctaText.textContent = cta.text;

        const ctaButtons = document.querySelector('.cta-section .cta-buttons');
        if (ctaButtons && cta.buttons) {
            ctaButtons.innerHTML = cta.buttons.map(btn => `
                <a href="${btn.href}" class="btn ${btn.primary ? '' : 'btn-secondary'}">${btn.text}</a>
            `).join('');
        }
    }

    /**
     * Load challenges page content
     */
    loadChallengesPage() {
        const challenges = this.content.challenges;

        // Header
        const header = document.querySelector('.matrix-header');
        if (header) {
            const title = header.querySelector('.matrix-title');
            const subtitle = header.querySelector('.matrix-subtitle');

            if (title) title.textContent = challenges.header.title;
            if (subtitle) subtitle.textContent = challenges.header.subtitle;
        }

        // Challenge categories
        this.loadChallengeCategories(challenges.categories);

        // Challenge stats
        this.loadChallengeStats(challenges.stats);
    }

    /**
     * Load challenge categories
     */
    loadChallengeCategories(categories) {
        const categoriesContainer = document.querySelector('.challenge-categories');
        if (!categoriesContainer || !categories) return;

        categoriesContainer.innerHTML = categories.map(cat => `
            <div class="category-card" data-category="${cat.id}" data-difficulty="${cat.difficulty}">
                <div class="category-header">
                    <span class="category-icon">${cat.icon}</span>
                    <div class="category-info">
                        <h3>${cat.title}</h3>
                        <div class="category-meta">
                            <span class="difficulty ${cat.difficulty}">${cat.difficulty}</span>
                            <span>${cat.challengeCount} Challenges</span>
                            <span>${cat.totalPoints} Points</span>
                        </div>
                    </div>
                </div>
                <p class="category-description">${cat.description}</p>
                <ul class="challenge-list">
                    ${cat.challenges.map(challenge => `
                        <li class="challenge-item">
                            <span class="challenge-name">${challenge.name}</span>
                            <span class="challenge-points">${challenge.points} pts</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="category-stats">
                    <div class="stat-item">
                        <div class="stat-value">${cat.stats.participants}</div>
                        <div class="stat-label">Participants</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${cat.stats.completion}</div>
                        <div class="stat-label">Completion</div>
                    </div>
                    <a href="register.html" class="join-button">Join Challenge</a>
                </div>
            </div>
        `).join('');
    }

    /**
     * Load challenge stats
     */
    loadChallengeStats(stats) {
        const statsContainer = document.querySelector('.challenge-stats');
        if (!statsContainer || !stats) return;

        statsContainer.innerHTML = stats.map(stat => `
            <div class="stat-card" data-animate>
                <div class="stat-icon">${stat.icon}</div>
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    /**
     * Load dashboard page content
     */
    loadDashboardPage() {
        const dashboard = this.content.dashboard;

        // Header
        const title = document.querySelector('.dashboard-title');
        if (title) title.textContent = dashboard.header.title;

        const subtitle = document.querySelector('.dashboard-subtitle');
        if (subtitle) subtitle.textContent = dashboard.header.subtitle;

        // Stats grid
        this.loadDashboardStats(dashboard.stats);

        // Chart titles
        this.loadChartTitles(dashboard.charts);
    }

    /**
     * Load dashboard stats
     */
    loadDashboardStats(stats) {
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid || !stats) return;

        statsGrid.innerHTML = stats.map(stat => `
            <div class="stat-card" data-animate>
                <div class="stat-icon">${stat.icon}</div>
                <div class="stat-value" id="${stat.id}">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
                <div class="stat-change" id="${stat.id}-change">${stat.change}</div>
            </div>
        `).join('');
    }

    /**
     * Load chart titles
     */
    loadChartTitles(charts) {
        Object.entries(charts).forEach(([key, chart]) => {
            const cardSelector = key === 'activity_feed' ? '#activity-feed' : `#${key}-chart`;
            const card = document.querySelector(cardSelector);

            if (card) {
                const parent = card.closest('.dashboard-card');
                if (parent) {
                    const titleEl = parent.querySelector('.card-title');
                    const iconEl = parent.querySelector('.card-icon');

                    if (titleEl) titleEl.textContent = chart.title;
                    if (iconEl) iconEl.textContent = chart.icon;
                }
            }
        });
    }

    /**
     * Load register page content
     */
    loadRegisterPage() {
        const register = this.content.register;

        // Header
        const title = document.querySelector('.form-title');
        if (title) title.textContent = register.header.title;

        const subtitle = document.querySelector('.form-subtitle');
        if (subtitle) subtitle.textContent = register.header.subtitle;

        // Benefits
        this.loadRegistrationBenefits(register.benefits);
    }

    /**
     * Load registration benefits
     */
    loadRegistrationBenefits(benefits) {
        const benefitsTitle = document.querySelector('.benefits-title');
        if (benefitsTitle) benefitsTitle.textContent = benefits.title;

        const benefitsGrid = document.querySelector('.benefits-grid');
        if (benefitsGrid && benefits.items) {
            benefitsGrid.innerHTML = benefits.items.map(item => `
                <div class="benefit-item">
                    <span class="benefit-icon">✓</span>
                    <span>${item}</span>
                </div>
            `).join('');
        }
    }

    /**
     * Load about page content
     */
    loadAboutPage() {
        const about = this.content.about;

        // Header
        const title = document.querySelector('.about-title');
        if (title) title.textContent = about.header.title;

        const subtitle = document.querySelector('.about-subtitle');
        if (subtitle) subtitle.textContent = about.header.subtitle;

        // Mission
        this.loadMission(about.mission);

        // Event details
        this.loadEventDetails(about.eventDetails);

        // Challenge categories
        this.loadAboutChallenges(about.challengeCategories);

        // Timeline
        this.loadTimeline(about.timeline);

        // Team
        this.loadTeam(about.team);

        // CTA
        this.loadCTASection(about.cta);
    }

    /**
     * Load mission section
     */
    loadMission(mission) {
        const missionTitle = document.querySelector('.mission-title');
        if (missionTitle) missionTitle.textContent = mission.title;

        const missionText = document.querySelector('.mission-text');
        if (missionText) missionText.textContent = mission.text;

        const highlights = document.querySelector('.mission-highlights');
        if (highlights && mission.highlights) {
            highlights.innerHTML = mission.highlights.map(h => `
                <div class="highlight-card" data-animate>
                    <div class="highlight-icon">${h.icon}</div>
                    <h3 class="highlight-title">${h.title}</h3>
                    <p class="highlight-description">${h.description}</p>
                </div>
            `).join('');
        }
    }

    /**
     * Load event details
     */
    loadEventDetails(details) {
        const detailsContainer = document.querySelector('.detail-content');
        if (!detailsContainer || !details) return;

        detailsContainer.innerHTML = details.map(detail => `
            <div class="detail-card">
                <h4>${detail.title}</h4>
                <p>${detail.content}</p>
                <p>${detail.subtitle}</p>
                <ul class="detail-list">
                    ${detail.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    /**
     * Load about page challenge categories
     */
    loadAboutChallenges(categories) {
        const container = document.querySelector('.detail-section:nth-of-type(2) .detail-content');
        if (!container || !categories) return;

        container.innerHTML = categories.map(cat => `
            <div class="detail-card">
                <h4>${cat.title}</h4>
                <p>${cat.description}</p>
            </div>
        `).join('');
    }

    /**
     * Load timeline
     */
    loadTimeline(timeline) {
        const timelineContainer = document.querySelector('.timeline');
        if (!timelineContainer || !timeline) return;

        // Find or create timeline items container
        let itemsContainer = timelineContainer.querySelector('.timeline-items');
        if (!itemsContainer) {
            // Insert items after title
            const title = timelineContainer.querySelector('.timeline-title');
            itemsContainer = document.createElement('div');
            itemsContainer.className = 'timeline-items';
            if (title && title.nextSibling) {
                timelineContainer.insertBefore(itemsContainer, title.nextSibling);
            }
        }

        itemsContainer.innerHTML = timeline.map(item => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-description">${item.description}</p>
                </div>
                <div class="timeline-date">${item.date}</div>
            </div>
        `).join('');
    }

    /**
     * Load team members
     */
    loadTeam(team) {
        const teamGrid = document.querySelector('.team-grid');
        if (!teamGrid || !team) return;

        teamGrid.innerHTML = team.map(member => `
            <div class="team-member" data-animate>
                <div class="member-avatar">${member.avatar}</div>
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p class="member-bio">${member.bio}</p>
            </div>
        `).join('');
    }
}

// Initialize content loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        const loader = new ContentLoader();
        await loader.init();
    });
} else {
    // DOM already loaded
    const loader = new ContentLoader();
    loader.init();
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentLoader;
}
