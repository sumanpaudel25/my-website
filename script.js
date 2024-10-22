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

function showLoadingText() {
    const loadingTexts = [
        "Preparing your experience...",
        "Loading amazing content...",
        "Just a moment while we set things up...",
        "Getting everything ready for you...",
        "Almost there, hang tight!"
    ];
    let currentTextIndex = 0;
    const loadingTextElement = document.getElementById('loading-text');

    function updateLoadingText() {
        loadingTextElement.textContent = loadingTexts[currentTextIndex];
        currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
    }

    updateLoadingText(); // Show first text immediately
    return setInterval(updateLoadingText, 3000);
}

function hideLoadingOverlay() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const mainContent = document.getElementById('main-content');
    
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        mainContent.style.display = 'block';
    }, 500);
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

    // Start showing loading texts
    const loadingTextInterval = showLoadingText();

    // Setup loader color change
    setupLoaderColorChange();

    // Hide loading overlay after a short delay (e.g., 2 seconds)
    setTimeout(() => {
        clearInterval(loadingTextInterval);
        hideLoadingOverlay();
    }, 2000);
});

// Add this new function
function setupLoaderColorChange() {
    const colors = ['yellow', 'red', 'blue', 'green'];
    const duration = 4000; // 4s for a full rotation

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function updateFillColor() {
        const root = document.documentElement;
        root.style.setProperty('--loader-fill-color', getRandomColor());
    }

    // Calculate timings for 720-degree rotations (40.38% and 90.38% of 4s)
    const rotationTimes = [
        duration * 0.4038,  // First 720 degrees (40.38% of 4s)
        duration * 0.9038   // Second 720 degrees (90.38% of 4s)
    ];

    // Schedule color changes at each 720-degree rotation
    function scheduleColorChanges() {
        rotationTimes.forEach(time => {
            setTimeout(updateFillColor, time);
        });
    }

    // Initial color change
    updateFillColor();

    // Schedule initial color changes
    scheduleColorChanges();

    // Set up interval to continue color changes every 4 seconds
    setInterval(() => {
        scheduleColorChanges();
    }, duration);
}
