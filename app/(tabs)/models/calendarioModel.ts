// models/agendaModel.ts
import axios from 'axios';

const API_BASE_URL = 'https://servidor-zonadoce.vercel.app';

export async function fetchAgenda() {
    try {
        const response = await axios.get(`${API_BASE_URL}/consultarActividades`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error al obtener la agenda:', error);
        return { success: false, message: 'Error al obtener la agenda' };
    }
}
