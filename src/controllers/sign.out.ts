const out = document.querySelector(`#out`) as HTMLButtonElement;


out.addEventListener("click", () => {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  window.location.href = "/index.html";
});





