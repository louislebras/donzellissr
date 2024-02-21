window.addEventListener("load", function () {
  var buttonMoreBrands = document.querySelector(
    ".view-more-brands-button-filters-sidebar"
  );
  var closeMoreBrands = document.querySelector(
    ".back-all-brands-filters-button"
  );
  var sidebarBrandsFilters = document.querySelector(".sidebar-brands-filter");

  var mainSidebarFilters = document.querySelector(".sidebar-filters");

  buttonMoreBrands.onclick = function () {
    sidebarBrandsFilters.classList.add("active-sidebar-brands-filters");
    mainSidebarFilters.classList.add("fix-scroll-filters");
  };

  closeMoreBrands.onclick = function () {
    sidebarBrandsFilters.classList.remove("active-sidebar-brands-filters");
    mainSidebarFilters.classList.remove("fix-scroll-filters");
  };
});

// Assurez-vous que le DOM est chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionnez le conteneur de filtres et le filtre des marques
  var sidebarFilters = document.querySelector(".sidebar-filters");
  var sidebarBrandsFilter = document.querySelector(".sidebar-brands-filter");

  // Vérifiez si les éléments existent pour éviter des erreurs
  if (sidebarFilters && sidebarBrandsFilter) {
    // Écoutez l'événement de défilement sur sidebarFilters
    sidebarFilters.addEventListener("scroll", function () {
      // Obtenez la position de défilement actuelle de sidebarFilters
      var scrollPosition = sidebarFilters.scrollTop;

      // Ajustez la position de sidebarBrandsFilter basée sur scrollPosition
      // Vous pouvez ajuster cette logique en fonction de la hauteur spécifique ou d'autres éléments que vous souhaitez considérer
      sidebarBrandsFilter.style.top = scrollPosition + "px";
    });
  }
});
