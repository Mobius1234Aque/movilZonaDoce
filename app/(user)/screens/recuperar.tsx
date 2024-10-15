import { Text, View } from "react-native";
import React, { useState } from "react"; // Importa useState para manejar el estado
import tw from "twrnc";
import { CurpInput } from "@/components/general/Inputs";
import Boton from "@/components/general/Buttons";

export default function Recuperar() {
    const [step, setStep] = useState(1); // Estado para manejar el paso actual
    const totalSteps = 3; // Total de pasos

    const handleSave = () => {
        // Aquí puedes manejar la lógica de guardado
        console.log('Guardando información...');
        // Aquí podrías incrementar el paso si lo deseas
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    return (
        <View style={tw`flex flex-col flex-1 bg-white`}>
            <View style={tw`mt-30`}>
                <Text style={tw`text-6xl ml-10 font-bold leading-tight`}>
                    ¿Olvidaste tu contraseña?
                </Text>

                {/* Línea horizontal con texto */}
                <View style={tw`flex-row items-center mt-2 ml-2`}>
                    <View style={tw`flex-1 border-b border-gray-300`} />
                    <Text style={tw`mx-2 text-xl`}>
                        Paso {step} / {totalSteps}
                    </Text>
                    <View style={tw`w-6 border-b mr-2 border-gray-300`} />
                </View>
            </View>
            <View style={tw`my-16`}>
                <CurpInput
                    title="Ingresa tu CURP *"
                    iconName="document"
                    value=""
                    onChangeText={() => { }}
                />
            </View>
            <View>
                <Boton title="Confirmar" onPress={handleSave} />
            </View>
        </View>
    );
}
