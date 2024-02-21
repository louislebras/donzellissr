document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(
    ".main-wrapper-products-table .card-product-donzelli"
  );
  const resetButton = document.getElementById("resetButton"); // Assurez-vous que l'ID correspond à votre bouton Reset dans le HTML

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Déterminer si le bouton est pour une marque
      const isBrandFilter =
        btn.closest(".sidebar-brands-filter") ||
        btn
          .closest(".filter-category")
          .querySelector("h3")
          .textContent.includes("Brands");

      // Basculer l'état actif du bouton
      this.classList.toggle("activeFilter");

      if (isBrandFilter) {
        // Synchroniser les boutons de filtre pour les marques
        const filter = this.getAttribute("data-filter");
        synchronizeBrandFilters(
          filter,
          this.classList.contains("activeFilter")
        );
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

  function synchronizeBrandFilters(selectedFilter, isActive) {
    document
      .querySelectorAll(`.filter-btn[data-filter="${selectedFilter}"]`)
      .forEach((btn) => {
        btn.classList.toggle("activeFilter", isActive);
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
