import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useRouter } from 'expo-router';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`bg-[#00314A]`}>
      <View style={tw`flex-row items-center justify-between`}>
        {/* Logo de la aplicación */}
        <View style={tw`flex-row items-center px-8`}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/1d/d1/28/1dd128c08dfb042ba665d7ca90682a97.jpg' }}
            style={tw`w-20 h-20`}
          />
        </View>

        {/* Avatar del usuario */}
        <TouchableOpacity onPress={() => router.push('/profile')}>
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
