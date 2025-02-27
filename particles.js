// Particles.js - Beautiful loading animation

class Particle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Default options
        this.x = options.x || Math.random() * canvas.width;
        this.y = options.y || Math.random() * canvas.height;
        this.size = options.size || Math.random() * 3 + 1;
        this.speedX = options.speedX || (Math.random() - 0.5) * 1.5;
        this.speedY = options.speedY || (Math.random() - 0.5) * 1.5;
        this.color = options.color || this.getRandomColor();
        this.opacity = options.opacity || Math.random() * 0.5 + 0.5;
        this.shadowBlur = options.shadowBlur || 15;
    }
    
    getRandomColor() {
        const colors = ['#ffeb3b', '#f44336', '#2196f3', '#4caf50', '#9c27b0', '#3f51b5'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        // Move the particle
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > this.canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        
        if (this.y > this.canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = this.shadowBlur;
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;
    }
}

class ParticleNetwork {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 100,
            connectionDistance: options.connectionDistance || 150,
            connectionWidth: options.connectionWidth || 0.5,
            mouseInteraction: options.mouseInteraction !== undefined ? options.mouseInteraction : true,
            mouseRadius: options.mouseRadius || 150
        };
        
        this.mouse = {
            x: null,
            y: null,
            radius: this.options.mouseRadius
        };
        
        this.resizeCanvas();
        this.initParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        if (this.options.mouseInteraction) {
            this.canvas.addEventListener('mousemove', (event) => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            });
            
            this.canvas.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    // Calculate opacity based on distance
                    const opacity = 1 - (distance / this.options.connectionDistance);
                    
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                    this.ctx.lineWidth = this.options.connectionWidth;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    handleMouseInteraction() {
        if (!this.mouse.x || !this.mouse.y) return;
        
        for (const particle of this.particles) {
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                // Push particles away from mouse
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                
                particle.speedX += forceDirectionX * force * 2;
                particle.speedY += forceDirectionY * force * 2;
                
                // Add some damping to prevent excessive speed
                particle.speedX *= 0.95;
                particle.speedY *= 0.95;
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (const particle of this.particles) {
            particle.update();
            particle.draw();
        }
        
        // Draw connections between particles
        this.drawConnections();
        
        // Handle mouse interaction
        if (this.options.mouseInteraction) {
            this.handleMouseInteraction();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the particle network when the page loads
function initParticleAnimation() {
    // Create canvas element for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    
    // Add canvas to loading overlay
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.insertBefore(canvas, loadingOverlay.firstChild);
    
    // Initialize particle network
    new ParticleNetwork('particles-canvas', {
        particleCount: 80,
        connectionDistance: 160,
        mouseInteraction: true
    });
}

// Export the initialization function
window.initParticleAnimation = initParticleAnimation;