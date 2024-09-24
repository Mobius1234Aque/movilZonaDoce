import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const TaskCard = () => {
    return (
        <View style={tw`bg-[#00314A] p-4 rounded-lg w-[85%] self-center flex flex-row mt-20`}>

            <View>
            {/* Título */}
                <Text style={tw`text-white text-lg font-semibold mb-2`}>Tareas del día</Text>
                
                {/* Texto de tareas */}
                <Text style={tw`text-gray-300 mb-1`}>
                    Perhaps the most iconic sneaker of all-time, this
                </Text>
                <Text style={tw`text-gray-300 mb-4`}>
                    Perhaps the most iconic sneaker of all-time, this
                </Text>
            </View>

            <View style={tw`flex flex-col items-center justify-center self-center m-5`}>

            {/* Botón de "Ver todas" */}
                <TouchableOpacity 
                    style={tw`border border-gray-200 rounded-lg px-2  py-4 flex-row items-center justify-center`}
                >
                    <Text style={tw`text-white mr-2`}>Ver todas</Text>
                    <Ionicons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskCard;
