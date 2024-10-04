import { Text, Image, View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import UploadExamModal from "@/components/modal/modal"; // Importamos el modal
import FloatButton from "@/components/general/floatButton";
import CardComponent from "@/components/cards/cardImage";

// Definir el ancho de la pantalla
const { width } = Dimensions.get('window');

// 1. Define la interfaz de cada card
interface CardItem {
  id: string;
  title: string;
  description: string;
  imageUri: string;
}

// 2. Define los datos con el tipado
const data: CardItem[] = [
  {
    id: '1',
    title: 'Card Header 1',
    description: 'This is a card description 1',
    imageUri: 'https://example.com/my-image.jpg',
  },
  {
    id: '2',
    title: 'Card Header 2',
    description: 'This is a card description 2',
    imageUri: 'https://colegiolecole.edu.mx/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-18-at-3.17.18-PM-1-768x1024.jpeg',
  },
  {
    id: '3',
    title: 'Card Header 3',
    description: 'This is a card description 3',
    imageUri: 'https://thumbs.dreamstime.com/z/vida-diaria-en-asia-escuela-primaria-escolares-aula-vang-vieng-laos-239871761.jpg',
  },
  {
    id: '4',
    title: 'Card Header 4',
    description: 'This is a card description 4',
    imageUri: 'https://example.com/another-image.jpg',
  },
  {
    id: '5',
    title: 'Card Header 5',
    description: 'This is a card description 5',
    imageUri: 'https://example.com/another-image.jpg',
  },
];

export default function Evidencias() {
  const [modalVisible, setModalVisible] = useState(false);

  // 3. Tipar el parámetro item como CardItem
  const renderItem = ({ item }: { item: CardItem }) => (
    <View style={[
      tw`p-2`, 
      { width: (width / 2) - 16 } // Ajusta el ancho de la tarjeta para que ocupe la mitad de la pantalla con padding incluido
    ]}>
      <CardComponent
        title={item.title}
        description={item.description}
        imageUri={item.imageUri}
      />
    </View>
  );

  return (
    
    <View style={tw`flex-1 bg-white`}>
      {/* FlatList para mostrar los cards */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}  
        contentContainerStyle={tw`p-4`}
        columnWrapperStyle={{ justifyContent: 'space-between' }} // Para espaciado entre columnas
      />

      {/* Modal */}
      <UploadExamModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      {/* Botón flotante */}
      <FloatButton onPress={() => setModalVisible(true)} title="Open Modal" />
    </View>
  );
}
