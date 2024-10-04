import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-[#00314A]`}>
      <View style={tw`flex-row items-center justify-between`}>
        {/* Logo de la aplicación */}
        <View style={tw`flex-row items-center px-8`}>
          <Image
            source={require("C:/appMovil/pruebaConTypeScript/assets/images/logo.png")}
            style={tw`w-20 h-20`}
          />
        </View>

        {/* Avatar del usuario */}
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <View style={tw`flex-row items-center px-8`}>
            <Image
              source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
              style={tw`w-12 h-12 rounded-full`}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
