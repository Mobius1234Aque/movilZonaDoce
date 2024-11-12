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
          respuesta="El procedimiento formal implica enviar una solicitud al supervisor designado. La determinación de aceptación o rechazo de la solicitud recae en el supervisor, y el solicitante recibirá notificación por correo electrónico respecto a esta decisión. En caso de que la solicitud sea aceptada, se requiere completar el registro proporcionando exclusivamente el CURP (Clave Única de Registro de Población), seguido por el establecimiento de una contraseña y la inclusión de otros datos solicitados."
        />

        <CardPregunta
          pregunta="¿Cuál es el procedimiento para recuperar la contraseña?"
          respuesta="Para recuperar la contraseña, el usuario debe acceder al apartado designado como ''¿Olvidó su contraseña?'' en la página de inicio de sesión. Posteriormente, se solicitará al usuario ingresar su CURP (Clave Única de Registro de Población), y si la información es correcta, se le permitirá restaurar su contraseña mediante dos métodos previamente establecidos."
        />
      </View>

     
    </ScrollView>
  );
}
