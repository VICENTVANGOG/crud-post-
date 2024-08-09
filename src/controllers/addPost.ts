import { Ipost } from "../models/Ipost"; // Importo la interfaz Ipost que define la estructura de los objetos de post

// Selecciono los elementos del DOM y los asigno a constantes
const form = document.querySelector("#post-form") as HTMLFormElement | null;
const title = document.querySelector("#title") as HTMLInputElement | null;
const description = document.querySelector("#description") as HTMLTextAreaElement | null;
const body = document.querySelector("#body") as HTMLTextAreaElement | null;
const multimediaUrl = document.querySelector("#multimediaUrl") as HTMLInputElement | null;
const date = document.querySelector("#date") as HTMLInputElement | null;
const submit = document.querySelector("#submit") as HTMLButtonElement;

// Verifico si todos los elementos necesarios existen
if (form && title && body && description && multimediaUrl && date) {
  // Agrego un manejador de eventos para el envío del formulario
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Prevengo el comportamiento por defecto del formulario

    // Verifico que los campos obligatorios no estén vacíos
    if (!title.value.trim() || !description.value.trim() || !body.value.trim()) {
      alert("Todos los campos son obligatorios."); // Muestro un mensaje de alerta si algún campo está vacío
      return;
    }

    // Verifico si la URL proporcionada es válida
    try {
      new URL(multimediaUrl.value); // Intento crear un objeto URL con el valor de multimediaUrl
    } catch (_) {
      alert("URL inválida."); // Muestro un mensaje de alerta si la URL no es válida
      return;
    }

    // Obtengo los posts existentes desde localStorage (o un array vacío si no hay ninguno)
    const posts: Ipost[] = JSON.parse(localStorage.getItem("postArray") || "[]");

    // Creo un nuevo objeto post con la información del formulario
    const newPost: Ipost = {
      id: Date.now(), // Asigno un ID único basado en la fecha y hora actuales
      title: title.value, // Título del post
      description: description.value, // Descripción del post
      body: body.value, // Cuerpo del post
      multimediaUrl: multimediaUrl.value, // URL multimedia del post
      date: date.value, // Fecha del post
      creationDate: new Date().toISOString().split('T')[0] // Fecha de creación en formato YYYY-MM-DD
    };

    // Agrego el nuevo post al array de posts y lo guardo en localStorage
    posts.push(newPost);
    localStorage.setItem("postArray", JSON.stringify(posts));

    // Muestro una alerta de éxito y redirijo a la página home.html
    alert("Se guardó el post correctamente.");
    window.location.href = "home.html";
  });
} else {
  // Si alguno de los elementos no se encuentra, muestro un error en la consola
  console.error("Formulario o campos no encontrados.");
}
