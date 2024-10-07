import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import tw from "twrnc";
import UploadExamModal from "@/components/modal/modal"; // Importamos el modal
import FloatButton from "@/components/general/floatButton";
import ForumCard from "@/components/cards/cardForum"; // Importa el componente Card

export default function Foro() {
  const [modalVisible, setModalVisible] = useState(false);

  // Simula una lista de documentos
  const documentos = [
    { title: "Ine", description: "Documento de identidad", onPress: () => {} },
    { title: "CURP", description: "Clave única de registro", onPress: () => {} },
    { title: "Acta de nacimiento", description: "Acta legal de nacimiento", onPress: () => {} },
    { title: "Comprobante de domicilio", description: "Último recibo", onPress: () => {} },
  ];

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        {/* Renderizamos la lista de documentos */}
        {documentos.map((doc, index) => (
          <ForumCard
            key={index}
            title={doc.title}
            description={doc.description}
            onPress={doc.onPress}
          />
        ))}
      </ScrollView>

      {/* Modal para subir documento */}
      <UploadExamModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      {/* Botón flotante */}
      <FloatButton onPress={() => setModalVisible(true)} title="Subir Documento" />
    </View>
  )
}