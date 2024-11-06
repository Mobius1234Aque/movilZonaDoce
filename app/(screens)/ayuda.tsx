import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons"; // Paquete de iconos compatible con Expo
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from 'expo-router';


const CardPregunta = ({ pregunta, respuesta }) => (
  <View style={tw`bg-gray-100 rounded-lg p-6 my-4 shadow-md`}>
    <Text style={tw`font-bold text-xl text-blue-900 mb-2`}>{pregunta}</Text>
    <Text style={tw`text-gray-700 text-base`}>{respuesta}</Text>
  </View>
);

const Contenido = () => (
  <View style={tw`p-4 bg-gray-100 rounded-lg shadow-md`}>
    <Text style={tw`text-gray-800 text-base`}>Aquí va el contenido del ChatBot</Text>
  </View>
);

const handleGoBack = () => {
  router.back();
};


export default function Preguntas() {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleOnClick = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`flex flex-row self-start ml-4 mt-4`}>
        <TouchableOpacity onPress={handleGoBack} style={tw`flex-row items-center mb-4`}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          <Text style={tw`text-lg text-black ml-2`}>Regresar</Text>
        </TouchableOpacity>
      </View>

      {/* Presentación */}
      <View style={tw`p-6 items-center`}>
        <Text style={tw`text-4xl font-bold text-blue-900 mb-4`}>Preguntas Frecuentes</Text>
        <Image
          source={require("../img/ayuda.png")} // Asegúrate de que la ruta sea correcta
          style={tw`w-40 h-40 mt-4`}
        />
      </View>

      {/* Tarjetas de Pregunta */}
      <View style={tw`px-6 mb-20`}>
        <CardPregunta
          pregunta="¿Cuál es el procedimiento para registrarse en el sistema?"
          respuesta="El procedimiento formal implica enviar una solicitud al supervisor designado. La determinación de aceptación o rechazo de la solicitud recae en el supervisor..."
        />

        <CardPregunta
          pregunta="¿Cuál es el procedimiento para recuperar la contraseña?"
          respuesta="Para recuperar la contraseña, el usuario debe acceder al apartado '¿Olvidó su contraseña?' en la página de inicio de sesión..."
        />
      </View>

      {/* Botón flotante más arriba */}
      <TouchableOpacity
        onPress={handleOnClick}
        style={tw`absolute bottom-20 right-10 bg-blue-900 p-4 rounded-full shadow-lg`} // Cambié `bottom-10` a `bottom-20`
      >
        <Ionicons name="chatbubble-outline" size={24} color="white" />
      </TouchableOpacity>

      {/* Mostrar ChatBot si `showChatBot` es verdadero */}
      {showChatBot && (
        <View
          style={tw`absolute bottom-32 right-5 p-4 bg-white border rounded-lg shadow-lg w-72`} // Aumenté el valor de `bottom` para el contenedor del ChatBot también
        >
          <Contenido />
        </View>
      )}
    </ScrollView>
  );
}
