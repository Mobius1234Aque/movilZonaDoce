import React from "react";
import { View, Text, Dimensions, TouchableOpacity, useWindowDimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  return (
    <View style={{ position: "absolute", bottom: 0, width, height: 70 }}>
      <Svg
        width={width}
        height={70}
        viewBox="0 0 100 100"
        style={{ position: "absolute", bottom: 0, borderColor: "#9DB2CE" }}
      >
        <Path
          d="M0,0 L100,0 L100,60 C50,80 50,20 0,60 Z"
          fill={Colors[colorScheme ?? "light"].background}
        />
      </Svg>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 80,
          paddingBottom: 10,
          backgroundColor: "#DCDCDC",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center" }}
              activeOpacity={1}
            >
              {index === 2 ? (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: Colors[colorScheme ?? "light"].tint,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -75,
                  }}
                >
                  <TabBarIcon name="home" color="#fff" />
                </View>
              ) : (
                <>
                  {label === "Home" ? (
                    <TabBarIcon
                      name={isFocused ? "home" : "home-outline"}
                      size={width > 400 ? 18 : 16}
                      color={
                        isFocused
                          ? Colors[colorScheme ?? "light"].tint
                          : "#8e8e93"
                      }
                    />
                  ) : label === "Foro" ? (
                    <MaterialCommunityIcons
                      name={isFocused ? "forum" : "forum-outline"}
                      size={width > 400 ? 18 : 16}
                      color={
                        isFocused
                          ? Colors[colorScheme ?? "light"].tint
                          : "#8e8e93"
                      }
                    />
                  ) : label === "Evidencias" ? (
                    <Entypo
                      name="documents"
                      size={width > 400 ? 18 : 16}
                      color={
                        isFocused
                          ? Colors[colorScheme ?? "light"].tint
                          : "#8e8e93"
                      }
                    />
                  ) : label === "Calendario" ? (
                    <Entypo
                      name="calendar"
                      size={width > 400 ? 18 : 16}
                      color={
                        isFocused
                          ? Colors[colorScheme ?? "light"].tint
                          : "#8e8e93"
                      }
                    />
                  ) : label === "Mas" ? (
                    <Entypo
                      name="menu"
                      size={width > 400 ? 18 : 16}
                      color={
                        isFocused
                          ? Colors[colorScheme ?? "light"].tint
                          : "#8e8e93"
                      }
                    />) : null}
                </>
              )}
              <Text
                style={{
                  color: isFocused
                    ? Colors[colorScheme ?? "light"].tint
                    : "#8e8e93",
                  fontWeight: "500",
                  fontSize: width > 400 ? 14 : 12,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
