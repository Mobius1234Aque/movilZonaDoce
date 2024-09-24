// Index.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Button from "@/components/general/Buttons";
import { Input, EmailInput, PasswordInput }from "@/components/general/Inputs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MyCarousel from "@/components/carrusel/carrusel";
import TaskCard from "@/components/TaskCard";

const Index: React.FC = () => {
  const handlePress = () => {
    console.log("Button pressed!");
  };


  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`mt-10 flex flex-col justify-center`}>
          <Text style={tw`text-2xl mx-8 font-bold`}>Hola, Juan</Text>
        </View>
        <View style={tw`mt-10`}>
          <Text style={tw`text-2xl mx-8 font-bold`}>Huazalingo zona 12</Text>
          <Text style={tw`text-lg mt-6 mx-8 `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>  
        </View>

        <View>
          <TaskCard/>
        </View>

      </ScrollView>

    </View>
  );
};

export default Index;
