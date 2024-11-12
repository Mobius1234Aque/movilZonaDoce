 
import { fetchAgenda } from "@/app/models/calendarioModel";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API URL para verificar si la actividad ha sido entregada
const API_BASE_URL = 'https://servidor-zonadoce.vercel.app';

// Función para verificar si la actividad ha sido entregada
async function verificarActividadEntregada(actividadId: number, curp: string): Promise<boolean> {
    try {
        // Log para verificar el id de actividad y el CURP
        console.log(`Verificando actividad con ID: ${actividadId} y CURP: ${curp}`);
        
        const response = await axios.get(`${API_BASE_URL}/verificarExistencia/${actividadId}`, {
            params: { curp }
        });

        // Log para verificar la respuesta de la API
        console.log(`Respuesta de la API para la actividad ${actividadId}: `, response.data);

        return response.data.existe; // Retorna `true` si la actividad ha sido entregada, `false` si no
    } catch (error) {
        console.error("Error al verificar si la actividad ha sido entregada:", error);
        return false; // En caso de error, consideramos que no ha sido entregada
    }
}

// Función para recuperar la CURP desde AsyncStorage
const getCurp = async (): Promise<string | null> => {
  try {
    const curp = await AsyncStorage.getItem('userCURP');
    if (curp !== null) {
      return curp;
    } else {
      console.log("No se encontró la CURP.");
      return null;
    }
  } catch (error) {
    console.error("Error al recuperar la CURP:", error);
    return null;
  }
};

export async function loadAgenda() {
    const curp = await getCurp();  // Recupera la CURP desde AsyncStorage
    if (!curp) {
        console.error("No se pudo recuperar la CURP, no se pueden cargar las actividades.");
        return { success: false, message: "CURP no encontrada" };  // Si no se encuentra CURP, retorna un error
    }

    const result = await fetchAgenda();
    if (result.success) {
        const agenda = result.data;
        const markedDates: { [key: string]: { marked: boolean; dotColor: string; hasActivities: boolean } } = {};
        const agendaByDate: { [key: string]: any[] } = {};
        const agendaNoEntregada: any[] = [];  // Para almacenar actividades no entregadas

        console.log("Actividades recibidas:", agenda); // Log para verificar las actividades

        // Recorremos las actividades y verificamos si han sido entregadas
        for (let activity of agenda) {
            if (activity.fecha_sol) {
                const date = activity.fecha_sol.split('T')[0]; // Asegura que `fecha_sol` esté bien formateada
                if (!markedDates[date]) {
                    markedDates[date] = { marked: true, dotColor: 'blue', hasActivities: true }; // Añade `hasActivities`
                }
                if (!agendaByDate[date]) {
                    agendaByDate[date] = [];
                }

                // Verificar si la actividad ha sido entregada usando la CURP
                const entregada = await verificarActividadEntregada(activity.id, curp);

                if (entregada) {
                    // Si la actividad ya fue entregada, cambiamos el color del punto a gris
                    markedDates[date].dotColor = 'gray';
                } else {
                    // Si no ha sido entregada, mantenemos el punto azul
                    markedDates[date].dotColor = 'blue';
                    agendaNoEntregada.push(activity); // Solo agregamos las actividades no entregadas
                }

                agendaByDate[date].push({ ...activity, entregada }); // Indicamos si la actividad ha sido entregada
            } else {
                console.error("Actividad sin fecha_sol:", activity); // Log para detectar actividades sin `fecha_sol`
            }
        }

        return { success: true, markedDates, agendaByDate, agendaNoEntregada };
    } else {
        return { success: false, message: result.message };
    }
}
