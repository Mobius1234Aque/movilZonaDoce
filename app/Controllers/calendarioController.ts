// controllers/agendaController.ts
import { fetchAgenda } from "@/app/models/calendarioModel";

export async function loadAgenda() {
    const result = await fetchAgenda();
    if (result.success) {
        const agenda = result.data;
        const markedDates: { [key: string]: { marked: boolean; dotColor: string } } = {};
        const agendaByDate: { [key: string]: any[] } = {};

        console.log("Actividades recibidas:", agenda); // Agregamos un log para ver qué devuelve la API

        // Marcar las fechas con actividades
        agenda.forEach((activity: any) => {
            // Usar `fecha_sol` en lugar de `fecha`
            if (activity.fecha_sol) {
                const date = activity.fecha_sol.split('T')[0]; // Validamos que la fecha_sol existe antes de hacer el split
                if (!markedDates[date]) {
                    markedDates[date] = { marked: true, dotColor: 'blue' };
                }
                if (!agendaByDate[date]) {
                    agendaByDate[date] = [];
                }
                agendaByDate[date].push(activity); // Agrupar actividades por fecha
            } else {
                console.error("Actividad sin fecha_sol:", activity); // Log para detectar actividades sin fecha_sol
            }
        });

        return { success: true, markedDates, agendaByDate };
    } else {
        return { success: false, message: result.message };
    }
}