window.addEventListener("load", function () {
  var closeFilters = document.querySelector(".cross-close-filters");
  var sidebarFilters = document.querySelector(".sidebar-filters");
  var blankLayoutClickFilter = document.querySelector(
    ".blank-click-layout-sidebar"
  );
  var buttonFilters = document.querySelector(".filters-feed-button");

  buttonFilters.onclick = function () {
    sidebarFilters.classList.add("activeSidebarFilter");
    blankLayoutClickFilter.classList.add("activeBlankLayoutSidebar");
  };

  blankLayoutClickFilter.onclick = function () {
    sidebarFilters.classList.remove("activeSidebarFilter");
    blankLayoutClickFilter.classList.remove("activeBlankLayoutSidebar");
  };

  closeFilters.onclick = function () {
    sidebarFilters.classList.remove("activeSidebarFilter");
    blankLayoutClickFilter.classList.remove("activeBlankLayoutSidebar");
  };
});
