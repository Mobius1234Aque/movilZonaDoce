import { View, Text } from "react-native";

import React from "react";
import Header from "@/components/general/header";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="splash"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="examenDetails"
        options={{
          header: () => <Header />,
          headerShown: true,
        }}
      />
    </Stack>
  );
}
