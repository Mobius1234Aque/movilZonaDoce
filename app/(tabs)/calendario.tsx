import { Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import CalendarWithItems from "@/components/calendar/CalendarItems"; 

export default function Calendario() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Componente de calendario con lista de items */}
      <View style={tw`flex-1`}>
        <CalendarWithItems testID="calendar-items" />
      </View>
    </View>
  );
}
