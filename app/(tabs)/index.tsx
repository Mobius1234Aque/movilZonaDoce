import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, useWindowDimensions, Alert } from "react-native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import CalificacionModal from "@/components/general/CalificacionComponente";


const Index: React.FC = () => {
  const { width } = useWindowDimensions();
  const [nombreCompleto, setNombreCompleto] = useState<string>(""); // Estado para el nombre completo
  const [curp, setCurp] = useState<string | null>(null); // Estado para almacenar la CURP
  const [hasVoted, setHasVoted] = useState<boolean | null>(null); // Estado de la calificación

  // Obtener la CURP desde AsyncStorage
  const getCurp = async () => {
    try {
      const storedCurp = await AsyncStorage.getItem("userCURP");
      setCurp(storedCurp); // Almacena la CURP en el estado
    } catch (error) {
      console.error("Error al recuperar la CURP:", error);
      Alert.alert("Error", "No se pudo recuperar la CURP.");
    }
  };

  // Obtener el perfil del usuario usando la CURP
  const fetchProfile = async (curp: string) => {
    try {
      const response = await axios.get(`https://servidor-zonadoce.vercel.app/perfil?curp=${curp}`);
      const perfilData = response.data[0];
      setNombreCompleto(`${perfilData.nombre} ${perfilData.aPaterno} ${perfilData.aMaterno}`);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      Alert.alert("Error", "No se pudo obtener el perfil. Inténtalo más tarde.");
    }
  };

  // Verificar si el usuario ya ha calificado
  const checkIfVoted = async (curp: string) => {
    try {
      const response = await axios.get(`https://servidor-zona12-api.vercel.app/calificacion?curp=${curp}`);
      const { calificacion } = response.data;

      // Si calificación es null, significa que el usuario no ha votado
      setHasVoted(calificacion !== null);
      console.log("Estado de hasVoted (después de verificar):", calificacion !== null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Si no tiene calificación (404), se considera que no ha votado
        setHasVoted(false);
      } else {
        console.error("Error al verificar la calificación:", error);
        Alert.alert("Error", "No se pudo verificar la calificación.");
      }
    }
  };


  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      await getCurp(); // Obtener la CURP
    };

    fetchData();
  }, []);

  // Cargar el perfil y verificar la calificación una vez que la CURP esté disponible
  useEffect(() => {
    if (curp) {
      fetchProfile(curp); // Cargar perfil del usuario
      checkIfVoted(curp); // Verificar si ya ha calificado
    }
  }, [curp]);

  return (
    <ScrollView contentContainerStyle={tw`flex-grow bg-white`}>
      {/* Saludo */}
      <View style={tw`mt-10 flex flex-col justify-center`}>
        <Text style={tw`mx-8 ${width < 400 ? "text-xl" : "text-2xl"} font-bold`}>
          Hola Prof. {nombreCompleto || "Juan"} {/* Muestra "Juan" si no se carga el nombre */}
        </Text>
      </View>

      {/* Imagen animada */}
      <View style={tw`mt-10 flex flex-col justify-center items-center`}>
        <Animatable.View
          animation="bounceIn"
          iterationCount="infinite"
          direction="alternate"
          style={{ width: 120, height: 120 }}
        >
          <Image
            source={require("@/assets/images/alumno.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </Animatable.View>
      </View>

      {/* Componente de Calificación */}
      {hasVoted === false && curp && (
        <View style={tw`mt-10 mx-8`}>
          <CalificacionModal curp={curp} apiUrl="https://servidor-zona12-api.vercel.app" />
        </View>
      )}

      {/* Información adicional */}
      <View style={tw`mt-10 mx-8`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>
          Supervisión Escolar Sistema Indígena Número 12 de Huazalingo Hidalgo
        </Text>
        <Text style={tw`mt-4 text-lg text-gray-600`}>
          Es una unidad económica registrada desde 2014-12 que se dedica a la actividad económica{" "}
          <Text style={tw`font-bold`}>Actividades administrativas de instituciones de bienestar social</Text>,
          clasificada por (SCIAN) 931610, con domicilio en, Col. Guillermo Rossell, Huazalingo, Huazalingo,
          Hidalgo C.P. 43070.
        </Text>
        <Text style={tw`mt-4 text-sm text-gray-600`}>
          Puedes contactarlos a través de <Text style={tw`font-bold`}>7711499741</Text>, o visitando su sitio web.
        </Text>
        <Text style={tw`mt-4 text-sm text-gray-600 mb-30`}>
          Toda la información sobre esta empresa se ha obtenido a través de fuentes públicas del gobierno de
          Huazalingo, Hidalgo, México.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Index;
