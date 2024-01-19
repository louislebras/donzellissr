var openButtonsVerified = document.querySelectorAll(".open-verified-bar");
var verifiedSidebar = document.querySelector(".verified-program-bar");
var backSidebarVerifed = document.querySelector(".back-sidebar-verified");
var htmltoFix = document.querySelector("html");
var closeVerified = document.querySelector(".close-button-verified");

// Fonction pour ajouter la classe 'opened-details'
const addOpenedVerifiedClass = () => {
  verifiedSidebar.classList.add("opened-verified");
  backSidebarVerifed.classList.add("back-sidebar-appear");
  htmltoFix.classList.add("fixbodyscroll");
};

backSidebarVerifed.onclick = function () {
  verifiedSidebar.classList.remove("opened-verified");
  backSidebarVerifed.classList.remove("back-sidebar-appear");
  htmltoFix.classList.remove("fixbodyscroll");
};

closeVerified.onclick = function () {
  verifiedSidebar.classList.remove("opened-verified");
  backSidebarVerifed.classList.remove("back-sidebar-appear");
  htmltoFix.classList.remove("fixbodyscroll");
};

// Ajouter un gestionnaire d'événements à chaque bouton
openButtonsVerified.forEach((button) => {
  button.addEventListener("click", addOpenedVerifiedClass);
});
