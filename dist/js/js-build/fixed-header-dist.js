var limit=.1,scrollLimit=0;window.addEventListener("resize",(function(){scrollLimit=window.innerHeight*limit})),window.addEventListener("scroll",(function(){window.scrollY>=scrollLimit?(document.querySelector(".logo-header").classList.add("slide-logo-header"),document.querySelector(".container-menu-dropdown-elements").classList.add("menu-slide"),document.querySelector(".header-mobile").classList.add("scroll-mobile-header-home")):(document.querySelector(".logo-header").classList.remove("slide-logo-header"),document.querySelector(".container-menu-dropdown-elements").classList.remove("menu-slide"),document.querySelector(".header-mobile").classList.remove("scroll-mobile-header-home"))})),window.dispatchEvent(new Event("resize")),window.dispatchEvent(new Event("scroll"));
//# sourceMappingURL=fixed-header-dist.js.map