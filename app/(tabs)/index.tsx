import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import tw from "twrnc";
import Button from "@/components/general/Buttons";
import Input from "@/components/general/Inputs";
import MyCarousel from "@/components/carrusel/carrusel";

const Index: React.FC = () => {
    const handlePress = () => {
        console.log("Button pressed!");
    };

    return (
        <ScrollView contentContainerStyle={tw`bg-white flex-grow`}>
            <View style={tw`mt-20 flex flex-col  justify-center`}>
                <Text style={tw`text-2xl mx-8 font-bold`}>Hola, Juan</Text>
                <Button title="Presióname" onPress={handlePress} />

                <Input title="Muestra" onPress={handlePress} />

            </View>
        </ScrollView>
    );
};

export default Index;
