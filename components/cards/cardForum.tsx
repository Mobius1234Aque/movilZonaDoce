import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface DocsCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const ForumCard: React.FC<DocsCardProps> = ({ title, description, onPress }) => {
    const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla


  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-lg`}>
      <View style={tw`flex-row `}>

        <View>
        <MaterialIcons name="description" size={200} color="#000" />
        </View>
        <View style={tw`ml-4 mt-8`}>
          <Text style={tw`text-lg font-bold`}>{title}</Text>
          <Text style={tw`text-sm text-gray-500`}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ForumCard;
