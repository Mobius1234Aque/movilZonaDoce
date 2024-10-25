import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface PricingCardProps {
    title: string;
    price: string;
    description: string;
    buttonText: string;
    onPress: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, description, buttonText, onPress }) => {
    return (
        <View style={tw`border rounded-lg p-6 m-4 w-90 border-gray-300`}>
            <Text style={tw`text-4xl font-bold mb-6`}>{title}</Text>
            <Text style={tw`text-2xl font-bold text-blue-500 mb-4`}>{price} <Text style={tw`text-lg`}>$</Text></Text>
            <Text style={tw`text-gray-600 mb-6`}>{description}</Text>
            <TouchableOpacity onPress={onPress} style={tw`bg-blue-500 p-3 rounded-lg`}>
                <Text style={tw`text-white text-center font-bold`}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PricingCard;