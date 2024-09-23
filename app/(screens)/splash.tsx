import { View, Text, Image, Animated, useWindowDimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import tw from "twrnc";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  // Crear referencias animadas para cada punto
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  // Crear animaciones para cada punto
  const animateDot = (fadeAnim: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Lanzar las animaciones al montar el componente
  useEffect(() => {
    animateDot(fadeAnim1, 0); // Primer punto, sin delay
    animateDot(fadeAnim2, 250); // Segundo punto, con un pequeño delay
    animateDot(fadeAnim3, 500); // Tercer punto, con un delay mayor
  }, []);

  const { width, height } = useWindowDimensions();
  useEffect(() => {
    setTimeout(() => {
      router.push("/(tabs)");
    }, 2000);
  }, []);

  return (
    <View style={tw`flex-1 bg-[#00314A] justify-center items-center`}>
      <View style={tw`justify-center items-center flex flex-col`}>
        <Image
          source={require("C:/appMovil/pruebaConTypeScript/assets/images/logo.png")}
          style={tw`w-[400px] h-[400px]`}
        />
        <Text style={tw`text-white text-6xl font-bold py-2`}>EduZona</Text>

        {/* Contenedor de los tres puntos de carga */}
        <View style={tw`mt-4 flex flex-row justify-center items-center`}>
          {/* Primer punto */}
          <Animated.View
            style={[
              tw`w-4 h-4 bg-white rounded-full mx-1`,
              { opacity: fadeAnim1 }, // Aplicar la animación al estilo
            ]}
          />
          {/* Segundo punto */}
          <Animated.View
            style={[
              tw`w-4 h-4 bg-white rounded-full mx-1`,
              { opacity: fadeAnim2 }, // Aplicar la animación al estilo
            ]}
          />
          {/* Tercer punto */}
          <Animated.View
            style={[
              tw`w-4 h-4 bg-white rounded-full mx-1`,
              { opacity: fadeAnim3 }, // Aplicar la animación al estilo
            ]}
          />
        </View>
      </View>
    </View>
  );
}
