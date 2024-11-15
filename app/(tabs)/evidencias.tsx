import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, Linking, Dimensions } from "react-native";
import tw from "twrnc";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Importa el router para navegación

// Definir el ancho de la pantalla
const { width } = Dimensions.get("window");

// Interfaz de cada card
interface CardItem {
  id: string;
  title: string;
  curp: string;
  pdfUrl: string;
}

// Componente principal
export default function Evidencias() {
  const [data, setData] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null); // Estado para verificar suscripción
  const router = useRouter();

  // Llamada a la API para obtener los PDFs
  const fetchEvidencias = async () => {
    try {
      const response = await axios.get("https://servidor-zonadoce.vercel.app/consultarPDF");
      const formattedData = response.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.titulo,
        curp: item.curp,
        pdfUrl: item.pdf,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error al obtener las evidencias:", error);
      Alert.alert("Error", "No se pudieron cargar las evidencias");
    } finally {
      setLoading(false);
    }
  };

  // Verificar suscripción
  const verificarSuscripcion = async () => {
    try {
      const curp = await AsyncStorage.getItem('userCURP');
      if (!curp) throw new Error('No se encontró el CURP');
      const response = await axios.get(`https://servidor-zona12-api.vercel.app/payments/verify-subscription-status?curp=${curp}`);
      setIsSubscribed(response.data.hasSubscription);
    } catch (error) {
      console.error("Error al verificar la suscripción:", error);
    }
  };

  // Usar useFocusEffect para cargar datos y verificar suscripción al enfocar la pantalla
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      verificarSuscripcion();
      fetchEvidencias();
    }, [])
  );

  // Limitar el número de elementos visibles
  const maxItems = isSubscribed ? data.length : 1; // Si está suscrito, ver todo; si no, solo 1

  // Renderizar cada card
  const renderItem = ({ item, index }: { item: CardItem, index: number }) => (
    <View
      style={[
        tw`p-4 bg-white shadow-lg rounded-lg my-2 relative`,
        { width: width - 32 },
      ]}
    >
      <View style={tw`flex-1 justify-center items-center mb-4`}>
        <Ionicons name="document-text" size={50} color="#4A90E2" />
      </View>

      <Text style={tw`text-xl font-semibold text-blue-800`}>{item.title}</Text>
      <Text style={tw`text-sm text-gray-600 mt-2`}>CURP: {item.curp}</Text>

      <TouchableOpacity
        onPress={() => handleOpenPDF(item.pdfUrl)}
        style={tw`mt-4 p-2 bg-blue-500 rounded-lg`}
      >
        <Text style={tw`text-white text-center`}>Ver PDF</Text>
      </TouchableOpacity>

      {/* Desenfoque para los elementos adicionales si no está suscrito */}
      {!isSubscribed && index >= maxItems && (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-75 justify-center items-center rounded-lg`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>Necesitas suscribirte</Text>
          <TouchableOpacity
            onPress={() => router.push('../(screens)/suscripciones')}
            style={tw`p-2 px-6 bg-blue-600 rounded-full`}
          >
            <Text style={tw`text-white text-lg`}>Suscribirse</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleOpenPDF = (pdfUrl: string) => {
    Linking.openURL(pdfUrl).catch((err) => console.error("Error al abrir PDF:", err));
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <ActivityIndicator size="large" color="#00aaff" />
        <Text style={tw`text-xl mt-4 text-gray-500`}>Cargando evidencias...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <FlatList
        data={data} // No se limita aquí para que los elementos adicionales aparezcan con el blur
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
      />
    </View>
  );
}
