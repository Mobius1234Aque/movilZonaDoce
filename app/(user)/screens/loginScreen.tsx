import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { CurpInput, PasswordInput } from "@/components/general/Inputs";
import Boton from "@/components/general/Buttons";
import { useRouter } from "expo-router";
import { handleLogin } from "@/app/(user)/Controller/authController";

export default function LoginScreen() {
    const router = useRouter();
    const [curp, setCurp] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState<string | null>(null); // Estado para el mensaje de error

    const handleSave = async () => {
        const response = await handleLogin(curp, contrasena);

        // Verifica si 'response' es definido y tiene la propiedad 'success'
        if (response && response.success) {
            router.push('/(tabs)');
        } else {
            setError(response?.message || "Ocurrió un error inesperado"); // Usa el operador de encadenamiento opcional
        }
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
                    value={curp}
                    onChangeText={setCurp}
                />
                <PasswordInput
                    title="Contraseña"
                    iconName="lock-closed"
                    value={contrasena}
                    onChangeText={setContrasena}
                />
            </View>

            {/* Mostrar mensaje de error si existe */}
            {error && (
                <View style={tw`mt-4 mx-8`}>
                    <Text style={tw`text-red-500 text-lg`}>{error}</Text>
                </View>
            )}

            <View style={tw`flex items-end my-10 mr-8`}>
                <TouchableOpacity onPress={() => router.push('/(user)/screens/recuperar')}>
                    <Text style={tw`text-blue-500 underline text-lg`}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Boton title="Iniciar sesión" onPress={handleSave} />
            </View>
        </View>
    );
}
