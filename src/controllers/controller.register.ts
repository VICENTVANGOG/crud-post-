import { AuthController } from "./controller.login";


const URL_REGISTER: string = "https://api-posts.codificando.xyz";
const form = document.querySelector("form") as HTMLFormElement;
const email = document.getElementById("floatingInput") as HTMLInputElement;
const password = document.getElementById("floatingPassword") as HTMLInputElement;
console.log(email.value)
console.log(password.value)
form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const auth = new AuthController(URL_REGISTER);
  try {
    console.log("entre al register")
    const response = await auth.register(email, password);
    const data = response.id;
    console.log(response);
    if (data) {
      alert("Register success")
      window.location.href = "../../index.html";
      return;
    } else {
      alert("Password or username invalid");
    }
    form.reset();
  } catch (error) {
    console.error(error);
  }
})




