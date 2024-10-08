import React,{useState} from "react";
import { TextInput, Dimensions, SafeAreaView, View, TouchableOpacity } from "react-native";
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
                    style={tw`flex-1 h-12 ml-6 text-xl`}
                    placeholder={title}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
            </View>
        </SafeAreaView>
    );
};
const CurpInput: React.FC<InputProps> = ({ title, onPress, iconName }) => {
    const [inputValue, setInputValue] = React.useState('');
    const handleChange = (text: string) => {
        // Convertir el texto a mayúsculas
        setInputValue(text.toUpperCase());
    };
    return (
        <SafeAreaView style={tw`w-[${width}px] my-2 self-center`}>
            <View style={tw`flex-row items-center border border-gray-300 mx-8 rounded-lg bg-gray-100 px-4`}>
                <Ionicons name={iconName} size={24} color="#888" />
                <TextInput
                    style={tw`flex-1 h-12 ml-6 text-xl`}
                    placeholder={title}
                    keyboardType="default"
                    autoCapitalize="characters"
                    placeholderTextColor="#888"
                    value={inputValue} // Asigna el valor del estado
                    onChangeText={handleChange} // Maneja el cambio de texto
                />
            </View>
        </SafeAreaView>
    );
};

const PasswordInput: React.FC<InputProps> = ({ title, iconName }) => {
    const [isSecure, setIsSecure] = useState(true); // Estado para controlar la visibilidad de la contraseña
  
    const togglePasswordVisibility = () => {
      setIsSecure(!isSecure); // Cambiar entre mostrar y ocultar la contraseña
    };
  
    return (
      <SafeAreaView style={tw`w-full my-2 self-center`}>
        <View style={tw`flex-row items-center border border-gray-300 mx-8 rounded-lg bg-gray-100 px-4`}>
          <Ionicons name={iconName} size={24} color="#888" />
          <TextInput
            style={tw`flex-1 h-12 ml-6 text-xl`}
            placeholder={title}
            secureTextEntry={isSecure}
            autoCapitalize="none"
            placeholderTextColor="#888"
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
export { Input, EmailInput, PasswordInput, CurpInput };
