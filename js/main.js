var menuToggle = document.querySelector(".menu-toggle");
var mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", function () {
  event.preventDefault();
  menuToggle.classList.toggle("menu-toggle--closed");
  mainNav.classList.toggle("main-nav--closed");
});
