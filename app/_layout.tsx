import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "@/components/general/header";
import HeaderProfile from "@/components/general/HeaderProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from '@stripe/stripe-react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Roboto-Regular.ttf"),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga adicional

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token); // Verifica si el token existe
      setIsLoading(false); // Desactiva el estado de carga
    };

    checkLoginStatus();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || isLoading) { // Espera a que se carguen las fuentes y la autenticación
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_live_51QCUVXDuSddEszG0pP0FhH8wvg0e6ROwKcgWAYc1M4OJD5AbCXpHMT4XofSAdkCV4W1TOzd9oX8tIWQtlEpRQXbH004WJrq3Ln">
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
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen
              name="(user)/screens"
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack>
      </ThemeProvider>
    </StripeProvider>
  );
}
