// NEBULA:FOG:PRIME 2026 - Enhanced Cyberpunk Experience
// Advanced implementation with all QA fixes and features

class CyberpunkInterface {
    constructor() {
        this.cursor = { x: 0, y: 0 };
        this.isLoaded = false;
        this.particles = [];
        this.cachedElements = {};
        this.commandHistory = [];
        this.historyIndex = -1;
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.setupCursor();
        this.setupParticles();
        this.setupTerminal();
        this.setupScrollAnimations();
        this.setupMobileNav();
        this.setupClickCircles();
        this.setupProtocolCards();
        this.setupErrorHandling();
        this.isLoaded = true;
        document.body.classList.add('loaded');
        console.log('NEBULA:FOG:PRIME v2.6.2026 Initialized');
    }

    cacheDOMElements() {
        // Cache frequently used elements for performance
        this.cachedElements = {
            cursor: document.querySelector('.custom-cursor'),
            terminal: document.querySelector('.terminal-container'),
            particleCanvas: document.getElementById('particle-canvas'),
            protocolCards: document.querySelectorAll('.protocol-card'),
            faqQuestions: document.querySelectorAll('.faq-question'),
            navItems: document.querySelectorAll('.nav-item'),
            sections: document.querySelectorAll('section')
        };
    }

    setupCursor() {
        if (!this.cachedElements.cursor) return;

        document.addEventListener('mousemove', (e) => {
            this.cursor.x = e.clientX;
            this.cursor.y = e.clientY;
            this.cachedElements.cursor.style.transform = `translate(${this.cursor.x}px, ${this.cursor.y}px)`;
        });

        document.addEventListener('mousedown', () => {
            this.cachedElements.cursor?.classList.add('active');
        });

        document.addEventListener('mouseup', () => {
            this.cachedElements.cursor?.classList.remove('active');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cachedElements.cursor?.classList.add('hidden');
        });

        document.addEventListener('mouseenter', () => {
            this.cachedElements.cursor?.classList.remove('hidden');
        });
    }

    setupParticles() {
        const canvas = this.cachedElements.particleCanvas;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create advanced particles
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                pulse: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }

        this.animateParticles(ctx, canvas);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    getRandomColor() {
        const colors = ['#00ffaa', '#ff0080', '#8000ff', '#ffff00'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateParticles(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update mouse influence
        const mouseInfluence = 150;
        const time = Date.now() * 0.001;

        this.particles.forEach((particle, index) => {
            // Mouse interaction
            if (this.cursor.x && this.cursor.y) {
                const dx = particle.x - this.cursor.x;
                const dy = particle.y - this.cursor.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseInfluence) {
                    const force = (mouseInfluence - distance) / mouseInfluence;
                    particle.vx += (dx / distance) * force * 0.5;
                    particle.vy += (dy / distance) * force * 0.5;
                }
            }

            // Update particle position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary collision with damping
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.vx *= -0.9;
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.vy *= -0.9;
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            }

            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Pulsing effect
            particle.pulsePhase += particle.pulse;
            const pulseSize = particle.size + Math.sin(particle.pulsePhase) * 0.5;

            // Draw particle with glow
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
            
            // Create gradient for glow effect
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, pulseSize * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.5, particle.color + '80');
            gradient.addColorStop(1, particle.color + '00');
            
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw connections to nearby particles
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx2 = particle.x - otherParticle.x;
                    const dy2 = particle.y - otherParticle.y;
                    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (distance2 < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = particle.color + Math.floor((1 - distance2 / 100) * 255).toString(16).padStart(2, '0');
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(() => this.animateParticles(ctx, canvas));
    }

    setupTerminal() {
        const terminal = this.cachedElements.terminal;
        if (!terminal) return;

        // Enhanced terminal commands
        this.terminalCommands = {
            'help': this.displayHelp.bind(this),
            'challenges': this.displayChallenges.bind(this),
            'register': this.displayRegistrationInfo.bind(this),
            'schedule': this.displaySchedule.bind(this),
            'about': this.displayAbout.bind(this),
            'partners': this.displayPartners.bind(this),
            'clear': this.clearTerminal.bind(this),
            'ls': this.displayDirectory.bind(this),
            'pwd': this.displayCurrentDirectory.bind(this),
            'whoami': this.displayUserInfo.bind(this),
            'date': this.displayDate.bind(this),
            'echo': this.displayEcho.bind(this),
            'neofetch': this.displaySystemInfo.bind(this)
        };

        this.suggestions = Object.keys(this.terminalCommands);
        this.currentDirectory = '~';
        this.username = 'user';
        this.hostname = 'nebulafog';

        this.createTerminalInterface();
        this.displayWelcomeMessage();
        this.setupTerminalInput();
    }

    createTerminalInterface() {
        const terminalContainer = document.querySelector('.terminal-container');
        if (!terminalContainer) return;

        terminalContainer.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-controls">
                    <span class="control close" title="Close"></span>
                    <span class="control minimize" title="Minimize"></span>
                    <span class="control maximize" title="Maximize"></span>
                </div>
                <div class="terminal-title">NEBULA:FOG:PRIME v2.6.2026</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-output"></div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">${this.username}@${this.hostname}:${this.currentDirectory}$ </span>
                    <input type="text" class="terminal-input" autocomplete="off" spellcheck="false" placeholder="Type 'help' for commands...">
                    <span class="terminal-cursor">█</span>
                </div>
            </div>
            <div class="terminal-suggestions"></div>
        `;

        this.terminalOutput = terminalContainer.querySelector('.terminal-output');
        this.terminalInput = terminalContainer.querySelector('.terminal-input');
        this.terminalCursor = terminalContainer.querySelector('.terminal-cursor');
        this.suggestionsContainer = terminalContainer.querySelector('.terminal-suggestions');
        this.promptElement = terminalContainer.querySelector('.terminal-prompt');
    }

    setupTerminalInput() {
        if (!this.terminalInput) return;

        this.terminalInput.addEventListener('keydown', (e) => this.handleTerminalKeydown(e));
        this.terminalInput.addEventListener('input', (e) => this.handleTerminalInput(e));
        this.terminalInput.addEventListener('focus', () => {
            this.terminalCursor?.classList.add('active');
        });
        this.terminalInput.addEventListener('blur', () => {
            this.terminalCursor?.classList.remove('active');
        });
    }

    handleTerminalKeydown(e) {
        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeTerminalCommand();
                break;
            case 'Tab':
                e.preventDefault();
                this.autoCompleteTerminal();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateTerminalHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateTerminalHistory(1);
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                // Allow cursor movement
                break;
            default:
                // Reset history index when typing
                this.historyIndex = -1;
        }
    }

    handleTerminalInput(e) {
        this.updateTerminalSuggestions();
    }

    updateTerminalSuggestions() {
        const input = this.terminalInput.value.trim();
        if (!input) {
            this.suggestionsContainer.innerHTML = '';
            return;
        }

        const matches = this.suggestions.filter(cmd => 
            cmd.startsWith(input.toLowerCase())
        );

        if (matches.length > 0) {
            this.suggestionsContainer.innerHTML = matches.map(cmd => 
                `<span class="suggestion" onclick="window.cyberpunkInterface.executeSuggestion('${cmd}')">${cmd}</span>`
            ).join('');
        } else {
            this.suggestionsContainer.innerHTML = '';
        }
    }

    executeSuggestion(command) {
        this.terminalInput.value = command;
        this.executeTerminalCommand();
    }

    executeTerminalCommand() {
        const command = this.terminalInput.value.trim();
        if (!command) return;

        this.addToTerminalHistory(command);
        this.displayCommand(command);
        
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (this.terminalCommands[cmd]) {
            try {
                this.terminalCommands[cmd](args);
            } catch (error) {
                this.displayOutput(`Error: ${error.message}`, 'error');
            }
        } else {
            this.displayOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }

        this.clearTerminalInput();
    }

    displayCommand(command) {
        this.displayOutput(`<span class="command-line"><span class="prompt">${this.promptElement.textContent}</span>${command}</span>`);
    }

    displayOutput(content, type = 'normal') {
        const outputDiv = document.createElement('div');
        outputDiv.className = `output-line ${type}`;
        outputDiv.innerHTML = content;
        this.terminalOutput.appendChild(outputDiv);
        this.scrollTerminalToBottom();
    }

    addToTerminalHistory(command) {
        this.commandHistory.push(command);
        if (this.commandHistory.length > 50) {
            this.commandHistory.shift();
        }
        this.historyIndex = -1;
    }

    navigateTerminalHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;
        this.historyIndex = Math.max(-1, Math.min(this.commandHistory.length - 1, this.historyIndex));

        if (this.historyIndex === -1) {
            this.terminalInput.value = '';
        } else {
            this.terminalInput.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
        }
    }

    autoCompleteTerminal() {
        const input = this.terminalInput.value.trim();
        if (!input) return;

        const matches = this.suggestions.filter(cmd => 
            cmd.startsWith(input.toLowerCase())
        );

        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            this.displayOutput(`Available commands: ${matches.join(', ')}`);
        }
    }

    scrollTerminalToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    clearTerminalInput() {
        this.terminalInput.value = '';
        this.suggestionsContainer.innerHTML = '';
    }

    // Terminal Command Implementations
    displayHelp() {
        const helpText = `
            <div class="help-output">
                <h3>Available Commands:</h3>
                <div class="command-grid">
                    <div class="command-item"><strong>help</strong> - Show this help message</div>
                    <div class="command-item"><strong>challenges</strong> - Browse hackathon challenges</div>
                    <div class="command-item"><strong>register</strong> - Registration information</div>
                    <div class="command-item"><strong>schedule</strong> - Event schedule</div>
                    <div class="command-item"><strong>about</strong> - About NEBULA:FOG:PRIME</div>
                    <div class="command-item"><strong>partners</strong> - Technical partners</div>
                    <div class="command-item"><strong>clear</strong> - Clear terminal</div>
                    <div class="command-item"><strong>ls</strong> - List directory contents</div>
                    <div class="command-item"><strong>pwd</strong> - Show current directory</div>
                    <div class="command-item"><strong>whoami</strong> - User information</div>
                    <div class="command-item"><strong>date</strong> - Current date and time</div>
                    <div class="command-item"><strong>echo</strong> - Echo text</div>
                    <div class="command-item"><strong>neofetch</strong> - System information</div>
                </div>
            </div>
        `;
        this.displayOutput(helpText);
    }

    displayChallenges() {
        const challenges = [
            { id: 'AI-001', name: 'Quantum Cryptography Break', category: 'AI/Security', difficulty: 'HARD', points: 1000 },
            { id: 'AI-002', name: 'Adversarial ML Defense', category: 'AI/Security', difficulty: 'MEDIUM', points: 750 },
            { id: 'BLOCK-001', name: 'Zero-Knowledge Proofs', category: 'Blockchain', difficulty: 'HARD', points: 1000 },
            { id: 'IOT-001', name: 'IoT Device Security', category: 'IoT', difficulty: 'MEDIUM', points: 500 },
            { id: 'SOCIAL-001', name: 'Social Engineering Detection', category: 'Security', difficulty: 'EASY', points: 250 }
        ];

        let challengeOutput = '<div class="challenges-output"><h3>Available Challenges:</h3>';
        challenges.forEach(challenge => {
            challengeOutput += `
                <div class="challenge-item">
                    <div class="challenge-header">
                        <span class="challenge-id">${challenge.id}</span>
                        <span class="challenge-difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                        <span class="challenge-points">${challenge.points} pts</span>
                    </div>
                    <div class="challenge-name">${challenge.name}</div>
                    <div class="challenge-category">${challenge.category}</div>
                </div>
            `;
        });
        challengeOutput += '</div>';
        this.displayOutput(challengeOutput);
    }

    displayRegistrationInfo() {
        this.displayOutput(`
            <div class="registration-output">
                <h3>Registration Information:</h3>
                <p>To register for NEBULA:FOG:PRIME 2026, please visit the <a href="register.html" class="terminal-link">registration page</a>.</p>
                <p>Registration includes:</p>
                <ul>
                    <li>Access to all challenges and workshops</li>
                    <li>Team formation assistance</li>
                    <li>Mentorship opportunities</li>
                    <li>Prizes and recognition</li>
                </ul>
                <p>Early bird registration ends soon!</p>
            </div>
        `);
    }

    displaySchedule() {
        const schedule = [
            { date: '2026-02-15', time: '09:00', event: 'Opening Ceremony', type: 'milestone' },
            { date: '2026-02-15', time: '10:00', event: 'Challenge Release', type: 'start' },
            { date: '2026-02-16', time: '12:00', event: 'Mid-point Check-in', type: 'checkpoint' },
            { date: '2026-02-17', time: '18:00', event: 'Submission Deadline', type: 'deadline' },
            { date: '2026-02-18', time: '14:00', event: 'Awards Ceremony', type: 'milestone' }
        ];

        let scheduleOutput = '<div class="schedule-output"><h3>Event Schedule:</h3>';
        schedule.forEach(item => {
            scheduleOutput += `
                <div class="schedule-item ${item.type}">
                    <div class="schedule-date">${item.date} ${item.time}</div>
                    <div class="schedule-event">${item.event}</div>
                </div>
            `;
        });
        scheduleOutput += '</div>';
        this.displayOutput(scheduleOutput);
    }

    displayAbout() {
        this.displayOutput(`
            <div class="about-output">
                <h3>About NEBULA:FOG:PRIME 2026:</h3>
                <p>The ultimate convergence of AI consciousness and cybersecurity in the shadows of the digital underground.</p>
                <p>Join 1337 elite hackers in a 48-hour battle for the future of human-machine collaboration.</p>
                <p><strong>Date:</strong> February 15-17, 2026</p>
                <p><strong>Location:</strong> Digital Realm</p>
                <p><strong>Prize Pool:</strong> $100,000+</p>
            </div>
        `);
    }

    displayPartners() {
        const partners = [
            { name: 'QuantumCore', type: 'Quantum Computing' },
            { name: 'NeuralNet', type: 'AI/ML Platform' },
            { name: 'CryptoVault', type: 'Blockchain Security' },
            { name: 'IoTShield', type: 'IoT Security' }
        ];

        let partnersOutput = '<div class="partners-output"><h3>Technical Partners:</h3>';
        partners.forEach(partner => {
            partnersOutput += `
                <div class="partner-item">
                    <div class="partner-name">${partner.name}</div>
                    <div class="partner-type">${partner.type}</div>
                </div>
            `;
        });
        partnersOutput += '</div>';
        this.displayOutput(partnersOutput);
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = '';
    }

    displayDirectory() {
        const files = [
            'challenges/		Hackathon challenges',
            'register		Registration information',
            'schedule		Event schedule',
            'about		About the event',
            'partners		Technical partners',
            'README.md		Event information'
        ];
        this.displayOutput(`<div class="ls-output">${files.join('<br>')}</div>`);
    }

    displayCurrentDirectory() {
        this.displayOutput(`/home/${this.username}/${this.currentDirectory}`);
    }

    displayUserInfo() {
        this.displayOutput(`<div class="whoami-output">${this.username}</div>`);
    }

    displayDate() {
        const now = new Date();
        this.displayOutput(now.toString());
    }

    displayEcho(args) {
        this.displayOutput(args.join(' '));
    }

    displaySystemInfo() {
        const systemInfo = `
            <div class="neofetch-output">
                <div class="neofetch-logo">
                    ███╗   ██╗███████╗███████╗██████╗ ███████╗██╗   ██╗███████╗
                    ████╗  ██║██╔════╝██╔════╝██╔══██╗██╔════╝██║   ██║██╔════╝
                    ██╔██╗ ██║█████╗  █████╗  ██████╔╝█████╗  ██║   ██║█████╗  
                    ██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ╚██╗ ██╔╝██╔══╝  
                    ██║ ╚████║███████╗███████╗██║  ██║███████╗ ╚████╔╝ ███████╗
                    ╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚══════╝
                </div>
                <div class="neofetch-info">
                    <strong>user@nebulafog</strong><br>
                    -------------------<br>
                    <strong>OS:</strong> NEBULA:FOG:PRIME v2.6.2026<br>
                    <strong>Host:</strong> Digital Realm<br>
                    <strong>Kernel:</strong> Quantum-Enhanced<br>
                    <strong>Uptime:</strong> 48 hours<br>
                    <strong>Shell:</strong> bash 5.1.16<br>
                    <strong>Resolution:</strong> 1920x1080<br>
                    <strong>DE:</strong> Cyberpunk Interface<br>
                    <strong>Theme:</strong> Neon Teal [GTK2/3]<br>
                    <strong>Icons:</strong> Cyberpunk-Icons [GTK2/3]<br>
                    <strong>Terminal:</strong> NEBULA Terminal<br>
                    <strong>CPU:</strong> Quantum Processor (1337)<br>
                    <strong>GPU:</strong> Neural Network Matrix<br>
                    <strong>Memory:</strong> 256GB Quantum RAM
                </div>
            </div>
        `;
        this.displayOutput(systemInfo);
    }

    displayWelcomeMessage() {
        this.displayOutput(`
            <div class="welcome-message">
                <div class="ascii-art">
                    ███╗   ██╗███████╗███████╗██████╗ ███████╗██╗   ██╗███████╗
                    ████╗  ██║██╔════╝██╔════╝██╔══██╗██╔════╝██║   ██║██╔════╝
                    ██╔██╗ ██║█████╗  █████╗  ██████╔╝█████╗  ██║   ██║█████╗  
                    ██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ╚██╗ ██╔╝██╔══╝  
                    ██║ ╚████║███████╗███████╗██║  ██║███████╗ ╚████╔╝ ███████╗
                    ╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚══════╝
                </div>
                <div class="welcome-text">
                    <h2>Welcome to NEBULA:FOG:PRIME 2026</h2>
                    <p>The ultimate convergence of AI consciousness and cybersecurity</p>
                    <p>in the shadows of the digital underground.</p>
                    <br>
                    <p>Type <strong>'help'</strong> to see available commands</p>
                    <p>Type <strong>'challenges'</strong> to browse hackathon challenges</p>
                    <p>Type <strong>'register'</strong> for registration information</p>
                    <br>
                    <p class="system-info">System initialized. Neural interface active.</p>
                    <p class="system-info">Quantum matrices aligned. Reality protocols loaded.</p>
                    <p class="system-info">Ready for digital transcendence.</p>
                </div>
            </div>
        `);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.protocol-card, .timeline-item, .challenge-card, .faq-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.protocol-card, .timeline-item, .challenge-card, .faq-item, .hero-content, .section-content');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupMobileNav() {
        const navItems = this.cachedElements.navItems;
        const sections = this.cachedElements.sections;

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href');
                
                if (target.startsWith('#')) {
                    const section = document.querySelector(target);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Enhanced navigation with loading states
                    this.navigateToPage(target);
                }

                // Update active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Update active nav based on scroll position
        window.addEventListener('scroll', this.debounce(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        }, 100));
    }

    navigateToPage(url) {
        // Add loading state
        document.body.classList.add('page-loading');
        
        // Simulate page transition
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    setupClickCircles() {
        document.addEventListener('mousedown', (e) => {
            // Don't create circles on form elements
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') {
                return;
            }

            const circle = document.createElement('div');
            circle.className = 'click-circle';
            circle.style.left = e.clientX + 'px';
            circle.style.top = e.clientY + 'px';
            
            document.body.appendChild(circle);
            
            // Remove circle after animation completes
            setTimeout(() => {
                if (circle.parentNode) {
                    circle.parentNode.removeChild(circle);
                }
            }, 600);
        });
    }

    setupProtocolCards() {
        const cards = this.cachedElements.protocolCards;
        
        cards.forEach(card => {
            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');

            // Mouse interactions
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });

            // Keyboard interactions
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCardClick(card);
                }
            });

            // Click handler
            card.addEventListener('click', () => {
                this.handleCardClick(card);
            });

            // Touch support for mobile
            card.addEventListener('touchstart', () => {
                this.animateCardHover(card, true);
            });

            card.addEventListener('touchend', () => {
                this.animateCardHover(card, false);
            });
        });
    }

    animateCardHover(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 170, 0.3)';
            card.style.borderColor = 'var(--neon-primary)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            card.style.borderColor = 'rgba(0, 255, 170, 0.3)';
        }
    }

    handleCardClick(card) {
        const target = card.getAttribute('onclick') || card.dataset.href;
        if (target) {
            if (target.startsWith('http')) {
                window.open(target, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = target;
            }
        } else {
            // Show card details modal
            this.showCardDetails(card);
        }
    }

    showCardDetails(card) {
        const title = card.querySelector('.card-title')?.textContent || 'Card Details';
        const description = card.querySelector('.card-description')?.textContent || 'No description available.';
        
        // Create modal (simplified implementation)
        const modal = document.createElement('div');
        modal.className = 'card-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.showUserError('An unexpected error occurred. Please refresh the page.');
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showUserError('A network error occurred. Please check your connection.');
        });

        // Form error handling
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                try {
                    // Form validation logic here
                    this.validateForm(form);
                } catch (error) {
                    e.preventDefault();
                    this.showUserError(error.message);
                }
            });
        });
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            throw new Error('Please fill in all required fields.');
        }
    }

    showUserError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-message">${message}</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Glitch effect for text
    glitchText(element) {
        if (!element) return;
        
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let glitchCount = 0;
        const maxGlitches = 10;
        
        const glitchInterval = setInterval(() => {
            if (glitchCount < maxGlitches) {
                let glitchedText = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.7) {
                        glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchedText += originalText[i];
                    }
                }
                element.textContent = glitchedText;
                glitchCount++;
            } else {
                element.textContent = originalText;
                clearInterval(glitchInterval);
            }
        }, 100);
    }

    // Enhanced scroll animations with stagger
    animateOnScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }
}

// Protocol card interactions with enhanced features
class ProtocolCards {
    constructor() {
        this.cards = document.querySelectorAll('.protocol-card');
        this.setupHoverEffects();
        this.setupKeyboardNavigation();
    }

    setupHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCard(card, false);
            });

            // Enhanced touch support
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.animateCard(card, true);
            });

            card.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.animateCard(card, false);
            });
        });
    }

    setupKeyboardNavigation() {
        this.cards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCardActivation(card);
                }
            });
        });
    }

    animateCard(card, isActive) {
        if (isActive) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 170, 0.3)';
            card.style.borderColor = 'var(--neon-primary)';
            
            // Add glow effect
            card.style.filter = 'brightness(1.2)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            card.style.borderColor = 'rgba(0, 255, 170, 0.3)';
            card.style.filter = 'brightness(1)';
        }
    }

    handleCardActivation(card) {
        // Add click effect
        card.classList.add('clicked');
        setTimeout(() => card.classList.remove('clicked'), 200);

        // Handle navigation or modal
        const href = card.getAttribute('onclick') || card.dataset.href;
        if (href) {
            if (href.startsWith('http')) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = href;
            }
        }
    }
}

// FAQ Accordion with enhanced functionality
class FAQAccordion {
    constructor() {
        this.questions = document.querySelectorAll('.faq-question');
        this.setupAccordion();
    }

    setupAccordion() {
        this.questions.forEach(question => {
            question.addEventListener('click', () => {
                this.toggleFAQ(question);
            });

            // Keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleFAQ(question);
                }
            });
        });
    }

    toggleFAQ(question) {
        const answer = question.nextElementSibling;
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items
        this.questions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherQuestion.nextElementSibling.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        question.setAttribute('aria-expanded', !isExpanded);
        answer.classList.toggle('active');
        
        // Enhanced animation
        if (!isExpanded) {
            answer.style.maxHeight = '1000px'; // QA fix: increased from 200px
            answer.style.padding = '20px';
        } else {
            answer.style.maxHeight = '0';
            answer.style.padding = '0 20px';
        }
    }
}

// Enhanced scroll animations
class ScrollAnimations {
    constructor() {
        this.setupAnimations();
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        
                        // Animate children with delay
                        const children = entry.target.querySelectorAll('.protocol-card, .timeline-item, .challenge-card, .faq-item');
                        children.forEach((child, childIndex) => {
                            setTimeout(() => {
                                child.classList.add('animate-in');
                            }, childIndex * 100);
                        });
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe elements
        const elements = document.querySelectorAll('.protocol-card, .timeline-item, .challenge-card, .faq-item, .hero-content, .section-content, [data-animate]');
        elements.forEach(el => observer.observe(el));
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main interface
    const cyberpunkInterface = new CyberpunkInterface();
    
    // Store reference globally for terminal callbacks
    window.cyberpunkInterface = cyberpunkInterface;
    
    // Initialize components
    new ProtocolCards();
    new FAQAccordion();
    new ScrollAnimations();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger welcome animation
        const welcomeElements = document.querySelectorAll('.welcome-message > *');
        welcomeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 200);
        });
    }, 500);
    
    // Add smooth page transitions
    document.body.classList.add('page-ready');
});

// Export for use in other modules
window.NebulaFog = {
    CyberpunkInterface,
    ProtocolCards,
    FAQAccordion,
    ScrollAnimations
};

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}