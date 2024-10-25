// Calendario.tsx
import { Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import CalendarWithItems from "@/components/calendar/CalendarItems";
import UploadExamModal from "@/components/modal/modal";
import FloatButton from "@/components/general/floatButton";

export default function Calendario() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Componente de calendario con lista de items */}
      <View style={tw`flex-1`}>
        <CalendarWithItems />
      </View>
      <UploadExamModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      {/* Botón flotante */}
      <FloatButton onPress={() => setModalVisible(true)} title="Open Modal" />
    </View>
  );
}
