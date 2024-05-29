// JavaScript para controlar o carrossel

const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');

let currentSlide = 0;
const slideWidth = slides[0].clientWidth;

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlidePosition();
}

function updateSlidePosition() {
    const offset = -currentSlide * slideWidth;
    carousel.style.transform = `translateX(${offset}px)`;
}

setInterval(nextSlide, 5000); // Troca de slide a cada 5 segundos
