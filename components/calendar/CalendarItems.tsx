import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
// ------------------ Controlador ------------------
// `loadAgenda` actúa como controlador, ya que gestiona la lógica de negocio al cargar la agenda.
import { loadAgenda } from "@/app/Controllers/calendarioController";
// -------------------------------------------------

// ------------------ Modelo ------------------
// `uploadBytes`, `getDownloadURL`, `ref`, `storage` (Firebase Storage) y `uuidv4` se usan para manejar los datos y la lógica
// de almacenamiento de archivos PDF en la nube. `getCurp` también se encarga de acceder a los datos almacenados en AsyncStorage.
// Estas funciones pertenecen al modelo, ya que interactúan con la base de datos o almacenamiento.
// -------------------------------------------------
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarWithItems = ({ testID }: { testID?: string }) => {
    // ------------------ Vista ------------------
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<any>(null);
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { customStyles: { container: any, text: any } } }>({});
    const [agendaByDate, setAgendaByDate] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [pdfFile, setPdfFile] = useState<any | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0); // Estado para forzar la actualización

    useEffect(() => {
        // ------------------ Controlador ------------------
        // Este efecto se ejecuta cada vez que cambia `refreshKey`, forzando la recarga del calendario
        const fetchAgenda = async () => {
            const result = await loadAgenda();
            if (result.success) {
                setMarkedDates(result.markedDates);
                setAgendaByDate(result.agendaByDate || {});
            } else {
                console.error(result.message);
            }
            setLoading(false);
        };

        fetchAgenda();
    }, [refreshKey]);  // Dependencia en `refreshKey` para actualizar cada vez que cambia

    const handleDatePress = (day: any) => {
        const date = day.dateString;
        setSelectedDate(date);
        setSelectedActivity(null);
    };

    const handleActivityPress = (activity: any) => {
        setSelectedActivity(activity);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedActivity(null);
        setPdfFile(null);
    };

    const selectPdf = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });

            if (!result.canceled) {
                const file = result.assets ? result.assets[0] : result;
                const fileName = file.name;
                const fileUri = file.uri;

                if (fileName && fileUri) {
                    setPdfFile({ name: fileName, uri: fileUri });
                    console.log("Archivo PDF seleccionado:", fileName);
                } else {
                    console.error("Error al extraer los detalles del archivo PDF seleccionado.");
                    Alert.alert("Error", "No se pudo obtener el nombre del archivo seleccionado.");
                }
            } else {
                Alert.alert("Selección cancelada", "No se ha seleccionado ningún archivo.");
            }
        } catch (err) {
            console.error('Error al seleccionar archivo:', err);
            Alert.alert("Error", "Hubo un problema al seleccionar el archivo.");
        }
    };

    const uploadPdfToFirebase = async () => {
        if (!pdfFile || !pdfFile.uri) {
            Alert.alert("Error", "Por favor, selecciona un archivo PDF primero.");
            return null;
        }

        setIsUploading(true);

        try {
            const uniqueFileName = `${uuidv4()}-${pdfFile.name}`;
            const storageRef = ref(storage, `agenda/${uniqueFileName}`);
            const response = await fetch(pdfFile.uri);
            const blob = await response.blob();

            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);

            console.log("Archivo subido exitosamente a Firebase. URL:", downloadURL);
            return downloadURL;
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            Alert.alert("Error", "No se pudo subir el archivo.");
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const getCurp = async () => {
        try {
            const curp = await AsyncStorage.getItem('userCURP');
            return curp !== null ? curp : null;
        } catch (error) {
            console.error("Error al recuperar la CURP:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!selectedActivity) {
            Alert.alert("Error", "No hay actividad seleccionada.");
            return;
        }

        // Verificar si la actividad ya fue entregada
        if (selectedActivity.entregada) {
            Alert.alert("Actividad Entregada", "Esta actividad ya fue entregada.");
            return; // No permitir que el usuario suba el archivo si ya fue entregada
        }

        const pdfUrl = await uploadPdfToFirebase();
        if (!pdfUrl) return;

        const curp = await getCurp();
        if (!curp) {
            Alert.alert("Error", "No se pudo recuperar la CURP. Inicia sesión nuevamente.");
            return;
        }

        const formData = {
            actividadId: selectedActivity.id,
            pdfUrl,
            curp,
        };

        console.log("Datos enviados al backend:", formData);

        try {
            const response = await axios.post("https://servidor-zonadoce.vercel.app/subirPdf", formData);
            if (response.status === 200) {
                Alert.alert("Éxito", "Evidencia subida exitosamente");
                setRefreshKey(prevKey => prevKey + 1); // Cambiar la clave de actualización para recargar el calendario
                closeModal();
            } else {
                Alert.alert("Error", "Error al subir la evidencia");
            }
        } catch (error) {
            console.error('Error al enviar los datos al servidor:', error);
            Alert.alert('Error', 'Error al enviar los datos al servidor');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" testID="loading-indicator" />;
    }

    return (
        <View style={tw`flex-1 p-4 bg-gray-100`} testID={testID}>
            <Calendar
                onDayPress={handleDatePress}
                markedDates={markedDates}
                theme={{
                    selectedDayBackgroundColor: '#00adf5',
                    todayTextColor: '#00adf5',
                    arrowColor: 'blue',
                }}
                testID="calendar-component"
            />

            {selectedDate && (
                <FlatList
                    data={agendaByDate[selectedDate] || []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleActivityPress(item)} style={tw`my-2`}>
                            <View style={tw`bg-white p-4 rounded-lg shadow-md`}>
                                <View style={tw`flex-row items-center`}>
                                    <Ionicons name="calendar-outline" size={24} color="#4a90e2" style={tw`mr-2`} />
                                    <Text style={tw`text-xl font-semibold text-blue-800`}>{item.titulo}</Text>
                                </View>
                                <Text style={tw`text-gray-700 mt-2`}>{item.descripcion}</Text>
                                <View style={tw`mt-2 flex-row justify-between`}>
                                    <Text style={tw`text-sm text-gray-500`}>Hora: {item.hora_sol}</Text>
                                    <Text style={tw`text-sm text-gray-500`}>Creación: {item.fecha_creacion.split('T')[0]}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={tw`text-gray-500 mt-4 text-center`}>No hay actividades para este día.</Text>}
                    testID="flatlist-agenda"
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={tw`flex-1 justify-center items-center bg-black/50`}>
                    <View style={tw`bg-white p-6 rounded-lg shadow-lg w-3/4`}>
                        {selectedActivity && (
                            <>
                                <Text style={tw`text-2xl font-bold text-blue-800 mb-4`}>Detalles de la Actividad</Text>
                                <Text style={tw`mb-2 text-lg font-semibold text-blue-700`}>Título: {selectedActivity.titulo}</Text>
                                <Text style={tw`mb-2 text-gray-700`}>Descripción: {selectedActivity.descripcion}</Text>
                                <Text style={tw`mb-2 text-gray-500`}>Hora Solicitada: {selectedActivity.hora_sol}</Text>
                                
                                <TouchableOpacity
                                    style={tw`border-dashed border-2 border-blue-500 p-6 mb-4 rounded-md items-center`}
                                    onPress={selectPdf}
                                >
                                    <Text style={tw`text-blue-500 text-center`}>
                                        {pdfFile ? `Archivo seleccionado: ${pdfFile.name}` : "Sube el documento PDF del examen"}
                                    </Text>
                                </TouchableOpacity>

                                <Button
                                    title={isUploading ? "Subiendo..." : "Subir PDF"}
                                    onPress={handleSubmit}
                                    color="#4a90e2"
                                    disabled={isUploading}
                                />
                                <View style={tw`mt-2`}>
                                    <Button title="Cerrar" onPress={closeModal} color="#ff6b6b" />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CalendarWithItems;
