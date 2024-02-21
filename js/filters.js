document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(
    ".main-wrapper-products-table .card-product-donzelli"
  );
  const resetButton = document.getElementById("resetButton");
  let lastTouchEventTime = 0; // Drapeau pour gérer les événements touchend/click

  const handleFilterButtonClick = function (event) {
    // Pour les événements tactiles, marquer le temps et prévenir le comportement par défaut
    if (event.type === "touchend") {
      lastTouchEventTime = Date.now();
      event.preventDefault();
    } else if (
      event.type === "click" &&
      Date.now() - lastTouchEventTime < 400
    ) {
      // Ignorer les clics qui suivent immédiatement un touchend
      return;
    }

    const btn = this; // Utiliser 'this' pour référencer le bouton directement
    // Déterminer si le bouton est pour une marque
    const isBrandFilter =
      btn.closest(".sidebar-brands-filter") ||
      btn
        .closest(".filter-category")
        .querySelector("h3")
        .textContent.includes("Brands");

    if (isBrandFilter) {
      // Pour les filtres de marque, vérifier l'état actif avant de synchroniser
      const filter = btn.getAttribute("data-filter");
      const wasActive = btn.classList.contains("activeFilter");
      synchronizeBrandFilters(filter, !wasActive);
    } else {
      // Basculer l'état actif du bouton pour les autres filtres
      btn.classList.toggle("activeFilter");
    }

    // Mise à jour de l'affichage des produits
    updateProductDisplay();
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", handleFilterButtonClick);
    btn.addEventListener("touchend", handleFilterButtonClick);
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
