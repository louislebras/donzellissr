document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(
    ".main-wrapper-products-table .card-product-donzelli"
  );
  const resetButton = document.getElementById("resetButton");

  // Détection des appareils mobiles pour ajuster la gestion des événements
  const isMobileDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  filterButtons.forEach((btn) => {
    const handleInteraction = function (event) {
      // Pour les appareils mobiles, empêcher le comportement par défaut sur touchstart
      if (event.type === "touchstart") {
        event.preventDefault();
      }

      // Déterminer si le bouton appartient à la catégorie des marques
      const isBrandFilter =
        btn.closest(".sidebar-brands-filter") ||
        btn
          .closest(".filter-category")
          .querySelector("h3")
          .textContent.includes("Brands");

      // Basculer l'état actif et synchroniser si nécessaire
      if (isBrandFilter) {
        const filter = btn.getAttribute("data-filter");
        const isActive = !btn.classList.contains("activeFilter");
        synchronizeBrandFilters(filter, isActive);
      } else {
        btn.classList.toggle("activeFilter");
      }

      // Mise à jour de l'affichage des produits
      updateProductDisplay();
    };

    // Écouteurs pour touchstart et click, en fonction du type d'appareil
    if (isMobileDevice) {
      btn.addEventListener("touchstart", handleInteraction, { passive: false });
    } else {
      btn.addEventListener("click", handleInteraction);
    }
  });

  resetButton.addEventListener("click", function () {
    filterButtons.forEach((btn) => {
      btn.classList.remove("activeFilter");
    });
    updateProductDisplay();
  });

  function updateProductDisplay() {
    const activeFilters = document.querySelectorAll(".filter-btn.activeFilter");

    let filtersByCategory = {
      Brands: new Set(),
      "Type of items": new Set(),
      Rooms: new Set(),
      Materials: new Set(),
    };

    // Organiser les filtres actifs par catégorie
    activeFilters.forEach((btn) => {
      const category = getCategory(btn);
      if (category && filtersByCategory.hasOwnProperty(category)) {
        const filterClass = btn.getAttribute("data-filter").substring(1);
        filtersByCategory[category].add(filterClass);
      }
    });

    products.forEach((product) => {
      let shouldBeVisible = Object.keys(filtersByCategory).every((category) => {
        if (filtersByCategory[category].size === 0) return true;
        return [...filtersByCategory[category]].some((filterClass) =>
          product.classList.contains(filterClass)
        );
      });

      product.classList.toggle("hidden", !shouldBeVisible);
    });
  }

  function synchronizeBrandFilters(selectedFilter, shouldActivate) {
    document
      .querySelectorAll(`.filter-btn[data-filter="${selectedFilter}"]`)
      .forEach((btn) => {
        btn.classList.toggle("activeFilter", shouldActivate);
      });
  }

  function getCategory(btn) {
    const categoryText = btn
      .closest(".filter-category")
      .querySelector("h3").textContent;
    if (categoryText.includes("Brands")) return "Brands";
    if (categoryText.includes("Type of items")) return "Type of items";
    if (categoryText.includes("Rooms")) return "Rooms";
    if (categoryText.includes("Materials")) return "Materials";
    return null; // ou une gestion spécifique si nécessaire
  }
});
