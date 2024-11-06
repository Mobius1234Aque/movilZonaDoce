// screens/FreePlanScreen.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PricingCard from '@/components/cards/pricingCard';
import { useRouter, router } from 'expo-router'; // Importa useRouter para manejar la navegación
import tw from 'twrnc';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const FreePlanScreen = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };


  return (
    <View style={tw`flex-1  items-center bg-white`}>
      <View style={tw`flex flex-row self-start ml-4 mt-4`}>
        <TouchableOpacity onPress={handleGoBack} style={tw`flex-row items-center mb-4`}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          <Text style={tw`text-lg text-black ml-2`}>Regresar</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`mt-16`}>
        <PricingCard
          title="GRATUITO"
          price="0"
          description="Organize across all apps by hand"
          buttonText="Plan gratuito"
          onPress={() => console.log("Free plan selected")}
        />
        <PricingCard
          title="Premium"
          price="60"
          description="Organize across all apps by hand"
          buttonText="Plan premium"
          onPress={() => router.push('../(screens)/Subscription')} // Navega a la pantalla de suscripción
        />
      </View>
    </View>
  );
};

export default FreePlanScreen;
