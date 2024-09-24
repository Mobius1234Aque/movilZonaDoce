import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width } = Dimensions.get('window'); // Obtenemos el ancho de la ventana para ajustar dinámicamente el tamaño

interface CardProps {
  title: string;
  description: string;
  imageUri: string;
}

const CardComponent: React.FC<CardProps> = ({ title, description, imageUri }) => {
  return (
    <View style={tw`bg-white rounded-lg overflow-hidden m-2 shadow-lg`}>

      {/* Imagen adaptativa */}
      <Image
        source={{ uri: imageUri }}
        style={[
          tw`w-full rounded-t-lg`,
          { height: width * 0.6 }, // Ajustamos el alto proporcional al ancho de la pantalla
        ]}
        resizeMode="cover" // Aseguramos que la imagen cubra el área del contenedor
      />

      {/* Botón de opciones */}
      <TouchableOpacity style={tw`absolute top-2 right-2 p-2 bg-gray-600 bg-opacity-50 rounded-full`}>
        <MaterialIcons name="more-vert" size={24} color="white" />
      </TouchableOpacity>

      {/* Contenido de la tarjeta */}
      <View style={tw`p-4`}>
        {/* Título de la tarjeta */}
        <Text style={tw`text-lg font-semibold text-gray-900`}>{title}</Text>
        
        {/* Descripción de la tarjeta */}
        <Text style={tw`text-gray-600 mt-1`}>{description}</Text>
      </View>
    </View>
  );
};

export default CardComponent;
