// controllers/authController.ts
import { loginUser } from "../model/authModel";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function handleLogin(curp: string, contrasena: string) {
    try {
        const response = await loginUser(curp, contrasena);
        if (response.success) {
            // Asegúrate de que el token se esté enviando en la respuesta
            return { success: true, token: response.token };
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

