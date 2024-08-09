// Interfaz para la solicitud de inicio de sesión
export interface BodyRequestLogin {
    email: string; // Correo electrónico del usuario
    password: string; // Contraseña del usuario
}

// Interfaz para la respuesta de inicio de sesión
export interface BodyResponseLogin {
    message: string; // Mensaje del servidor, por ejemplo, "Login successful" o "Invalid credentials"
}

// Interfaz para la solicitud de registro
export interface BodyRequestRegister {
    email: string; // Correo electrónico del usuario para el registro
    password: string; // Contraseña del usuario para el registro
}

// Interfaz para la respuesta de registro
export interface BodyResponseRegister {
    email: string; // Correo electrónico del usuario registrado
    password: string; // Contraseña del usuario registrado (aunque no es común devolver la contraseña en la respuesta por razones de seguridad)
    id: number; // Identificador único del usuario registrado
}
