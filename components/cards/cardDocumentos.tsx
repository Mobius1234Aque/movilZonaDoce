import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface DocsCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const DocsCard: React.FC<DocsCardProps> = ({ title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg`}>
      <View style={tw`flex-row items-center`}>
        <MaterialIcons name="description" size={24} color="#000" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-lg font-bold`}>{title}</Text>
          <Text style={tw`text-sm text-gray-500`}>{description}</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default DocsCard;
