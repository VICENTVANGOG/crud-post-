import { AuthController } from "./controller.login";


const URL_LOGIN: string = "https://api-posts.codificando.xyz";
const form = document.querySelector("form") as HTMLFormElement;
const email = document.getElementById("floatingInput") as HTMLInputElement;
const password = document.getElementById("floatingPassword") as HTMLInputElement;
console.log(email.value)
console.log(password.value)
form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const auth = new AuthController(URL_LOGIN);
  try {
    console.log("entre al login")
    const response = await auth.login(email, password);
    const message = response.message;
    console.log(response);
    if (message == "Login successful") {
      alert("Login success")
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      window.location.href = "src/views/home.html";
      return;
    } else {
      alert("Login failed");
    }
    form.reset();
  } catch (error) {
    console.error(error);
  }
})



