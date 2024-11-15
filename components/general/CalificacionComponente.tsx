import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import axios from "axios";

interface CalificacionModalProps {
    curp: string; // CURP del usuario
    apiUrl: string; // URL base de tu API
}

const CalificacionModal: React.FC<CalificacionModalProps> = ({ curp, apiUrl }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hasVoted, setHasVoted] = useState<boolean | null>(null); // Inicializar en null

    // Verificar si el usuario ya votó
    useEffect(() => {
        const checkVotingStatus = async () => {
            try {
                // Eliminamos cualquier dato previo de hasVoted en AsyncStorage para depuración
                await AsyncStorage.removeItem("hasVoted");

                const hasVotedStatus = await AsyncStorage.getItem("hasVoted");
                console.log("Estado guardado de hasVoted en AsyncStorage (antes de verificar):", hasVotedStatus);

                // Solo si no está en AsyncStorage, verifica en la base de datos
                if (!hasVotedStatus) {
                    const response = await axios.get(`${apiUrl}/calificacion?curp=${curp}`);
                    const { calificacion } = response.data;

                    // Si calificación es null, el usuario no ha votado
                    const userHasVoted = calificacion !== null;
                    setHasVoted(userHasVoted);
                    console.log("Estado de hasVoted después de verificar en el servidor:", userHasVoted);

                    // Guarda en AsyncStorage para futuras verificaciones solo si el usuario ha votado
                    if (userHasVoted) {
                        await AsyncStorage.setItem("hasVoted", "true");
                    }
                } else {
                    // Si ya está guardado en AsyncStorage, úsalo directamente
                    setHasVoted(hasVotedStatus === "true");
                }
            } catch (error) {
                console.error("Error al verificar el estado de votación:", error);
                Alert.alert("Error", "No se pudo verificar el estado de votación.");
            }
        };

        checkVotingStatus();
    }, [curp, apiUrl]);

    // Mostrar el modal si el usuario no ha votado
    useEffect(() => {
        if (hasVoted === false) {
            console.log("El usuario no ha votado, mostrando el modal.");
            setIsModalVisible(true);
        } else {
            console.log("El usuario ya ha votado o el estado no está definido.");
        }
    }, [hasVoted]);

    // Manejar la calificación
    const handleVote = async (calificacion: string) => {
        try {
            // Enviar la calificación al backend
            const response = await axios.post(`${apiUrl}/calificacion`, {
                curp,
                calificacion,
            });

            if (response.status === 200) {
                // Guardar en AsyncStorage que el usuario ya votó
                await AsyncStorage.setItem("hasVoted", "true");
                setHasVoted(true); // Cambiar el estado local
                setIsModalVisible(false);
                Alert.alert("Gracias", "Tu calificación ha sido registrada.");
            } else {
                Alert.alert("Error", "No se pudo registrar tu calificación. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al enviar la calificación:", error);
            Alert.alert("Error", "No se pudo conectar con el servidor.");
        }
    };

    console.log("Estado del modal:", isModalVisible); // Verificar si se activa correctamente
    console.log("Estado de hasVoted:", hasVoted);

    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={tw`flex-1 bg-black/75 justify-center items-center mt-20`}>
                <View style={tw`w-4/5 bg-white rounded-lg p-5 shadow-lg`}>
                    <Text style={tw`text-2xl font-bold text-center mb-5`}>
                        ¿Como esta siendo tu experiencia con nuestra aplicacion? 😥
                    </Text>
                    <View style={tw`flex-row justify-between`}>
                        {["Bueno", "Regular", "Malo"].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={tw`bg-blue-500 px-5 py-2 rounded-lg`}
                                onPress={() => handleVote(option)}
                            >
                                <Text style={tw`text-white text-lg font-medium text-center`}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CalificacionModal;
