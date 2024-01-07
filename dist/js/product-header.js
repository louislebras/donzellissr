let isMouseOverHeaderOrContainer = false;

// Fonction pour mettre à jour la classe de l'en-tête
function updateHeaderClass() {
  const scrollDistance = window.scrollY / window.innerHeight;
  const header = document.querySelector("header");

  // Ajoute ou supprime la classe en fonction de la distance de défilement et de l'état de survol
  if (scrollDistance < 0.8 && !isMouseOverHeaderOrContainer) {
    header.classList.add("background-product-page-header");
  } else {
    header.classList.remove("background-product-page-header");
  }
}

// Gestionnaire d'événements pour le survol de l'en-tête
document.querySelector("header").addEventListener("mouseover", () => {
  isMouseOverHeaderOrContainer = true;
  updateHeaderClass(); // Met à jour la classe lors du survol
});

// Gestionnaire d'événements pour le survol de .container-panels
document
  .querySelector(".container-panels")
  .addEventListener("mouseover", () => {
    isMouseOverHeaderOrContainer = true;
  });

// Gestionnaire d'événements pour le mouseout de l'en-tête et .container-panels
document.querySelectorAll("header, .container-panels").forEach((element) => {
  element.addEventListener("mouseout", () => {
    isMouseOverHeaderOrContainer = false;
    setTimeout(updateHeaderClass, 10); // Met à jour la classe après un court délai
  });
});

// Gestionnaire d'événements de défilement
window.addEventListener("scroll", updateHeaderClass);

window.addEventListener("scroll", () => {
  // Calculez la distance de défilement en tant que pourcentage de la hauteur de la vue
  const scrollDistance = window.scrollY / window.innerHeight;

  // Obtenez l'élément d'en-tête par son sélecteur (ajustez le sélecteur selon votre besoin)
  const headerM = document.querySelector(".header-mobile");

  // Vérifiez si la distance de défilement est supérieure à 270vh (2.7 fois la hauteur de la vue)
  if (scrollDistance < 0.5) {
    // Ajoutez la classe souhaitée à l'élément d'en-tête
    headerM.classList.add("background-product-page-headerM");
  } else {
    // Supprimez la classe si la distance de défilement est inférieure à 270vh
    headerM.classList.remove("background-product-page-headerM");
  }
});

window.addEventListener("scroll", () => {
  const scrollDistance = window.scrollY / window.innerHeight;
  const whatsApp = document.querySelector(".fixed-button-whatsapp");

  // Détermine la valeur de seuil en fonction de la largeur de l'écran
  const threshold = window.innerWidth < 800 ? 0.3 : 2.76;

  // Ajoute ou supprime la classe en fonction de la distance de défilement et du seuil
  if (scrollDistance > threshold) {
    whatsApp.classList.add("appearWhatsappButton");
  } else {
    whatsApp.classList.remove("appearWhatsappButton");
  }
});
