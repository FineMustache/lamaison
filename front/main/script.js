let slideIndex = 1;
let slides = document.querySelectorAll('.slide');
let slidesContainer = document.querySelector('.slides');
let textCarousel = [
  'Transforme os ares da sua casa',
  'Destaque o ambiente do seu negócio',
  'Um novo visual para seu Escritório'
]

showSlide(slideIndex);

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function showSlide(n) {
let slideWidth = slides[0].clientWidth;
  if (n > slides.length) {
    slideIndex = 1;
  }    
  if (n < 1) {
    slideIndex = slides.length;
  }
  setTimeout(() => {

  }, 250)
  borrarse()
  setTimeout(() => document.querySelector('#carouselText').innerHTML = textCarousel[slideIndex-1], 250)
  
  slidesContainer.style.transform = `translateX(${-slideWidth * (slideIndex - 1)}px)`;
}

function borrarse() {
  document.querySelector('#carouselText').classList.add('borrouse')
  setTimeout(() => document.querySelector('#carouselText').classList.remove('borrouse'), 500)
}