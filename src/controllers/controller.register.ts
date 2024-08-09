import { AuthController } from "./controller.login"; // Importo el controlador de autenticación

const URL_REGISTER: string = "https://api-posts.codificando.xyz"; // URL base para la API de registro
const form = document.querySelector("form") as HTMLFormElement; // Selecciono el formulario
const email = document.getElementById("floatingInput") as HTMLInputElement; // Selecciono el campo de email
const password = document.getElementById("floatingPassword") as HTMLInputElement; // Selecciono el campo de contraseña

console.log(email.value); // Imprimo el valor del email para depuración
console.log(password.value); // Imprimo el valor de la contraseña para depuración

// Agrego un manejador de eventos para el envío del formulario
form.addEventListener("submit", async (e: Event) => {
  e.preventDefault(); // Prevengo el comportamiento por defecto del formulario

  // Creo una instancia del controlador de autenticación con la URL de registro
  const auth = new AuthController(URL_REGISTER);

  try {
    console.log("entre al register"); // Mensaje de depuración para confirmar que se ha entrado en la función de registro

    // Llamo al método de registro del controlador de autenticación con los valores de email y contraseña
    const response = await auth.register(email, password);
    const data = response.id; // Obtengo el ID del usuario de la respuesta

    console.log(response); // Imprimo la respuesta para depuración

    if (data) { // Verifico si se ha recibido un ID válido en la respuesta
      alert("Register success"); // Muestro un mensaje de éxito
      window.location.href = "../../index.html"; // Redirijo a la página principal
      return; // Salgo de la función para evitar ejecutar código adicional
    } else {
      alert("Password or username invalid"); // Muestro un mensaje de fallo en el registro
    }

    form.reset(); // Reseteo el formulario
  } catch (error) {
    console.error(error); // Manejo errores y los imprimo en la consola
  }
});




