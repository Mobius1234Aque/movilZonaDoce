import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import tw from 'twrnc';

interface SelectProps {
    options: string[];
    selectedValue: string | null;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, selectedValue, onValueChange, placeholder = 'Selecciona una opción' }) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Manejar la selección de una opción
    const handleSelect = (value: string) => {
        onValueChange(value);
        setModalVisible(false); // Cerrar el modal después de seleccionar
    };

    return (
        <View>
            {/* Campo de selección */}
            <TouchableOpacity
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
                onPress={() => setModalVisible(true)}  // Mostrar el modal al presionar
            >
                <Text>{selectedValue || placeholder}</Text>
            </TouchableOpacity>

            {/* Modal para seleccionar opciones */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)} // Cerrar el modal cuando se presiona "atrás"
            >
                <TouchableOpacity
                    style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}
                    onPress={() => setModalVisible(false)}  // Cerrar el modal al presionar fuera de la lista
                >
                    <View style={tw`bg-white w-[80%] rounded-lg p-4`}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelect(item)} style={tw`p-2 border-b border-gray-300`}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default Select;
