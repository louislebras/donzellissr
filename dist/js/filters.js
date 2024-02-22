document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(
    ".main-wrapper-products-table .card-product-donzelli"
  );
  const resetButton = document.getElementById("resetButton");

  function forceUpdate(element) {
    // Technique pour forcer la mise à jour : manipulation des styles
    element.style.display = "none";
    element.offsetHeight; // Lecture forçant le reflow
    element.style.display = "";
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isBrandFilter =
        this.closest(".sidebar-brands-filter") ||
        this.closest(".filter-category")
          .querySelector("h3")
          .textContent.includes("Brands");

      if (isBrandFilter) {
        const filter = this.getAttribute("data-filter");
        if (this.classList.contains("activeFilter")) {
          this.classList.remove("activeFilter");
          synchronizeBrandFilters(filter, false);
        } else {
          this.classList.add("activeFilter");
          synchronizeBrandFilters(filter, true);
        }
      } else {
        // Basculer la classe sans délai
        if (this.classList.contains("activeFilter")) {
          this.classList.remove("activeFilter");
        } else {
          this.classList.add("activeFilter");
        }
      }

      forceUpdate(this); // Forcer la mise à jour après modification de la classe
      updateProductDisplay();
    });
  });

  resetButton.addEventListener("click", function () {
    filterButtons.forEach((btn) => {
      btn.classList.remove("activeFilter");
      forceUpdate(btn); // Appliquer la mise à jour forcée ici aussi
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
        // Forcer le reflow après modification de la classe
        forceReflow(btn);
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
