import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, useWindowDimensions, Text  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const HeaderProfile: React.FC = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions(); // Obtiene el ancho de la pantalla


  return (
    <SafeAreaView style={tw`bg-[#00314A] h-[${height * 0.32}px] rounded-b-8`}>
        <View style={tw`flex flex-col items-center `}>
            <View style={tw`flex flex-row`}>
                <Text>penis</Text>
            </View>
            <View style={tw`flex-col items-center mt-[${height * 0.03}px]`}>
                <Text style={tw`text-white mb-5 text-xl font-extrabold`}> JUAN HERNANDEZ HERNANDEZ</Text>

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
