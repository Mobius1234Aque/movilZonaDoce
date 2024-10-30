import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Dimensions, Alert } from "react-native";
import tw from "twrnc";
import * as DocumentPicker from 'expo-document-picker'; // Para seleccionar archivos PDF
import { Picker } from '@react-native-picker/picker'; // Importar Picker
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"; // Firebase Storage
import { storage } from "../../firebase/config"; // Configuración de Firebase
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres únicos
import 'react-native-get-random-values'; // Polyfill para soporte de crypto.getRandomValues en React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

// --------------------- MODELO ---------------------
interface ExamData {
  titulo: string;
  descripcion: string;
  opcion: number | null;
  pdfUrl: string | null;
  curp: string | null;
}

// --------------------- CONTROLADOR ---------------------
const uploadPdfToFirebase = async (file: any) => {
  if (!file || !file.uri) return null;
  const uniqueFileName = `${uuidv4()}-${file.name}`; // Generar un nombre único para el archivo
  const storageRef = ref(storage, `examen/${uniqueFileName}`); // Referencia al almacenamiento en Firebase

  try {
    const response = await fetch(file.uri);
    const blob = await response.blob(); // Convertir archivo a blob
    const snapshot = await uploadBytes(storageRef, blob); // Subir archivo
    const downloadURL = await getDownloadURL(snapshot.ref); // Obtener URL del archivo subido
    console.log("Subida exitosa, URL del archivo:", downloadURL); // Asegúrate de que esta línea se ejecute
    return downloadURL;
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    Alert.alert('Error', `Error al subir el archivo: ${error.message}`);
    return null;
  }
};

// Función para enviar los datos del examen a la API
const submitExamToAPI = async (examData: ExamData): Promise<boolean> => {
  try {
    const response = await fetch("https://servidor-zonadoce.vercel.app/submitExamen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examData),
    });

    if (response.ok) {
      console.log("Datos enviados correctamente a la API");
      return true; // Envío exitoso
    } else {
      const errorMessage = await response.text();
      console.log("Error al enviar los datos a la API:", errorMessage);
      Alert.alert("Error", `Error al enviar los datos: ${errorMessage}`);
      return false;
    }
  } catch (error) {
    console.error("Error al enviar el examen:", error);
    Alert.alert("Error", `Error al enviar el examen: ${error.message}`);
    return false;
  }
};

// Función para obtener las materias desde una API
const fetchMaterias = async (setMaterias: React.Dispatch<React.SetStateAction<{ value: number, label: string }[]>>) => {
  try {
    const response = await fetch("https://servidor-zonadoce.vercel.app/getMaterias");
    const data = await response.json();
    setMaterias(data);
  } catch (error) {
    console.error("Error al obtener las materias:", error);
    Alert.alert("Error", `Error al obtener las materias: ${error.message}`);
  }
};

// Función para recuperar la CURP
const getCurp = async () => {
  try {
    const curp = await AsyncStorage.getItem('userCURP');
    if (curp !== null) {
      return curp;
    } else {
      console.log("No se encontró la CURP.");
      return null;
    }
  } catch (error) {
    console.error("Error al recuperar la CURP:", error);
    return null;
  }
};

// --------------------- VISTA ---------------------
interface UploadExamModalProps {
  visible: boolean;
  onClose: () => void;
}

const UploadExamModal: React.FC<UploadExamModalProps> = ({ visible, onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | undefined>("");
  const [materias, setMaterias] = useState<{ value: number, label: string }[]>([]); // Materias obtenidas de la API
  const [pdfFile, setPdfFile] = useState<any | null>(null);

  useEffect(() => {
    fetchMaterias(setMaterias);
  }, []);

  // Función para manejar la selección de archivo PDF
  const selectPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setPdfFile(file); // Guardar el archivo en el estado
        console.log("Archivo PDF seleccionado:", file);
      } else {
        Alert.alert("Error", "No se ha seleccionado ningún archivo.");
      }
    } catch (err) {
      Alert.alert("Error", `Hubo un problema al seleccionar el archivo: ${err.message}`);
    }
  };

  // Función para manejar el envío del examen
  const handleSubmit = async () => {
    if (!titulo || !descripcion || !opcionSeleccionada || !pdfFile || !pdfFile.uri) {
      Alert.alert("Error", "Por favor, completa todos los campos y selecciona un archivo PDF.");
      return;
    }

    console.log("Campos completos, iniciando subida...");

    const pdfUrl = await uploadPdfToFirebase(pdfFile); // Intentar subir el archivo PDF a Firebase
    if (pdfUrl) {
      console.log("Archivo subido exitosamente, URL del PDF:", pdfUrl);

      const curp = await getCurp(); // Recuperar la CURP usando AsyncStorage
      if (!curp) {
        Alert.alert("Error", "No se pudo recuperar la CURP. Inicia sesión nuevamente.");
        return;
      }

      const examData: ExamData = {
        titulo,
        descripcion,
        opcion: opcionSeleccionada || null,
        pdfUrl,
        curp
      };

      console.log("Datos enviados al backend:", examData);

      const result = await submitExamToAPI(examData);

      if (result) {
        Alert.alert("Examen enviado", "Examen enviado exitosamente.");
        console.log("Examen enviado exitosamente");
      } else {
        Alert.alert("Error", "Hubo un problema al enviar el examen.");
        console.log("Hubo un problema al enviar el examen.");
      }

      onClose();
    } else {
      Alert.alert("Error", "Error al subir el archivo PDF.");
      console.log("Error al subir el archivo PDF.");
    }
  };

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

          <Picker
            selectedValue={opcionSeleccionada || ""} // Usar una cadena vacía como valor por defecto
            onValueChange={(itemValue) => setOpcionSeleccionada(itemValue)}
            style={tw`border border-gray-300 rounded-lg mb-4`}
          >
            <Picker.Item label="Selecciona una materia" value="" />
            {materias.map((materia) => (
              <Picker.Item key={materia.value} label={materia.label} value={materia.value} />
            ))}
          </Picker>

          {/* Área para subir PDF */}
          <TouchableOpacity
            style={tw`border-dashed border-2 border-blue-500 p-6 mb-4 rounded-md items-center`}
            onPress={selectPdf}
          >
            <Text style={tw`text-blue-500 text-center`}>
              {pdfFile ? `Archivo seleccionado: ${pdfFile.name}` : "Sube el documento PDF del examen"}
            </Text>
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

          {/* Botón para publicar */}
          <TouchableOpacity style={tw`bg-blue-500 rounded-lg py-3`} onPress={handleSubmit}>
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
