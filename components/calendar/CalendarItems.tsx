// components/calendar/CalendarItems.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { loadAgenda } from "@/app/(tabs)/Controllers/calendarioController";

const CalendarWithItems = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: boolean; dotColor: string } }>({});
    const [agendaByDate, setAgendaByDate] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState(true);

    // Cargar la agenda desde la API
    useEffect(() => {
        const fetchAgenda = async () => {
            const result = await loadAgenda();

            if (result.success) {
                setMarkedDates(result.markedDates || {});  // Asegurarse de que nunca sea undefined
                setAgendaByDate(result.agendaByDate || {});  // Asegurarse de que nunca sea undefined
            } else {
                console.error(result.message);
            }
            setLoading(false);
        };

        fetchAgenda();
    }, []);

    // Maneja la selección de un día
    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString); // Almacena la fecha seleccionada
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={tw`flex-1 p-4`}>
            {/* Calendario */}
            <Calendar
                onDayPress={handleDayPress}
                markedDates={markedDates}  // markedDates no será undefined
                theme={{
                    selectedDayBackgroundColor: '#00adf5',
                    todayTextColor: '#00adf5',
                    arrowColor: 'blue',
                }}
            />

            {/* Lista de actividades visible solo si se selecciona un día */}
            {selectedDate && (
                <FlatList
                    data={agendaByDate[selectedDate] || []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={tw`flex-row justify-between items-center p-2 border-b border-gray-200`}>
                            <View style={tw`flex-row items-center`}>
                                <Ionicons name="ellipse" size={16} color="blue" style={tw`mr-2`} />
                                <Text>{item.descripcion}</Text>
                            </View>
                            <Text style={tw`text-gray-500`}>{item.duracion}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={tw`text-gray-500 mt-4`}>No hay actividades para este día.</Text>}
                />
            )}
        </View>
    );
};

export default CalendarWithItems;
