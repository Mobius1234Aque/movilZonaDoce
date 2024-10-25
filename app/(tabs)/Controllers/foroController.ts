import { fetchSubjects } from "@/app/(tabs)/models/foroModel";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadSubjects() {
    try {
        // Intentamos obtener los subjects desde AsyncStorage (caché)
        const cachedSubjects = await AsyncStorage.getItem('cachedSubjects');
        if (cachedSubjects) {
            const parsedSubjects = JSON.parse(cachedSubjects);
            // Si hay datos en el caché, los retornamos para mostrarlos mientras se hace la petición
            return { success: true, data: parsedSubjects, fromCache: true };
        }

        // Si no hay caché, hacemos la solicitud a la API
        const data = await fetchSubjects();

        // Guardamos los datos en AsyncStorage
        await AsyncStorage.setItem('cachedSubjects', JSON.stringify(data));

        return { success: true, data, fromCache: false };
    } catch (error) {
        return { success: false, message: "Error loading subjects. Please check your internet connection." };
    }
}
