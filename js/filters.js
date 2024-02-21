document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(
    ".main-wrapper-products-table .card-product-donzelli"
  );
  const resetButton = document.getElementById("resetButton");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Déterminer si le bouton est pour une marque
      const isBrandFilter =
        btn.closest(".sidebar-brands-filter") ||
        btn
          .closest(".filter-category")
          .querySelector("h3")
          .textContent.includes("Brands");

      if (isBrandFilter) {
        // Pour les filtres de marque, vérifier l'état actif avant de synchroniser
        const filter = this.getAttribute("data-filter");
        const wasActive = this.classList.contains("activeFilter");
        // Synchroniser l'état pour tous les boutons correspondants
        synchronizeBrandFilters(filter, !wasActive);
      } else {
        // Basculer l'état actif du bouton pour les autres filtres
        this.classList.toggle("activeFilter");
      }

      // Mise à jour de l'affichage des produits
      updateProductDisplay();
    });
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
        // Basculer l'état actif/inactif en fonction de shouldActivate
        if (shouldActivate) {
          btn.classList.add("activeFilter");
        } else {
          btn.classList.remove("activeFilter");
        }
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
