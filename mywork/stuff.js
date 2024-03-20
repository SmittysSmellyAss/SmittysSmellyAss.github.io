const images = [
    "pix/1.png",
    "pix/2.jpg",
    "pix/3.png",
    // Add more image URLs as needed
    "pix/4.png",
    "pix/5.png",
    "pix/6.png",
    "pix/7.png",
    "pix/8.png",
    "pix/9.png",
    "pix/10.png"
];

const carouselSlide = document.getElementById('carouselSlide');
let slideIndex = 0;

function moveSlide(n) {
    slideIndex += n;
    if (slideIndex >= images.length) {
        slideIndex = 0; // Loop back to the beginning
    } else if (slideIndex < 0) {
        slideIndex = images.length - 1; // Loop to the end
    }
    showSlides();
}

function showSlides() {
    const slideWidth = carouselSlide.clientWidth;
    const slideOffset = -slideWidth * slideIndex;
    carouselSlide.style.transform = `translateX(${slideOffset}px)`;
}

// Load images
window.addEventListener('load', () => {
    const imageElements = images.map(image => `<img src="${image}" alt="Image">`).join('');
    carouselSlide.innerHTML = imageElements;
});
