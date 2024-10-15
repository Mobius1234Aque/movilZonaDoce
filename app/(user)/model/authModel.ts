// models/authModel.ts
import axios from "axios";

export async function loginUser(curp: string, contrasena: string) {
    try {
        const response = await axios.post("http://192.168.25.166:3000/login", {
            curp: curp.trim().toUpperCase(),
            contrasena,
        });
        return response.data;
    } catch (error) {
        throw new Error("Error de autenticación");
    }
}
