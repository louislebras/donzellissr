window.addEventListener("scroll", () => {
  const scrollDistance = window.scrollY / window.innerHeight;
  const whatsApp = document.querySelector(".fixed-button-whatsapp");

  // Détermine la valeur de seuil en fonction de la largeur de l'écran
  const threshold = window.innerWidth < 800 ? 0.3 : 1.5;

  // Ajoute ou supprime la classe en fonction de la distance de défilement et du seuil
  if (scrollDistance > threshold) {
    whatsApp.classList.add("appearWhatsappButton");
  } else {
    whatsApp.classList.remove("appearWhatsappButton");
  }
});
