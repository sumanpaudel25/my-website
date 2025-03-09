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

document.addEventListener('DOMContentLoaded', function() {

    setupLoaderColorChange();
});

function setupLoaderColorChange() {
    const colors = ['#ffeb3b', '#f44336', '#2196f3', '#4caf50'];
    const duration = 4000;
    let currentColorIndex = 0;

    function updateFillColor() {
        const root = document.documentElement;
        root.style.setProperty('--loader-fill-color', colors[currentColorIndex]);
        currentColorIndex = (currentColorIndex + 1) % colors.length;
    }

    setInterval(updateFillColor, 1000);
    updateFillColor();
}
