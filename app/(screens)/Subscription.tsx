import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';


const SubscriptionScreen = () => {
    const router = useRouter();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const initializePaymentSheet = async () => {
        setLoading(true);
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedCurp = await AsyncStorage.getItem('userCURP');

            if (!storedEmail || !storedCurp) {
                throw new Error('Email o CURP no encontrado. Por favor, inicia sesión nuevamente.');
            }

            const response = await fetch('http://192.168.101.18:3000/payments/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: storedEmail,
                    priceId: 'price_1QHb2XDuSddEszG09vtp6eXZ',
                    curp: storedCurp,
                }),
            });

            const { clientSecret } = await response.json();

            const { error } = await initPaymentSheet({
                merchantDisplayName: 'EduZona 12',
                paymentIntentClientSecret: clientSecret,
            });

            if (!error) {
                console.log('PaymentSheet inicializado correctamente');
            } else {
                Alert.alert('Error', 'Hubo un problema al inicializar el PaymentSheet');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error inicializando PaymentSheet:', error);
                Alert.alert('Error', error.message || 'No se pudo inicializar el PaymentSheet');
            } else {
                console.error('Error desconocido:', error);
                Alert.alert('Error', 'Ocurrió un error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Éxito', 'Pago completado');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    return (
        <View style={tw`flex-1 items-center bg-white p-4`}>
            <View style={tw`flex flex-row self-start  mt-4`}>
                <TouchableOpacity onPress={handleGoBack} style={tw`flex-row items-center mb-4`}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                    <Text style={tw`text-lg text-black ml-2`}>Regresar</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`mt-2 w-full`}>
                <Text style={tw`text-4xl font-bold mb-4`}>Suscríbete al Plan Premium</Text>
                <Text style={tw`ml-2 text-xl text-gray-600 mb-4`}>
                    Accede a todas las funciones premium de la aplicación y mejora tu experiencia.
                </Text>

                {/* Descripción de los beneficios */}
                <Text style={tw`text-2xl font-semibold text-gray-800 mb-2`}>Beneficios de la suscripción:</Text>
                <View style={tw`mb-4`}>
                    <Text style={tw`ml-2 text-xl text-gray-700 mb-1`}>• Visualización completa de todas las evidencias y documentos</Text>
                    <Text style={tw`ml-2 text-xl text-gray-700 mb-1`}>• Acceso a funciones avanzadas para organizar y subir documentos</Text>
                    <Text style={tw`ml-2 text-xl text-gray-700 mb-1`}>• Soporte prioritario en consultas y problemas técnicos</Text>
                    <Text style={tw`ml-2 text-xl text-gray-700 mb-1`}>• Actualizaciones automáticas y mejoras de la aplicación</Text>
                    <Text style={tw`ml-2 text-xl text-gray-700`}>• Descuentos en futuras suscripciones y productos adicionales</Text>
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#00aaff" />
            ) : (
                <>
                    <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                        <Text style={tw`text-blue-500 underline text-center`}>
                            {termsAccepted ? "Términos aceptados 👍" : "Aceptar términos y condiciones"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={openPaymentSheet}
                        disabled={!termsAccepted}
                        style={tw`p-4 rounded-full ${termsAccepted ? 'bg-blue-600' : 'bg-gray-300'
                            } mt-6`}
                    >
                        <Text style={tw`text-white text-lg text-center`}>Suscribirse ahora</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default SubscriptionScreen;
