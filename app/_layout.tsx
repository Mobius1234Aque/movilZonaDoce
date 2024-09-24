import React, { useEffect } from "react";
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
import Header from "@/components/general/header"; // Importa el header aquí

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
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
        {/* Aquí estamos usando un header global */}
        <Stack.Screen
          name="(screens)"
          options={{
            headerShown: false,         // Asegura que el header esté visible
          }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="(tabs)"
          options={{
            header: () => <Header/>,  // Mostrar Header en los tabs también
            headerShown: true, 
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
