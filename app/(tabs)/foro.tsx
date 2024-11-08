import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import tw from "twrnc";
import UploadExamModal from "@/components/modal/modal";
import FloatButton from "@/components/general/floatButton";
import ForumCard from "@/components/cards/cardForum";
import { loadSubjects } from "@/app/Controllers/foroController";
import { useRouter } from 'expo-router';  // Para la navegación

interface Subject {
  id: number;
  materia: string;
  descripcion: string;
  pdf: string;
  fecha: string;
  hora: string;
}

export default function Foro() {
  const [modalVisible, setModalVisible] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Para la navegación

  const fetchSubjectsData = async () => {
    setLoading(true); // Indicamos que empieza la carga
    const result = await loadSubjects();

    if (result.success) {
      setSubjects(result.data);
      setError(null); // Limpiamos cualquier error previo
    } else {
      setError(result.message);
    }

    setLoading(false); // Indicamos que termina la carga
  };

  useEffect(() => {
    fetchSubjectsData(); // Cargar los datos al montar el componente

    // Establecer un intervalo para actualizar los datos cada 30 segundos
    const intervalId = setInterval(() => {
      fetchSubjectsData();
    }, 30000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

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
      <ScrollView contentContainerStyle={tw`p-4`}>
        {subjects.map((subject) => (
          <ForumCard
            key={subject.id}
            title={subject.materia}
            description={subject.descripcion}
            onPress={() => {
              // Navegamos a la pantalla de detalles del examen con los datos
              router.push({
                pathname: "../(screens)/examenDetails",
                params: {
                  examId: subject.id,
                  examData: JSON.stringify(subject),  // Convertimos subject a string JSON
                },
              });
            }}
          />
        ))}
      </ScrollView>

      <UploadExamModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <FloatButton onPress={() => setModalVisible(true)} title="Subir Documento" />
    </View>
  );
}
