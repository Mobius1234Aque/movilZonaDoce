import axios from "axios";

export const fetchSubjects = async () => {
    try {
        // Solicitud directa a la API para obtener las materias
        const response = await axios.get("https://servidor-zonadoce.vercel.app/consultarMaterias");
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects: ", error);
        throw error;
    }
};
