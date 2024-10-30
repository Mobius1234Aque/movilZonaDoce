import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { Input } from '@/components/general/Inputs'; 
import Boton from '@/components/general/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios'; 

const ProfileScreen = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [curp, setCurp] = useState('');
    const [grupo, setGrupo] = useState('');
    const [grado, setGrado] = useState('');
    const [escuela, setEscuela] = useState('');

    // Función para obtener el perfil desde el backend
    const fetchProfile = async (curp) => {
        try {
            const response = await axios.get(`https://servidor-zonadoce.vercel.app/perfil?curp=${curp}`);
            
            const perfilData = response.data[0]; 
            console.log('Datos del perfil obtenidos de la API:', perfilData);

            setNombreCompleto(`${perfilData.nombre} ${perfilData.aPaterno} ${perfilData.aMaterno}`);
            setEmail(perfilData.correo || ''); 
            setGrupo(perfilData.grupo || '');
            setGrado(perfilData.grado_id || '');
            setEscuela(perfilData.plantel_nombre || '');
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            Alert.alert('Error', 'No se pudo obtener el perfil. Inténtalo más tarde.');
        }
    };

    useEffect(() => {
        const getCurpAndFetchProfile = async () => {
            try {
                const storedCurp = await AsyncStorage.getItem('userCURP');
                
                if (storedCurp) {
                    setCurp(storedCurp); 
                    await fetchProfile(storedCurp);
                } else {
                    console.log('CURP no encontrada en AsyncStorage');
                    Alert.alert('Error', 'CURP no encontrada. Inicia sesión nuevamente.');
                    router.push('/(user)/screens/loginScreen');
                }
            } catch (error) {
                console.error('Error al recuperar la CURP:', error);
            }
        };

        getCurpAndFetchProfile();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        router.push('/(user)/screens/loginScreen');
    };

    return (
        <ScrollView style={tw`flex-1 bg-gray-100 p-6`}>
            {/* Muestra el nombre completo */}
            <View style={tw`bg-white rounded-lg shadow p-6 mb-6`}>
                <Text style={tw`text-4xl font-bold text-center text-blue-600 mb-4`}>{nombreCompleto}</Text>

                {/* Muestra el correo */}
                <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Correo electrónico:</Text>
                <Text style={tw`text-base text-gray-600 mb-4`}>{email}</Text>

                {/* Muestra la CURP */}
                <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>CURP:</Text>
                <Text style={tw`text-base text-gray-600 mb-4`}>{curp}</Text>

                {/* Muestra el grupo */}
                <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Grupo asignado:</Text>
                <Text style={tw`text-base text-gray-600 mb-4`}>{grupo}</Text>

                {/* Muestra el grado */}
                <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Grado asignado:</Text>
                <Text style={tw`text-base text-gray-600 mb-4`}>{grado}</Text>

                {/* Muestra la escuela */}
                <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Escuela:</Text>
                <Text style={tw`text-base text-gray-600 mb-4`}>{escuela}</Text>
            </View>

            <View style={tw`flex flex-col items-center mb-10`}>
                {/* Botón de cerrar sesión estilizado */}
                <Boton 
                    title="Cerrar sesión" 
                    onPress={handleLogout} 
                    style={tw`bg-red-500 text-white py-2 px-4 rounded-lg shadow`} 
                />
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;
