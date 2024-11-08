import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Mas = () => {
    const router = useRouter();

    return (
        <View style={tw`flex-1 bg-white p-6`}>
            <Text style={tw`text-2xl font-bold mb-4 `}>Más opciones</Text>

            <TouchableOpacity
                style={tw`flex-row items-center p-4 rounded-lg mb-4 border-b border-slate-400`}
                onPress={() => router.push("/(screens)/suscripciones")}
            >
                <MaterialCommunityIcons name="star" size={24} color="black" style={tw`mr-3`} />
                <Text style={tw`text-black text-lg font-bold`}>Suscripcion</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={tw`flex-row items-center p-4 rounded-lg mb-4 border-b border-slate-400`}
                onPress={() => router.push("/(screens)/ayuda")}
            >
                <MaterialCommunityIcons name="help-circle" size={24} color="black" style={tw`mr-3`} />
                <Text style={tw`text-black text-lg font-bold`}>Ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={tw`flex-row items-center p-4 rounded-lg mb-4 border-b border-slate-400`}
                onPress={() => router.push("/(screens)/documentos")}
            >
                <MaterialCommunityIcons name="folder" size={24} color="black" style={tw`mr-3`} />
                <Text style={tw`text-black text-lg font-bold`}>Mis Documentos</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Mas;
