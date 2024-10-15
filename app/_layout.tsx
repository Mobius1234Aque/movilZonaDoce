import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "@/components/general/header";
import HeaderProfile from "@/components/general/HeaderProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Roboto-Regular.ttf"),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token); // Verifica si el token existe
    };

    checkLoginStatus();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="profile"
          options={{
            header: () => <HeaderProfile />,
            headerShown: true,
          }}
        />
        <Stack.Screen name="(tabs)"
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="(screens)"
          options={{
            headerShown: false,
          }}
        />


        {isLoggedIn ? (
          // Si está autenticado, mostrar la pantalla principal
          <Stack.Screen name="(tabs)" />
        ) : (
          // Si no está autenticado, mostrar la pantalla de inicio de sesión
          <Stack.Screen
            name="(user)/screens"
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack>
    </ThemeProvider>
  );
}
