// Add this code at the beginning of your script.js file

// Main loader functionality
document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader-wrapper");
    const content = document.getElementById("content");
    const loadingText = document.getElementById("loading-text");
    
    const loadingMessages = [
        "Building site for you",
        "Almost there",
        "Getting things ready",
        "Loading final pieces"
    ];
    let messageIndex = 0;

    function updateLoadingMessage() {
        if (loadingText) {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingText.innerHTML = loadingMessages[messageIndex] + '<span class="dots">...</span>';
        }
    }

    const messageInterval = setInterval(updateLoadingMessage, 3000);

    function hideLoader() {
        clearInterval(messageInterval);
        loader.classList.add("loader-hidden");
        content.classList.add("visible");
        
        loader.addEventListener("transitionend", function() {
            loader.remove();
        });
    }

    window.addEventListener("load", function() {
        setTimeout(hideLoader, 500);
    });

    setTimeout(hideLoader, 5000);
});

// Progress tracking functionality
document.addEventListener("DOMContentLoaded", function() {
    let loaded = 0;
    const total = document.images.length + 
                 document.scripts.length + 
                 document.links.length;
    
    function updateProgress() {
        loaded++;
        const percentage = ((loaded / total) * 100).toFixed(0);
        
        const loadingText = document.getElementById("loading-text");
        if (loadingText && percentage < 100) {
            loadingText.innerHTML = `Building site for you<span class="dots">...</span> ${percentage}%`;
        }
        
        console.log(`Loading: ${percentage}%`);
    }

    Array.from(document.images).forEach(img => {
        if (img.complete) {
            updateProgress();
        } else {
            img.addEventListener('load', updateProgress);
            img.addEventListener('error', updateProgress);
        }
    });

    Array.from(document.scripts).forEach(script => {
        if (script.complete) {
            updateProgress();
        } else {
            script.addEventListener('load', updateProgress);
            script.addEventListener('error', updateProgress);
        }
    });

    Array.from(document.links).forEach(link => {
        if (link.rel === 'stylesheet') {
            if (link.complete) {
                updateProgress();
            } else {
                link.addEventListener('load', updateProgress);
                link.addEventListener('error', updateProgress);
            }
        }
    });
});

// Loading time tracking
const startTime = performance.now();
window.addEventListener('load', function() {
    const loadTime = (performance.now() - startTime).toFixed(2);
    console.log(`Page loaded in ${loadTime}ms`);
});

// ... rest of your existing JavaScript code ...
function toggleMenu() {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger i');
    const overlay = document.querySelector('.overlay');

    nav.classList.toggle('active');
    hamburger.classList.toggle('fa-bars');
    hamburger.classList.toggle('fa-times');
    overlay.style.display = nav.classList.contains('active') ? 'block' : 'none';

    if (nav.classList.contains('active')) {
        nav.classList.add('slide-in');
        nav.classList.remove('slide-out');
    } else {
        nav.classList.add('slide-out');
        nav.classList.remove('slide-in');

        setTimeout(() => {
            nav.classList.remove('active');
            nav.classList.remove('slide-out');
        }, 300);
    }
}

function startSlideshow() {
    const slides = document.querySelectorAll('.slideshow div');
    let currentSlide = 0;
    let slideOrder = [...Array(slides.length).keys()];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showNextSlide() {
        slides[slideOrder[currentSlide]].classList.remove('active');
        currentSlide = (currentSlide + 1) % slideOrder.length;
        slides[slideOrder[currentSlide]].classList.add('active');
    }

    shuffleArray(slideOrder);
    slides[slideOrder[0]].classList.add('active');

    setInterval(() => {
        showNextSlide();
        if (currentSlide === 0) {
            shuffleArray(slideOrder);
        }
    }, 6000);
}

function closeMenu() {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger i');
    const overlay = document.querySelector('.overlay');

    nav.classList.remove('active');
    nav.classList.remove('slide-in');
    nav.classList.add('slide-out');
    hamburger.classList.remove('fa-times');
    hamburger.classList.add('fa-bars');
    overlay.style.display = 'none';

    setTimeout(() => {
        nav.classList.remove('slide-out');
    }, 300);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('.nav-container').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

document.querySelector('.scroll-arrow').addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight / 5 * 4;

        if (cardTop < triggerBottom) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

window.addEventListener('load', startSlideshow);

const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'light'
let currentTheme = localStorage.getItem('theme') || 'light';

// Function to update the icon and apply the theme
function setTheme(theme) {
    body.classList.remove('light-mode', 'dark-mode');
    
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
        body.classList.add('dark-mode');
    } else {
        themeIcon.className = 'fas fa-sun';
        body.classList.add('light-mode');
    }
    
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

// Apply the current theme on page load
setTheme(currentTheme);

// Toggle theme when the icon is clicked
document.querySelector('.theme-switch').addEventListener('click', (e) => {
    e.preventDefault();
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (currentTheme === 'system') {
            setTheme('system');
        }
    });
}

// Remove any click animations
document.querySelectorAll('nav ul li a, .theme-switch a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            setTimeout(() => {
                window.location.href = href;
            }, 10);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.querySelector('.theme-switch');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme);
    updateThemeIcon(currentTheme);

    themeSwitch.addEventListener('click', function() {
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        } else {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
});