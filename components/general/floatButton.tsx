import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ButtonProps {
  title: string;
  onPress: () => void; // onPress se recibe como prop
  isSubscribed: boolean; // Estado de suscripción como prop
  testID?: string; // Añadimos testID como prop opcional
}

const FloatButton: React.FC<ButtonProps> = ({ title, onPress, isSubscribed, testID }) => {
  const handlePress = () => {
    if (isSubscribed) {
      onPress(); // Ejecuta la acción si el usuario está suscrito
    } else {
      Alert.alert("Necesitas una suscripción", "Suscríbete para obtener este beneficio."); // Muestra mensaje si no está suscrito
    }
  };

  return (
    <TouchableOpacity
      style={tw`absolute bottom-22 right-6 bg-blue-500 p-4 rounded-full shadow-lg`}
      onPress={handlePress} // Usa handlePress en lugar de onPress directo
      testID={testID}
    >
      <MaterialIcons name="add" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default FloatButton;
