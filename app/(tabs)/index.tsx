import React from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import tw from "twrnc";
import TaskCard from "@/components/TaskCard";

const Index: React.FC = () => {
  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        {/* Saludo responsivo */}
        <View style={tw`mt-10 flex flex-col justify-center`}>
          <Text style={tw`mx-8 ${width < 400 ? 'text-xl' : 'text-2xl'} font-bold`}>
            Hola, Juan
          </Text>
        </View>

        {/* Información del lugar */}
        <View style={tw`mt-10`}>
          <Text style={tw`mx-8 ${width < 400 ? 'text-xl' : 'text-2xl'} font-bold`}>
            Huazalingo zona 12
          </Text>
          <Text style={tw`mt-6 mx-8 ${width < 400 ? 'text-sm' : 'text-lg'}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </Text>
        </View>

        {/* Tarjetas de tareas */}
        <View style={tw`${width < 400 ? 'px-2' : 'px-4'}`}>
          <TaskCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
