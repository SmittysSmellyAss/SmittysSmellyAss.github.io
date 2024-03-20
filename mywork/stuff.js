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
    "pix/10.png",
    "pix/11.png",
    "pix/12.png",
    "pix/13.png",
    "pix/14.png",
    "pix/15.png",
    "pix/16.png",
    "pix/17.png",
    "pix/18.png",
    "pix/19.png",
    "pix/20.png",
    "pix/21.png",
    "pix/22.png",
    "pix/23.png",
    "pix/24.png",
    "pix/25.png",
    "pix/26.png",
    "pix/27.png",
    "pix/28.png",
    "pix/29.png",
    "pix/30.png",
    "pix/31.png"
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
