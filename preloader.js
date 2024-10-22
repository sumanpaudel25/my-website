document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;

    // Array of all image URLs used in the website
    const imageUrls = [
        'Images/favicon.png',
        'Images/suman1.webp',
        'Images/suman2.webp',
        'Images/suman3.webp',
        'Images/suman4.webp',
        'Images/suman5.webp',
        'Images/suman_cv.jpg'
    ];

    let loadedImages = 0;

    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
        });
    }

    function updateLoadingProgress() {
        loadedImages++;
        const progress = (loadedImages / imageUrls.length) * 100;
        // You can add a progress bar here if you want to show the loading progress
    }

    Promise.all(imageUrls.map(url => preloadImage(url).then(updateLoadingProgress)))
        .then(() => {
            // All images are loaded, hide loading screen and show content
            loadingScreen.style.opacity = '0';
            body.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Matches the transition duration
        })
        .catch(error => {
            console.error('Error preloading images:', error);
            // Hide loading screen even if there's an error
            loadingScreen.style.display = 'none';
            body.classList.add('loaded');
        });
});