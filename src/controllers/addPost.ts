import {Ipost} from "../models/Ipost";

const form = document.querySelector("#post-form") as HTMLFormElement | null;
    const title = document.querySelector("#title") as HTMLInputElement | null;
    const description = document.querySelector("#description") as HTMLTextAreaElement | null;
    const body = document.querySelector("#body") as HTMLTextAreaElement | null;
    const multimediaUrl = document.querySelector("#multimediaUrl") as HTMLInputElement | null;
    const date = document.querySelector("#date") as HTMLInputElement | null;
const submit = document.querySelector("#submit") as HTMLButtonElement;
    



    if (form && title && body && description && multimediaUrl && date) {
      form.addEventListener("submit", (event: Event) => {
        event.preventDefault();

        if (!title.value.trim() || !description.value.trim() || !body.value.trim()) {
          alert("Todos los campos son obligatorios.");
          return;
        }

        try {
          new URL(multimediaUrl.value); // Verifica si la URL es válida
        } catch (_) {
          alert("URL inválida.");
          return;
        }

        const posts: Ipost[] = JSON.parse(localStorage.getItem("postArray") || "[]");

        const newPost: Ipost = {
          id: Date.now(),
          title: title.value,
          description: description.value,
          body: body.value,
          multimediaUrl: multimediaUrl.value,
          date: date.value,
          creationDate: new Date().toISOString().split('T')[0]
        };

        posts.push(newPost);
        localStorage.setItem("postArray", JSON.stringify(posts));

        alert("Se guardó el post correctamente.");
        window.location.href = "home.html";
      });
    } else {
      console.error("Formulario o campos no encontrados.");
    }