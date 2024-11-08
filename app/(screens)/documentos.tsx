import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text, Modal, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import * as DocumentPicker from 'expo-document-picker'; // Importa el Document Picker
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"; // Firebase Storage
import { storage } from "../../firebase/config"; // Configuración de Firebase
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para obtener la CURP del almacenamiento local
import DocsCard from "@/components/cards/cardDocumentos"; // Importa el componente Card
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres únicos
import 'react-native-get-random-values'; // Importa el polyfill
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from 'expo-router';


export default function Documentos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null); // Estado para almacenar el documento seleccionado
  const [selectedPdf, setSelectedPdf] = useState<any | null>(null); // Estado para almacenar el archivo PDF seleccionado

  // Realiza la consulta a la API cuando el componente se monta
  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await fetch("https://servidor-zonadoce.vercel.app/consultarDocumentos"); // Ajusta la URL a tu API
        const data = await response.json();
        setDocumentos(data); // Actualiza el estado con los documentos obtenidos
      } catch (err) {
        setError("Error al cargar los documentos");
        console.error("Error al obtener los documentos:", err);
      } finally {
        setLoading(false); // Finaliza el loading independientemente del resultado
      }
    };

    fetchDocumentos(); // Llama a la función que hace la consulta
  }, []);

  // Función para abrir el modal con el documento seleccionado
  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc); // Guardamos el documento seleccionado en el estado
    setModalVisible(true); // Mostramos el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedDoc(null); // Limpiamos el documento seleccionado
    setSelectedPdf(null); // Limpiamos el archivo PDF seleccionado
  };

  // Función para manejar la selección de archivo PDF
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0]; // Acceder al archivo en assets[0]
        setSelectedPdf(file); // Guardar el archivo en el estado
        console.log("Archivo PDF seleccionado:", file);
      } else {
        Alert.alert("Error", "No se ha seleccionado ningún archivo.");
      }
    } catch (err) {
      Alert.alert("Error", `Hubo un problema al seleccionar el archivo: ${err.message}`);
    }
  };

  // Función para subir el PDF a Firebase en una carpeta específica por tipo de documento
  const uploadPdfToFirebase = async (file) => {
    if (!file || !file.uri) return null;

    const curp = await AsyncStorage.getItem('userCURP'); // Recupera la CURP
    if (!curp) {
      Alert.alert("Error", "No se pudo recuperar la CURP.");
      return null;
    }

    // Usa el título del documento seleccionado para definir la carpeta
    const folderName = selectedDoc.titulo.replace(/\s+/g, ''); // Elimina espacios para el nombre de la carpeta
    const uniqueFileName = `${uuidv4()}-${file.name}`; // Generar un nombre único para el archivo
    const storagePath = `documentos/${folderName}/${uniqueFileName}`; // Carpeta por tipo de documento
    const storageRef = ref(storage, storagePath); // Referencia al almacenamiento en Firebase

    try {
      const response = await fetch(file.uri);
      const blob = await response.blob(); // Convertir archivo a blob
      const snapshot = await uploadBytes(storageRef, blob); // Subir archivo
      const downloadURL = await getDownloadURL(snapshot.ref); // Obtener URL del archivo subido
      console.log(`Subida exitosa. Archivo almacenado en: ${storagePath}, URL del archivo: ${downloadURL}`);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      Alert.alert('Error', `Error al subir el archivo: ${error.message}`);
      return null;
    }
  };

  // Función para manejar la entrega del examen y subir a Firebase
  const handleSubmit = async () => {
    if (!selectedPdf) {
      console.log('Por favor, selecciona un archivo PDF antes de entregar');
      return;
    }

    const curp = await AsyncStorage.getItem('userCURP'); // Recupera la CURP
    if (!curp) {
      Alert.alert("Error", "No se pudo recuperar la CURP.");
      return;
    }

    console.log('Subiendo archivo a Firebase...');
    const pdfUrl = await uploadPdfToFirebase(selectedPdf); // Subir el archivo PDF a Firebase

    if (pdfUrl) {
      const payload = {
        curp,
        id: selectedDoc.id, // El ID del documento seleccionado
        pdfUrl // URL del archivo PDF subido
      };

      console.log('Payload listo para enviar al servidor:', payload);

      try {
        const response = await fetch("https://servidor-zonadoce.vercel.app/submitDocument", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          Alert.alert("Éxito", "Documento subido exitosamente.");
          console.log('Documento subido exitosamente:', payload);
        } else {
          const errorMessage = await response.text();
          console.log("Error al enviar los datos al servidor:", errorMessage);
          Alert.alert("Error", `Error al enviar los datos: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error al enviar el documento:", error);
        Alert.alert("Error", `Error al enviar el documento: ${error.message}`);
      }
    }

    closeModal(); // Cierra el modal después de entregar
  };

  const handleGoBack = () => {
    router.back();
  };


  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex flex-row self-start ml-4 mt-4`}>
        <TouchableOpacity onPress={handleGoBack} style={tw`flex-row items-center mb-4`}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          <Text style={tw`text-lg text-black ml-2`}>Regresar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`p-4`}>

        {/* Renderizamos la lista de documentos obtenidos desde la API */}
        {documentos.map((doc, index) => (
          <DocsCard
            key={doc.id} // Usamos el id del documento como key
            title={doc.titulo} // Mostramos el título del documento
            description={doc.descripcion} // Mostramos la descripción del documento
            onPress={() => handleSelectDoc(doc)} // Llamamos a handleSelectDoc al seleccionar un documento
          />
        ))}
      </ScrollView>

      {/* Modal personalizado para subir documento */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}>
          <View style={tw`w-3/4 bg-white p-4 rounded-lg`}>
            {selectedDoc && (
              <>
                <Text style={tw`text-lg font-bold`}>
                  Subir {selectedDoc.titulo}
                </Text>
                <Text>ID: {selectedDoc.id}</Text>

                {/* Botón para seleccionar un archivo PDF */}
                <TouchableOpacity
                  style={tw`bg-gray-200 py-2 px-4 mt-4 rounded-lg`}
                  onPress={pickDocument}
                >
                  <Text style={tw`text-center`}>
                    {selectedPdf ? `PDF seleccionado: ${selectedPdf.name}` : 'Seleccionar PDF'}
                  </Text>
                </TouchableOpacity>

                {/* Botones de cancelar y entregar */}
                <View style={tw`mt-4 flex-row justify-between`}>
                  <TouchableOpacity
                    style={tw`bg-red-500 py-2 px-4 rounded-lg`}
                    onPress={closeModal}
                  >
                    <Text style={tw`text-white text-center`}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`bg-blue-500 py-2 px-4 rounded-lg`}
                    onPress={handleSubmit}
                    disabled={!selectedPdf} // Deshabilita el botón si no hay PDF seleccionado
                  >
                    <Text style={tw`text-white text-center`}>
                      {selectedPdf ? 'Entregar' : 'Selecciona un PDF'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
