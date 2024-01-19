var openButtons = document.querySelectorAll(".open-product-details");
var detailsSidebar = document.querySelector(".optionproductsectiondetails");
var backSidebarDetails = document.querySelector(".back-sidebar-details");
var htmltoFix = document.querySelector("html");
var closeDetails = document.querySelector(".close-button-details");

// Fonction pour ajouter la classe 'opened-details'
const addOpenedDetailsClass = () => {
  detailsSidebar.classList.add("opened-details");
  backSidebarDetails.classList.add("back-sidebar-appear");
  htmltoFix.classList.add("fixbodyscroll");
};

backSidebarDetails.onclick = function () {
  detailsSidebar.classList.remove("opened-details");
  backSidebarDetails.classList.remove("back-sidebar-appear");
  htmltoFix.classList.remove("fixbodyscroll");
};

closeDetails.onclick = function () {
  detailsSidebar.classList.remove("opened-details");
  backSidebarDetails.classList.remove("back-sidebar-appear");
  htmltoFix.classList.remove("fixbodyscroll");
};

// Ajouter un gestionnaire d'événements à chaque bouton
openButtons.forEach((button) => {
  button.addEventListener("click", addOpenedDetailsClass);
});
