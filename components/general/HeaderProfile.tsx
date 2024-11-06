import React from 'react';
import { View, Image, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from 'expo-router';

const HeaderProfile: React.FC = () => {
  const { height } = useWindowDimensions();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[tw`bg-[#00314A] rounded-b-8`, { height: height * 0.32 }]}>
      <View style={tw`flex flex-col items-center`}>
        <View style={tw`flex flex-row self-start ml-4 mt-2`}>
          <TouchableOpacity onPress={handleGoBack} style={tw`flex-row items-center mb-4`}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            <Text style={tw`text-lg text-white ml-2`}>Regresar</Text>
          </TouchableOpacity>
        </View>
        <View style={[tw`flex-col items-center`, { marginTop: height * 0.03 }]}>
          <Image
            source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
            style={tw`w-30 h-30 rounded-full`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderProfile;
