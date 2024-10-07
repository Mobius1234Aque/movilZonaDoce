// UploadExamModal.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions } from "react-native";
import tw from "twrnc";

const { width } = Dimensions.get("window");

interface UploadExamModalProps {
  visible: boolean;
  onClose: () => void;
}

const UploadExamModal: React.FC<UploadExamModalProps> = ({ visible, onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [materia, setMateria] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 items-center bg-gray-800 bg-opacity-20`}>
        <View style={tw`bg-white mt-auto rounded-lg w-[${width}px] p-5`}>
          <Text style={tw`text-lg font-bold mb-4`}>Sube un nuevo examen</Text>

          {/* Área para subir PDF */}
          <TouchableOpacity style={tw`border-dashed border-2 border-blue-500 p-6 mb-4 rounded-md items-center`}>
            <Text style={tw`text-blue-500 text-center`}>Sube el documento PDF del examen</Text>
          </TouchableOpacity>

          {/* Campos del formulario */}
          <TextInput
            placeholder="Título del examen"
            value={titulo}
            onChangeText={setTitulo}
            style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
          />

          <TextInput
            placeholder="Descripción del examen"
            value={descripcion}
            onChangeText={setDescripcion}
            style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
            multiline
            numberOfLines={4}
          />

          <TextInput
            placeholder="Materia"
            value={materia}
            onChangeText={setMateria}
            style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
          />

          {/* Botón para publicar */}
          <TouchableOpacity style={tw`bg-blue-500 rounded-lg py-3`} onPress={() => { /* Acción de subir */ }}>
            <Text style={tw`text-white text-center text-lg`}>Publicar</Text>
          </TouchableOpacity>

          {/* Botón para cerrar el modal */}
          <TouchableOpacity onPress={onClose}>
            <Text style={tw`text-red-500 text-center mt-4`}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadExamModal;
