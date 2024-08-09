import { BodyRequestLogin, BodyResponseLogin, BodyRequestRegister, BodyResponseRegister } from "../models/auth.model";

// Clase que maneja las operaciones de autenticación
export class AuthController {
  public domain: string; // URL base para la API de autenticación

  // Constructor de la clase que inicializa la URL base
  constructor(domain: string) {
    this.domain = domain;
  }

  // Método asíncrono para registrar un nuevo usuario
  async register(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseRegister> {
    // Crea un objeto con los datos del usuario a partir de los campos del formulario
    const userData: BodyRequestRegister = {
      email: email.value,
      password: password.value
    };

    // Define las cabeceras para la solicitud HTTP
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Configura las opciones de la solicitud HTTP
    const reqOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(userData) // Convierte el objeto a JSON
    };

    // Realiza la solicitud HTTP a la API de registro
    const response = await fetch(`${this.domain}/users/register`, reqOptions);

    // Lanza un error si la respuesta no es correcta
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Obtiene y devuelve la respuesta en formato JSON
    const responseBodyRegister: BodyResponseRegister = await response.json();
    return responseBodyRegister;
  }

  // Método asíncrono para autenticar a un usuario (login)
  async login(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseLogin> {
    // Crea un objeto con los datos del usuario a partir de los campos del formulario
    const userData: BodyRequestLogin = {
      email: email.value,
      password: password.value
    };

    // Define las cabeceras para la solicitud HTTP
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Configura las opciones de la solicitud HTTP
    const reqOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(userData) // Convierte el objeto a JSON
    };

    // Realiza la solicitud HTTP a la API de login
    const response = await fetch(`${this.domain}/auth/login`, reqOptions);

    // Lanza un error si la respuesta no es correcta
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Obtiene y devuelve la respuesta en formato JSON
    const responseBodyLogin: BodyResponseLogin = await response.json();
    return responseBodyLogin;
  }
}





