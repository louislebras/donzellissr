window.addEventListener("load", function () {
  var burgerDesk = document.querySelector(".burger-sidebar-desk");
  var closeCrossDesk = document.querySelector(".close-sidebar-desk");
  var sidebarDesk = document.querySelector(".sidebar-desk");
  var blurBlock = document.querySelector(".back-invisible-sidebar");

  burgerDesk.onclick = function () {
    sidebarDesk.classList.add("to-left-menu");
    blurBlock.classList.add("to-back-blur");
  };

  closeCrossDesk.onclick = function () {
    sidebarDesk.classList.remove("to-left-menu");
    blurBlock.classList.remove("to-back-blur");
  };

  blurBlock.onclick = function () {
    sidebarDesk.classList.remove("to-left-menu");
    blurBlock.classList.remove("to-back-blur");
  };
});
