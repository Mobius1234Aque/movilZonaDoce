import React, { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { Keyboard } from "react-native";

export default function TabLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) =>
        !isKeyboardVisible && <CustomTabBar {...props} />
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="evidencias" options={{ title: "Evidencias" }} />
      <Tabs.Screen name="foro" options={{ title: "Foro" }} />
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="calendario" options={{ title: "Calendario" }} />
      <Tabs.Screen name="mas" options={{ title: "Mas" }} />
    </Tabs>
  );
}
