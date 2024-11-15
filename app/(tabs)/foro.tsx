import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator, Alert } from "react-native";
import tw from "twrnc";
import UploadExamModal from "@/components/modal/modal";
import FloatButton from "@/components/general/floatButton";
import ForumCard from "@/components/cards/cardForum";
import { loadSubjects } from "@/app/Controllers/foroController";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const router = useRouter();

  const fetchSubjectsData = async () => {
    setLoading(true);
    const result = await loadSubjects();

    if (result.success) {
      setSubjects(result.data);
      setError(null);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const verificarSuscripcion = async () => {
    try {
      const curp = await AsyncStorage.getItem("userCURP");
      if (!curp) throw new Error("No se encontró el CURP");

      const response = await axios.get(`https://servidor-zona12-api.vercel.app/payments/verify-subscription-status?curp=${curp}`);
      setIsSubscribed(response.data.hasSubscription);
    } catch (error) {
      console.error("Error al verificar la suscripción:", error);
    }
  };

  useEffect(() => {
    fetchSubjectsData();
    verificarSuscripcion();

    const intervalId = setInterval(() => {
      fetchSubjectsData();
    }, 30000);

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
              router.push({
                pathname: "/examenDetails",
                params: {
                  examId: subject.id,
                  examData: JSON.stringify(subject),
                },
              });
            }}

          />
        ))}
      </ScrollView>

      <UploadExamModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <FloatButton
        onPress={() => setModalVisible(true)}
        title="Subir Documento"
        isSubscribed={isSubscribed} // Pasamos el estado de suscripción
      />
    </View>
  );
}
