import React from "react";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ButtonProps {
  title: string;
  onPress: () => void; // onPress se recibe como prop
  testID?: string; // Añadimos testID como prop opcional
}

const FloatButton: React.FC<ButtonProps> = ({ title, onPress, testID }) => {
  return (
    <TouchableOpacity
      style={tw`absolute bottom-22 right-6 bg-blue-500 p-4 rounded-full shadow-lg`}
      onPress={onPress} // Ejecutamos la función onPress que se pasó como prop
      testID={testID}  // Pasamos testID al componente TouchableOpacity
    >
      <MaterialIcons name="add" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default FloatButton;
