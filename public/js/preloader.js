document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("Main");

  window.addEventListener("load", () => {
    preloader.classList.add("fade-out");

    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.style.display = "block";

    }, 1000);
  });
});




