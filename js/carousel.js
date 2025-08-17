// JavaScript for the photo carousel
window.onload = function () {
    const carouselTrack = document.getElementById('carousel-track');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDotsContainer = document.getElementById('carousel-dots');

    let currentSlideIndex = 0;

    // Function to update the carousel position based on the current slide index
    function updateCarousel() {
        // Check if carouselSlides is a non-empty NodeList
        if (carouselSlides.length > 0) {
            const slideWidth = carouselSlides[0].offsetWidth;
            carouselTrack.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
            updateDots();
        }
    }

    // Function to update the navigation dots
    function updateDots() {
        // Remove all existing dots
        while (carouselDotsContainer.firstChild) {
            carouselDotsContainer.removeChild(carouselDotsContainer.firstChild);
        }

        // Create a dot for each slide
        carouselSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-400', 'transition-colors', 'duration-300');
            if (index === currentSlideIndex) {
                dot.classList.remove('bg-gray-400');
                dot.classList.add('bg-green-600');
            }
            dot.addEventListener('click', () => {
                currentSlideIndex = index;
                updateCarousel();
            });
            carouselDotsContainer.appendChild(dot);
        });
    }

    // Event listeners for the navigation buttons
    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
    });

    // Initial setup on page load
    updateCarousel();
    updateDots();
};