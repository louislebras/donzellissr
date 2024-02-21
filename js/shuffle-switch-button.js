document.addEventListener("DOMContentLoaded", function () {
  shuffleProducts(); // Mélange les produits au chargement de la page

  // Associe l'événement de clic au bouton pour mélanger les produits à nouveau
  document
    .getElementById("shuffleButton")
    .addEventListener("click", shuffleProducts);
});

function shuffleProducts() {
  var wrapper = document.querySelector(".main-wrapper-products-table");
  var cards = Array.from(
    wrapper.getElementsByClassName("card-product-donzelli")
  );

  // Algorithme de Fisher-Yates pour mélanger
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Ajoute chaque carte mélangée à wrapper
  cards.forEach((card) => wrapper.appendChild(card));
}

window.addEventListener("load", function () {
  var contextButton = document.querySelector(".button-in-context-image");
  var wContextButton = document.querySelector(".w-context-button"); // Define wContextButton here
  var cards = document.querySelectorAll(".card-product-donzelli"); // Select all cards

  contextButton.onclick = function () {
    cards.forEach(function (card) {
      card.classList.add("showincontextclass"); // Add class for each card
    });
    contextButton.classList.add("hide-switch-button");
    wContextButton.classList.add("add-w-context-button");
  };

  wContextButton.onclick = function () {
    cards.forEach(function (card) {
      card.classList.remove("showincontextclass"); // Remove class for each card
    });
    contextButton.classList.remove("hide-switch-button");
    wContextButton.classList.remove("add-w-context-button");
  };
});
