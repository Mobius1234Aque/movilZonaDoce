import React from "react";
import { TextInput, Dimensions, SafeAreaView, View } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
    title: string;
    onPress: () => void;
    iconName: keyof typeof Ionicons.glyphMap;
}

const { width } = Dimensions.get("window");

// Componente genérico Input
const Input: React.FC<InputProps> = ({ title, onPress, iconName }) => {
    return (
        <SafeAreaView style={tw`w-[${width}px] my-2 self-center`}>
            <View style={tw`flex-row items-center border border-gray-300 mx-8 rounded-lg bg-gray-100 px-4`}>
                <Ionicons name={iconName} size={24} color="#888" />
                <TextInput
                    style={tw`flex-1 h-12 ml-2 text-xl`}
                    placeholder={title}
                    keyboardType="default"
                    placeholderTextColor="#888"
                />
            </View>
        </SafeAreaView>
    );
};

// Componente especializado para Email
const EmailInput: React.FC<InputProps> = ({ title, onPress, iconName }) => {
    return (
        <SafeAreaView style={tw`w-[${width}px] my-2 self-center`}>
            <View style={tw`flex-row items-center border border-gray-300 mx-8 rounded-lg bg-gray-100 px-4`}>
                <Ionicons name={iconName} size={24} color="#888" />
                <TextInput
                    style={tw`flex-1 h-12 ml-2 text-xl`}
                    placeholder={title}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
            </View>
        </SafeAreaView>
    );
};

// Componente especializado para Contraseña
const PasswordInput: React.FC<InputProps> = ({ title, onPress, iconName }) => {
    return (
        <SafeAreaView style={tw`w-[${width}px] my-2 self-center`}>
            <View style={tw`flex-row items-center border border-gray-300 mx-8 rounded-lg bg-gray-100 px-4`}>
                <Ionicons name={iconName} size={24} color="#888" />
                <TextInput
                    style={tw`flex-1 h-12 ml-2 text-xl`}
                    placeholder={title}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
            </View>
        </SafeAreaView>
    );
};

// Exportando todos los componentes
export { Input, EmailInput, PasswordInput };
