import { fetchSubjects } from "@/app/models/foroModel";

export async function loadSubjects() {
    try {
        // Solicitud a la API directamente sin caché
        const data = await fetchSubjects();

        // Retornar los datos obtenidos de la API
        return { success: true, data };
    } catch (error) {
        return { success: false, message: "Error loading subjects. Please check your internet connection." };
    }
}
