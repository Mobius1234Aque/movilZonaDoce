import React from 'react';
import { View, Text, useWindowDimensions, ScrollView } from 'react-native';
import tw from 'twrnc';
import { EmailInput, PasswordInput, Input } from '@/components/general/Inputs'; // Importa los componentes aquí
import Boton from '@/components/general/Buttons';

const ProfileScreen = () => {
    const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

    const handleSave = () => {
        // Aquí puedes manejar la lógica de guardado
        console.log('Guardando información...');
    };

    return (
        <ScrollView style={tw`flex flex-col p-4 bg-white`}>
            <Text style={tw`${width < 400 ? 'text-xl' : 'text-2xl'} font-bold my-4`}>Detalles personales</Text>
            
            {/* Reemplaza el TextInput de email por el EmailInput */}
            <EmailInput
                title="Dirección de correo electrónico"
                iconName="mail" // Define el icono
                onPress={() => {}}
            />
            
            {/* Reemplaza el TextInput de contraseña por el PasswordInput */}
            <PasswordInput
                title="Contraseña"
                iconName="lock-closed" // Define el icono
                onPress={() => {}}
            />
            
            <Text style={tw`${width < 400 ? 'text-xl' : 'text-2xl'} font-bold my-4`}>Informacion inportante</Text>

            <View style={tw`flex flex-col items-center`}>            
            {/* Usa el componente Input para otros campos */}
                <Input
                    title="CURP"
                    iconName="id-card" // Usa un ícono relacionado o personaliza
                    onPress={() => {}}
                />
                
                <Input
                    title="Grupo asignado"
                    iconName="people" // Usa un ícono relacionado o personaliza
                    onPress={() => {}}
                />
                
                <Input
                    title="Escuela de radicación"
                    iconName="school" // Usa un ícono relacionado o personaliza
                    onPress={() => {}}
                />

                {/* Botón para guardar */}
                <Boton title="Guardar" onPress={handleSave}/>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;
