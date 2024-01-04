var swiper = new Swiper(".swiper-container", {
  // pagination: ".swiper-pagination",
  slidesPerView: "auto",
  centeredSlides: false,
  // paginationClickable: true,
  loop: false,
  spaceBetween: 0,
  speed: 300,
  freeMode: true, // Défilement fluide sans snap
  bounce: false,
  touchRatio: 0.8,

  breakpoints: {
    // when window width is >= 320px
    800: {
      touchRatio: 0.8,
    },
  },
});

var thumb = document.querySelectorAll(".thumbContainer");

thumb.forEach(function (image, index) {
  var delay = index * 90;
  image.classList.add("fadeInSlide");
  image.style.animationDelay = delay + "ms";
});
