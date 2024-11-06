import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { CurpInput, PasswordInput } from "@/components/general/Inputs";
import Boton from "@/components/general/Buttons";
import { useRouter } from "expo-router";
import { handleLogin } from "@/app/(user)/Controller/authController";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const router = useRouter();
    const [curp, setCurp] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        const response = await handleLogin(curp, contrasena);

        setLoading(false);

        if (response.success) {
            try {
                await AsyncStorage.setItem('userCURP', curp);

                if (response.email) {
                    await AsyncStorage.setItem('userEmail', response.email);
                    console.log("CURP y correo guardados correctamente.");
                } else {
                    console.warn("Correo no encontrado en la respuesta. Solo se guarda la CURP.");
                }
            } catch (error) {
                console.error("Error al guardar la CURP o el correo:", error);
            }

            // Reemplaza 'push' con 'replace' para eliminar LoginScreen del historial
            router.replace('/(tabs)');
        } else {
            setError(response.message || "Ocurrió un error inesperado");
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

            {error && (
                <View style={tw`mt-4 mx-8`}>
                    <Text style={tw`text-red-500 text-lg`}>{error}</Text>
                </View>
            )}

            {loading && (
                <View style={tw`mt-4 mx-8`}>
                    <ActivityIndicator size="large" color="#0000ff" />
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
