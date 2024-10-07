import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const TaskCard = () => {
    const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

    return (
        <View
            style={tw`bg-[#00314A] p-4 rounded-lg self-center mt-20 ${
                width < 400 ? 'w-[95%]' : 'w-[90%]'
            } flex flex-row`}
        >
            {/* Contenido de la tarjeta */}
            <View style={tw`${width < 400 ? 'pr-2' : 'pr-4'} w-54`}>
                {/* Título */}
                <Text style={tw`text-white ${width < 400 ? 'text-md' : 'text-lg'} font-semibold mb-2`}>
                    Tareas del día
                </Text>

                {/* Texto de tareas */}
                <Text style={tw`text-gray-300 mb-1 ${width < 400 ? 'text-xs' : 'text-sm'}`}>
                    Perhaps the most iconic sneaker of all-time, this
                </Text>
                <Text style={tw`text-gray-300 mb-4 ${width < 400 ? 'text-xs' : 'text-sm'}`}>
                    Perhaps the most iconic sneaker of all-time, this
                </Text>
            </View>

            {/* Botón de "Ver todas" */}
            <View style={tw`flex flex-col items-center justify-center self-center m-5 `}>
                <TouchableOpacity
                    style={tw`border border-gray-200 rounded-lg px-2 py-2 ${
                        width < 400 ? 'px-2 py-2' : 'px-3 py-3'
                    } flex-row items-center justify-center`}
                >
                    <Text style={tw`text-white ${width < 400 ? 'text-xs' : 'text-sm'}`}>Ver todas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskCard;
