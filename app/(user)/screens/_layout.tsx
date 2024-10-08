import React from 'react';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
        {/* Asegúrate de tener el nombre de archivo correcto */}
        <Stack.Screen name="loginScreen" options={{ headerShown: false }} />
        <Stack.Screen 
            name="recuperar" 
            options={{ headerShown: false }} 
        />
    </Stack>
  );
}
