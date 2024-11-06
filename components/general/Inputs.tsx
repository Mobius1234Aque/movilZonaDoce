import React, { useState } from "react";
import { TextInput, Dimensions, SafeAreaView, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    value: string; // Añadir value para manejar el estado
    onChangeText: (text: string) => void; // Añadir onChangeText
}

const { width } = Dimensions.get("window");

// Componente genérico Input
const Input: React.FC<InputProps> = ({ title, iconName, value, onChangeText }) => {
    return (
        <SafeAreaView style={tw`w-[${width}px] my-2 self-center`}>
            <View style={tw`flex-row items-center border border-gray-300 mx-8 rounded-lg bg-gray-100 px-4`}>
                <Ionicons name={iconName} size={24} color="#888" />
                <TextInput
                    style={tw`flex-1 h-12 ml-2 text-xl`}
                    placeholder={title}
                    keyboardType="default"
                    placeholderTextColor="#888"
                    value={value} // Usar value
                    onChangeText={onChangeText} // Usar onChangeText
                />
            </View>
        </SafeAreaView>
    );
};

// Componente especializado para CURP
const CurpInput: React.FC<InputProps> = ({ title, iconName, value, onChangeText }) => {
    const handleChange = (text: string) => {
        onChangeText(text.toUpperCase()); // Convierte el texto a mayúsculas
    };

    return (
        <Input
            title={title}
            iconName={iconName}
            value={value} // Usar value
            onChangeText={handleChange} // Usar función de cambio
        />
    );
};

// Componente especializado para Contraseña
const PasswordInput: React.FC<InputProps> = ({ title, iconName, value, onChangeText }) => {
    const [isSecure, setIsSecure] = useState(true); // Estado para controlar la visibilidad de la contraseña

    const togglePasswordVisibility = () => {
        setIsSecure(!isSecure); // Cambiar entre mostrar y ocultar la contraseña
    };

    return (
        <SafeAreaView style={tw`w-full my-2 self-center`}>
            <View style={tw`flex-row items-center border border-gray-300 mx-8 rounded-lg bg-gray-100 px-4`}>
                <Ionicons name={iconName} size={24} color="#888" />
                <TextInput
                    style={tw`flex-1 h-12 ml-2 text-xl`}
                    placeholder={title}
                    secureTextEntry={isSecure}
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                    value={value} // Usar value
                    onChangeText={onChangeText} // Usar onChangeText
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                        name={isSecure ? 'eye-off' : 'eye'}
                        size={24}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// Exportando todos los componentes
export { Input, CurpInput, PasswordInput };
