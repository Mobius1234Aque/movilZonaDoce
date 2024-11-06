// controllers/authController.ts
import { loginUser } from "../model/authModel";

export async function handleLogin(curp: string, contrasena: string) {
    try {
        const response = await loginUser(curp, contrasena);
        if (response.success) {
            // Incluye 'email' en la respuesta si está presente
            return {
                success: true,
                token: response.token,
                email: response.email, // Asegúrate de que esto venga del backend
            };
        } else {
            return { success: false, message: response.message || "Credenciales incorrectas" };
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Ocurrió un error desconocido" };
    }
}
