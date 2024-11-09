// function dismissAlert() {
//   const alertBox = document.getElementById("alertBox");
//   alertBox.style.display = "none"; 
// }


window.addEventListener("load", function() {
  const alertBox = document.getElementById("alertBox");
  if (alertBox) {
    alertBox.classList.add("show"); 
  }
});

function dismissAlert() {
  const alertBox = document.getElementById("alertBox");
  if (alertBox) {
    alertBox.classList.remove("show");
    setTimeout(() => alertBox.style.display = "none", 500); 
  }
}
