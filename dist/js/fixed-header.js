var limit = 0.1, //implies 40 vh or 40% of viewport height
  scrollLimit = 0;

window.addEventListener("resize", function () {
  scrollLimit = window.innerHeight * limit;
});

window.addEventListener("scroll", function () {
  var scroll = window.scrollY;

  if (scroll >= scrollLimit) {
    document.querySelector(".logo-header").classList.add("slide-logo-header");
    document
      .querySelector(".container-menu-dropdown-elements")
      .classList.add("menu-slide");
    document
      .querySelector(".header-mobile")
      .classList.add("scroll-mobile-header-home");
  } else {
    document
      .querySelector(".logo-header")
      .classList.remove("slide-logo-header");
    document
      .querySelector(".container-menu-dropdown-elements")
      .classList.remove("menu-slide");
    document
      .querySelector(".header-mobile")
      .classList.remove("scroll-mobile-header-home");
  }
});

// trigger both events on start to force initial setup
window.dispatchEvent(new Event("resize"));
window.dispatchEvent(new Event("scroll"));
