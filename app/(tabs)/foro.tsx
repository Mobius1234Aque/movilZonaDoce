import { Text, Image, View } from "react-native";
import React from "react";
import tw from "twrnc";


export default function Foro() {

  return(
    <View style={tw`flex flex-col items-center justify-center flex-1 bg-white`}>
      <Text style={tw`text-6xl `}>
        Pantalla para el Foro
      </Text>
      <Text style={[tw`text-4xl`,{color:'red'}]}>
        Hola
      </Text>

    </View>
  )
}