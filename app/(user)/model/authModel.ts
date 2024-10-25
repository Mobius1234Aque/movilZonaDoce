// models/authModel.ts
import axios from "axios";

export async function loginUser(curp: string, contrasena: string) {
    try {
        const response = await axios.post("https://servidor-zonadoce.vercel.app/login", {
            curp: curp.trim().toUpperCase(),
            contrasena,
        });
        return response.data;
    } catch (error) {
        throw new Error("Error de autenticación");
    }
}
