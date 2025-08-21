const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- Counting Animation JavaScript ---
const statisticsSection = document.getElementById('key-statistics');
const counters = document.querySelectorAll('.text-5xl[data-target], .text-6xl[data-target]');
let hasAnimated = false;

const countUp = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 16ms is roughly 60fps

    const updateCount = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target.toLocaleString(); // Add a comma for thousands
        }
    };
    
    updateCount();
};

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            counters.forEach(countUp);
            hasAnimated = true;
            observer.unobserve(entry.target);
        }
    });
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

if (statisticsSection) {
    observer.observe(statisticsSection);
}

window.onload = () => {
    showSlide(0);
    startAutoplay();
};