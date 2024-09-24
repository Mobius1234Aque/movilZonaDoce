import { Text, Image, View, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import UploadExamModal from "@/components/modal/modal"; // Importamos el modal
import FloatButton from "@/components/general/floatButton";

export default function Documentos() {

  const [modalVisible, setModalVisible] = useState(false);


  return(
    <View style={tw`flex flex-col items-center justify-center flex-1 bg-white`}>
    <UploadExamModal visible={modalVisible} onClose={() => setModalVisible(false)} />

    <FloatButton onPress={() => setModalVisible(true)} title="Open Modal" />

    </View>
  )
}