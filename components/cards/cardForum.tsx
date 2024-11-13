import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface DocsCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const ForumCard: React.FC<DocsCardProps> = ({ title, description, onPress }) => {
  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla
  const iconSize = width * 0.2; // Ajusta el tamaño del icono dinámicamente según el ancho de la pantalla

  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-lg`}>
      <View style={tw`flex-row items-center`}>
        {/* Ícono de documento */}
        <MaterialIcons name="description" size={iconSize} color="#000" />

        {/* Contenedor de texto */}
        <View style={tw`ml-4`}>

          {/* Título */}
          <Text style={tw`text-lg font-bold text-blue-500`} numberOfLines={1}>
            {title}
          </Text>

          {/* Descripción */}
          <Text style={tw`text-sm text-gray-500`} numberOfLines={2}>
            {description}
          </Text>

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ForumCard;
