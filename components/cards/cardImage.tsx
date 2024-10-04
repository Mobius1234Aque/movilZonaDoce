import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window'); // Obtener ancho y altura de la ventana

interface CardProps {
  title: string;
  description: string;
  imageUri: string;
}

const CardComponent: React.FC<CardProps> = ({ title, description, imageUri }) => {
  const isSmallScreen = width < 350; // Definir si es una pantalla pequeña

  return (
    <View style={tw`bg-white rounded-lg overflow-hidden m-2 shadow-lg`}>
      
      {/* Imagen adaptativa */}
      <Image
        source={{ uri: imageUri }}
        style={[
          tw`w-full rounded-t-lg`,
          { height: width * 0.6 }, // Ajustamos el alto proporcional al ancho de la pantalla
        ]}
        resizeMode="cover"
      />
      
      {/* Botón de opciones */}
      <TouchableOpacity style={tw`absolute top-2 right-2 p-2 bg-gray-600 bg-opacity-50 rounded-full`}>
        <MaterialIcons name="more-vert" size={24} color="white" />
      </TouchableOpacity>
      
      {/* Contenido de la tarjeta */}
      <View style={tw`p-4`}>
        {/* Título adaptativo */}
        <Text style={tw`text-gray-900 font-semibold ${isSmallScreen ? 'text-sm' : 'text-lg'}`}>
          {title}
        </Text>
        
        {/* Descripción adaptativa */}
        <Text style={tw`mt-1 ${isSmallScreen ? 'text-xs' : 'text-base'} text-gray-600`}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default CardComponent;
