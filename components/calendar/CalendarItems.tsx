import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const CalendarWithItems = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Datos de ejemplo
    const items = [
        { id: '1', name: 'Item', duration: '30min' },
        { id: '2', name: 'Item', duration: '60min' },
        { id: '3', name: 'Item', duration: '30min' },
        { id: '4', name: 'Item', duration: '15min' },
    ];

    // Maneja la selección de un día
    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString); // Almacena la fecha seleccionada
    };

    return (
        <View style={tw`flex-1 p-4`}>
            {/* Calendario */}
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    [selectedDate || '']: { selected: true, marked: true, selectedColor: 'blue' },
                }}
                theme={{
                    selectedDayBackgroundColor: '#00adf5',
                    todayTextColor: '#00adf5',
                    arrowColor: 'blue',
                }}
            />

            {/* Lista de items visible solo si se selecciona un día */}
            {selectedDate && (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={tw`flex-row justify-between items-center p-2 border-b border-gray-200`}>
                            <View style={tw`flex-row items-center`}>
                                <Ionicons name="ellipse" size={16} color="blue" style={tw`mr-2`} />
                                <Text>{item.name}</Text>
                            </View>
                            <Text style={tw`text-gray-500`}>{item.duration}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default CalendarWithItems;
