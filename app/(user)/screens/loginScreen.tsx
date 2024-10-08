import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { CurpInput, PasswordInput } from "@/components/general/Inputs";
import Boton from "@/components/general/Buttons";
import { useRouter } from "expo-router"; // Cambia esto

export default function loginScreen() {
    const router = useRouter(); // Usa el hook para obtener el objeto de navegación

    const handleSave = () => {
        // Aquí puedes manejar la lógica de guardado
        console.log('Guardando información...');
    };

    return (
        <View style={tw`flex flex-col flex-1 bg-white`}>
            <View style={tw`mt-30`}>
                <Text style={tw`text-6xl ml-10 font-bold leading-tight`}>
                    ¡Bienvenido de vuelta!
                </Text>
            </View>
            <View style={tw`mt-20`}>
                <CurpInput
                    title="Ingresa tu CURP *"
                    iconName="document"
                    onPress={() => {}}
                />
                <PasswordInput
                    title="Contraseña"
                    iconName="lock-closed"
                    onPress={() => {}}
                />
            </View>
            <View style={tw`flex items-end my-10 mr-8`}>
                <TouchableOpacity onPress={() => router.push('(user)/screens/recuperar')}>
                    <Text style={tw`text-blue-500 underline text-lg`}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Boton title="Iniciar sesión" onPress={handleSave}/>
            </View>
        </View>
    );
}
