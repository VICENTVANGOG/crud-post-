import { AuthController } from "./controller.login"; // Importo el controlador de autenticación

const URL_LOGIN: string = "https://api-posts.codificando.xyz"; // URL base para la API de autenticación
const form = document.querySelector("form") as HTMLFormElement; // Selecciono el formulario
const email = document.getElementById("floatingInput") as HTMLInputElement; // Selecciono el campo de email
const password = document.getElementById("floatingPassword") as HTMLInputElement; // Selecciono el campo de contraseña

// Agrego un manejador de eventos para el envío del formulario
form.addEventListener("submit", async (e: Event) => {
  e.preventDefault(); // Prevengo el comportamiento por defecto del formulario

  // Creo una instancia del controlador de autenticación con la URL base
  const auth = new AuthController(URL_LOGIN);

  try {
    console.log("entre al login"); // Mensaje de depuración para confirmar que se ha entrado en la función de login

    // Llamo al método de login del controlador de autenticación con los valores de email y contraseña
    const response = await auth.login(email, password);
    const message = response.message; // Obtengo el mensaje de la respuesta

    console.log(response); // Imprimo la respuesta para depuración

    if (message === "Login successful") { // Verifico si el mensaje de la respuesta indica éxito
      alert("Login success"); // Muestro un mensaje de éxito
      localStorage.setItem("email", email.value); // Almaceno el email en localStorage
      localStorage.setItem("password", password.value); // Almaceno la contraseña en localStorage (no recomendado por razones de seguridad)
      window.location.href = "src/views/home.html"; // Redirijo a la página principal
      return; // Salgo de la función para evitar ejecutar código adicional
    } else {
      alert("Login failed"); // Muestro un mensaje de fallo en el login
    }

    form.reset(); // Reseteo el formulario
  } catch (error) {
    console.error(error); // Manejo errores y los imprimo en la consola
  }
});

