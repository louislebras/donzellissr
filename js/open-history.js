var openButtonsHistory = document.querySelectorAll(".open-history-bar");
var historySidebar = document.querySelector(".history-sidebar");
var backSidebarHistory = document.querySelector(".back-sidebar-history");
var htmltoFix = document.querySelector("html");
var closedHistory = document.querySelector(".close-button-history");

// Fonction pour ajouter la classe 'opened-details'
const addOpenedHistoryClass = () => {
  historySidebar.classList.add("opened-history");
  backSidebarHistory.classList.add("back-sidebar-appear");
  htmltoFix.classList.add("fixbodyscroll");
};

backSidebarHistory.onclick = function () {
  historySidebar.classList.remove("opened-history");
  backSidebarHistory.classList.remove("back-sidebar-appear");
  htmltoFix.classList.remove("fixbodyscroll");
};

closedHistory.onclick = function () {
  historySidebar.classList.remove("opened-history");
  backSidebarHistory.classList.remove("back-sidebar-appear");
  htmltoFix.classList.remove("fixbodyscroll");
};

// Ajouter un gestionnaire d'événements à chaque bouton
openButtonsHistory.forEach((button) => {
  button.addEventListener("click", addOpenedHistoryClass);
});
