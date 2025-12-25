/**
 * NEBULA:FOG:PRIME - Three.js Digital Void
 * Responsible for the immersive background experience.
 */

class DigitalVoid {
    constructor() {
        this.container = document.getElementById('three-container');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.createGrid();
        this.createDataRain();
        this.addEvents();
        this.animate();
    }

    createGrid() {
        const size = 100;
        const divisions = 50;
        const gridHelper = new THREE.GridHelper(size, divisions, 0x00ffcc, 0x003322);
        gridHelper.position.y = -2;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.2;
        this.scene.add(gridHelper);
    }

    createDataRain() {
        const count = 1000;
        this.particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = Math.random() * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
            velocities[i] = Math.random() * 0.1 + 0.05;
        }

        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        this.particlesMaterial = new THREE.PointsMaterial({
            color: 0x00ffcc,
            size: 0.1,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        this.velocities = velocities;
        this.scene.add(this.particles);
    }

    addEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Animate particles
        const positions = this.particlesGeometry.attributes.position.array;
        for (let i = 0; i < this.velocities.length; i++) {
            positions[i * 3 + 1] -= this.velocities[i];
            if (positions[i * 3 + 1] < -20) {
                positions[i * 3 + 1] = 20;
            }
        }
        this.particlesGeometry.attributes.position.needsUpdate = true;

        // Subtle camera movement
        this.camera.position.x += (this.mouseX || 0 - this.camera.position.x) * 0.01;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Global accessor
window.digitalVoid = new DigitalVoid();
