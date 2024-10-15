import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { PasswordInput, CurpInput, Input } from '@/components/general/Inputs'; // Importa los componentes aquí
import Boton from '@/components/general/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [curp, setCurp] = useState('');
    const [grupo, setGrupo] = useState('');
    const [escuela, setEscuela] = useState('');

    const handleSave = () => {
        // Lógica de guardado
        console.log('Guardando información...');
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken'); // Elimina el token
        router.push('/(user)/screens/loginScreen'); // Redirige a la pantalla de inicio de sesión
    };


    return (
        <ScrollView style={tw`flex flex-col p-4 bg-white`}>
            <Text style={tw`text-2xl font-bold my-4`}>Detalles personales</Text>

            {/* Email Input */}
            <Input
                title="Dirección de correo electrónico"
                iconName="mail"
                value={email}
                onChangeText={setEmail}
            />

            {/* Password Input */}
            <PasswordInput
                title="Contraseña"
                iconName="lock-closed"
                value={password}
                onChangeText={setPassword}
            />

            <Text style={tw`text-2xl font-bold my-4`}>Información importante</Text>

            <View style={tw`flex flex-col items-center`}>
                {/* CURP Input */}
                <CurpInput
                    title="CURP"
                    iconName="id-card"
                    value={curp}
                    onChangeText={setCurp}
                />

                {/* Grupo Input */}
                <Input
                    title="Grupo asignado"
                    iconName="people"
                    value={grupo}
                    onChangeText={setGrupo}
                />

                {/* Escuela Input */}
                <Input
                    title="Escuela de radicación"
                    iconName="school"
                    value={escuela}
                    onChangeText={setEscuela}
                />

                {/* Guardar Button */}
                <Boton title="Guardar" onPress={handleSave} />
                <Boton title="Cerrar sesion" onPress={handleLogout} />

            </View>
        </ScrollView>
    );
};

export default ProfileScreen;
