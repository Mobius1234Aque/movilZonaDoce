import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importar SafeAreaView
import tw from 'twrnc';

const Header: React.FC = () => {
  return (
    <SafeAreaView style={tw`bg-[#00314A]`}>
      <View style={tw`flex-row items-center justify-between`}>
        {/* Icono con texto de la aplicación */}
        <View style={tw`flex-row items-center px-8`}>
          <Image
          source={require("C:/appMovil/pruebaConTypeScript/assets/images/logo.png")}
          style={tw`w-20 h-20`}
          />
          {/* Asegúrate de que todo el texto esté dentro de un <Text> */}
        </View>

        {/* Imagen de avatar del usuario */}
        <View style={tw`flex-row items-center px-8`}>
            <Image
            source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
            style={tw`w-12 h-12 rounded-full`}
            />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
