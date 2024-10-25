// screens/FreePlanScreen.tsx
import React from 'react';
import { View } from 'react-native';
import PricingCard from '@/components/cards/pricingCard';
import tw from 'twrnc';

const FreePlanScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <PricingCard
        title="GRATUITO"
        price="0"
        description="Organize across all apps by hand"
        buttonText="Plan gratuito"
        onPress={() => console.log("Free plan selected")}
      />
      <PricingCard
        title="GRATUITO"
        price="0"
        description="Organize across all apps by hand"
        buttonText="Plan gratuito"
        onPress={() => console.log("Free plan selected")}
      />

    </View>
  );
};

export default FreePlanScreen;
