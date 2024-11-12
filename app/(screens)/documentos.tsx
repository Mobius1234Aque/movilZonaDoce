import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text, Modal, TouchableOpacity, Alert, Linking } from "react-native";
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
  const [documentExists, setDocumentExists] = useState(false); // Estado para verificar si el documento ya existe
  const [uploading, setUploading] = useState(false); // Estado para controlar si está subiendo el archivo

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

  // Función para verificar si el documento ya existe
  const checkDocumentExists = async (curp, docId) => {
    try {
      const response = await fetch(`https://servidor-zonadoce.vercel.app/getDocumentByCurpAndDocId?curp=${curp}&docId=${docId}`);
      const data = await response.json();

      if (data && data.id) {
        // Si el documento existe, devolvemos la URL del PDF (o el enlace que tengas)
        return {
          exists: true,
          pdfUrl: data.pdfUrl || null, // Suponiendo que el servidor te devuelve el enlace como `pdfUrl`
        };
      } else {
        return {
          exists: false,
          pdfUrl: null,
        };
      }
    } catch (error) {
      console.error("Error al verificar el documento:", error);
      return {
        exists: false,
        pdfUrl: null,
      };
    }
  };

  // Función para abrir el PDF (si existe)
  const openPdf = (pdfUrl) => {
    if (pdfUrl) {
      Linking.openURL(pdfUrl).catch(err => console.error("Error al abrir el PDF:", err));
    } else {
      Alert.alert("Error", "No se puede abrir el PDF, la URL no está disponible.");
    }
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

    const folderName = selectedDoc.titulo.replace(/\s+/g, ''); // Elimina espacios para el nombre de la carpeta
    const uniqueFileName = `${uuidv4()}-${file.name}`; // Generar un nombre único para el archivo
    const storagePath = `documentos/${folderName}/${uniqueFileName}`; // Carpeta por tipo de documento
    const storageRef = ref(storage, storagePath); // Referencia al almacenamiento en Firebase

    try {
      setUploading(true); // Comienza el proceso de carga
      const response = await fetch(file.uri);
      const blob = await response.blob(); // Convertir archivo a blob
      const snapshot = await uploadBytes(storageRef, blob); // Subir archivo
      const downloadURL = await getDownloadURL(snapshot.ref); // Obtener URL del archivo subido
      console.log(`Subida exitosa. Archivo almacenado en: ${storagePath}, URL del archivo: ${downloadURL}`);
      setUploading(false); // Termina el proceso de carga
      return downloadURL;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      Alert.alert('Error', `Error al subir el archivo: ${error.message}`);
      setUploading(false); // Termina el proceso de carga
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

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedDoc(null); // Limpiamos el documento seleccionado
    setSelectedPdf(null); // Limpiamos el archivo PDF seleccionado
    setUploading(false); // Restablecemos el estado de carga
  };

  const handleGoBack = () => {
    router.back();
  };

  // Función para manejar la selección de documentos
  const handleSelectDoc = async (doc) => {
    setSelectedDoc(doc); // Guardamos el documento seleccionado en el estado
    setModalVisible(true); // Mostramos el modal

    const curp = await AsyncStorage.getItem('userCURP'); // Recupera la CURP
    if (!curp) {
      Alert.alert("Error", "No se pudo recuperar la CURP.");
      return;
    }

    // Verificar si ya existe el documento con la CURP y el ID del documento
    const result = await checkDocumentExists(curp, doc.id);
    setDocumentExists(result.exists);

    if (result.exists) {
      // Asegúrate de que la URL del PDF esté asignada correctamente
      setSelectedDoc((prevDoc) => ({
        ...prevDoc,
        pdfUrl: result.pdfUrl, // Asignamos el pdfUrl aquí
      }));
    } else {
      setSelectedPdf(null); // Limpiar selección de PDF
    }
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
        {documentos.map((doc) => (
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

                {!documentExists ? (
                  <>
                    {/* Solo permitir selección de PDF si el documento no ha sido entregado */}
                    <TouchableOpacity
                      style={tw`bg-gray-200 py-2 px-4 mt-4 rounded-lg`}
                      onPress={pickDocument}
                    >
                      <Text style={tw`text-center`}>
                        {selectedPdf ? `PDF seleccionado: ${selectedPdf.name}` : 'Seleccionar PDF'}
                      </Text>
                    </TouchableOpacity>

                    {uploading && (
                      <Text style={tw`mt-4 text-center text-blue-500`}>Subiendo...</Text>
                    )}

                    <TouchableOpacity
                      style={tw`bg-blue-500 py-2 px-4 rounded-lg mt-4`}
                      onPress={handleSubmit}
                      disabled={!selectedPdf || uploading} // Deshabilitar si no hay PDF seleccionado o si está subiendo
                    >
                      <Text style={tw`text-white text-center`}>
                        {selectedPdf ? "Entregar" : "Selecciona un PDF"}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={tw`text-sm text-gray-500`}>
                      Usted ya entregó este documento. Si tiene alguna duda, comuníquese con su superior.
                    </Text>
                    <TouchableOpacity
                      style={tw`bg-gray-200 py-2 px-4 mt-4 rounded-lg`}
                      onPress={() => {
                        if (selectedDoc.pdfUrl) {
                          openPdf(selectedDoc.pdfUrl); // Usamos selectedDoc.pdfUrl aquí
                        } else {
                          Alert.alert("Error", "No se pudo abrir el PDF, la URL no está disponible.");
                        }
                      }}
                    >
                      <Text style={tw`text-center`}>Ver PDF</Text>
                    </TouchableOpacity>

                  </>
                )}

                <TouchableOpacity
                  style={tw`bg-red-500 py-2 px-4 rounded-lg mt-4`}
                  onPress={closeModal}
                >
                  <Text style={tw`text-white text-center`}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
