import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, Linking, Dimensions } from "react-native";
import tw from "twrnc";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; // Importa useFocusEffect

// Definir el ancho de la pantalla
const { width } = Dimensions.get("window");

// Interfaz de cada card (ahora incluye título, curp, y pdfUrl)
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

  // Usar useFocusEffect para recargar los datos cada vez que la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      // Llamar a la función de actualización de los datos cada vez que se regrese a la pantalla
      fetchEvidencias();
    }, [])
  );

  // Renderizar cada card con título, CURP y PDF
  const renderItem = ({ item }: { item: CardItem }) => (
    <View
      style={[
        tw`p-4 bg-white shadow-lg rounded-lg my-2`,
        { width: width - 32 },
      ]}
    >
      {/* Ícono que representa la evidencia */}
      <View style={tw`flex-1 justify-center items-center mb-4`}>
        <Ionicons name="document-text" size={50} color="#4A90E2" />
      </View>

      {/* Título y CURP */}
      <Text style={tw`text-xl font-semibold text-blue-800`}>{item.title}</Text>
      <Text style={tw`text-sm text-gray-600 mt-2`}>CURP: {item.curp}</Text>

      {/* Enlace al PDF */}
      <TouchableOpacity
        onPress={() => handleOpenPDF(item.pdfUrl)}
        style={tw`mt-4 p-2 bg-blue-500 rounded-lg`}
      >
        <Text style={tw`text-white text-center`}>Ver PDF</Text>
      </TouchableOpacity>
    </View>
  );

  // Función para abrir el PDF en un navegador
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
      {/* FlatList para mostrar los cards */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
      />
    </View>
  );
}
