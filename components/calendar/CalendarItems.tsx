// components/calendar/CalendarItems.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { loadAgenda } from "@/app/Controllers/calendarioController";

const CalendarWithItems = ({ testID }: { testID?: string }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { customStyles: { container: any, text: any } } }>({});
    const [agendaByDate, setAgendaByDate] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgenda = async () => {
            const result = await loadAgenda();

            if (result.success) {
                setMarkedDates({
                    '2024-10-25': {
                        customStyles: {
                            container: { backgroundColor: 'green' },
                            text: { color: 'white', fontWeight: 'bold' },
                        },
                    },
                });
                setAgendaByDate(result.agendaByDate || {});
            } else {
                console.error(result.message);
            }
            setLoading(false);
        };

        fetchAgenda();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" testID="loading-indicator" />;
    }

    return (
        <View style={tw`flex-1 p-4`} testID={testID}>
            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
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
                        <View style={tw`flex-row justify-between items-center p-2 border-b border-gray-200`}>
                            <View style={tw`flex-row items-center`}>
                                <Ionicons name="ellipse" size={16} color="blue" style={tw`mr-2`} />
                                <Text>{item.descripcion}</Text>
                            </View>
                            <Text style={tw`text-gray-500`}>{item.duracion}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={tw`text-gray-500 mt-4`}>No hay actividades para este día.</Text>}
                    testID="flatlist-agenda"
                />
            )}
        </View>
    );
};

export default CalendarWithItems;
