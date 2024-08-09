import { Ipost } from "../models/Ipost"; // Importo la interfaz Ipost que define la estructura de un post

// Clase que maneja las operaciones relacionadas con los posts
export class postController {
  url: string; // URL base para la API de posts

  // Constructor que inicializa la URL base
  constructor(url: string) {
    this.url = url;
  }

  // Método asíncrono para obtener un post específico desde el servidor
  async getPost(endpoint: string): Promise<Ipost> {
    // Realiza una solicitud GET a la URL construida con la URL base y el endpoint proporcionado
    const response = await fetch(`${this.url}/${endpoint}`);

    // Convierte la respuesta en formato JSON
    const data = await response.json();
    console.log(response.status); // Imprime el código de estado HTTP para depuración
    return data; // Devuelve los datos del post
  }

  // Método asíncrono para publicar un nuevo post en el servidor
  async postPost(endpoint: string, dataPost: Ipost) {
    // Realiza una solicitud POST a la URL construida con la URL base y el endpoint proporcionado
    const response = await fetch(`${this.url}/${endpoint}`, {
      method: 'POST', // Método HTTP POST
      headers: {
        'Content-Type': 'application/json', // Indica que el cuerpo de la solicitud está en formato JSON
      },
      body: JSON.stringify(dataPost), // Convierte el objeto dataPost a JSON para el cuerpo de la solicitud
    });

    console.log(response.status); // Imprime el código de estado HTTP para depuración

    // Convierte la respuesta en formato JSON
    const data = await response.json();
    // Verifica si el código de estado es 201 (Creado) y lanza un error si no lo es
    if (response.status != 201) {
      throw new Error("No se puede publicar ciudad");
    }

    return data; // Devuelve los datos del post publicado
  }
}


