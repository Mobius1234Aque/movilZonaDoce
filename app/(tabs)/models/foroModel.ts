import axios from "axios";

export const fetchSubjects = async () => {
    try {
        const response = await axios.get("https://servidor-zonadoce.vercel.app/consultarMaterias");
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects: ", error);
        throw error;
    }
};
