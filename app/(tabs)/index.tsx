import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, useWindowDimensions, Alert, SafeAreaView } from "react-native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de tener AsyncStorage
import * as Animatable from 'react-native-animatable'; // Importa react-native-animatable

const Index: React.FC = () => {
  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla
  const [nombreCompleto, setNombreCompleto] = useState<string>("");

  // Función para obtener la CURP desde AsyncStorage
  const getCurp = async () => {
    try {
      const curp = await AsyncStorage.getItem("userCURP");
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

  // Función para obtener el perfil del usuario usando la CURP
  const fetchProfile = async (curp: string) => {
    try {
      const response = await axios.get(`https://servidor-zonadoce.vercel.app/perfil?curp=${curp}`);
      const perfilData = response.data[0];
      console.log("Datos del perfil obtenidos de la API:", perfilData);

      setNombreCompleto(`${perfilData.nombre} ${perfilData.aPaterno} ${perfilData.aMaterno}`);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      Alert.alert("Error", "No se pudo obtener el perfil. Inténtalo más tarde.");
    }
  };

  // Efecto para obtener la CURP y luego hacer la consulta del perfil
  useEffect(() => {
    const fetchData = async () => {
      const curpFromStorage = await getCurp();
      if (curpFromStorage) {
        await fetchProfile(curpFromStorage); // Hace la consulta de perfil con la CURP
      }
    };

    fetchData();
  }, []);

  return (

    <ScrollView contentContainerStyle={tw`flex-grow`}>

      {/* Saludo responsivo */}
      <View style={tw`mt-10 flex flex-col justify-center`}>
        <Text style={tw`mx-8 ${width < 400 ? 'text-xl' : 'text-2xl'} font-bold`}>
          Hola Prof. {nombreCompleto || "Juan"} {/* Muestra "Juan" si no se carga el nombre */}
        </Text>
      </View>

      {/* Animación de la imagen flotante */}
      <View style={tw`mt-10 flex flex-col justify-center items-center`}>
        <Animatable.View
          animation="bounceIn"  // Efecto de animación de entrada
          iterationCount="infinite"
          direction="alternate"  // Alterna el movimiento hacia arriba y abajo
          style={{ width: 120, height: 120 }}  // Tamaño ajustado de la imagen
        >
          <Image
            source={require('@/assets/images/alumno.png')}  // Reemplaza con tu propia imagen
            style={{ width: 120, height: 120, borderRadius: 0 }}  // Imagen circular
            resizeMode="contain" // Asegúrate de que la imagen no se deforme
          />
        </Animatable.View>
      </View>


      {/* Información adicional de la empresa */}
      <View style={tw`mt-10 mx-8`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Supervisión Escolar Sistema Indígena Numero 12 de Huazalingo Hidalgo</Text>
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
