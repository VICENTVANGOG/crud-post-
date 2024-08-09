// Selecciona el botón con el id "out" y lo asigna a la constante 'out'
const out = document.querySelector(`#out`) as HTMLButtonElement;

// Agrega un manejador de eventos para el evento 'click' en el botón 'out'
out.addEventListener("click", () => {
  // Elimina el ítem "email" del almacenamiento local
  localStorage.removeItem("email");

  // Elimina el ítem "password" del almacenamiento local
  localStorage.removeItem("password");

  // Redirige al usuario a la página de inicio (index.html)
  window.location.href = "/index.html";
});




