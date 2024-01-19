var selectorOne = document.querySelectorAll(".selector-product1");
var selectorTwo = document.querySelectorAll(".selector-product2");

var selectorContainerOne = document.querySelector(".container-products1");
var selectorContainerTwo = document.querySelector(".container-products2");

var lineSelectorOne = document.querySelector(".line-selector-other1");

var lineSelectorTwo = document.querySelector(".line-selector-other2");

document.addEventListener("DOMContentLoaded", () => {
  // Ajout initial de la classe .active-all-related-products à .container-products1
  selectorContainerOne.classList.add("active-all-related-products");
  // Ajout de la classe .line-selector-other-active à .line-selector-other dans .selector-product1
  document
    .querySelector(".selector-product1 .line-selector-other")
    .classList.add("line-selector-other-active");
});

// Fonction pour gérer l'ajout et la suppression de la classe active
function toggleActiveClass(activeSelector, inactiveSelector) {
  activeSelector.classList.add("active-all-related-products");
  inactiveSelector.classList.remove("active-all-related-products");
}

// Gestion des clics sur .selector-product1
selectorOne.forEach((item) => {
  item.addEventListener("click", () => {
    toggleActiveClass(selectorContainerOne, selectorContainerTwo);
    item
      .querySelector(".line-selector-other")
      .classList.add("line-selector-other-active");
    selectorTwo.forEach((el) =>
      el
        .querySelector(".line-selector-other")
        .classList.remove("line-selector-other-active")
    );
  });
});

// Gestion des clics sur .selector-product2
selectorTwo.forEach((item) => {
  item.addEventListener("click", () => {
    toggleActiveClass(selectorContainerTwo, selectorContainerOne);
    item
      .querySelector(".line-selector-other")
      .classList.add("line-selector-other-active");
    selectorOne.forEach((el) =>
      el
        .querySelector(".line-selector-other")
        .classList.remove("line-selector-other-active")
    );
  });
});
